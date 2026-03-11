import type { UserFormData } from '../../types';

export interface ProfileHeaderProps {
  user: UserFormData;
  uploading: boolean;
  cropOpen: boolean;
  imageUrl: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImageClick: () => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCropConfirm: (file: File) => void;
  onCropCancel: () => void;
}