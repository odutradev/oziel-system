import type { ResourceFormData } from '../../types';

export interface ResourceInfoProps {
  formData: ResourceFormData;
  isFleet: boolean;
  onChange: (field: keyof ResourceFormData, value: string | boolean) => void;
}