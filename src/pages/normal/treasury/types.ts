import type { CreateTransactionData } from "@actions/treasury/types";
import type { TransactionModelType } from "@utils/types/models/transaction";
import type { VaultModelType } from "@utils/types/models/vault";
import type { PaginationMeta } from "@utils/types/action";

export type TreasuryViewType = "TRANSACTIONS" | "VAULTS";

export interface TransactionFormData extends CreateTransactionData {
    _id?: string;
}

export interface VaultFormData {
    _id?: string;
    name: string;
    goal?: number;
    description?: string;
}

export interface VaultTransactionFormData {
    vaultId: string;
    amount: number;
    type: "DEPOSIT" | "WITHDRAWAL";
    description?: string;
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

export interface VaultsHookProps {
    meta: PaginationMeta;
    loading: boolean;
    vaultModalOpen: boolean;
    transactionModalOpen: boolean;
    vaultFormData: VaultFormData;
    transactionFormData: VaultTransactionFormData;
    vaults: VaultModelType[];
    handleSaveVault: () => Promise<void>;
    handleSaveTransaction: () => Promise<void>;
    handleCloseVaultModal: () => void;
    handleCloseTransactionModal: () => void;
    handleOpenVaultModal: (vault?: VaultModelType) => void;
    handleOpenTransactionModal: (vaultId: string, type: "DEPOSIT" | "WITHDRAWAL") => void;
    handleVaultFormChange: (field: keyof VaultFormData, value: string | number) => void;
    handleTransactionFormChange: (field: keyof VaultTransactionFormData, value: string | number) => void;
    handlePaginationChange: (pagination: { currentPage: number; rows: number }) => void;
}