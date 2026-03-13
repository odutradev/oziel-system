import type { TransactionType } from "./transaction";

export const RECURRING_FREQUENCIES = {
    CUSTOM_DAYS: "CUSTOM_DAYS",
    MONTHLY: "MONTHLY",
    WEEKLY: "WEEKLY",
    YEARLY: "YEARLY",
    DAILY: "DAILY"
} as const;

export type RecurringFrequencyType = typeof RECURRING_FREQUENCIES[keyof typeof RECURRING_FREQUENCIES];

export const RECURRING_FREQUENCIES_ARRAY = Object.values(RECURRING_FREQUENCIES);

export type RecurringTransactionModelType = {
    _id?: string;
    title: string;
    amount: number;
    type: TransactionType;
    frequency: RecurringFrequencyType;
    dayOfMonth?: number;
    intervalDays?: number;
    nextExecution: Date | string;
    active: boolean;
    description?: string;
    category?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};