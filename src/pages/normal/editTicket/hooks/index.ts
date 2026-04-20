import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTicketById, createTicket, updateTicket } from "@actions/itTickets";
import useAction from "@hooks/useAction";

import type { CreateTicketData, UpdateTicketData } from "@actions/itTickets/types";
import type { EditTicketHookProps, TicketFormData } from "../types";

const INITIAL_FORM_DATA: TicketFormData = {
    description: "",
    resolutionNotes: "",
    priority: "LOW",
    status: "OPEN",
    title: ""
};

const useEditTicketHook = (): EditTicketHookProps => {
    const { ticketID } = useParams<{ ticketID: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<TicketFormData>(INITIAL_FORM_DATA);
    const [loading, setLoading] = useState(false);

    const isEditing = Boolean(ticketID);

    const fetchTicket = useCallback(async (id: string) => {
        setLoading(true);
        const response = await getTicketById(id);
        if (response && !("error" in response)) {
            setFormData({
                title: response.title || "",
                description: response.description || "",
                resolutionNotes: (response as any).resolutionNotes || "",
                priority: response.priority || "LOW",
                status: response.status || "OPEN"
            });
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (ticketID) fetchTicket(ticketID);
    }, [ticketID, fetchTicket]);

    const handleFormChange = useCallback((field: keyof TicketFormData, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleCancel = useCallback(() => {
        navigate("/dashboard/tickets");
    }, [navigate]);

    const handleSave = useCallback(async () => {
        if (!formData.title || !formData.description) return;

        const payload = isEditing
            ? { title: formData.title, description: formData.description, priority: formData.priority, status: formData.status, resolutionNotes: formData.resolutionNotes } as UpdateTicketData
            : { title: formData.title, description: formData.description, priority: formData.priority } as CreateTicketData;

        await useAction({
            action: async () => isEditing ? await updateTicket(ticketID as string, payload as UpdateTicketData) : await createTicket(payload as CreateTicketData),
            toastMessages: { success: "Chamado salvo com sucesso", error: "Erro ao salvar chamado", pending: "Salvando..." },
            callback: handleCancel
        });
    }, [formData, isEditing, ticketID, handleCancel]);

    return useMemo(() => ({
        handleFormChange,
        handleCancel,
        handleSave,
        isEditing,
        formData,
        loading
    }), [handleFormChange, handleCancel, handleSave, isEditing, formData, loading]);
};

export default useEditTicketHook;