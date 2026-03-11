import type { UserFormData } from '../../types';

export interface AccountSettingsProps {
  formData: UserFormData;
  onCoinsChange: (value: number) => void;
  onStatusChange: (value: string) => void;
}