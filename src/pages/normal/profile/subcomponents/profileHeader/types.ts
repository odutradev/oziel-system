import type { UserModelType } from '@utils/types/models/user';

export interface ProfileHeaderProps {
  user: Partial<UserModelType> | null;
  uploading: boolean;
  cropOpen: boolean;
  imageUrl: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImageClick: () => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCropConfirm: (file: File) => void;
  onCropCancel: () => void;
}