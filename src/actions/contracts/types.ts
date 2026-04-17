import type { ContractModelType, ContractType, ContractStatusType } from "@utils/types/models/contract";
import type { PaginationMeta } from "@utils/types/action";

export interface CreateContractData {
    code: string;
    type: ContractType;
    status: ContractStatusType;
    totalValue: number;
    totalSalePrice: number;
    contractDate: string | Date;
    deliveryForecast?: string | Date;
    endDate?: string | Date;
}

export interface UpdateContractData {
    code?: string;
    type?: ContractType;
    status?: ContractStatusType;
    totalValue?: number;
    totalSalePrice?: number;
    contractDate?: string | Date;
    deliveryForecast?: string | Date;
    endDate?: string | Date;
}

export interface GetContractsParams {
    limit?: number;
    page?: number;
}

export interface GetContractsResponse {
    data: ContractModelType[];
    meta: PaginationMeta;
}