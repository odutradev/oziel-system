import type { MachineOperationModelType, MachineOperationStatusType } from "@utils/types/models/machineOperation";
import type { PaginationMeta } from "@utils/types/action";

export type { MachineOperationModelType, MachineOperationStatusType };

export interface GetOperationsParams {
    page?: number;
    limit?: number;
}

export interface CreateOperationData {
    fleet: string;
    operator: string;
    operationDate: string;
    hourlyRate: number;
    hourMeterArrival?: number;
    hourMeterDeparture?: number;
    hourMeterServiceEnd?: number;
    hourMeterServiceStart?: number;
    description?: string;
}

export type UpdateOperationData = Partial<CreateOperationData>;

export interface UpdateOperationStatusData {
    status: MachineOperationStatusType;
}

export interface GetOperationsResponse {
    data: MachineOperationModelType[];
    meta: PaginationMeta;
}