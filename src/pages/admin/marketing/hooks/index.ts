import { useState, useEffect, useCallback, useMemo } from "react";

import { getCalendarItems, scheduleDraft, sendForApproval, reviewCalendarItem, getDrafts, deleteDraft, deleteCalendarItem } from "@actions/marketingRequests";
import useAction from "@hooks/useAction";

import type { MarketingItemModelType } from "@actions/marketingRequests/types";
import type { ScheduleFormData, ReviewFormData, MarketingHookProps } from "../types";

const useMarketingHook = (): MarketingHookProps => {
    const [calendarItems, setCalendarItems] = useState<MarketingItemModelType[]>([]);
    const [selectedCalendarItem, setSelectedCalendarItem] = useState<string | null>(null);
    const [selectedDraft, setSelectedDraft] = useState<string | null>(null);
    const [drafts, setDrafts] = useState<MarketingItemModelType[]>([]);
    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchDraftsData = useCallback(async () => {
        setLoading(true);
        const response = await getDrafts({ limit: 100, page: 1 });
        if (response && !("error" in response)) setDrafts(response.data);
        setLoading(false);
    }, []);

    const fetchCalendarData = useCallback(async () => {
        setLoading(true);
        const response = await getCalendarItems();
        if (response && !("error" in response)) setCalendarItems(response.data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchDraftsData();
        fetchCalendarData();
    }, [fetchDraftsData, fetchCalendarData]);

    const handleCloseModals = useCallback(() => {
        setSelectedCalendarItem(null);
        setScheduleModalOpen(false);
        setReviewModalOpen(false);
        setSelectedDraft(null);
    }, []);

    const handleOpenScheduleModal = useCallback((draftId: string) => {
        setSelectedDraft(draftId);
        setScheduleModalOpen(true);
    }, []);

    const handleOpenReviewModal = useCallback((item: MarketingItemModelType) => {
        setSelectedCalendarItem(item._id);
        setReviewModalOpen(true);
    }, []);

    const handleDeleteDraft = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteDraft(id),
            toastMessages: { success: "Rascunho removido", error: "Erro ao remover rascunho", pending: "Removendo..." },
            callback: fetchDraftsData
        });
    }, [fetchDraftsData]);

    const handleDeleteCalendarItem = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteCalendarItem(id),
            toastMessages: { success: "Item do calendário removido", error: "Erro ao remover do calendário", pending: "Removendo..." },
            callback: () => {
                fetchCalendarData();
                handleCloseModals();
            }
        });
    }, [fetchCalendarData, handleCloseModals]);

    const handleScheduleDraft = useCallback(async (data: ScheduleFormData) => {
        await useAction({
            action: async () => await scheduleDraft(data._id, { plannedDate: new Date(data.plannedDate).toISOString() }),
            toastMessages: { success: "Agendado com sucesso", error: "Erro ao agendar", pending: "Agendando..." },
            callback: () => {
                fetchDraftsData();
                fetchCalendarData();
                handleCloseModals();
            }
        });
    }, [fetchDraftsData, fetchCalendarData, handleCloseModals]);

    const handleSendApproval = useCallback(async (id: string) => {
        await useAction({
            action: async () => await sendForApproval(id),
            toastMessages: { success: "Enviado para aprovação", error: "Erro ao enviar", pending: "Enviando..." },
            callback: fetchCalendarData
        });
    }, [fetchCalendarData]);

    const handleReviewItem = useCallback(async (data: ReviewFormData) => {
        await useAction({
            action: async () => await reviewCalendarItem(data._id, { approved: data.approved, feedbackNotes: data.feedbackNotes }),
            toastMessages: { success: "Revisão concluída", error: "Erro ao revisar", pending: "Processando..." },
            callback: () => {
                fetchCalendarData();
                handleCloseModals();
            }
        });
    }, [fetchCalendarData, handleCloseModals]);

    return useMemo(() => ({
        handleDeleteCalendarItem,
        handleOpenScheduleModal,
        handleOpenReviewModal,
        selectedCalendarItem,
        handleScheduleDraft,
        handleDeleteDraft,
        handleSendApproval,
        handleReviewItem,
        scheduleModalOpen,
        handleCloseModals,
        reviewModalOpen,
        calendarItems,
        selectedDraft,
        loading,
        drafts
    }), [
        handleDeleteCalendarItem, handleOpenScheduleModal, handleOpenReviewModal, selectedCalendarItem, handleScheduleDraft,
        handleDeleteDraft, handleSendApproval, handleReviewItem, scheduleModalOpen, handleCloseModals,
        reviewModalOpen, calendarItems, selectedDraft, loading, drafts
    ]);
};

export default useMarketingHook;