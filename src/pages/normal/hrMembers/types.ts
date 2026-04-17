import type { HrMemberModelType, HrDashboardMetrics } from "@actions/hrMembers/types";
import type { PaginationMeta } from "@utils/types/action";

export interface HrMembersHookProps {
    meta: PaginationMeta;
    loading: boolean;
    loadingMetrics: boolean;
    metrics: HrDashboardMetrics | null;
    members: HrMemberModelType[];
    handleCreate: () => void;
    handleEdit: (member: HrMemberModelType) => void;
    handleDelete: (id: string) => Promise<void>;
    handlePaginationChange: (pagination: { currentPage: number; rows: number }) => void;
}