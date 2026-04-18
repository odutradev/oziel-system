import type { ScheduleFormData } from "../../types";

export interface ScheduleModalProps {
    onSave: (data: ScheduleFormData) => void;
    draftId: string | null;
    onClose: () => void;
    open: boolean;
}