import type { ContractFormData } from '../../types';

export interface ContractDetailsProps {
  formData: ContractFormData;
  onChange: (field: keyof ContractFormData, value: string) => void;
}