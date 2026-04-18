import { useState, useEffect, useCallback, useMemo } from "react";

import { getCalendarItems, scheduleDraft, sendForApproval, reviewCalendarItem, getDrafts, createDraft, updateDraft, deleteDraft } from "@actions/marketingRequests";
import useAction from "@hooks/useAction";

import type { MarketingItemModelType } from "@actions/marketingRequests/types";
import type { DraftFormData, ScheduleFormData, ReviewFormData, MarketingHookProps } from "../types";

const useMarketingHook = (): MarketingHookProps => {
    const [calendarItems, setCalendarItems] = useState<MarketingItemModelType[]>([]);
    const [drafts, setDrafts] = useState<MarketingItemModelType[]>([]);
    const [selectedCalendarItem, setSelectedCalendarItem] = useState<string | null>(null);
    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
    const [selectedDraft, setSelectedDraft] = useState<string | null>(null);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [draftModalOpen, setDraftModalOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
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
        if (currentTab === 0) fetchDraftsData();
        if (currentTab === 1) fetchCalendarData();
    }, [currentTab, fetchDraftsData, fetchCalendarData]);

    const handleTabChange = useCallback((newValue: number) => {
        setCurrentTab(newValue);
    }, []);

    const handleCloseModals = useCallback(() => {
        setSelectedCalendarItem(null);
        setScheduleModalOpen(false);
        setReviewModalOpen(false);
        setDraftModalOpen(false);
        setSelectedDraft(null);
    }, []);

    const handleOpenDraftModal = useCallback((draft?: MarketingItemModelType) => {
        if (draft) setSelectedDraft(draft._id);
        setDraftModalOpen(true);
    }, []);

    const handleOpenScheduleModal = useCallback((draftId: string) => {
        setSelectedDraft(draftId);
        setScheduleModalOpen(true);
    }, []);

    const handleOpenReviewModal = useCallback((item: MarketingItemModelType) => {
        setSelectedCalendarItem(item._id);
        setReviewModalOpen(true);
    }, []);

    const handleSaveDraft = useCallback(async (data: DraftFormData) => {
        const payload = { title: data.title, description: data.description, strategy: data.strategy, content: data.content };
        await useAction({
            action: async () => data._id ? await updateDraft(data._id, payload) : await createDraft(payload),
            toastMessages: { success: "Rascunho salvo com sucesso", error: "Erro ao salvar rascunho", pending: "Salvando..." },
            callback: () => {
                fetchDraftsData();
                handleCloseModals();
            }
        });
    }, [fetchDraftsData, handleCloseModals]);

    const handleDeleteDraft = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteDraft(id),
            toastMessages: { success: "Rascunho removido", error: "Erro ao remover rascunho", pending: "Removendo..." },
            callback: fetchDraftsData
        });
    }, [fetchDraftsData]);

    const handleScheduleDraft = useCallback(async (data: ScheduleFormData) => {
        await useAction({
            action: async () => await scheduleDraft(data._id, { plannedDate: new Date(data.plannedDate).toISOString() }),
            toastMessages: { success: "Agendado com sucesso", error: "Erro ao agendar", pending: "Agendando..." },
            callback: () => {
                fetchDraftsData();
                handleCloseModals();
                setCurrentTab(1);
            }
        });
    }, [fetchDraftsData, handleCloseModals]);

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
        handleOpenScheduleModal,
        handleOpenReviewModal,
        selectedCalendarItem,
        handleOpenDraftModal,
        handleScheduleDraft,
        handleDeleteDraft,
        handleSendApproval,
        handleReviewItem,
        scheduleModalOpen,
        handleCloseModals,
        handleSaveDraft,
        handleTabChange,
        reviewModalOpen,
        draftModalOpen,
        calendarItems,
        selectedDraft,
        currentTab,
        loading,
        drafts
    }), [
        handleOpenScheduleModal, handleOpenReviewModal, selectedCalendarItem, handleOpenDraftModal, handleScheduleDraft,
        handleDeleteDraft, handleSendApproval, handleReviewItem, scheduleModalOpen, handleCloseModals, handleSaveDraft,
        handleTabChange, reviewModalOpen, draftModalOpen, calendarItems, selectedDraft, currentTab, loading, drafts
    ]);
};

export default useMarketingHook;