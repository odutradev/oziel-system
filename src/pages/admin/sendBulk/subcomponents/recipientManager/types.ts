import type { EmailRecipient } from '@actions/emails/types';

export interface RecipientManagerProps {
  recipients: EmailRecipient[];
  onAddRecipient: (email: string) => void;
  onRemoveRecipient: (email: string) => void;
  onImportRecipients: (list: EmailRecipient[]) => void;
}