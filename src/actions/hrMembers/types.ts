import type { PaginationMeta } from "@utils/types/action";

export interface HrControl {
    phone?: string;
    address?: string;
    familyMembers?: number;
}

export interface HrMemberModelType {
    _id: string;
    name: string;
    cpfOrRg: string;
    email?: string;
    createdAt: string;
    updatedAt: string;
    hrControl?: HrControl;
}

export interface HrDashboardMetrics {
    totalMembers: number;
    totalFamilyMembers: number;
    newThisMonth: number;
    statusDistribution: Record<string, number>;
}

export interface GetHrMembersParams {
    page?: number;
    limit?: number;
}

export interface CreateHrMemberData {
    name: string;
    cpfOrRg: string;
    email?: string;
    hrControl?: HrControl;
}

export type UpdateHrMemberData = Partial<CreateHrMemberData>;

export interface GetHrMembersResponse {
    data: HrMemberModelType[];
    meta: PaginationMeta;
}