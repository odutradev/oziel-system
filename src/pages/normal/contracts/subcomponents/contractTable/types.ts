import type { ContractModelType } from "@utils/types/models/contract";
import type { PaginationMeta } from "@utils/types/action";

export interface ContractTableProps {
    meta: PaginationMeta;
    contracts: ContractModelType[];
    onEdit: (contract: ContractModelType) => void;
    onDelete: (id: string) => void;
    onPaginationChange: (pagination: { currentPage: number; rows: number }) => void;
    onCreate: () => void;
}