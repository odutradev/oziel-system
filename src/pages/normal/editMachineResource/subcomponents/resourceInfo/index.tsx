import { TextField } from '@mui/material';

import InputWithCounter from '@components/inputWithCounter';
import EditSection from '@components/editSection';
import { InfoContainer, Row } from './styles';

import type { ResourceInfoProps } from './types';

const ResourceInfo = ({ formData, isAsset, onChange }: ResourceInfoProps) => {
  const isNameEmpty = !(formData.name || '').trim();

  return (
    <EditSection title={isAsset ? "Informações do Ativo" : "Informações do Operador"}>
      <InfoContainer>
        <Row>
          <InputWithCounter
            onChange={(e) => onChange('name', e.target.value)}
            label={isAsset ? "Nome do Ativo" : "Nome do Operador"}
            helperText={isNameEmpty ? "O nome é obrigatório" : ""}
            value={formData.name || ''}
            error={isNameEmpty}
            maxLength={100}
            fullWidth
            required
          />
        </Row>
        <Row>
          {isAsset ? (
            <TextField
              onChange={(e) => onChange('description', e.target.value)}
              value={formData.description || ''}
              label="Descrição"
              fullWidth
              multiline
              rows={3}
            />
          ) : (
            <TextField
              onChange={(e) => onChange('document', e.target.value)}
              value={formData.document || ''}
              label="Documento (CPF/CNPJ)"
              fullWidth
            />
          )}
        </Row>
      </InfoContainer>
    </EditSection>
  );
};

export default ResourceInfo;