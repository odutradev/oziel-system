import type { PaginationMeta } from "@utils/types/action";

export interface AssetModelType {
    description?: string;
    updatedAt: string;
    createdAt: string;
    active: boolean;
    name: string;
    _id: string;
}

export interface GetAssetsParams {
    limit?: number;
    page?: number;
}

export interface CreateAssetData {
    description?: string;
    active?: boolean;
    name: string;
}

export type UpdateAssetData = Partial<CreateAssetData>;

export interface GetAssetsResponse {
    data: AssetModelType[];
    meta: PaginationMeta;
}