import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { GetFleetsResponse, CreateFleetData, UpdateFleetData, GetFleetsParams, FleetModelType } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const createFleet = async (data: CreateFleetData): TypeOrError<FleetModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/maintenance/fleets", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getFleets = async (params?: GetFleetsParams): TypeOrError<GetFleetsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/maintenance/fleets", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getFleetById = async (fleetID: string): TypeOrError<FleetModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/maintenance/fleets/${fleetID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateFleet = async (fleetID: string, data: UpdateFleetData): TypeOrError<FleetModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/maintenance/fleets/${fleetID}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteFleet = async (fleetID: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/maintenance/fleets/${fleetID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};