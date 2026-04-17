import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api.ts";

import type { CreateHrMemberData, GetHrMembersParams, GetHrMembersResponse, HrMemberModelType, UpdateHrMemberData, HrDashboardMetrics } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const createHrMember = async (data: CreateHrMemberData): TypeOrError<HrMemberModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/hr/members", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getHrMembers = async (params?: GetHrMembersParams): TypeOrError<GetHrMembersResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/hr/members", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getHrMemberById = async (id: string): TypeOrError<HrMemberModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/hr/members/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateHrMember = async (id: string, data: UpdateHrMemberData): TypeOrError<HrMemberModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/hr/members/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteHrMember = async (id: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/hr/members/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getHrDashboardMetrics = async (): TypeOrError<HrDashboardMetrics> => {
    try {
        hasAdminPosition();
        const response = await api.get("/hr/members/dashboard");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};