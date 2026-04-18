export interface ResourceFormData {
    description: string;
    document: string;
    active: boolean;
    name: string;
}

export interface EditMachineResourceHookProps {
    handleFieldChange: (field: keyof ResourceFormData, value: string | boolean) => void;
    handleDelete: () => Promise<void>;
    handleSave: () => Promise<void>;
    handleCancel: () => void;
    formData: ResourceFormData;
    isSaving: boolean;
    canSave: boolean;
    loading: boolean;
    isAsset: boolean;
    isNew: boolean;
}