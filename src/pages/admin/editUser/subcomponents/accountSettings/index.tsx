import { TextField, Box } from '@mui/material';

import { SettingsContainer, DateRow, CardsRow } from './styles';
import EditSection from '@components/editSection';
import ToggleGroup from '@components/toggleGroup';
import ConfigCard from '@components/configCard';

import type { AccountSettingsProps } from './types';

const AccountSettings = ({ formData, onStatusChange }: AccountSettingsProps) => {
  const statusOptions = [
    { value: 'loggedIn', label: 'Logado' },
    { value: 'registered', label: 'Registrado' },
    { value: 'blocked', label: 'Bloqueado' },
  ];

  const roleOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'admin', label: 'Admin' },
  ];

  const formatDate = (date?: Date | string) => date ? new Date(date).toLocaleString('pt-BR') : '-';

  return (
    <EditSection title="Configurações da Conta">
      <SettingsContainer>
        <CardsRow>
          <ConfigCard
            title="Função"
            active={false}
          >
            <Box sx={{ mt: 1 }}>
              <ToggleGroup
                options={roleOptions}
                value={formData.role || 'normal'}
                exclusive
                disabled
                fullWidth
              />
            </Box>
          </ConfigCard>

          <ConfigCard
            title="Status"
            active={formData.status === 'loggedIn' || formData.status === 'registered'}
          >
             <Box sx={{ mt: 1 }}>
              <ToggleGroup
                options={statusOptions}
                value={formData.status || 'registered'}
                exclusive
                onChange={(_, value) => value && onStatusChange(value)}
                fullWidth
              />
            </Box>
          </ConfigCard>
        </CardsRow>

        <DateRow>
          <TextField
            label="Data de Cadastro"
            value={formatDate(formData.createAt)}
            disabled
            fullWidth
            size="small"
          />
          <TextField
            label="Última Atualização"
            value={formatDate(formData.lastUpdate)}
            disabled
            fullWidth
            size="small"
          />
        </DateRow>
      </SettingsContainer>
    </EditSection>
  );
};

export default AccountSettings;