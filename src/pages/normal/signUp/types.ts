import type { ChangeEvent, FormEvent } from 'react';

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignUpContextType {
  credentials: SignUpData;
  confirmPassword: string;
  showPassword: boolean;
  errorMessage: string;
  success: boolean;
  handleInputChange: (field: keyof SignUpData) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClearField: (field: keyof SignUpData) => () => void;
  handleTogglePasswordVisibility: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}