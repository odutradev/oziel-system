import type { UserFormData } from '../../types';

export interface AccountSettingsProps {
  formData: UserFormData;
  onStatusChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}