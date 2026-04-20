import type { EditMarketingFormData } from "../../types";

export interface BasicInfoProps {
    onChange: (field: keyof EditMarketingFormData, value: string) => void;
    formData: EditMarketingFormData;
}