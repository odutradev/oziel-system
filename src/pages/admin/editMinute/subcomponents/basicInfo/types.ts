import type { EditMinuteFormData } from "../../types";

export interface BasicInfoProps {
    onChange: (field: keyof EditMinuteFormData, value: string) => void;
    formData: EditMinuteFormData;
}