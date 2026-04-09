import type { OperationFormData } from "../../types";
import type { OperatorModelType } from "@actions/operators/types";
import type { FleetModelType } from "@actions/fleets/types";

export interface OperationModalProps {
    open: boolean;
    operators: OperatorModelType[];
    formData: OperationFormData;
    fleets: FleetModelType[];
    onClose: () => void;
    onSave: () => void;
    onChange: (field: keyof OperationFormData, value: unknown) => void;
}