import { Typography } from '@mui/material';
import { Assessment, PersonAdd, AppSettingsAlt, Login, Update, DeleteForever } from '@mui/icons-material';

import { StatsContainer, StyledCard, CardHeader } from './styles';

import type { StatsCardsProps } from './types';

const StatsCards = ({ stats }: StatsCardsProps) => {
  if (!stats?.overview) return null;

  const { overview } = stats;

  const items = [
    { label: 'Total de Logs', value: overview.totalLogs, icon: <Assessment color="primary" /> },
    { label: 'Ações Sistema', value: overview.systemActions, icon: <AppSettingsAlt color="info" /> },
    { label: 'Logins Realizados', value: overview.userSignins, icon: <Login color="success" /> },
    { label: 'Novos Cadastros', value: overview.userSignups, icon: <PersonAdd color="secondary" /> },
    { label: 'Atualizações', value: overview.userUpdates, icon: <Update color="warning" /> },
    { label: 'Exclusões', value: overview.userDeletes, icon: <DeleteForever color="error" /> },
  ];

  return (
    <StatsContainer>
      {items.map((item) => (
        <StyledCard key={item.label}>
          <CardHeader>
            {item.icon}
            <Typography variant="caption" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {item.label}
            </Typography>
          </CardHeader>
          <Typography variant="h4" fontWeight={800}>
            {(item.value || 0).toLocaleString('pt-BR')}
          </Typography>
        </StyledCard>
      ))}
    </StatsContainer>
  );
};

export default StatsCards;