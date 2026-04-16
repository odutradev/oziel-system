import { manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { GetContractsParams, GetContractsResponse, CreateContractData, UpdateContractData } from "./types";
import type { ContractModelType } from "@utils/types/models/contract";
import type { TypeOrError } from "@utils/types/action";

export const getContracts = async (params?: GetContractsParams): TypeOrError<GetContractsResponse> => {
    try {
        const response = await api.get("/contracts", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getContractById = async (id: string): TypeOrError<ContractModelType> => {
    try {
        const response = await api.get(`/contracts/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createContract = async (data: CreateContractData): TypeOrError<ContractModelType> => {
    try {
        const response = await api.post("/contracts", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateContract = async (id: string, data: UpdateContractData): TypeOrError<ContractModelType> => {
    try {
        const response = await api.patch(`/contracts/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteContract = async (id: string): TypeOrError<void> => {
    try {
        const response = await api.delete(`/contracts/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};