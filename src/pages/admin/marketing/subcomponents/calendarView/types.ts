import type { MarketingItemModelType } from "@actions/marketingRequests/types";

export interface CalendarViewProps {
    onReview: (item: MarketingItemModelType) => void;
    onEdit: (item: MarketingItemModelType) => void;
    onSendApproval: (id: string) => void;
    items: MarketingItemModelType[];
}