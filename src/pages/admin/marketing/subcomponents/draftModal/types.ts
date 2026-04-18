import type { MarketingItemModelType } from "@actions/marketingRequests/types";
import type { DraftFormData } from "../../types";

export interface DraftModalProps {
    onSave: (data: DraftFormData) => void;
    draft?: MarketingItemModelType;
    onClose: () => void;
    open: boolean;
}