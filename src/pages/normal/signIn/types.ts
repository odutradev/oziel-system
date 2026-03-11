export interface SignInData {
  email: string;
  password: string;
}

export interface SignInFormProps {
  credentials: SignInData;
  showPassword: boolean;
  errorMessage: string;
  success: boolean;
  onInputChange: (field: keyof SignInData) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearEmail: () => void;
  onTogglePassword: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}