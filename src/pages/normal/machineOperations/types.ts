import type { MonthlyDashboardMetrics, MachineOperationModelType, CreateOperationData, MachineOperationStatusType } from "@actions/machineOperations/types";
import type { OperatorModelType } from "@actions/operators/types";
import type { FleetModelType } from "@actions/fleets/types";

export interface OperationFormData extends Omit<CreateOperationData, "operator" | "fleet"> {
    operator: OperatorModelType | null;
    fleet: FleetModelType | null;
    _id?: string;
}

export interface MachineOperationsHookProps {
    metrics: MonthlyDashboardMetrics | null;
    operations: MachineOperationModelType[];
    operators: OperatorModelType[];
    formData: OperationFormData;
    fleets: FleetModelType[];
    selectedDate: Date;
    modalOpen: boolean;
    loading: boolean;
    handleSave: () => Promise<void>;
    handleCloseModal: () => void;
    handleDelete: (id: string) => Promise<void>;
    handleChangeMonth: (direction: "prev" | "next") => void;
    handleOpenModal: (operation?: MachineOperationModelType) => void;
    handleStatusChange: (id: string, status: MachineOperationStatusType) => Promise<void>;
    handleFormChange: (field: keyof OperationFormData, value: unknown) => void;
}