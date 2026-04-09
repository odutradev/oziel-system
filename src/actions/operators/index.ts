import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { GetOperatorsResponse, CreateOperatorData, UpdateOperatorData, OperatorModelType, GetOperatorsParams } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const createOperator = async (data: CreateOperatorData): TypeOrError<OperatorModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/maintenance/operators", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getOperators = async (params?: GetOperatorsParams): TypeOrError<GetOperatorsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/maintenance/operators", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getOperatorById = async (operatorID: string): TypeOrError<OperatorModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/maintenance/operators/${operatorID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateOperator = async (operatorID: string, data: UpdateOperatorData): TypeOrError<OperatorModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/maintenance/operators/${operatorID}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteOperator = async (operatorID: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/maintenance/operators/${operatorID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};