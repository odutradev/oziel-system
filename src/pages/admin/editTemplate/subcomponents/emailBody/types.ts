import type { TemplateFormData } from '../../types';

export interface EmailBodyProps {
  onBodyChange: (value: string) => void;
  formData: TemplateFormData;
}