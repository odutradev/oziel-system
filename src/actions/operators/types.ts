import type { PaginationMeta } from "@utils/types/action";

export interface OperatorModelType {
    updatedAt: string;
    createdAt: string;
    document?: string;
    active: boolean;
    name: string;
    _id: string;
}

export interface GetOperatorsParams {
    limit?: number;
    page?: number;
}

export interface CreateOperatorData {
    document?: string;
    active?: boolean;
    name: string;
}

export type UpdateOperatorData = Partial<CreateOperatorData>;

export interface GetOperatorsResponse {
    data: OperatorModelType[];
    meta: PaginationMeta;
}