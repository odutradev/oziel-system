import type { MachineOperationStatusType, MachineOperationModelType } from "@actions/machineOperations/types";
import type { OperatorModelType } from "@actions/operators/types";
import type { FleetModelType } from "@actions/fleets/types";

export interface OperationTableProps {
    operations: MachineOperationModelType[];
    operators: OperatorModelType[];
    fleets: FleetModelType[];
    onEdit: (operation: MachineOperationModelType) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: MachineOperationStatusType) => void;
}