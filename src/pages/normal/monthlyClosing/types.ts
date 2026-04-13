import type { GetMonthlyClosingReportResponse, MonthlyClosingReportDetail, MonthlyClosingReportOperatorTotal } from "@actions/machineOperations/types";

export type DetailTableRow = MonthlyClosingReportDetail & { _id: string };
export type OperatorTableRow = MonthlyClosingReportOperatorTotal & { _id: string };

export interface MonthlyClosingData extends Omit<GetMonthlyClosingReportResponse, "details" | "operatorTotals"> {
    operatorTotals: OperatorTableRow[];
    details: DetailTableRow[];
}

export interface MonthlyClosingHookProps {
    handleChangeMonth: (direction: "prev" | "next") => void;
    data: MonthlyClosingData | null;
    handlePrint: () => void;
    selectedDate: Date;
    loading: boolean;
}