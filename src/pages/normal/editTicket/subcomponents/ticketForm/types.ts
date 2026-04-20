import type { TicketFormData } from "../../types";

export interface TicketFormProps {
    onChange: (field: keyof TicketFormData, value: unknown) => void;
    onCancel: () => void;
    onSave: () => Promise<void>;
    formData: TicketFormData;
    isEditing: boolean;
    loading: boolean;
}