import type { TransactionModelType } from "@utils/types/models/transaction";

export interface DashboardCardsProps {
    transactions: TransactionModelType[];
    currentBalance: number;
}