import { useMemo } from 'react';
import { TextField } from '@mui/material';

import InputWithValidation from '@components/inputWithValidation';
import { validateDocument } from '@utils/validations/documents';
import EditSection from '@components/editSection';
import { InfoContainer, Row } from './styles';

import type { PersonalInfoProps } from './types';

const PersonalInfo = ({ formData, onChange }: PersonalInfoProps) => {
  const documentStatus = useMemo(() => validateDocument(formData.cpfOrRg || ''), [formData.cpfOrRg]);
  const isNameEmpty = !(formData.name || '').trim();

  return (
    <EditSection title="Informações Pessoais">
      <InfoContainer>
        <Row>
          <TextField
            label="Nome Completo"
            value={formData.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            error={isNameEmpty}
            helperText={isNameEmpty ? "O nome é obrigatório" : ""}
            fullWidth
            required
          />
          <InputWithValidation
            label="CPF ou RG"
            value={formData.cpfOrRg || ''}
            onChange={(e) => onChange('cpfOrRg', e.target.value)}
            validationStatus={documentStatus}
            successMessage="Documento válido"
            errorMessage="Pode ser inválido (verifique caso seja RG)"
            fullWidth
            required
          />
        </Row>
        <Row>
          <TextField
            label="Email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            fullWidth
          />
          <TextField
            label="Telefone"
            value={formData.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            fullWidth
          />
        </Row>
        <Row>
          <TextField
            label="Endereço"
            value={formData.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            fullWidth
          />
          <TextField
            label="Membros na Família"
            type="number"
            value={formData.familyMembers || ''}
            onChange={(e) => onChange('familyMembers', Number(e.target.value))}
            fullWidth
          />
        </Row>
      </InfoContainer>
    </EditSection>
  );
};

export default PersonalInfo;