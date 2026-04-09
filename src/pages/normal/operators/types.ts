import type { CreateOperatorData, OperatorModelType } from "@actions/operators/types";
import type { PaginationMeta } from "@utils/types/action";

export interface OperatorFormData extends CreateOperatorData {
    _id?: string;
}

export interface OperatorsHookProps {
    meta: PaginationMeta;
    loading: boolean;
    modalOpen: boolean;
    formData: OperatorFormData;
    operators: OperatorModelType[];
    handleSave: () => Promise<void>;
    handleCloseModal: () => void;
    handleDelete: (id: string) => Promise<void>;
    handleOpenModal: (operator?: OperatorModelType) => void;
    handleFormChange: (field: keyof OperatorFormData, value: string | boolean) => void;
    handlePaginationChange: (pagination: { currentPage: number; rows: number }) => void;
}