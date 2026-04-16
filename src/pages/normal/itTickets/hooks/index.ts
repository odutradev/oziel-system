import { useState, useEffect, useCallback, useMemo } from "react";

import { getTickets, createTicket, updateTicket, deleteTicket } from "@actions/itTickets";
import useAction from "@hooks/useAction";

import type { TicketModelType, CreateTicketData, UpdateTicketData } from "@actions/itTickets/types";
import type { TicketsHookProps, TicketFormData } from "../types";

const INITIAL_FORM_DATA: TicketFormData = {
    description: "",
    priority: "LOW",
    status: "OPEN",
    title: ""
};

const useTicketsHook = (): TicketsHookProps => {
    const [formData, setFormData] = useState<TicketFormData>(INITIAL_FORM_DATA);
    const [tickets, setTickets] = useState<TicketModelType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        const response = await getTickets({ limit: 1000 });
        if (response && !("error" in response)) setTickets(response.data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleOpenModal = useCallback((ticket?: TicketModelType) => {
        if (ticket) {
            setFormData({
                _id: ticket._id,
                title: ticket.title,
                description: ticket.description,
                status: ticket.status || "OPEN",
                priority: ticket.priority || "LOW",
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

    const handleFormChange = useCallback((field: keyof TicketFormData, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = useCallback(async () => {
        if (!formData.title || !formData.description) return;

        const isUpdate = !!formData._id;
        const payload = isUpdate
            ? { title: formData.title, description: formData.description, priority: formData.priority, status: formData.status, resolutionNotes: formData.resolutionNotes } as UpdateTicketData
            : { title: formData.title, description: formData.description, priority: formData.priority } as CreateTicketData;

        await useAction({
            action: async () => isUpdate ? await updateTicket(formData._id as string, payload as UpdateTicketData) : await createTicket(payload as CreateTicketData),
            toastMessages: { success: "Chamado salvo com sucesso", error: "Erro ao salvar chamado", pending: "Salvando..." },
            callback: () => {
                fetchTickets();
                handleCloseModal();
            }
        });
    }, [formData, fetchTickets, handleCloseModal]);

    const handleDelete = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteTicket(id),
            toastMessages: { success: "Chamado removido com sucesso", error: "Erro ao remover", pending: "Removendo..." },
            callback: fetchTickets
        });
    }, [fetchTickets]);

    return useMemo(() => ({
        handleFormChange,
        handleCloseModal,
        handleOpenModal,
        handleDelete,
        handleSave,
        modalOpen,
        formData,
        loading,
        tickets
    }), [handleFormChange, handleCloseModal, handleOpenModal, handleDelete, handleSave, modalOpen, formData, loading, tickets]);
};

export default useTicketsHook;