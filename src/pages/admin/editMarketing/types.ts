import type { MarketingStatus } from "@actions/marketingRequests/types";

export interface EditMarketingFormData {
    description: string;
    plannedDate?: string;
    strategy: string;
    status: MarketingStatus;
    content: string;
    title: string;
}