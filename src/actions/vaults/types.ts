export interface GetVaultsParams {
    page?: number;
    limit?: number;
}

export interface VaultModelType {
    _id?: string;
    name: string;
    balance: number;
    goal?: number;
    description?: string;
}

export interface VaultTransactionModelType {
    _id?: string;
    amount: number;
    type: 'DEPOSIT' | 'WITHDRAWAL';
    description?: string;
    createdAt?: string;
}

export interface GetVaultDetailsResponse {
    vault: VaultModelType;
    transactions: VaultTransactionModelType[];
    meta: {
        total: number;
        page: number;
        pages: number;
        limit: number;
    };
}

export interface CreateVaultData {
    name: string;
    goal?: number;
    description?: string;
}

export type UpdateVaultData = Partial<Omit<CreateVaultData, 'balance'>>;

export interface VaultTransactionData {
    amount: number;
    type: 'DEPOSIT' | 'WITHDRAWAL';
    description?: string;
}