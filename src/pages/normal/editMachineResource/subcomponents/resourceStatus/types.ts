import type { ResourceFormData } from '../../types';

export interface ResourceStatusProps {
  formData: ResourceFormData;
  onChange: (field: keyof ResourceFormData, value: string | boolean) => void;
}