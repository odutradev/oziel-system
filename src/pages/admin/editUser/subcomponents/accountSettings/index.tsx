import { TextField, MenuItem, Box } from '@mui/material';

import { SettingsContainer, DateRow, CardsRow } from './styles';
import { ROLE_OPTIONS } from '@utils/types/models/user';
import EditSection from '@components/editSection';
import ToggleGroup from '@components/toggleGroup';
import ConfigCard from '@components/configCard';

import type { AccountSettingsProps } from './types';

const AccountSettings = ({ formData, onStatusChange, onRoleChange }: AccountSettingsProps) => {
  const statusOptions = [
    { value: 'loggedIn', label: 'Logado' },
    { value: 'registered', label: 'Registrado' },
    { value: 'blocked', label: 'Bloqueado' },
  ];

  const formatDate = (date?: Date | string) => date ? new Date(date).toLocaleString('pt-BR') : '-';

  return (
    <EditSection title="Configurações da Conta">
      <SettingsContainer>
        <CardsRow>
          <ConfigCard title="Função" active={false}>
            <Box sx={{ mt: 1 }}>
              <TextField select value={formData.role || 'normal'} onChange={(e) => onRoleChange(e.target.value)} fullWidth size="small">
                {ROLE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </ConfigCard>

          <ConfigCard title="Status" active={formData.status === 'loggedIn' || formData.status === 'registered'}>
             <Box sx={{ mt: 1 }}>
              <ToggleGroup options={statusOptions} value={formData.status || 'registered'} exclusive onChange={(_, value) => value && onStatusChange(value)} fullWidth />
            </Box>
          </ConfigCard>
        </CardsRow>

        <DateRow>
          <TextField label="Data de Cadastro" value={formatDate(formData.createAt)} disabled fullWidth size="small" />
          <TextField label="Última Atualização" value={formatDate(formData.lastUpdate)} disabled fullWidth size="small" />
        </DateRow>
      </SettingsContainer>
    </EditSection>
  );
};

export default AccountSettings;