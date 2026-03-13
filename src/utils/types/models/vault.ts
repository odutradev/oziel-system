export type VaultModelType = {
    _id?: string;
    name: string;
    balance: number;
    goal?: number;
    description?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};