import type { OperatorModelType } from "@actions/operators/types";
import type { FleetModelType } from "@actions/fleets/types";
import type { PaginationMeta } from "@utils/types/action";

export type ResourceTabType = "operators" | "fleets";

export interface ResourceFormData {
    _id?: string;
    name: string;
    description?: string;
    document?: string;
    active: boolean;
}

export type ResourceItemType = OperatorModelType | FleetModelType;

export interface ResourcesHookProps {
    meta: PaginationMeta;
    loading: boolean;
    activeTab: ResourceTabType;
    modalState: { open: boolean; data: ResourceFormData; type: ResourceTabType };
    items: ResourceItemType[];
    handleSave: () => Promise<void>;
    handleCloseModal: () => void;
    handleDelete: (id: string) => Promise<void>;
    handleOpenModal: (item?: ResourceItemType) => void;
    handleFormChange: (field: keyof ResourceFormData, value: string | boolean) => void;
    handlePaginationChange: (pagination: { currentPage: number; rows: number }) => void;
    handleTabChange: (event: React.MouseEvent<HTMLElement>, value: string | null) => void;
}