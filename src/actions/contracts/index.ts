import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { ContractModelType, CreateContractData, GetContractsParams, GetContractsResponse, UpdateContractData } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const getContracts = async (params?: GetContractsParams): TypeOrError<GetContractsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/contracts", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getContractById = async (id: string): TypeOrError<ContractModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/contracts/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createContract = async (data: CreateContractData): TypeOrError<ContractModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/contracts", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateContract = async (id: string, data: UpdateContractData): TypeOrError<ContractModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/contracts/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteContract = async (id: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/contracts/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};