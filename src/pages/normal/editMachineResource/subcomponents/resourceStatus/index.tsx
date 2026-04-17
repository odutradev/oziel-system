import ToggleGroup from '@components/toggleGroup';
import EditSection from '@components/editSection';
import ConfigCard from '@components/configCard';
import { StatusContainer } from './styles';

import type { ResourceStatusProps } from './types';

const STATUS_OPTIONS = [
  { value: "true", label: "Ativo" },
  { value: "false", label: "Inativo" }
];

const ResourceStatus = ({ formData, onChange }: ResourceStatusProps) => {
  return (
    <EditSection title="Status do Recurso">
      <StatusContainer>
        <ConfigCard title="Situação Atual" active={formData.active}>
          <ToggleGroup
            options={STATUS_OPTIONS}
            value={String(formData.active)}
            exclusive
            onChange={(_, val) => val !== null && onChange("active", val === "true")}
            fullWidth
            sx={{ mt: 1 }}
          />
        </ConfigCard>
      </StatusContainer>
    </EditSection>
  );
};

export default ResourceStatus;