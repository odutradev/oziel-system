import type { ValidationStatus } from '@components/inputWithValidation/types';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): ValidationStatus => {
  if (!email) return 'idle';
  return EMAIL_REGEX.test(email) ? 'valid' : 'invalid';
};