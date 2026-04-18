import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { createDraft, updateDraft, updateCalendarItem, getMarketingItemById } from "@actions/marketingRequests";
import useAction from "@hooks/useAction";

import type { EditMarketingFormData } from "../types";

const INITIAL_STATE: EditMarketingFormData = { title: "", description: "", strategy: "", content: "", status: "DRAFT" };

const getSafeDate = (date?: string | Date) => {
    if (!date) return undefined;
    try {
        return new Date(date).toISOString().slice(0, 16);
    } catch {
        return undefined;
    }
};

const useEditMarketing = (itemID?: string) => {
    const [formData, setFormData] = useState<EditMarketingFormData>(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const fetchItem = useCallback(async (id: string) => {
        setLoading(true);
        const response = await getMarketingItemById(id);
        if (response && !("error" in response)) {
            const data = "data" in response && response.data ? (response as any).data : response;
            setFormData({
                title: data.title || "",
                description: data.description || "",
                strategy: data.strategy || "",
                content: data.content || "",
                plannedDate: getSafeDate(data.plannedDate),
                status: data.status || "DRAFT"
            });
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (itemID) {
            fetchItem(itemID);
        } else {
            setFormData(INITIAL_STATE);
        }
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