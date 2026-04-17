import type { DashboardMetricsResponse } from "@actions/contracts/types";

export interface SummaryCardsProps {
    summary: DashboardMetricsResponse["summary"];
}