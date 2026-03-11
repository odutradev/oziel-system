import { hasAdminPosition, manageActionError } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { GetLogsParams, LogsResponse, LogStatsResponse, LogActivityResponse } from './types';
import type { TypeOrError } from '@utils/types/action';

export const getUserLogs = async (params?: GetLogsParams): TypeOrError<LogsResponse> => {
    try {
        const response = await api.get("/logs/user/me", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getEntityLogs = async (entityID: string, params?: GetLogsParams): TypeOrError<LogsResponse> => {
    try {
        const response = await api.get(`/logs/entity/${entityID}`, { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getLogsByAction = async (action: string, params?: GetLogsParams): TypeOrError<LogsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/logs/action/${action}`, { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getAllLogs = async (params?: GetLogsParams): TypeOrError<LogsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/logs/admin/all", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getLogStats = async (params?: GetLogsParams): TypeOrError<LogStatsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/logs/admin/stats", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getLogActivity = async (hours: number = 24): TypeOrError<LogActivityResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/logs/admin/activity", { params: { hours } });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getErrorLogs = async (params?: GetLogsParams): TypeOrError<LogsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/logs/admin/errors", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};
