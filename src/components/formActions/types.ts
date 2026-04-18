export type ActionAlignment = 'left' | 'center' | 'right';

export interface FormActionsProps {
  onSave: () => void | Promise<void>;
  onCancel: () => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  deleteDisabled?: boolean;
  cancelLabel?: string;
  deleteLabel?: string;
  saveLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  align?: ActionAlignment;
}