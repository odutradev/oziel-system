import type { RecurringTransactionModelType } from "@utils/types/models/recurringTransaction";
import type { PaginationMeta } from "@utils/types/action";

export interface RecurringTableProps {
    meta: PaginationMeta;
    transactions: RecurringTransactionModelType[];
    onEdit: (transaction: RecurringTransactionModelType) => void;
    onDelete: (id: string) => void;
    onPaginationChange: (pagination: { currentPage: number; rows: number }) => void;
}