import type { ProfileFormData } from '../../types';

export interface PersonalDataProps {
  formData: ProfileFormData;
  onNameChange: (val: string) => void;
  onCpfChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
}