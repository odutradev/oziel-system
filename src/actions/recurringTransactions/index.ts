import { hasAdminPosition, manageActionError } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { GetRecurringParams, CreateRecurringTransactionData, UpdateRecurringTransactionData, RecurringTransactionModelType } from './types';
import type { PaginationOrError, TypeOrError } from '@utils/types/action';

export const getRecurringTransactions = async (params?: GetRecurringParams): PaginationOrError<RecurringTransactionModelType> => {
    try {
        const response = await api.get('/recurring-transactions', { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createRecurringTransaction = async (data: CreateRecurringTransactionData): TypeOrError<RecurringTransactionModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post('/recurring-transactions', data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateRecurringTransaction = async (id: string, data: UpdateRecurringTransactionData): TypeOrError<RecurringTransactionModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/recurring-transactions/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteRecurringTransaction = async (id: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/recurring-transactions/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};