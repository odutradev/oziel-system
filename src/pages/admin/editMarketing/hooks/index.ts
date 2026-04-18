import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { createDraft, updateDraft, updateCalendarItem, getMarketingItemById } from "@actions/marketingRequests";
import useAction from "@hooks/useAction";

import type { EditMarketingFormData } from "../types";

const INITIAL_STATE: EditMarketingFormData = { title: "", description: "", strategy: "", content: "", status: "DRAFT" };

const useEditMarketing = (itemID?: string) => {
    const [formData, setFormData] = useState<EditMarketingFormData>(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const fetchItem = useCallback(async (id: string) => {
        setLoading(true);
        const response = await getMarketingItemById(id);
        if (response && !("error" in response)) {
            setFormData({
                title: response.title,
                description: response.description,
                strategy: response.strategy || "",
                content: response.content || "",
                plannedDate: response.plannedDate ? new Date(response.plannedDate).toISOString().slice(0, 16) : undefined,
                status: response.status
            });
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (itemID) fetchItem(itemID);
    }, [itemID, fetchItem]);

    const handleChange = useCallback((field: keyof EditMarketingFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = useCallback(async () => {
        setSaving(true);
        await useAction({
            action: async () => {
                if (!itemID) return await createDraft({ title: formData.title, description: formData.description, strategy: formData.strategy, content: formData.content } as any);
                if (formData.status === "DRAFT") return await updateDraft(itemID, { title: formData.title, description: formData.description, strategy: formData.strategy, content: formData.content });
                return await updateCalendarItem(itemID, { content: formData.content, plannedDate: formData.plannedDate ? new Date(formData.plannedDate).toISOString() : undefined });
            },
            toastMessages: { success: "Salvo com sucesso", error: "Erro ao salvar", pending: "Salvando..." },
            callback: () => navigate("/dashboard/admin/marketing")
        });
        setSaving(false);
    }, [itemID, formData, navigate]);

    return { formData, loading, saving, handleChange, handleSave };
};

export default useEditMarketing;