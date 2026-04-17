export interface ResourceFormData {
    name: string;
    description: string;
    document: string;
    active: boolean;
}

export interface EditMachineResourceHookProps {
    isNew: boolean;
    isFleet: boolean;
    loading: boolean;
    canSave: boolean;
    isSaving: boolean;
    formData: ResourceFormData;
    handleFieldChange: (field: keyof ResourceFormData, value: string | boolean) => void;
    handleDelete: () => Promise<void>;
    handleSave: () => Promise<void>;
    handleCancel: () => void;
}