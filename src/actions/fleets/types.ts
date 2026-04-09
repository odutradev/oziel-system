import type { PaginationMeta } from "@utils/types/action";

export interface FleetModelType {
    description?: string;
    updatedAt: string;
    createdAt: string;
    active: boolean;
    name: string;
    _id: string;
}

export interface GetFleetsParams {
    limit?: number;
    page?: number;
}

export interface CreateFleetData {
    description?: string;
    active?: boolean;
    name: string;
}

export type UpdateFleetData = Partial<CreateFleetData>;

export interface GetFleetsResponse {
    data: FleetModelType[];
    meta: PaginationMeta;
}