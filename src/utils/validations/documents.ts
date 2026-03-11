export const cleanDigits = (value: string): string => value.replace(/\D/g, '');

export const isValidCPF = (cpf: string): boolean => {
  const clean = cleanDigits(cpf);
  if (clean.length !== 11 || /^(\d)\1+$/.test(clean)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) sum = sum + parseInt(clean.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(clean.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum = sum + parseInt(clean.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(clean.substring(10, 11))) return false;

  return true;
};

export const isValidCNPJ = (cnpj: string): boolean => {
  const clean = cleanDigits(cnpj);
  if (clean.length !== 14 || /^(\d)\1+$/.test(clean)) return false;

  let size = clean.length - 2;
  let numbers = clean.substring(0, size);
  const digits = clean.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(0))) return false;

  size = size + 1;
  numbers = clean.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

export const validateDocument = (value: string): 'idle' | 'valid' | 'invalid' => {
  const clean = cleanDigits(value);
  if (!clean) return 'idle';
  
  if (clean.length === 11) return isValidCPF(clean) ? 'valid' : 'invalid';
  if (clean.length === 14) return isValidCNPJ(clean) ? 'valid' : 'invalid';
  
  return 'idle';
};