import type { RequestFormData } from "../../types";

export interface RequestModalProps {
    onChange: (field: keyof RequestFormData, value: unknown) => void;
    formData: RequestFormData;
    handleClose: () => void;
    handleSave: () => void;
    open: boolean;
}