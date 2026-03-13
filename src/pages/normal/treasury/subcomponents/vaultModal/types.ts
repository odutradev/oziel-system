import type { VaultFormData } from "../../types";

export interface VaultModalProps {
    open: boolean;
    formData: VaultFormData;
    onClose: () => void;
    onSave: () => void;
    onChange: (field: keyof VaultFormData, value: string | number) => void;
}