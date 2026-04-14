import type { HrMemberModelType } from "@actions/hrMembers/types";
import type { PaginationMeta } from "@utils/types/action";

export interface MembersTableProps {
    meta: PaginationMeta;
    members: HrMemberModelType[];
    onEdit: (member: HrMemberModelType) => void;
    onDelete: (id: string) => void;
    onPaginationChange: (pagination: { currentPage: number; rows: number }) => void;
}