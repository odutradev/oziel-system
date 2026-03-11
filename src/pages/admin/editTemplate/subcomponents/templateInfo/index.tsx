import { Box } from '@mui/material';

import InputWithValidation from '@components/inputWithValidation';
import InputWithCounter from '@components/inputWithCounter';
import EditSection from '@components/editSection';
import ToggleGroup from '@components/toggleGroup';
import { FormContainer } from './styles';

import type { TemplateInfoProps } from './types';

const TemplateInfo = ({ formData, isNew, validationStatus, onTriggerChange, onSubjectChange, onDescriptionChange, onStatusChange }: TemplateInfoProps) => {
  const statusOptions = [
    { value: 'true', label: 'Ativo' },
    { value: 'false', label: 'Inativo' },
  ];

  return (
    <EditSection title="Informações Gerais">
      <FormContainer>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <InputWithValidation
            label="Trigger"
            value={formData.trigger}
            onChange={(e) => onTriggerChange(e.target.value)}
            validationStatus={validationStatus}
            fullWidth
            required
            disabled={!isNew}
            placeholder="EX: WELCOME_EMAIL"
            successMessage="Trigger disponível"
            errorMessage="Trigger já está em uso"
            sx={{ flex: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <ToggleGroup
              options={statusOptions}
              value={String(formData.active)}
              exclusive
              onChange={(_, value) => value && onStatusChange(value === 'true')}
            />
          </Box>
        </Box>

        <InputWithCounter
          label="Assunto"
          value={formData.subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          maxLength={100}
          required
          helperText="Suporta variáveis: {{variableName}}"
        />

        <InputWithCounter
          label="Descrição"
          value={formData.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          maxLength={150}
          placeholder="Descreva o objetivo deste template de email"
        />
      </FormContainer>
    </EditSection>
  );
};

export default TemplateInfo;