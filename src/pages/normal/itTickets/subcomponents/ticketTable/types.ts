import type { TicketModelType } from "@actions/itTickets/types";

export interface TicketTableProps {
    tickets: TicketModelType[];
    onEdit: (ticket: TicketModelType) => void;
    onDelete: (id: string) => void;
}