export type ResetStep = 'request' | 'verify' | 'confirm';

export interface PasswordResetState {
  confirmPassword: string;
  newPassword: string;
  email: string;
  code: string;
}

export interface PasswordResetContextType {
  formData: PasswordResetState;
  step: ResetStep;
  errorMessage: string;
  showPassword: boolean;
  handleInputChange: (field: keyof PasswordResetState) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePinChange: (index: number, value: string) => void;
  handlePinKeyDown: (index: number, event: React.KeyboardEvent<HTMLInputElement>) => void;
  handlePinPaste: (event: React.ClipboardEvent) => void;
  handleTogglePasswordVisibility: () => void;
  handleRequestCode: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleVerifyCode: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleConfirmPassword: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleBack: () => void;
  pinRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}