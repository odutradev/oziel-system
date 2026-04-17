import type { ChangeEvent, MouseEvent } from "react";
import type { DashboardMetricsResponse } from "@actions/contracts/types";

export interface ContractsDashboardHookProps {
    data: DashboardMetricsResponse | null;
    loading: boolean;
    period: string;
    startDate: string;
    endDate: string;
    handleDateChange: (prop: "startDate" | "endDate") => (event: ChangeEvent<HTMLInputElement>) => void;
    handlePeriodChange: (event: MouseEvent<HTMLElement>, newPeriod: string | null) => void;
}