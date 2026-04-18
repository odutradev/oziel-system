import type { MarketingItemModelType, MarketingStatus } from "@actions/marketingRequests/types";

export interface DraftFormData {
    description: string;
    strategy: string;
    content: string;
    title: string;
    _id?: string;
}

export interface ScheduleFormData {
    plannedDate: string;
    _id: string;
}

export interface ReviewFormData {
    feedbackNotes: string;
    approved: boolean;
    _id: string;
}

export interface MarketingHookProps {
    handleOpenReviewModal: (item: MarketingItemModelType) => void;
    handleScheduleDraft: (data: ScheduleFormData) => Promise<void>;
    handleOpenDraftModal: (draft?: MarketingItemModelType) => void;
    handleReviewItem: (data: ReviewFormData) => Promise<void>;
    handleOpenScheduleModal: (draftId: string) => void;
    handleSaveDraft: (data: DraftFormData) => Promise<void>;
    handleDeleteDraft: (id: string) => Promise<void>;
    handleSendApproval: (id: string) => Promise<void>;
    handleCloseModals: () => void;
    calendarItems: MarketingItemModelType[];
    selectedCalendarItem: string | null;
    drafts: MarketingItemModelType[];
    scheduleModalOpen: boolean;
    reviewModalOpen: boolean;
    draftModalOpen: boolean;
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