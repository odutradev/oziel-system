import { useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getContracts, deleteContract } from "@actions/contracts";
import usePagination from "@hooks/usePagination";
import useAction from "@hooks/useAction";

import type { ContractModelType } from "@utils/types/models/contract";
import type { ContractsHookProps } from "../types";

const useContractsHook = (): ContractsHookProps => {
    const navigate = useNavigate();

    const fetchContractsList = useCallback(async (page: number, limit: number) => {
        return await getContracts({ page, limit });
    }, []);

    const { data: contracts, meta, loading, refresh, setPage, setLimit } = usePagination<ContractModelType>(fetchContractsList);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handlePaginationChange = useCallback((pagination: { currentPage: number; rows: number }) => {
        setPage(pagination.currentPage);
        setLimit(pagination.rows);
    }, [setPage, setLimit]);

    const handleCreate = useCallback(() => {
        navigate("/dashboard/contracts/new");
    }, [navigate]);

    const handleEdit = useCallback((contract: ContractModelType) => {
        navigate(`/dashboard/contracts/edit/${contract._id}`);
    }, [navigate]);

    const handleDelete = useCallback(async (id: string) => {
        if (!confirm("Tem certeza que deseja remover este contrato?")) return;
        await useAction({
            action: async () => await deleteContract(id),
            toastMessages: { success: "Contrato removido com sucesso", error: "Erro ao remover contrato", pending: "Removendo..." },
            callback: refresh
        });
    }, [refresh]);

    return useMemo(() => ({
        meta,
        loading,
        contracts,
        handleEdit,
        handleCreate,
        handleDelete,
        handlePaginationChange
    }), [meta, loading, contracts, handleEdit, handleCreate, handleDelete, handlePaginationChange]);
};

export default useContractsHook;