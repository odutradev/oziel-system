import type { MachineOperationStatusType, MachineOperationModelType, MonthlyDashboardMetrics, CreateOperationData } from "@actions/machineOperations/types";
import type { OperatorModelType } from "@actions/operators/types";
import type { AssetModelType } from "@actions/assets/types";

export interface OperationFormData extends Omit<CreateOperationData, "operator" | "asset"> {
    operator: OperatorModelType | null;
    asset: AssetModelType | null;
    _id?: string;
}

export interface MachineOperationsHookProps {
    handleStatusChange: (id: string, status: MachineOperationStatusType) => Promise<void>;
    handleFormChange: (field: keyof OperationFormData, value: unknown) => void;
    handleOpenModal: (operation?: MachineOperationModelType) => void;
    handleChangeMonth: (direction: "prev" | "next") => void;
    handleDelete: (id: string) => Promise<void>;
    operations: MachineOperationModelType[];
    metrics: MonthlyDashboardMetrics | null;
    operators: OperatorModelType[];
    handleCloseModal: () => void;
    handleSave: () => Promise<void>;
    assets: AssetModelType[];
    formData: OperationFormData;
    selectedDate: Date;
    modalOpen: boolean;
    loading: boolean;
}