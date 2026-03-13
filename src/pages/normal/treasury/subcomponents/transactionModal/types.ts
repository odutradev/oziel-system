import type { TransactionFormData } from "../../types";

export interface TransactionModalProps {
    open: boolean;
    formData: TransactionFormData;
    onClose: () => void;
    onSave: () => void;
    onChange: (field: keyof TransactionFormData, value: string | number) => void;
}