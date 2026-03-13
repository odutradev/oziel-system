import type { TransactionModelType } from "@utils/types/models/transaction";
import type { PaginationMeta } from "@utils/types/action";

export interface TransactionTableProps {
    meta: PaginationMeta;
    transactions: TransactionModelType[];
    onEdit: (transaction: TransactionModelType) => void;
    onDelete: (id: string) => void;
    onConfirm: (id: string) => void;
    onPaginationChange: (pagination: { currentPage: number; rows: number }) => void;
}