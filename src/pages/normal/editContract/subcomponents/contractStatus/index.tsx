import { CONTRACT_STATUS_ARRAY, CONTRACT_STATUS_TRANSLATIONS } from '@utils/types/models/contract';
import ToggleGroup from '@components/toggleGroup';
import EditSection from '@components/editSection';
import ConfigCard from '@components/configCard';
import { StatusContainer } from './styles';

import type { ContractStatusProps } from './types';

const ContractStatus = ({ formData, onChange }: ContractStatusProps) => {
  const statusOptions = CONTRACT_STATUS_ARRAY.map(status => ({
    value: status,
    label: CONTRACT_STATUS_TRANSLATIONS[status]
  }));

  return (
    <EditSection title="Status do Contrato">
      <StatusContainer>
        <ConfigCard title="Situação Atual" active={formData.status === 'ACTIVE' || formData.status === 'REGULAR'}>
          <ToggleGroup
            options={statusOptions}
            value={formData.status}
            exclusive
            onChange={(_, value) => value && onChange('status', value)}
            fullWidth
            sx={{ mt: 1 }}
          />
        </ConfigCard>
      </StatusContainer>
    </EditSection>
  );
};

export default ContractStatus;