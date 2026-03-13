import type { TransactionModelType } from "@utils/types/models/transaction";

export interface TransactionListProps {
    transactions: TransactionModelType[];
    onEdit: (transaction: TransactionModelType) => void;
    onDelete: (id: string) => void;
    onConfirm: (id: string) => void;
}