import { TextField, Box, Typography } from '@mui/material';

import InputWithCounter from '@components/inputWithCounter';
import EditSection from '@components/editSection';
import ToggleGroup from '@components/toggleGroup';
import { InfoContainer, Row } from './styles';

import type { ResourceInfoProps } from './types';

const STATUS_OPTIONS = [
  { value: "true", label: "Ativo" },
  { value: "false", label: "Inativo" }
];

const ResourceInfo = ({ formData, isFleet, onChange }: ResourceInfoProps) => {
  const isNameEmpty = !(formData.name || '').trim();

  return (
    <EditSection title={isFleet ? "Informações da Frota" : "Informações do Operador"}>
      <InfoContainer>
        <Row>
          <InputWithCounter
            label={isFleet ? "Nome da Frota" : "Nome do Operador"}
            value={formData.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            error={isNameEmpty}
            helperText={isNameEmpty ? "O nome é obrigatório" : ""}
            maxLength={100}
            required
            fullWidth
          />
        </Row>
        <Row>
          {isFleet ? (
            <TextField
              label="Descrição"
              value={formData.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          ) : (
            <TextField
              label="Documento (CPF/CNPJ)"
              value={formData.document || ''}
              onChange={(e) => onChange('document', e.target.value)}
              fullWidth
            />
          )}
        </Row>
        <Row>
          <Box display="flex" flexDirection="column" gap={1} width="100%" maxWidth={{ sm: 300 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Status no Sistema
            </Typography>
            <ToggleGroup
              options={STATUS_OPTIONS}
              value={String(formData.active)}
              onChange={(_, val) => val !== null && onChange("active", val === "true")}
            />
          </Box>
        </Row>
      </InfoContainer>
    </EditSection>
  );
};

export default ResourceInfo;