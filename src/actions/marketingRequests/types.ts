import type { PaginationMeta } from "@utils/types/action";

export type MarketingRequestStatus = "REVISION_REQUIRED" | "WAITING_APPROVAL" | "REQUESTED" | "APPROVED";

export interface MarketingRequestModelType {
    status: MarketingRequestStatus;
    description: string;
    requester: string;
    title: string;
    _id: string;
}

export interface CreateMarketingRequestData {
    description: string;
    title: string;
}

export interface UpdateMarketingRequestData {
    description?: string;
    strategy?: string;
    content?: string;
    results?: string;
    title?: string;
}

export interface ReviewMarketingRequestData {
    feedbackNotes?: string;
    approved: boolean;
}

export interface GetMarketingRequestsParams {
    limit?: number;
    page?: number;
}

export interface GetMarketingRequestsResponse {
    data: MarketingRequestModelType[];
    meta: PaginationMeta;
}