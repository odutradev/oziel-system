import type { MonthlyClosingReportTotals } from "@actions/machineOperations/types";

export interface SummaryCardsProps {
    totals: MonthlyClosingReportTotals | undefined;
}