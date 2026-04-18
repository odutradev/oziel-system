import type { MarketingItemModelType, MarketingStatus } from "@actions/marketingRequests/types";

export interface ScheduleFormData {
    plannedDate: string;
    _id: string;
}

export interface MarketingHookProps {
    handleDeleteCalendarItem: (id: string) => Promise<void>;
    handleScheduleDraft: (data: ScheduleFormData) => Promise<void>;
    handleOpenScheduleModal: (draftId: string) => void;
    handleDeleteDraft: (id: string) => Promise<void>;
    handleSendApproval: (id: string) => Promise<void>;
    handleCloseModals: () => void;
    calendarItems: MarketingItemModelType[];
    drafts: MarketingItemModelType[];
    scheduleModalOpen: boolean;
    selectedDraft: string | null;
    loading: boolean;
}

export const STATUS_TRANSLATIONS: Record<MarketingStatus, string> = {
    REVISION_REQUIRED: "Revisão Necessária",
    WAITING_APPROVAL: "Aguardando Aprovação",
    COMPLETED: "Concluída",
    APPROVED: "Aprovada",
    PLANNED: "Planejada",
    DRAFT: "Rascunho"
};