import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api.ts";

import type { CreateOperationData, GetOperationsParams, GetOperationsResponse, UpdateOperationData, UpdateOperationStatusData } from "./types";
import type { MachineOperationModelType } from "@utils/types/models/machineOperation";
import type { TypeOrError } from "@utils/types/action";

export const createMachineOperation = async (data: CreateOperationData): TypeOrError<MachineOperationModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/maintenance/machine-operations", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getMachineOperations = async (params?: GetOperationsParams): TypeOrError<GetOperationsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/maintenance/machine-operations", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getMachineOperationById = async (operationID: string): TypeOrError<MachineOperationModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/maintenance/machine-operations/${operationID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateMachineOperation = async (operationID: string, data: UpdateOperationData): TypeOrError<MachineOperationModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/maintenance/machine-operations/${operationID}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteMachineOperation = async (operationID: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/maintenance/machine-operations/${operationID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateMachineOperationStatus = async (operationID: string, data: UpdateOperationStatusData): TypeOrError<MachineOperationModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/maintenance/machine-operations/${operationID}/status`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};