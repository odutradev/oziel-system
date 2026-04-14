import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { CreateCropData, CreateFarmData, GetCropsResponse, GetFarmsParams, GetFarmsResponse } from "./types";
import type { FarmModelType } from "@utils/types/models/farm";
import type { CropModelType } from "@utils/types/models/crop";
import type { TypeOrError } from "@utils/types/action";

export const getFarms = async (params?: GetFarmsParams): TypeOrError<GetFarmsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/agriculture/farms", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createFarm = async (data: CreateFarmData): TypeOrError<FarmModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/agriculture/farms", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getFarmCrops = async (farmId: string): TypeOrError<GetCropsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/agriculture/farms/${farmId}/crops`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createFarmCrop = async (farmId: string, data: CreateCropData): TypeOrError<CropModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post(`/agriculture/farms/${farmId}/crops`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};