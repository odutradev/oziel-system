import { TextField, Box, Typography, MenuItem } from '@mui/material';

import { ROLE_OPTIONS } from '@utils/types/models/user';
import EditSection from '@components/editSection';
import ToggleGroup from '@components/toggleGroup';
import { StatusContainer, Row } from './styles';

import type { AccountStatusProps } from './types';

const AccountStatus = ({ user }: AccountStatusProps) => {
  const statusOptions = [
    { value: 'loggedIn', label: 'Logado' },
    { value: 'registered', label: 'Registrado' },
    { value: 'blocked', label: 'Bloqueado' },
  ];

  return (
    <EditSection title="Status da Conta">
      <StatusContainer>
        <Row>
          <TextField label="Identificador (ID)" value={user?._id || ''} disabled fullWidth size="small" />
        </Row>

        <Row>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" gutterBottom color="text.secondary">Função</Typography>
            <TextField select value={user?.role || 'normal'} disabled fullWidth size="small">
              {ROLE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" gutterBottom color="text.secondary">Status</Typography>
            <ToggleGroup options={statusOptions} value={user?.status || 'registered'} exclusive disabled fullWidth />
          </Box>
        </Row>
      </StatusContainer>
    </EditSection>
  );
};

export default AccountStatus;