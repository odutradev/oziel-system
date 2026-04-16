import type { PaginationMeta } from "@utils/types/action";

export type ContractType = "OTHERS" | "PNAE" | "PAA";
export type ContractStatus = "INACTIVE" | "IRREGULAR" | "REGULAR" | "ACTIVE";

export interface ContractModelType {
    deliveryForecast: string;
    totalSalePrice: number;
    status: ContractStatus;
    contractDate: string;
    totalValue: number;
    type: ContractType;
    code: string;
    _id: string;
}

export interface CreateContractData {
    deliveryForecast: string;
    totalSalePrice: number;
    contractDate: string;
    totalValue: number;
    type: ContractType;
    code: string;
}

export type UpdateContractData = Partial<CreateContractData> & { status?: ContractStatus };

export interface GetContractsParams {
    limit?: number;
    page?: number;
}

export interface GetContractsResponse {
    data: ContractModelType[];
    meta: PaginationMeta;
}