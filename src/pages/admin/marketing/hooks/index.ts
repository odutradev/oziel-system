import { useCallback, useEffect, useMemo, useState } from "react";

import { deleteCalendarItem, getCalendarItems, scheduleDraft, sendForApproval, deleteDraft, getDrafts } from "@actions/marketingRequests";
import useAction from "@hooks/useAction";

import type { MarketingItemModelType } from "@actions/marketingRequests/types";
import type { MarketingHookProps, ScheduleFormData } from "../types";

const useMarketingHook = (): MarketingHookProps => {
    const [calendarItems, setCalendarItems] = useState<MarketingItemModelType[]>([]);
    const [selectedDraft, setSelectedDraft] = useState<string | null>(null);
    const [drafts, setDrafts] = useState<MarketingItemModelType[]>([]);
    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
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
        setScheduleModalOpen(false);
        setSelectedDraft(null);
    }, []);

    const handleOpenScheduleModal = useCallback((draftId: string) => {
        setSelectedDraft(draftId);
        setScheduleModalOpen(true);
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

    return useMemo(() => ({
        handleDeleteCalendarItem,
        handleOpenScheduleModal,
        handleScheduleDraft,
        handleDeleteDraft,
        handleSendApproval,
        scheduleModalOpen,
        handleCloseModals,
        calendarItems,
        selectedDraft,
        loading,
        drafts
    }), [
        handleDeleteCalendarItem, handleOpenScheduleModal, handleScheduleDraft,
        handleDeleteDraft, handleSendApproval, scheduleModalOpen, handleCloseModals,
        calendarItems, selectedDraft, loading, drafts
    ]);
};

export default useMarketingHook;