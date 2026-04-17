import { useState, useEffect, useCallback, useMemo } from "react";

import { getOperators, createOperator, updateOperator, deleteOperator } from "@actions/operators";
import { getFleets, createFleet, updateFleet, deleteFleet } from "@actions/fleets";
import usePagination from "@hooks/usePagination";
import useAction from "@hooks/useAction";

import type { ResourceTabType, ResourceFormData, ResourcesHookProps, ResourceItemType } from "../types";

const INITIAL_FORM_DATA: ResourceFormData = {
    active: true,
    name: ""
};

const useResourcesHook = (): ResourcesHookProps => {
    const [activeTab, setActiveTab] = useState<ResourceTabType>("fleets");
    const [modalState, setModalState] = useState({ open: false, data: INITIAL_FORM_DATA, type: "fleets" as ResourceTabType });

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

    const handleOpenModal = useCallback((item?: ResourceItemType) => {
        if (item) {
            setModalState({
                open: true,
                type: activeTab,
                data: {
                    _id: item._id,
                    name: item.name,
                    active: item.active,
                    description: "description" in item ? item.description : undefined,
                    document: "document" in item ? item.document : undefined
                }
            });
        } else {
            setModalState({ open: true, type: activeTab, data: INITIAL_FORM_DATA });
        }
    }, [activeTab]);

    const handleCloseModal = useCallback(() => {
        setModalState((prev) => ({ ...prev, open: false, data: INITIAL_FORM_DATA }));
    }, []);

    const handleFormChange = useCallback((field: keyof ResourceFormData, value: string | boolean) => {
        setModalState((prev) => ({ ...prev, data: { ...prev.data, [field]: value } }));
    }, []);

    const handleSave = useCallback(async () => {
        if (!modalState.data.name) return;

        const isFleet = modalState.type === "fleets";

        await useAction({
            action: async () => {
                if (modalState.data._id) {
                    return isFleet ? await updateFleet(modalState.data._id, modalState.data) : await updateOperator(modalState.data._id, modalState.data);
                }
                return isFleet ? await createFleet(modalState.data) : await createOperator(modalState.data);
            },
            toastMessages: {
                success: `${isFleet ? "Frota" : "Operador"} salvo(a) com sucesso`,
                error: `Erro ao salvar ${isFleet ? "frota" : "operador"}`,
                pending: "Salvando..."
            },
            callback: () => {
                refresh();
                handleCloseModal();
            }
        });
    }, [modalState, refresh, handleCloseModal]);

    const handleDelete = useCallback(async (id: string) => {
        const isFleet = activeTab === "fleets";

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
        modalState,
        handleSave,
        handleDelete,
        handleOpenModal,
        handleTabChange,
        handleCloseModal,
        handleFormChange,
        handlePaginationChange
    }), [meta, items, loading, activeTab, modalState, handleSave, handleDelete, handleOpenModal, handleTabChange, handleCloseModal, handleFormChange, handlePaginationChange]);
};

export default useResourcesHook;