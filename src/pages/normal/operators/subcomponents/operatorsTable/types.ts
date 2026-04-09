import type { OperatorModelType } from "@actions/operators/types";
import type { PaginationMeta } from "@utils/types/action";

export interface OperatorsTableProps {
    meta: PaginationMeta;
    operators: OperatorModelType[];
    onEdit: (operator: OperatorModelType) => void;
    onDelete: (id: string) => void;
    onPaginationChange: (pagination: { currentPage: number; rows: number }) => void;
}