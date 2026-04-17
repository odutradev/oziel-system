import type { ContractFormData } from '../../types';

export interface ContractStatusProps {
  formData: ContractFormData;
  onChange: (field: keyof ContractFormData, value: string | number) => void;
}