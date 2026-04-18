import type { EditMarketingFormData } from "../../types";

export interface MarketingFormProps {
    onChange: (field: keyof EditMarketingFormData, value: string) => void;
    formData: EditMarketingFormData;
    isEditing: boolean;
}