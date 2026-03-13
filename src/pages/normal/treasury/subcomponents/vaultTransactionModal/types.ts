import type { VaultTransactionFormData } from "../../types";

export interface VaultTransactionModalProps {
    open: boolean;
    formData: VaultTransactionFormData;
    onClose: () => void;
    onSave: () => void;
    onChange: (field: keyof VaultTransactionFormData, value: string | number) => void;
}