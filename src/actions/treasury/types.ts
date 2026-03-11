export interface DashboardParams {
    year: number;
    month: number;
}

export interface TransactionModelType {
    _id?: string;
    title: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    date: string;
    status: 'PENDING' | 'CONFIRMED';
    description?: string;
    category?: string;
}

export interface DashboardResponse {
    currentBalance: number;
    monthlyMetrics: Record<string, number>;
    transactions: TransactionModelType[];
}

export interface CreateTransactionData {
    title: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    date: string;
    status?: 'PENDING' | 'CONFIRMED';
    description?: string;
    category?: string;
}

export type UpdateTransactionData = Partial<CreateTransactionData>;