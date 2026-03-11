export type ActionAlignment = 'left' | 'center' | 'right';

export interface FormActionsProps {
  onSave: () => void | Promise<void>;
  onCancel: () => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  saveLabel?: string;
  cancelLabel?: string;
  deleteLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  align?: ActionAlignment;
}