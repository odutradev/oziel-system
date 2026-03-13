import type { RecurringTransactionModelType } from "@utils/types/models/recurringTransaction";
import type { CreateRecurringTransactionData } from "@actions/recurringTransactions/types";
import type { PaginationMeta } from "@utils/types/action";

export interface RecurringFormData extends CreateRecurringTransactionData {
    _id?: string;
}

export interface RecurringHookProps {
    meta: PaginationMeta;
    loading: boolean;
    modalOpen: boolean;
    formData: RecurringFormData;
    transactions: RecurringTransactionModelType[];
    handleSave: () => Promise<void>;
    handleCloseModal: () => void;
    handleDelete: (id: string) => Promise<void>;
    handleOpenModal: (transaction?: RecurringTransactionModelType) => void;
    handlePaginationChange: (pagination: { currentPage: number; rows: number }) => void;
    handleFormChange: (field: keyof RecurringFormData, value: string | number | boolean) => void;
}