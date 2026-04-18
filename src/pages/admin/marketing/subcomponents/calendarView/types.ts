import type { MarketingItemModelType } from "@actions/marketingRequests/types";

export interface CalendarViewProps {
    onReview: (item: MarketingItemModelType) => void;
    onEdit: (item: MarketingItemModelType) => void;
    onDelete: (id: string) => void;
    onSendApproval: (id: string) => void;
    items: MarketingItemModelType[];
}