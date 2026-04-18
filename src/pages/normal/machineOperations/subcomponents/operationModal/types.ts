import type { OperatorModelType } from "@actions/operators/types";
import type { AssetModelType } from "@actions/assets/types";
import type { OperationFormData } from "../../types";

export interface OperationModalProps {
    onChange: (field: keyof OperationFormData, value: unknown) => void;
    operators: OperatorModelType[];
    assets: AssetModelType[];
    formData: OperationFormData;
    onClose: () => void;
    onSave: () => void;
    open: boolean;
}