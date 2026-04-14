import type { HrMemberFormData } from "../../types";

export interface MemberModalProps {
    open: boolean;
    formData: HrMemberFormData;
    onClose: () => void;
    onSave: () => void;
    onChange: (field: keyof HrMemberFormData, value: string | number) => void;
}