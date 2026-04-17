import type { ContractFormData } from '../../types';

export interface ContractInfoProps {
  formData: ContractFormData;
  onChange: (field: keyof ContractFormData, value: string | number) => void;
}