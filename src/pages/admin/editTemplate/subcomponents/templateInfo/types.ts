import type { TemplateFormData } from '../../types';
import type { ValidationStatus } from '@components/inputWithValidation/types';

export interface TemplateInfoProps {
  formData: TemplateFormData;
  isNew: boolean;
  validationStatus: ValidationStatus;
  onTriggerChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onStatusChange: (value: boolean) => void;
}