import type { MachineOperationStatusType, MachineOperationModelType } from "@actions/machineOperations/types";
import type { OperatorModelType } from "@actions/operators/types";
import type { AssetModelType } from "@actions/assets/types";

export interface OperationTableProps {
    onStatusChange: (id: string, status: MachineOperationStatusType) => void;
    onEdit: (operation: MachineOperationModelType) => void;
    operations: MachineOperationModelType[];
    operators: OperatorModelType[];
    onDelete: (id: string) => void;
    assets: AssetModelType[];
}