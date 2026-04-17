import type { DashboardMetricsResponse } from "@actions/contracts/types";

export interface ChartsProps {
    distribution: DashboardMetricsResponse["distribution"];
}