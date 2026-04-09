import type { MachineOperationModelType, MachineOperationStatusType } from "@utils/types/models/machineOperation";
import type { PaginationMeta } from "@utils/types/action";

export type { MachineOperationModelType, MachineOperationStatusType };

export interface GetOperationsParams {
    limit?: number;
    page?: number;
}

export interface GetMonthlyParams {
    month: number;
    year: number;
}

export interface CreateOperationData {
    hourMeterServiceStart?: number;
    hourMeterServiceEnd?: number;
    hourMeterDeparture?: number;
    hourMeterArrival?: number;
    serviceDescription: string;
    operationDate: string;
    hourlyRate: number;
    operator: string;
    fleet: string;
}

export type UpdateOperationData = Partial<CreateOperationData>;

export interface UpdateOperationStatusData {
    status: MachineOperationStatusType;
}

export interface GetOperationsResponse {
    data: MachineOperationModelType[];
    meta: PaginationMeta;
}

export interface MonthlyDashboardMetrics {
    consolidatedRevenue: number;
    totalWorkedHours: number;
    pendingRevenue: number;
    totalRevenue: number;
}

export interface GetMonthlyDashboardResponse {
    operations: MachineOperationModelType[];
    metrics: MonthlyDashboardMetrics;
}

export interface MonthlyClosingReportDetail {
    operatorName: string;
    serviceOrder: number;
    description?: string;
    hourlyRate?: number;
    hours?: number;
    total?: number;
}

export interface MonthlyClosingReportTotals {
    revenue: number;
    hours: number;
}

export interface MonthlyClosingReportOperatorTotal {
    revenue: number;
    hours: number;
    name: string;
}

export interface GetMonthlyClosingReportResponse {
    operatorTotals: MonthlyClosingReportOperatorTotal[];
    details: MonthlyClosingReportDetail[];
    totals: MonthlyClosingReportTotals;
    period: GetMonthlyParams;
}