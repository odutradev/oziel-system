import type { UserFormData } from '../../types';

export interface UserInfoProps {
  formData: UserFormData;
  onNameChange: (value: string) => void;
  onCpfChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}