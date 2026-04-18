import type { ResourceFormData } from '../../types';

export interface ResourceInfoProps {
  onChange: (field: keyof ResourceFormData, value: string | boolean) => void;
  formData: ResourceFormData;
  isAsset: boolean;
}