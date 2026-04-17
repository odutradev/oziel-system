import type { OperatorModelType } from "@actions/operators/types";
import type { FleetModelType } from "@actions/fleets/types";
import type { PaginationMeta } from "@utils/types/action";

export type ResourceTabType = "operators" | "fleets";

export type ResourceItemType = OperatorModelType | FleetModelType;

export interface MachineResourcesHookProps {
    meta: PaginationMeta;
    loading: boolean;
    activeTab: ResourceTabType;
    items: ResourceItemType[];
    handleCreate: () => void;
    handleEdit: (item: ResourceItemType) => void;
    handleDelete: (id: string) => Promise<void>;
    handlePaginationChange: (pagination: { currentPage: number; rows: number }) => void;
    handleTabChange: (event: React.MouseEvent<HTMLElement>, value: string | null) => void;
}