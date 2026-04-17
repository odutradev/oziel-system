import type { HrDashboardMetrics } from "@actions/hrMembers/types";

export interface DashboardMetricsProps {
    metrics: HrDashboardMetrics | null;
    loading: boolean;
}