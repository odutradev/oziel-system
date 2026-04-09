import type { OperatorFormData } from "../../types";

export interface OperatorModalProps {
    open: boolean;
    formData: OperatorFormData;
    onClose: () => void;
    onSave: () => void;
    onChange: (field: keyof OperatorFormData, value: string | boolean) => void;
}