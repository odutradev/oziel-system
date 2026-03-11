import type { EmailTemplateModelType } from '@actions/emails/types';
import type { ValidationStatus } from '@components/inputWithValidation/types';

export type TemplateFormData = Partial<EmailTemplateModelType>;

export interface TemplateHookProps {
  formData: TemplateFormData;
  loading: boolean;
  isNew: boolean;
  isDirty: boolean;
  triggerValidationStatus: ValidationStatus;
  handleTriggerChange: (value: string) => void;
  handleSubjectChange: (value: string) => void;
  handleDescriptionChange: (value: string) => void;
  handleStatusChange: (value: boolean) => void;
  handleBodyChange: (value: string) => void;
  handleSave: () => void;
  handleDelete: () => void;
  handleCancel: () => void;
}