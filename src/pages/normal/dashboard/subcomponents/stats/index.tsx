import { AccountBalanceWallet, VerifiedUser, Description, ArrowForward } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { StatsGrid, StatCard, IconWrapper, ActionButton } from './styles';

import type { DashboardStatsProps } from './types';
import type { ReactNode } from 'react';

const DashboardStats = ({ user, totalProves }: DashboardStatsProps) => {
  const navigate = useNavigate();
  const hasActivePlan = user?.currentPlan && (user.currentPlan as any).planID;

  const statsConfig: Array<{
    label: string;
    value: string | number;
    icon: ReactNode;
    color: 'primary' | 'success' | 'info';
    route: string;
    actionLabel: string;
  }> = [
    {
      label: 'Créditos Disponíveis',
      value: user?.coins || 0,
      icon: <AccountBalanceWallet />,
      color: 'primary',
      route: '/dashboard/plans',
      actionLabel: 'Gerenciar'
    },
    {
      label: 'Plano Atual',
      value: hasActivePlan ? (user?.currentPlan as any).title : 'Gratuito',
      icon: <VerifiedUser />,
      color: 'success',
      route: '/dashboard/current-plan',
      actionLabel: 'Detalhes'
    },
    {
      label: 'Total de Provas',
      value: totalProves,
      icon: <Description />,
      color: 'info',
      route: '/dashboard/digitalproves',
      actionLabel: 'Histórico'
    }
  ];

  return (
    <StatsGrid>
      {statsConfig.map((stat) => (
        <StatCard key={stat.label} onClick={() => navigate(stat.route)} elevation={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
                {stat.label}
              </Typography>
              <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>
                {stat.value}
              </Typography>
            </Box>
            <IconWrapper ownerState={{ color: stat.color }}>
              {stat.icon}
            </IconWrapper>
          </Box>
          <ActionButton>
            {stat.actionLabel} <ArrowForward fontSize="inherit" />
          </ActionButton>
        </StatCard>
      ))}
    </StatsGrid>
  );
};

export default DashboardStats;