import type { HrMemberFormData } from '../../types';

export interface PersonalInfoProps {
  formData: HrMemberFormData;
  onChange: (field: keyof HrMemberFormData, value: string | number) => void;
}