import type { TransactionModelType } from "@utils/types/models/transaction";
import type { PaginationMeta } from "@utils/types/action";

export interface DashboardParams {
    year: number;
    month: number;
    page?: number;
    limit?: number;
}

export interface DashboardResponse {
    currentBalance: number;
    monthlyMetrics: Record<string, number>;
    transactions: TransactionModelType[];
    meta?: PaginationMeta;
}

export interface CreateTransactionData {
    title: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    date: string;
    status?: "PENDING" | "CONFIRMED";
    description?: string;
    category?: string;
}

export type UpdateTransactionData = Partial<CreateTransactionData>;