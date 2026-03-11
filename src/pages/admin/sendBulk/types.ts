import type { EmailRecipient } from '@actions/emails/types';

export interface SendBulkFormData {
  trigger: string;
  recipients: EmailRecipient[];
  globalVariables: Record<string, string>;
}

export interface SendBulkHookProps {
  formData: SendBulkFormData;
  handleTriggerChange: (value: string) => void;
  handleAddRecipient: (email: string) => void;
  handleRemoveRecipient: (email: string) => void;
  handleImportRecipients: (list: EmailRecipient[]) => void;
  handleAddVariable: (key: string, value: string) => void;
  handleRemoveVariable: (key: string) => void;
  handleSendBulk: () => Promise<void>;
  handleSendToAll: () => Promise<void>;
  handleCancel: () => void;
  loading: boolean;
}