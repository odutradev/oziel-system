import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateCalendarItem, reviewCalendarItem, getMarketingItemById, updateDraft, createDraft, sendForApproval } from "@actions/marketingRequests";
import useAction from "@hooks/useAction";

import type { EditMarketingFormData } from "../types";

const INITIAL_STATE: EditMarketingFormData = { title: "", description: "", strategy: "", content: "", status: "DRAFT", feedbackNotes: "" };

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
                description: data.description || "",
                feedbackNotes: data.feedbackNotes || "",
                plannedDate: getSafeDate(data.plannedDate),
                strategy: data.strategy || "",
                status: data.status || "DRAFT",
                content: data.content || "",
                title: data.title || ""
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
                const payload = {
                    description: formData.description,
                    strategy: formData.strategy,
                    content: formData.content,
                    title: formData.title
                };

                if (!itemID) return await createDraft(payload as any);
                if (formData.status === "DRAFT") return await updateDraft(itemID, payload);

                return await updateCalendarItem(itemID, {
                    ...payload,
                    plannedDate: formData.plannedDate ? new Date(formData.plannedDate).toISOString() : undefined
                });
            },
            toastMessages: { success: "Salvo com sucesso", error: "Erro ao salvar", pending: "Salvando..." },
            callback: () => navigate("/dashboard/admin/marketing")
        });
        setSaving(false);
    }, [itemID, formData, navigate]);

    const handleSendApproval = useCallback(async () => {
        setSaving(true);
        await useAction({
            action: async () => {
                const payload = {
                    description: formData.description,
                    strategy: formData.strategy,
                    content: formData.content,
                    title: formData.title
                };

                let currentId = itemID;

                if (!currentId) {
                    const res = await createDraft(payload as any);
                    const data = res && "data" in res ? (res as any).data : res;
                    currentId = data?._id;
                } else if (formData.status === "DRAFT") {
                    await updateDraft(currentId, payload);
                } else {
                    await updateCalendarItem(currentId, {
                        ...payload,
                        plannedDate: formData.plannedDate ? new Date(formData.plannedDate).toISOString() : undefined
                    });
                }

                if (currentId) return await sendForApproval(currentId);

                throw new Error("Erro ao preparar item para aprovação");
            },
            toastMessages: { success: "Enviado para revisão", error: "Erro ao enviar", pending: "Enviando..." },
            callback: () => navigate("/dashboard/admin/marketing")
        });
        setSaving(false);
    }, [itemID, formData, navigate]);

    const handleReview = useCallback(async (approved: boolean) => {
        if (!itemID) return;
        setSaving(true);
        await useAction({
            action: async () => await reviewCalendarItem(itemID, { approved, feedbackNotes: formData.feedbackNotes || "" }),
            toastMessages: { success: "Revisão concluída", error: "Erro ao revisar", pending: "Processando..." },
            callback: () => navigate("/dashboard/admin/marketing")
        });
        setSaving(false);
    }, [itemID, formData.feedbackNotes, navigate]);

    return { handleChange, handleSendApproval, handleReview, handleSave, formData, loading, saving };
};

export default useEditMarketing;