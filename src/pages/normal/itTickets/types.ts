import type { TicketModelType, TicketPriority, TicketStatus } from "@actions/itTickets/types";

export const TICKET_PRIORITIES = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];
export const TICKET_STATUSES = ["OPEN", "ANALYSIS", "INTERVENTION", "WAITING_USER", "TESTING", "VALIDATION", "CLOSED"];

export interface TicketFormData {
    priority: TicketPriority | "";
    status: TicketStatus | "";
    resolutionNotes?: string;
    assignedTo?: string;
    description: string;
    title: string;
    _id?: string;
}

export interface TicketsHookProps {
    handleFormChange: (field: keyof TicketFormData, value: unknown) => void;
    handleOpenModal: (ticket?: TicketModelType) => void;
    handleDelete: (id: string) => Promise<void>;
    tickets: TicketModelType[];
    formData: TicketFormData;
    handleCloseModal: () => void;
    handleSave: () => Promise<void>;
    modalOpen: boolean;
    loading: boolean;
}