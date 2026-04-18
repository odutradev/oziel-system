import type { MarketingItemModelType } from "@actions/marketingRequests/types";

export interface CalendarViewProps {
    onEdit: (item: MarketingItemModelType) => void;
    onSendApproval: (id: string) => void;
    onDelete: (id: string) => void;
    items: MarketingItemModelType[];
}