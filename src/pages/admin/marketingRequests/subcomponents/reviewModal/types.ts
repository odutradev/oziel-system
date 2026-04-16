import type { ReviewFormData } from "../../types";

export interface ReviewModalProps {
    onChange: (field: keyof ReviewFormData, value: unknown) => void;
    reviewData: ReviewFormData;
    handleClose: () => void;
    handleSave: () => void;
    open: boolean;
}