import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { GetAssetsResponse, CreateAssetData, UpdateAssetData, GetAssetsParams, AssetModelType } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const createAsset = async (data: CreateAssetData): TypeOrError<AssetModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/maintenance/assets", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getAssets = async (params?: GetAssetsParams): TypeOrError<GetAssetsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/maintenance/assets", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getAssetById = async (assetID: string): TypeOrError<AssetModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/maintenance/assets/${assetID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateAsset = async (assetID: string, data: UpdateAssetData): TypeOrError<AssetModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/maintenance/assets/${assetID}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteAsset = async (assetID: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/maintenance/assets/${assetID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};