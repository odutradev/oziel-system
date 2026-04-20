import type { EditMarketingFormData } from "../../types";

export interface ContentStrategyProps {
    onChange: (field: keyof EditMarketingFormData, value: string) => void;
    formData: EditMarketingFormData;
}