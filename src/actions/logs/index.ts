import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api.ts";

import type { GetLogsParams, LogActivityResponse, LogStatsResponse, LogsResponse } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const getUserLogs = async (params?: GetLogsParams): TypeOrError<LogsResponse> => {
    try {
        const response = await api.get("/system/logs/users/me/activity", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getEntityLogs = async (entityID: string, params?: GetLogsParams): TypeOrError<LogsResponse> => {
    try {
        const response = await api.get(`/system/logs/entities/${entityID}/history`, { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getLogsByAction = async (action: string, params?: GetLogsParams): TypeOrError<LogsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/system/logs/actions/${action}/records`, { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getAllLogs = async (params?: GetLogsParams): TypeOrError<LogsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/system/logs/system/all-records", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getLogStats = async (params?: GetLogsParams): TypeOrError<LogStatsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/system/logs/system/statistics", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getLogActivity = async (hours: number = 24): TypeOrError<LogActivityResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/system/logs/system/activity-overview", { params: { hours } });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getErrorLogs = async (params?: GetLogsParams): TypeOrError<LogsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/system/logs/system/error-reports", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};