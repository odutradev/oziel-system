import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '@mui/material';

import { ChartCard, ChartContent, ChartHeader, ChartTitle, ChartSubtitle, ChartWrapper, CenteredBox } from './styles';
import NoData from '@components/noData';

import type { StatusDistributionChartProps } from './types';

const StatusDistributionChart = ({ data }: StatusDistributionChartProps) => {
  const theme = useTheme();

  const chartData = data ? [
    { name: 'Logado', value: data.loggedIn, color: theme.palette.success.main },
    { name: 'Registrado', value: data.registered, color: theme.palette.info.main },
    { name: 'Bloqueado', value: data.blocked, color: theme.palette.error.main },
  ].filter(item => item.value > 0) : [];

  const hasData = chartData.length > 0;

  return (
    <ChartCard>
      <ChartContent>
        <ChartHeader>
          <ChartTitle variant="h6">Status dos Usuários</ChartTitle>
          <ChartSubtitle variant="body2">Distribuição atual por estado da conta</ChartSubtitle>
        </ChartHeader>
        <ChartWrapper>
          {!hasData ? (
            <NoData message="Nenhum status registrado" />
          ) : (
            <CenteredBox>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: theme.shape.borderRadius,
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CenteredBox>
          )}
        </ChartWrapper>
      </ChartContent>
    </ChartCard>
  );
};

export default StatusDistributionChart;