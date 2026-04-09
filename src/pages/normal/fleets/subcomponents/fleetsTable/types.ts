import type { FleetModelType } from "@actions/fleets/types";
import type { PaginationMeta } from "@utils/types/action";

export interface FleetsTableProps {
    meta: PaginationMeta;
    fleets: FleetModelType[];
    onEdit: (fleet: FleetModelType) => void;
    onDelete: (id: string) => void;
    onPaginationChange: (pagination: { currentPage: number; rows: number }) => void;
}