import { useMemo } from 'react';
import { TextField } from '@mui/material';

import InputWithValidation from '@components/inputWithValidation';
import InputWithCounter from '@components/inputWithCounter';
import { validateDocument } from '@utils/validations/documents';
import EditSection from '@components/editSection';
import { InfoContainer, Row } from './styles';

import type { UserInfoProps } from './types';

const UserInfo = ({ formData, onNameChange, onCpfChange, onDescriptionChange }: UserInfoProps) => {
  const documentStatus = useMemo(() => validateDocument(formData.cpfOrRg || ''), [formData.cpfOrRg]);
  const isNameEmpty = !(formData.name || '').trim();

  return (
    <EditSection title="Informações Pessoais">
      <InfoContainer>
        <Row>
          <TextField
            label="ID"
            value={formData._id || ''}
            disabled
            fullWidth
            size="small"
          />
          <TextField
            label="Email"
            value={formData.email || ''}
            disabled
            fullWidth
            size="small"
          />
        </Row>

        <Row>
          <TextField
            label="Nome"
            value={formData.name || ''}
            onChange={(e) => onNameChange(e.target.value)}
            error={isNameEmpty}
            helperText={isNameEmpty ? "O nome é obrigatório" : ""}
            fullWidth
            required
          />
          <InputWithValidation
            label="CPF ou CNPJ"
            value={formData.cpfOrRg || ''}
            onChange={(e) => onCpfChange(e.target.value)}
            validationStatus={documentStatus}
            successMessage="Documento válido"
            errorMessage="Documento inválido"
            fullWidth
            placeholder="Digite apenas números"
          />
        </Row>

        <InputWithCounter
          label="Descrição"
          value={formData.description || ''}
          onChange={(e) => onDescriptionChange(e.target.value)}
          maxLength={150}
          placeholder="Observações sobre o usuário"
        />
      </InfoContainer>
    </EditSection>
  );
};

export default UserInfo;