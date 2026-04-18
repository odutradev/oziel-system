import type { MarketingItemModelType } from "@actions/marketingRequests/types";

export interface DraftsTableProps {
    onSchedule: (id: string) => void;
    onEdit: (draft: MarketingItemModelType) => void;
    onDelete: (id: string) => void;
    drafts: MarketingItemModelType[];
    onNew: () => void;
}