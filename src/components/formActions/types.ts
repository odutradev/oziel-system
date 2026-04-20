export type ActionAlignment = 'left' | 'center' | 'right';

export interface FormActionsProps {
  onSave: () => void | Promise<void>;
  onCancel: () => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  onExtra?: () => void | Promise<void>;
  extraDisabled?: boolean;
  deleteDisabled?: boolean;
  cancelLabel?: string;
  deleteLabel?: string;
  extraLabel?: string;
  saveLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  align?: ActionAlignment;
}