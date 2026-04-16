import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { AgriculturalProductionModelType, AgriculturalProductModelType, CreateProductionData, GetProductionsResponse, GetProductionsParams, UpdateProductionData, CreateProductData, UpdateProductData, GetProductsResponse, GetProductsParams } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const getProducts = async (params?: GetProductsParams): TypeOrError<GetProductsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/agriculture/products", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getProductById = async (id: string): TypeOrError<AgriculturalProductModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/agriculture/products/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createProduct = async (data: CreateProductData): TypeOrError<AgriculturalProductModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/agriculture/products", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateProduct = async (id: string, data: UpdateProductData): TypeOrError<AgriculturalProductModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/agriculture/products/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteProduct = async (id: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/agriculture/products/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getProductions = async (params?: GetProductionsParams): TypeOrError<GetProductionsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/agriculture/productions", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getProductionById = async (id: string): TypeOrError<AgriculturalProductionModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/agriculture/productions/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createProduction = async (data: CreateProductionData): TypeOrError<AgriculturalProductionModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/agriculture/productions", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateProduction = async (id: string, data: UpdateProductionData): TypeOrError<AgriculturalProductionModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/agriculture/productions/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteProduction = async (id: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/agriculture/productions/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};