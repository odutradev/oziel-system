import type { ContractModelType, ContractType, ContractStatusType } from "@utils/types/models/contract";

export interface ContractFormData {
    _id?: string;
    code: string;
    type: ContractType | "";
    status?: ContractStatusType | "";
    contractDate: string;
    deliveryForecast: string;
    totalValue: number;
    totalSalePrice: number;
}

export interface ContractsHookProps {
    contracts: ContractModelType[];
    formData: ContractFormData;
    modalOpen: boolean;
    loading: boolean;
    handleSave: () => Promise<void>;
    handleCloseModal: () => void;
    handleDelete: (id: string) => Promise<void>;
    handleOpenModal: (contract?: ContractModelType) => void;
    handleFormChange: (field: keyof ContractFormData, value: unknown) => void;
}