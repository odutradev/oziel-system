import { hasAdminPosition, manageActionError } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { GetVaultsParams, CreateVaultData, UpdateVaultData, VaultTransactionData, GetVaultDetailsResponse, VaultModelType, VaultTransactionModelType } from './types';
import type { PaginationOrError, TypeOrError } from '@utils/types/action';

export const getVaults = async (params?: GetVaultsParams): PaginationOrError<VaultModelType> => {
    try {
        const response = await api.get('/vaults', { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getVaultDetails = async (id: string, params?: GetVaultsParams): TypeOrError<GetVaultDetailsResponse> => {
    try {
        const response = await api.get(`/vaults/${id}`, { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createVault = async (data: CreateVaultData): TypeOrError<VaultModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post('/vaults', data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateVault = async (id: string, data: UpdateVaultData): TypeOrError<VaultModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/vaults/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const processVaultTransaction = async (id: string, data: VaultTransactionData): TypeOrError<VaultTransactionModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post(`/vaults/${id}/transactions`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};