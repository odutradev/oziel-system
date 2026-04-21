import type { PaginationMeta } from "@utils/types/action";

export type TicketPriority = "CRITICAL" | "MEDIUM" | "HIGH" | "LOW";
export type TicketStatus = "INTERVENTION" | "WAITING_USER" | "VALIDATION" | "ANALYSIS" | "TESTING" | "CLOSED" | "OPEN";

export interface DashboardMetricsResponse {
    byPriority: Record<string, number>;
    byStatus: Record<string, number>;
    total: number;
}

export interface TicketModelType {
    priority?: TicketPriority;
    status?: TicketStatus;
    assignedTo?: string;
    description: string;
    requester: string;
    title: string;
    _id: string;
}

export interface CreateTicketData {
    priority?: TicketPriority;
    status?: TicketStatus;
    description: string;
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