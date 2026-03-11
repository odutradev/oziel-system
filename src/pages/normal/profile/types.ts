import type { UserModelType } from '@utils/types/models/user';

export type ProfileFormData = Pick<UserModelType, 'name' | 'email' | 'description' | 'cpfOrRg'>;

export interface ProfileHookProps {
  formData: ProfileFormData;
  user: Partial<UserModelType> | null;
  saving: boolean;
  canSave: boolean;
  uploadingImage: boolean;
  cropDialogOpen: boolean;
  selectedImageUrl: string;
  handleReset: () => void;
  handleSave: () => Promise<void>;
  handleNameChange: (value: string) => void;
  handleCpfChange: (value: string) => void;
  handleDescriptionChange: (value: string) => void;
  handleImageClick: () => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleCropConfirm: (croppedFile: File) => Promise<void>;
  handleCropCancel: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}