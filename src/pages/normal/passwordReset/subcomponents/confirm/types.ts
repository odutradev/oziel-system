import type { ChangeEvent, FormEvent } from 'react';
import type { PasswordResetState } from '../../types';

export interface ConfirmFormProps {
  formData: PasswordResetState;
  showPassword: boolean;
  errorMessage: string;
  isLoading?: boolean;
  onChange: (field: keyof PasswordResetState) => (e: ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}