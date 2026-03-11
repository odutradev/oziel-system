export interface GetRecurringParams {
    page?: number;
    limit?: number;
}

export interface RecurringTransactionModelType {
    _id?: string;
    title: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'CUSTOM_DAYS';
    nextExecution: string;
    active: boolean;
    dayOfMonth?: number;
    intervalDays?: number;
    description?: string;
    category?: string;
}

export interface CreateRecurringTransactionData {
    title: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'CUSTOM_DAYS';
    nextExecution: string;
    active?: boolean;
    dayOfMonth?: number;
    intervalDays?: number;
    description?: string;
    category?: string;
}

export type UpdateRecurringTransactionData = Partial<CreateRecurringTransactionData>;