import type { DashboardMetricsResponse } from "@actions/itTickets/types";

export interface TicketDashboardProps {
    metrics: DashboardMetricsResponse | null;
    loading: boolean;
}