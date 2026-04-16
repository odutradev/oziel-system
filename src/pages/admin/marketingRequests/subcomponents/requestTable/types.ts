import type { MarketingRequestModelType } from "@actions/marketingRequests/types";

export interface RequestTableProps {
    onReview: (request: MarketingRequestModelType) => void;
    onEdit: (request: MarketingRequestModelType) => void;
    requests: MarketingRequestModelType[];
    onSendApproval: (id: string) => void;
}