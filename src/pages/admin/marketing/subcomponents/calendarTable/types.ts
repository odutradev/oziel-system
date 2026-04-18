import type { MarketingItemModelType } from "@actions/marketingRequests/types";

export interface CalendarTableProps {
    onSendApproval: (id: string) => void;
    onReview: (item: MarketingItemModelType) => void;
    onEdit: (item: MarketingItemModelType) => void;
    items: MarketingItemModelType[];
}