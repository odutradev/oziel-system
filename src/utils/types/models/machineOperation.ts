export type MachineOperationStatusType = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface MachineOperationModelType {
    _id: string;
    fleet: string;
    operator: string;
    operationDate: string;
    hourlyRate: number;
    hourMeterArrival?: number;
    hourMeterDeparture?: number;
    hourMeterServiceEnd?: number;
    hourMeterServiceStart?: number;
    totalHours?: number;
    workedHours?: number;
    totalValue?: number;
    status: MachineOperationStatusType;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}