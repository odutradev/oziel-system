import { hasAdminPosition, manageActionError } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { DashboardParams, DashboardResponse, CreateTransactionData, UpdateTransactionData, TransactionModelType } from './types';
import type { TypeOrError } from '@utils/types/action';

export const getTreasuryDashboard = async (params: DashboardParams): TypeOrError<DashboardResponse> => {
    try {
        const response = await api.get('/treasury/dashboard', { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createTransaction = async (data: CreateTransactionData): TypeOrError<TransactionModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post('/treasury', data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateTransaction = async (transactionID: string, data: UpdateTransactionData): TypeOrError<TransactionModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/treasury/${transactionID}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const confirmTransaction = async (transactionID: string): TypeOrError<TransactionModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/treasury/${transactionID}/confirm`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteTransaction = async (transactionID: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/treasury/${transactionID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};