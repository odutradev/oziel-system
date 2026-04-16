import type { ContractModelType } from "@utils/types/models/contract";

export interface ContractTableProps {
    contracts: ContractModelType[];
    onEdit: (contract: ContractModelType) => void;
    onDelete: (id: string) => void;
}