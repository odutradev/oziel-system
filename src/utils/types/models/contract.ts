export const CONTRACT_TYPES = {
    OTHERS: "OTHERS",
    PNAE: "PNAE",
    PAA: "PAA"
} as const;

export const CONTRACT_STATUS = {
    IRREGULAR: "IRREGULAR",
    INACTIVE: "INACTIVE",
    REGULAR: "REGULAR",
    ACTIVE: "ACTIVE"
} as const;

export type ContractType = typeof CONTRACT_TYPES[keyof typeof CONTRACT_TYPES];
export type ContractStatusType = typeof CONTRACT_STATUS[keyof typeof CONTRACT_STATUS];

export const CONTRACT_TYPES_ARRAY = Object.values(CONTRACT_TYPES);
export const CONTRACT_STATUS_ARRAY = Object.values(CONTRACT_STATUS);

export const CONTRACT_TYPE_TRANSLATIONS: Record<ContractType, string> = {
    OTHERS: "Outros",
    PNAE: "PNAE",
    PAA: "PAA"
};

export const CONTRACT_STATUS_TRANSLATIONS: Record<ContractStatusType, string> = {
    IRREGULAR: "Irregular",
    INACTIVE: "Inativo",
    REGULAR: "Regular",
    ACTIVE: "Ativo"
};

export interface ContractModelType {
    _id?: string;
    code: string;
    type: ContractType;
    status: ContractStatusType;
    contractDate: string | Date;
    deliveryForecast?: string | Date;
    endDate?: string | Date;
    totalValue: number;
    totalSalePrice: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}