import { Grid, Alert } from '@mui/material';

import MetricsDashboardHeader from '@components/metricsDashboardHeader';
import StatusDistributionChart from './subcomponents/statusDistributionChart';
import { Container, ContentWrapper } from './styles';
import UserGrowthChart from './subcomponents/userGrowthChart';
import RetentionChart from './subcomponents/retentionChart';
import TopUsersTable from './subcomponents/topUsersTable';
import PlansChart from './subcomponents/plansChart';
import { useUserMetrics } from './hooks';
import KpiStats from './subcomponents/kpiStats';
import Layout from '@components/layout';
import Loading from '@components/loading';
import metadata from './metadata';

const UsersMetrics = () => {
  const { metrics, loading, error, period, dateRange, handleDateChange, handlePeriodChange } = useUserMetrics();

  return (
    <Layout {...metadata}>
      <Container>
        <MetricsDashboardHeader
          title="Métricas de Usuários"
          subtitle="Visão geral do crescimento, engajamento e receita de usuários"
          period={period}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onDateChange={handleDateChange}
          onPeriodChange={handlePeriodChange}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading && !metrics ? (
          <Loading message="Calculando métricas..." />
        ) : (
          metrics && (
            <ContentWrapper>
              <KpiStats data={metrics} />

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 8 }}>
                  <UserGrowthChart data={metrics.timeline} />
                </Grid>
                <Grid size={{ xs: 12, lg: 4 }}>
                  <StatusDistributionChart data={metrics.status} />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <PlansChart data={metrics.plans} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <RetentionChart data={metrics.retention} />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TopUsersTable data={metrics.topUsers.bySpending} />
                </Grid>
              </Grid>
            </ContentWrapper>
          )
        )}
      </Container>
    </Layout>
  );
};

export default UsersMetrics;