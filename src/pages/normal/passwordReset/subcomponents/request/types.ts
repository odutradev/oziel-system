import type { ChangeEvent, FormEvent } from 'react';

export interface RequestFormProps {
  email: string;
  errorMessage: string;
  isAuto?: boolean;
  isLoading?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}