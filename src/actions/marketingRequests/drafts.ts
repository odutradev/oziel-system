import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { CreateDraftData, GetDraftsParams, GetDraftsResponse, MarketingItemModelType, UpdateDraftData } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const getDrafts = async (params?: GetDraftsParams): TypeOrError<GetDraftsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/marketing/drafts", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createDraft = async (data: CreateDraftData): TypeOrError<MarketingItemModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/marketing/drafts", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateDraft = async (id: string, data: UpdateDraftData): TypeOrError<MarketingItemModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/marketing/drafts/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteDraft = async (id: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/marketing/drafts/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};