import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { CreateMarketingRequestData, GetMarketingRequestsParams, GetMarketingRequestsResponse, MarketingRequestModelType, ReviewMarketingRequestData, UpdateMarketingRequestData } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const getMarketingRequests = async (params?: GetMarketingRequestsParams): TypeOrError<GetMarketingRequestsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/marketing/requests", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getMarketingRequestById = async (id: string): TypeOrError<MarketingRequestModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/marketing/requests/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createMarketingRequest = async (data: CreateMarketingRequestData): TypeOrError<MarketingRequestModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/marketing/requests", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateMarketingRequest = async (id: string, data: UpdateMarketingRequestData): TypeOrError<MarketingRequestModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/marketing/requests/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const sendMarketingRequestForApproval = async (id: string): TypeOrError<MarketingRequestModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post(`/marketing/requests/${id}/send-approval`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const reviewMarketingRequest = async (id: string, data: ReviewMarketingRequestData): TypeOrError<MarketingRequestModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post(`/marketing/requests/${id}/review`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};