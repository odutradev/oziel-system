import type { RecurringFormData } from "../../types";

export interface RecurringModalProps {
    open: boolean;
    formData: RecurringFormData;
    onClose: () => void;
    onSave: () => void;
    onChange: (field: keyof RecurringFormData, value: string | number | boolean) => void;
}