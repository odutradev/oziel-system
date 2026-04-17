import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { getHrMembers, deleteHrMember, getHrDashboardMetrics } from "@actions/hrMembers";
import usePagination from "@hooks/usePagination";
import useAction from "@hooks/useAction";

import type { HrMemberModelType, HrDashboardMetrics } from "@actions/hrMembers/types";
import type { HrMembersHookProps } from "../types";

const useHrMembersHook = (): HrMembersHookProps => {
    const navigate = useNavigate();

    const [metrics, setMetrics] = useState<HrDashboardMetrics | null>(null);
    const [loadingMetrics, setLoadingMetrics] = useState(true);

    const fetchMembersList = useCallback(async (page: number, limit: number) => {
        return await getHrMembers({ page, limit });
    }, []);

    const fetchMetrics = useCallback(async () => {
        setLoadingMetrics(true);
        const result = await getHrDashboardMetrics();
        if (!("error" in result)) setMetrics(result);
        setLoadingMetrics(false);
    }, []);

    const { data: members, meta, loading, refresh, setPage, setLimit } = usePagination<HrMemberModelType>(fetchMembersList);

    useEffect(() => {
        refresh();
        fetchMetrics();
    }, [refresh, fetchMetrics]);

    const handlePaginationChange = useCallback((pagination: { currentPage: number; rows: number }) => {
        setPage(pagination.currentPage);
        setLimit(pagination.rows);
    }, [setPage, setLimit]);

    const handleCreate = useCallback(() => {
        navigate("/dashboard/hr/members/new");
    }, [navigate]);

    const handleEdit = useCallback((member: HrMemberModelType) => {
        navigate(`/dashboard/hr/members/edit/${member._id}`);
    }, [navigate]);

    const handleDelete = useCallback(async (id: string) => {
        if (!confirm("Tem certeza que deseja remover este membro?")) return;
        await useAction({
            action: async () => await deleteHrMember(id),
            toastMessages: { success: "Membro removido com sucesso", error: "Erro ao remover membro", pending: "Removendo..." },
            callback: refresh
        });
    }, [refresh]);

    return useMemo(() => ({
        meta,
        loading,
        metrics,
        members,
        loadingMetrics,
        handleEdit,
        handleCreate,
        handleDelete,
        handlePaginationChange
    }), [meta, loading, metrics, members, loadingMetrics, handleEdit, handleCreate, handleDelete, handlePaginationChange]);
};

export default useHrMembersHook;