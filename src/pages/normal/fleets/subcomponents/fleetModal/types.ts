import type { FleetFormData } from "../../types";

export interface FleetModalProps {
    open: boolean;
    formData: FleetFormData;
    onClose: () => void;
    onSave: () => void;
    onChange: (field: keyof FleetFormData, value: string | boolean) => void;
}