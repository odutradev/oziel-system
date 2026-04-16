import type { MarketingRequestModelType } from "@actions/marketingRequests/types";

export interface RequestFormData {
    description: string;
    strategy?: string;
    content?: string;
    results?: string;
    title: string;
    _id?: string;
}

export interface ReviewFormData {
    feedbackNotes?: string;
    approved: boolean;
    _id: string;
}

export interface MarketingRequestsHookProps {
    handleFormChange: (field: keyof RequestFormData, value: unknown) => void;
    handleReviewChange: (field: keyof ReviewFormData, value: unknown) => void;
    handleOpenReview: (request: MarketingRequestModelType) => void;
    handleOpenModal: (request?: MarketingRequestModelType) => void;
    handleSendApproval: (id: string) => Promise<void>;
    requests: MarketingRequestModelType[];
    handleCloseReview: () => void;
    handleCloseModal: () => void;
    handleReviewSave: () => void;
    formData: RequestFormData;
    reviewData: ReviewFormData;
    handleSave: () => void;
    reviewOpen: boolean;
    modalOpen: boolean;
    loading: boolean;
}