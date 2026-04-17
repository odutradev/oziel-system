import type { ContractModelType } from "@utils/types/models/contract";
import type { PaginationMeta } from "@utils/types/action";

export interface ContractsHookProps {
    meta: PaginationMeta;
    loading: boolean;
    contracts: ContractModelType[];
    handleCreate: () => void;
    handleEdit: (contract: ContractModelType) => void;
    handleDelete: (id: string) => Promise<void>;
    handlePaginationChange: (pagination: { currentPage: number; rows: number }) => void;
}