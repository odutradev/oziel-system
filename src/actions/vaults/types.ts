import type { VaultTransactionModelType } from "@utils/types/models/vaultTransaction";
import type { VaultModelType } from "@utils/types/models/vault";

export interface GetVaultsParams {
    page?: number;
    limit?: number;
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

export type UpdateVaultData = Partial<Omit<CreateVaultData, "balance">>;

export interface VaultTransactionData {
    amount: number;
    type: "DEPOSIT" | "WITHDRAWAL";
    description?: string;
}