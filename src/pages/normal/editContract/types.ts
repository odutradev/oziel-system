import type { ContractType, ContractStatusType } from "@utils/types/models/contract";

export interface ContractFormData {
    code: string;
    type: ContractType | "";
    status: ContractStatusType;
    contractDate: string;
    deliveryForecast: string;
    endDate: string;
    totalValue: number;
    totalSalePrice: number;
}

export interface EditContractHookProps {
    isNew: boolean;
    formData: ContractFormData;
    loading: boolean;
    canSave: boolean;
    isSaving: boolean;
    handleFieldChange: (field: keyof ContractFormData, value: string | number) => void;
    handleSave: () => Promise<void>;
    handleDelete: () => Promise<void>;
    handleCancel: () => void;
}