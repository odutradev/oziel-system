import type { TransactionModelType } from "@utils/types/models/transaction";
import type { CreateTransactionData } from "@actions/treasury/types";
import type { PaginationMeta } from "@utils/types/action";

export interface TransactionFormData extends CreateTransactionData {
    _id?: string;
}

export interface TreasuryHookProps {
    meta: PaginationMeta;
    loading: boolean;
    modalOpen: boolean;
    selectedDate: Date;
    currentBalance: number;
    formData: TransactionFormData;
    transactions: TransactionModelType[];
    handleSave: () => Promise<void>;
    handleCloseModal: () => void;
    handleDelete: (id: string) => Promise<void>;
    handleConfirm: (id: string) => Promise<void>;
    handleOpenModal: (transaction?: TransactionModelType) => void;
    handleChangeMonth: (direction: "prev" | "next") => void;
    handlePaginationChange: (pagination: { currentPage: number; rows: number }) => void;
    handleFormChange: (field: keyof TransactionFormData, value: string | number) => void;
}