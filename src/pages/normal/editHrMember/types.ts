export interface HrMemberFormData {
    name: string;
    cpfOrRg: string;
    email: string;
    phone: string;
    address: string;
    familyMembers: number;
}

export interface EditHrMemberHookProps {
    isNew: boolean;
    formData: HrMemberFormData;
    loading: boolean;
    canSave: boolean;
    isSaving: boolean;
    handleFieldChange: (field: keyof HrMemberFormData, value: string | number) => void;
    handleSave: () => Promise<void>;
    handleDelete: () => Promise<void>;
    handleCancel: () => void;
}