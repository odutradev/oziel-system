import type { VaultModelType } from "@utils/types/models/vault";

export interface VaultsListProps {
    vaults: VaultModelType[];
    onEdit: (vault: VaultModelType) => void;
    onDeposit: (id: string) => void;
    onWithdraw: (id: string) => void;
}