import type { UserModelType } from '@utils/types/models/user';

export type UserFormData = Partial<UserModelType>;

export interface UserHookProps {
  formData: UserFormData;
  loading: boolean;
  canSave: boolean;
  isSaving: boolean;
  uploadingImage: boolean;
  cropDialogOpen: boolean;
  selectedImageUrl: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleNameChange: (value: string) => void;
  handleCpfChange: (value: string) => void;
  handleDescriptionChange: (value: string) => void;
  handleStatusChange: (value: string) => void;
  handleRoleChange: (value: string) => void;
  handleSave: () => Promise<void>;
  handleDelete: () => Promise<void>;
  handleCancel: () => void;
  handleImageClick: () => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCropConfirm: (file: File) => Promise<void>;
  handleCropCancel: () => void;
}