import { People, PersonAdd, Block, Star, TrendingUp, AttachMoney } from '@mui/icons-material';
import { useTheme } from '@mui/material';

import { GridContainer, GridItem, StatCard, CardContentArea, IconWrapper, StyledIconWrapper, ValueText, LabelText, SubValueText } from './styles';

import type { KpiStatsProps } from './types';

const KpiStats = ({ data }: KpiStatsProps) => {
  const theme = useTheme();

  if (!data) return null;

  const cards = [
    {
      title: 'Total de Usuários',
      value: data.overview.totalUsers,
      subValue: `${data.overview.admins} Admins / ${data.overview.normalUsers} Normais`,
      icon: <People fontSize="large" />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Taxa de Atividade',
      value: data.overview.activeRate,
      subValue: 'Usuários ativos recentemente',
      icon: <TrendingUp fontSize="large" />,
      color: theme.palette.success.main,
    },
    {
      title: 'Taxa de Conversão',
      value: data.conversion.conversionRate,
      subValue: `${data.conversion.usersWithPurchases} usuários pagantes`,
      icon: <AttachMoney fontSize="large" />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Usuários com Plano',
      value: data.plans.totalUsersWithPlan,
      subValue: 'Assinaturas ativas',
      icon: <Star fontSize="large" />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Novos Registros',
      value: data.status.registered,
      subValue: data.status.registeredPercentage,
      icon: <PersonAdd fontSize="large" />,
      color: theme.palette.info.main,
    },
    {
      title: 'Bloqueados',
      value: data.status.blocked,
      subValue: data.status.blockedPercentage,
      icon: <Block fontSize="large" />,
      color: theme.palette.error.main,
    }
  ];

  return (
    <GridContainer container spacing={3}>
      {cards.map((card, index) => (
        <GridItem size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
          <StatCard>
            <CardContentArea>
              <IconWrapper headerColor={card.color}>
                <StyledIconWrapper color={card.color}>
                  {card.icon}
                </StyledIconWrapper>
              </IconWrapper>
              <ValueText variant="h4">
                {card.value}
              </ValueText>
              <LabelText variant="body2">
                {card.title}
              </LabelText>
              <SubValueText variant="caption" colorCode={card.color}>
                {card.subValue}
              </SubValueText>
            </CardContentArea>
          </StatCard>
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default KpiStats;