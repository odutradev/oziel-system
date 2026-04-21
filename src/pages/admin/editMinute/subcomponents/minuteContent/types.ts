import type { EditMinuteFormData } from "../../types";

export interface MinuteContentProps {
    onChange: (field: keyof EditMinuteFormData, value: string) => void;
    formData: EditMinuteFormData;
}