import type { ContractModelType, ContractType, ContractStatusType, ContractSituationType } from "@utils/types/models/contract";
import type { PaginationMeta } from "@utils/types/action";

export interface CreateContractData {
    code: string;
    type: ContractType;
    status: ContractStatusType;
    situation: ContractSituationType;
    totalValue: number;
    totalSalePrice: number;
    contractDate: string | Date;
    deliveryForecast?: string | Date;
    endDate?: string | Date;
    detailsMarkdown?: string;
}

export interface UpdateContractData {
    code?: string;
    type?: ContractType;
    status?: ContractStatusType;
    situation?: ContractSituationType;
    totalValue?: number;
    totalSalePrice?: number;
    contractDate?: string | Date;
    deliveryForecast?: string | Date;
    endDate?: string | Date;
    detailsMarkdown?: string;
}

export interface GetContractsParams {
    limit?: number;
    page?: number;
}

export interface GetContractsResponse {
    data: ContractModelType[];
    meta: PaginationMeta;
}

export interface GetContractsDashboardParams {
    startDate?: string;
    endDate?: string;
}

export interface DashboardMetricsResponse {
    summary: {
        totalContracts: number;
        totalValue: number;
        totalSalePrice: number;
        expectedProfit: number;
        profitMarginPercentage: number;
    };
    distribution: {
        byStatus: Array<{
            status: string;
            count: number;
            value: number;
        }>;
        bySituation: Array<{
            situation: string;
            count: number;
            value: number;
        }>;
        byType: Array<{
            type: string;
            count: number;
            value: number;
        }>;
    };
    recentContracts: ContractModelType[];
}