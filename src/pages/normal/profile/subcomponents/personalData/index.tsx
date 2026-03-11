import { useMemo } from 'react';
import { TextField } from '@mui/material';

import InputWithValidation from '@components/inputWithValidation';
import InputWithCounter from '@components/inputWithCounter';
import EditSection from '@components/editSection';
import { validateDocument } from '@utils/validations/documents';
import { DataContainer, Row } from './styles';

import type { PersonalDataProps } from './types';

const PersonalData = ({ formData, onNameChange, onCpfChange, onDescriptionChange }: PersonalDataProps) => {
  const documentStatus = useMemo(() => validateDocument(formData.cpfOrRg || ''), [formData.cpfOrRg]);
  const isNameEmpty = !(formData.name || '').trim();

  return (
    <EditSection title="Dados Pessoais">
      <DataContainer>
        <Row>
          <TextField
            label="Nome Completo"
            value={formData.name || ''}
            onChange={(e) => onNameChange(e.target.value)}
            error={isNameEmpty}
            helperText={isNameEmpty ? "Nome é obrigatório" : undefined}
            required
            fullWidth
          />
          <TextField
            label="Email"
            value={formData.email || ''}
            disabled
            required
            fullWidth
          />
        </Row>

        <Row>
          <InputWithValidation
            label="CPF ou RG"
            value={formData.cpfOrRg || ''}
            onChange={(e) => onCpfChange(e.target.value)}
            validationStatus={documentStatus}
            successMessage="Documento válido"
            errorMessage="Documento inválido"
            fullWidth
          />
        </Row>

        <InputWithCounter
          label="Descrição"
          value={formData.description || ''}
          onChange={(e) => onDescriptionChange(e.target.value)}
          maxLength={150}
          placeholder="Observações sobre o usuário"
        />
      </DataContainer>
    </EditSection>
  );
};

export default PersonalData;