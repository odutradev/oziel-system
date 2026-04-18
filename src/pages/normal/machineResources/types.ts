import type { OperatorModelType } from "@actions/operators/types";
import type { AssetModelType } from "@actions/assets/types";
import type { PaginationMeta } from "@utils/types/action";

export type ResourceTabType = "operators" | "assets";

export type ResourceItemType = OperatorModelType | AssetModelType;

export interface MachineResourcesHookProps {
    handlePaginationChange: (pagination: { currentPage: number; rows: number }) => void;
    handleTabChange: (event: React.MouseEvent<HTMLElement>, value: string | null) => void;
    handleDelete: (id: string) => Promise<void>;
    handleEdit: (item: ResourceItemType) => void;
    items: ResourceItemType[];
    activeTab: ResourceTabType;
    handleCreate: () => void;
    meta: PaginationMeta;
    loading: boolean;
}