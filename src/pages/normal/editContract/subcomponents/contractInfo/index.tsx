import { TextField, MenuItem } from '@mui/material';

import { CONTRACT_TYPES_ARRAY, CONTRACT_TYPE_TRANSLATIONS } from '@utils/types/models/contract';
import { formatCurrency } from '@utils/formatters';
import EditSection from '@components/editSection';
import { InfoContainer, Row } from './styles';

import type { ContractInfoProps } from './types';

const ContractInfo = ({ formData, onChange }: ContractInfoProps) => {
  return (
    <EditSection title="Informações do Contrato">
      <InfoContainer>
        <Row>
          <TextField
            label="Código do Contrato"
            value={formData.code}
            onChange={(e) => onChange('code', e.target.value)}
            fullWidth
            required
          />
          <TextField
            select
            label="Tipo"
            value={formData.type}
            onChange={(e) => onChange('type', e.target.value)}
            fullWidth
            required
          >
            {CONTRACT_TYPES_ARRAY.map((t) => (
              <MenuItem key={t} value={t}>{CONTRACT_TYPE_TRANSLATIONS[t]}</MenuItem>
            ))}
          </TextField>
        </Row>
        <Row>
          <TextField
            type="date"
            label="Data do Contrato"
            value={formData.contractDate}
            onChange={(e) => onChange('contractDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <TextField
            type="date"
            label="Previsão de Entrega"
            value={formData.deliveryForecast}
            onChange={(e) => onChange('deliveryForecast', e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <TextField
            type="date"
            label="Data de Finalização"
            value={formData.endDate}
            onChange={(e) => onChange('endDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Row>
        <Row>
          <TextField
            label="Valor Total"
            value={formatCurrency(formData.totalValue)}
            onChange={(e) => onChange('totalValue', Number(e.target.value.replace(/\D/g, '')) / 100)}
            fullWidth
            required
          />
          <TextField
            label="Preço Total de Venda"
            value={formatCurrency(formData.totalSalePrice)}
            onChange={(e) => onChange('totalSalePrice', Number(e.target.value.replace(/\D/g, '')) / 100)}
            fullWidth
            required
          />
        </Row>
      </InfoContainer>
    </EditSection>
  );
};

export default ContractInfo;