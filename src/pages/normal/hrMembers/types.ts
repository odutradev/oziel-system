import type { HrMemberModelType } from "@actions/hrMembers/types";
import type { PaginationMeta } from "@utils/types/action";

export interface HrMemberFormData {
    _id?: string;
    name: string;
    cpfOrRg: string;
    email: string;
    phone: string;
    address: string;
    familyMembers: number;
}

export interface HrMembersHookProps {
    meta: PaginationMeta;
    loading: boolean;
    modalOpen: boolean;
    members: HrMemberModelType[];
    formData: HrMemberFormData;
    handleSave: () => Promise<void>;
    handleCloseModal: () => void;
    handleDelete: (id: string) => Promise<void>;
    handleOpenModal: (member?: HrMemberModelType) => void;
    handleFormChange: (field: keyof HrMemberFormData, value: string | number) => void;
    handlePaginationChange: (pagination: { currentPage: number; rows: number }) => void;
}