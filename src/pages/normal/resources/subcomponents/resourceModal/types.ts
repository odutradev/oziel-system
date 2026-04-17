import type { ResourceFormData, ResourceTabType } from "../../types";

export interface ResourceModalProps {
    state: { open: boolean; data: ResourceFormData; type: ResourceTabType };
    onClose: () => void;
    onSave: () => void;
    onChange: (field: keyof ResourceFormData, value: string | boolean) => void;
}