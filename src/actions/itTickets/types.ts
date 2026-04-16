import type { PaginationMeta } from "@utils/types/action";

export type TicketPriority = "CRITICAL" | "MEDIUM" | "HIGH" | "LOW";
export type TicketStatus = "INTERVENTION" | "WAITING_USER" | "VALIDATION" | "ANALYSIS" | "TESTING" | "CLOSED" | "OPEN";

export interface TicketModelType {
    assignedTo?: string;
    priority?: TicketPriority;
    description: string;
    status?: TicketStatus;
    requester: string;
    title: string;
    _id: string;
}

export interface CreateTicketData {
    priority?: TicketPriority;
    description: string;
    status?: TicketStatus;
    title: string;
}

export type UpdateTicketData = Partial<CreateTicketData> & { resolutionNotes?: string; assignedTo?: string };

export interface GetTicketsParams {
    limit?: number;
    page?: number;
}

export interface GetTicketsResponse {
    data: TicketModelType[];
    meta: PaginationMeta;
}