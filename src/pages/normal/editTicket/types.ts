import type { TicketPriority, TicketStatus } from "@actions/itTickets/types";

export interface TicketFormData {
    priority: TicketPriority;
    status: TicketStatus;
    resolutionNotes: string;
    description: string;
    title: string;
}

export interface EditTicketHookProps {
    handleFormChange: (field: keyof TicketFormData, value: unknown) => void;
    handleCancel: () => void;
    handleSave: () => Promise<void>;
    formData: TicketFormData;
    isEditing: boolean;
    loading: boolean;
}