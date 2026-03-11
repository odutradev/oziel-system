import { TextField, Box, Typography } from '@mui/material';

import EditSection from '@components/editSection';
import ToggleGroup from '@components/toggleGroup';
import { StatusContainer, Row } from './styles';

import type { AccountStatusProps } from './types';

const AccountStatus = ({ user }: AccountStatusProps) => {
  const roleOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'admin', label: 'Administrador' },
  ];

  const statusOptions = [
    { value: 'loggedIn', label: 'Logado' },
    { value: 'registered', label: 'Registrado' },
    { value: 'blocked', label: 'Bloqueado' },
  ];

  return (
    <EditSection title="Status da Conta">
      <StatusContainer>
        <Row>
          <TextField
            label="Identificador (ID)"
            value={user?._id || ''}
            disabled
            fullWidth
            size="small"
          />
        </Row>

        <Row>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" gutterBottom color="text.secondary">Função</Typography>
            <ToggleGroup
              options={roleOptions}
              value={user?.role || 'normal'}
              exclusive
              disabled
              fullWidth
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" gutterBottom color="text.secondary">Status</Typography>
            <ToggleGroup
              options={statusOptions}
              value={user?.status || 'registered'}
              exclusive
              disabled
              fullWidth
            />
          </Box>
        </Row>
      </StatusContainer>
    </EditSection>
  );
};

export default AccountStatus;