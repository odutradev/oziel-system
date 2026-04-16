import type { PaginationMeta } from "@utils/types/action";

export interface AgriculturalProductModelType {
    active: boolean;
    name: string;
    unit: string;
    _id: string;
}

export interface AgriculturalProductionModelType {
    productionArea: number;
    referenceYear: number;
    harvestSeason?: string;
    plantingSeason?: string;
    producer: string;
    quantity: number;
    product: string;
    active?: boolean;
    _id: string;
}

export interface CreateProductData {
    active?: boolean;
    name: string;
}

export type UpdateProductData = Partial<CreateProductData>;

export interface CreateProductionData {
    productionArea: number;
    referenceYear: number;
    harvestSeason?: string;
    plantingSeason?: string;
    producer: string;
    quantity: number;
    product: string;
    active?: boolean;
}

export type UpdateProductionData = Partial<CreateProductionData>;

export interface GetProductsParams {
    limit?: number;
    page?: number;
}

export interface GetProductionsParams {
    limit?: number;
    page?: number;
}

export interface GetProductsResponse {
    data: AgriculturalProductModelType[];
    meta: PaginationMeta;
}

export interface GetProductionsResponse {
    data: AgriculturalProductionModelType[];
    meta: PaginationMeta;
}