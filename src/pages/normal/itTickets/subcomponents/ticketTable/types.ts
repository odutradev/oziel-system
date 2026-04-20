import type { TicketModelType } from "@actions/itTickets/types";

export interface TicketTableProps {
    tickets: TicketModelType[];
    loading: boolean;
    onCreateNew: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}