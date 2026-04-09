import type { MonthlyDashboardMetrics } from "@actions/machineOperations/types";

export interface DashboardCardsProps {
    metrics: MonthlyDashboardMetrics | null;
}