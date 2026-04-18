import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { GetCalendarParams, GetCalendarResponse, MarketingItemModelType, ReviewCalendarItemData, ScheduleDraftData, UpdateCalendarItemData } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const getCalendarItems = async (params?: GetCalendarParams): TypeOrError<GetCalendarResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/marketing/calendar", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const scheduleDraft = async (id: string, data: ScheduleDraftData): TypeOrError<MarketingItemModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post(`/marketing/calendar/${id}/schedule`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateCalendarItem = async (id: string, data: UpdateCalendarItemData): TypeOrError<MarketingItemModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/marketing/calendar/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const sendForApproval = async (id: string): TypeOrError<MarketingItemModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post(`/marketing/calendar/${id}/send-approval`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const reviewCalendarItem = async (id: string, data: ReviewCalendarItemData): TypeOrError<MarketingItemModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post(`/marketing/calendar/${id}/review`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteCalendarItem = async (id: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/marketing/calendar/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};