import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { getOperators, deleteOperator } from "@actions/operators";
import { getFleets, deleteFleet } from "@actions/fleets";
import usePagination from "@hooks/usePagination";
import useAction from "@hooks/useAction";

import type { ResourceTabType, MachineResourcesHookProps, ResourceItemType } from "../types";

const useMachineResourcesHook = (): MachineResourcesHookProps => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<ResourceTabType>("fleets");

    const fetchList = useCallback(async (page: number, limit: number) => {
        if (activeTab === "fleets") return await getFleets({ page, limit });
        return await getOperators({ page, limit });
    }, [activeTab]);

    const { data: items, meta, loading, refresh, setPage, setLimit } = usePagination<ResourceItemType>(fetchList);

    useEffect(() => {
        refresh();
    }, [refresh, activeTab]);

    const handleTabChange = useCallback((_: React.MouseEvent<HTMLElement>, value: string | null) => {
        if (value && value !== activeTab) {
            setActiveTab(value as ResourceTabType);
            setPage(1);
        }
    }, [activeTab, setPage]);

    const handlePaginationChange = useCallback((pagination: { currentPage: number; rows: number }) => {
        setPage(pagination.currentPage);
        setLimit(pagination.rows);
    }, [setPage, setLimit]);

    const handleCreate = useCallback(() => {
        navigate(`/dashboard/maintenance/machine-resources/new/${activeTab}`);
    }, [navigate, activeTab]);

    const handleEdit = useCallback((item: ResourceItemType) => {
        navigate(`/dashboard/maintenance/machine-resources/edit/${activeTab}/${item._id}`);
    }, [navigate, activeTab]);

    const handleDelete = useCallback(async (id: string) => {
        const isFleet = activeTab === "fleets";
        if (!confirm(`Tem certeza que deseja remover est${isFleet ? 'a frota' : 'e operador'}?`)) return;

        await useAction({
            action: async () => isFleet ? await deleteFleet(id) : await deleteOperator(id),
            toastMessages: {
                success: `${isFleet ? "Frota" : "Operador"} removido(a) com sucesso`,
                error: `Erro ao remover ${isFleet ? "frota" : "operador"}`,
                pending: "Removendo..."
            },
            callback: refresh
        });
    }, [activeTab, refresh]);

    return useMemo(() => ({
        meta,
        items,
        loading,
        activeTab,
        handleEdit,
        handleCreate,
        handleDelete,
        handleTabChange,
        handlePaginationChange
    }), [meta, items, loading, activeTab, handleEdit, handleCreate, handleDelete, handleTabChange, handlePaginationChange]);
};

export default useMachineResourcesHook;