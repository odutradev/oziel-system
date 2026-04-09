import { useState, useEffect, useCallback, useMemo } from "react";

import { getFleets, createFleet, updateFleet, deleteFleet } from "@actions/fleets";
import usePagination from "@hooks/usePagination";
import useAction from "@hooks/useAction";

import type { FleetModelType } from "@actions/fleets/types";
import type { FleetsHookProps, FleetFormData } from "../types";

const INITIAL_FORM_DATA: FleetFormData = {
    description: "",
    active: true,
    name: ""
};

const useFleetsHook = (): FleetsHookProps => {
    const [formData, setFormData] = useState<FleetFormData>(INITIAL_FORM_DATA);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchFleetsList = useCallback(async (page: number, limit: number) => {
        return await getFleets({ page, limit });
    }, []);

    const { data: fleets, meta, loading, refresh, setPage, setLimit } = usePagination<FleetModelType>(fetchFleetsList);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handlePaginationChange = useCallback((pagination: { currentPage: number; rows: number }) => {
        setPage(pagination.currentPage);
        setLimit(pagination.rows);
    }, [setPage, setLimit]);

    const handleOpenModal = useCallback((fleet?: FleetModelType) => {
        if (fleet) {
            setFormData({
                _id: fleet._id,
                name: fleet.name,
                description: fleet.description ?? "",
                active: fleet.active
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

    const handleFormChange = useCallback((field: keyof FleetFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = useCallback(async () => {
        if (!formData.name) return;
        await useAction({
            action: async () => formData._id ? await updateFleet(formData._id, formData) : await createFleet(formData),
            toastMessages: { success: "Frota salva com sucesso", error: "Erro ao salvar frota", pending: "Salvando..." },
            callback: () => {
                refresh();
                handleCloseModal();
            }
        });
    }, [formData, refresh, handleCloseModal]);

    const handleDelete = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteFleet(id),
            toastMessages: { success: "Frota removida com sucesso", error: "Erro ao remover frota", pending: "Removendo..." },
            callback: refresh
        });
    }, [refresh]);

    return useMemo(() => ({
        meta,
        loading,
        formData,
        fleets,
        modalOpen,
        handleSave,
        handleDelete,
        handleOpenModal,
        handleCloseModal,
        handleFormChange,
        handlePaginationChange
    }), [meta, loading, formData, fleets, modalOpen, handleSave, handleDelete, handleOpenModal, handleCloseModal, handleFormChange, handlePaginationChange]);
};

export default useFleetsHook;