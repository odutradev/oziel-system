import type { TicketFormData } from "../../types";

export interface TicketModalProps {
    onChange: (field: keyof TicketFormData, value: unknown) => void;
    formData: TicketFormData;
    handleClose: () => void;
    handleSave: () => void;
    open: boolean;
}