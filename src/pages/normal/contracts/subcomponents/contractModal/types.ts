import type { ContractFormData } from "../../types";

export interface ContractModalProps {
    onChange: (field: keyof ContractFormData, value: unknown) => void;
    formData: ContractFormData;
    handleClose: () => void;
    handleSave: () => void;
    open: boolean;
}