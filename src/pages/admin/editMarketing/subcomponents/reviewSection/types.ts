import type { EditMarketingFormData } from "../../types";

export interface ReviewSectionProps {
    onChange: (field: keyof EditMarketingFormData, value: string) => void;
    formData: EditMarketingFormData;
    isReviewMode: boolean;
}