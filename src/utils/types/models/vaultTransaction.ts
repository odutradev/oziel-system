export const VAULT_TRANSACTION_TYPES = {
    WITHDRAWAL: "WITHDRAWAL",
    DEPOSIT: "DEPOSIT"
} as const;

export type VaultTransactionType = typeof VAULT_TRANSACTION_TYPES[keyof typeof VAULT_TRANSACTION_TYPES];

export const VAULT_TRANSACTION_TYPES_ARRAY = Object.values(VAULT_TRANSACTION_TYPES);

export type VaultTransactionModelType = {
    _id?: string;
    vaultID: string;
    amount: number;
    type: VaultTransactionType;
    description?: string;
    date: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};