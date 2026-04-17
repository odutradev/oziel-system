import type { ResourceTabType, ResourceItemType } from "../../types";
import type { PaginationMeta } from "@utils/types/action";

export interface ResourceTableProps {
    meta: PaginationMeta;
    loading: boolean;
    items: ResourceItemType[];
    activeTab: ResourceTabType;
    onEdit: (item: ResourceItemType) => void;
    onCreate: () => void;
    onDelete: (id: string) => void;
    onPaginationChange: (pagination: { currentPage: number; rows: number }) => void;
    onTabChange: (event: React.MouseEvent<HTMLElement>, value: string | null) => void;
}