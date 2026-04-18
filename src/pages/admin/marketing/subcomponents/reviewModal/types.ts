import type { MarketingItemModelType } from "@actions/marketingRequests/types";
import type { ReviewFormData } from "../../types";

export interface ReviewModalProps {
    item?: MarketingItemModelType;
    onSave: (data: ReviewFormData) => void;
    onClose: () => void;
    open: boolean;
}