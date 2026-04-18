import type { MarketingStatus } from "@actions/marketingRequests/types";

export interface EditMarketingFormData {
    feedbackNotes?: string;
    plannedDate?: string;
    status: MarketingStatus;
    description: string;
    strategy: string;
    content: string;
    title: string;
}