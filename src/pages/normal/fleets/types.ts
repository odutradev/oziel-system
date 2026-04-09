import type { CreateFleetData, FleetModelType } from "@actions/fleets/types";
import type { PaginationMeta } from "@utils/types/action";

export interface FleetFormData extends CreateFleetData {
    _id?: string;
}

export interface FleetsHookProps {
    meta: PaginationMeta;
    loading: boolean;
    modalOpen: boolean;
    formData: FleetFormData;
    fleets: FleetModelType[];
    handleSave: () => Promise<void>;
    handleCloseModal: () => void;
    handleDelete: (id: string) => Promise<void>;
    handleOpenModal: (fleet?: FleetModelType) => void;
    handleFormChange: (field: keyof FleetFormData, value: string | boolean) => void;
    handlePaginationChange: (pagination: { currentPage: number; rows: number }) => void;
}