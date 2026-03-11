import type { ChangeEvent, FormEvent } from 'react';
import type { SignUpData } from '../../types';

export interface SignUpFormProps {
  credentials: SignUpData;
  confirmPassword: string;
  showPassword: boolean;
  errorMessage: string;
  success: boolean;
  onInputChange: (field: keyof SignUpData) => (event: ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearField: (field: keyof SignUpData) => () => void;
  onTogglePassword: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}