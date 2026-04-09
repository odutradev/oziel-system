import { useState, useEffect, useCallback, useMemo } from "react";

import { getOperators, createOperator, updateOperator, deleteOperator } from "@actions/operators";
import usePagination from "@hooks/usePagination";
import useAction from "@hooks/useAction";

import type { OperatorModelType } from "@actions/operators/types";
import type { OperatorsHookProps, OperatorFormData } from "../types";

const INITIAL_FORM_DATA: OperatorFormData = {
    name: "",
    document: "",
    active: true
};

const useOperatorsHook = (): OperatorsHookProps => {
    const [formData, setFormData] = useState<OperatorFormData>(INITIAL_FORM_DATA);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchOperatorsList = useCallback(async (page: number, limit: number) => {
        return await getOperators({ page, limit });
    }, []);

    const { data: operators, meta, loading, refresh, setPage, setLimit } = usePagination<OperatorModelType>(fetchOperatorsList);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handlePaginationChange = useCallback((pagination: { currentPage: number; rows: number }) => {
        setPage(pagination.currentPage);
        setLimit(pagination.rows);
    }, [setPage, setLimit]);

    const handleOpenModal = useCallback((operator?: OperatorModelType) => {
        if (operator) {
            setFormData({
                _id: operator._id,
                name: operator.name,
                document: operator.document ?? "",
                active: operator.active
            });
        } else {
            setFormData(INITIAL_FORM_DATA);
        }
        setModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
        setFormData(INITIAL_FORM_DATA);
    }, []);

    const handleFormChange = useCallback((field: keyof OperatorFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = useCallback(async () => {
        if (!formData.name) return;
        await useAction({
            action: async () => formData._id ? await updateOperator(formData._id, formData) : await createOperator(formData),
            toastMessages: { success: "Operador salvo com sucesso", error: "Erro ao salvar operador", pending: "Salvando..." },
            callback: () => {
                refresh();
                handleCloseModal();
            }
        });
    }, [formData, refresh, handleCloseModal]);

    const handleDelete = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteOperator(id),
            toastMessages: { success: "Operador removido com sucesso", error: "Erro ao remover operador", pending: "Removendo..." },
            callback: refresh
        });
    }, [refresh]);

    return useMemo(() => ({
        meta,
        loading,
        formData,
        operators,
        modalOpen,
        handleSave,
        handleDelete,
        handleOpenModal,
        handleCloseModal,
        handleFormChange,
        handlePaginationChange
    }), [meta, loading, formData, operators, modalOpen, handleSave, handleDelete, handleOpenModal, handleCloseModal, handleFormChange, handlePaginationChange]);
};

export default useOperatorsHook;