import type { FarmModelType } from "@utils/types/models/farm";
import type { CropModelType } from "@utils/types/models/crop";
import type { PaginationMeta } from "@utils/types/action";

export interface GetFarmsParams {
    status?: string;
    limit?: number;
    page?: number;
}

export interface CreateFarmData {
    location: {
        longitude: number;
        latitude: number;
    };
    totalAreaHectares: number;
    name: string;
}

export interface CreateCropData {
    plantedAreaHectares: number;
    expectedHarvestDate: string;
    type: string;
}

export interface GetFarmsResponse {
    data: FarmModelType[];
    meta: PaginationMeta;
}

export interface GetCropsResponse {
    data: CropModelType[];
}