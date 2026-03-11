import type { FormEvent, MutableRefObject, ClipboardEvent, KeyboardEvent } from 'react';

export interface VerifyFormProps {
  code: string;
  errorMessage: string;
  pinRefs: MutableRefObject<(HTMLInputElement | null)[]>;
  isLoading?: boolean;
  onPinChange: (index: number, value: string) => void;
  onPinKeyDown: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
  onPinPaste: (event: ClipboardEvent) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}