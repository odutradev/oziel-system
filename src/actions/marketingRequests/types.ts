import type { PaginationMeta } from "@utils/types/action";

export type MarketingStatus = "REVISION_REQUIRED" | "WAITING_APPROVAL" | "COMPLETED" | "PLANNED" | "APPROVED" | "DRAFT";

export interface MarketingUserRef {
    email: string;
    name: string;
    _id: string;
}

export interface MarketingItemModelType {
    approvedBy?: MarketingUserRef;
    requester: MarketingUserRef;
    plannedDate?: string | Date;
    feedbackNotes?: string;
    description: string;
    status: MarketingStatus;
    content?: string;
    results?: string;
    strategy?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    title: string;
    _id: string;
}

export interface CreateDraftData {
    description: string;
    title: string;
}

export interface UpdateDraftData {
    description?: string;
    strategy?: string;
    content?: string;
    title?: string;
}

export interface GetDraftsParams {
    limit?: number;
    page?: number;
}

export interface GetDraftsResponse {
    data: MarketingItemModelType[];
    meta: PaginationMeta;
}

export interface ScheduleDraftData {
    plannedDate: string | Date;
}

export interface GetCalendarParams {
    startDate?: string | Date;
    endDate?: string | Date;
}

export interface GetCalendarResponse {
    data: MarketingItemModelType[];
}

export interface UpdateCalendarItemData {
    plannedDate?: string | Date;
    content?: string;
}

export interface ReviewCalendarItemData {
    feedbackNotes?: string;
    approved: boolean;
}