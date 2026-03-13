import type { DashboardResponse, CreateTransactionData } from "@actions/treasury/types";
import type { TransactionModelType } from "@utils/types/models/transaction";

export interface TransactionFormData extends CreateTransactionData {
    _id?: string;
}

export interface TreasuryHookProps {
    data: DashboardResponse | null;
    loading: boolean;
    modalOpen: boolean;
    selectedDate: Date;
    formData: TransactionFormData;
    handleSave: () => Promise<void>;
    handleCloseModal: () => void;
    handleDelete: (id: string) => Promise<void>;
    handleConfirm: (id: string) => Promise<void>;
    handleOpenModal: (transaction?: TransactionModelType) => void;
    handleChangeMonth: (direction: "prev" | "next") => void;
    handleFormChange: (field: keyof TransactionFormData, value: string | number) => void;
}