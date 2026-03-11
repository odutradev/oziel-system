import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '@mui/material';

import { ChartCard, ChartContent, ChartHeader, ChartTitle, ChartSubtitle, ChartWrapper } from './styles';
import NoData from '@components/noData';

import type { UserGrowthChartProps } from './types';

const UserGrowthChart = ({ data }: UserGrowthChartProps) => {
  const theme = useTheme();
  const hasData = data && data.length > 0;

  const formattedData = hasData ? data!.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  })) : [];

  return (
    <ChartCard>
      <ChartContent>
        <ChartHeader>
          <ChartTitle variant="h6">Crescimento de Usuários</ChartTitle>
          <ChartSubtitle variant="body2">Evolução de novos cadastros ao longo do tempo</ChartSubtitle>
        </ChartHeader>
        <ChartWrapper>
          {!hasData ? (
            <NoData message="Nenhum registro de crescimento no período" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Total"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
                <Area
                  type="monotone"
                  dataKey="normalUsers"
                  name="Usuários Normais"
                  stroke={theme.palette.secondary.main}
                  fillOpacity={1}
                  fill="url(#colorNormal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </ChartWrapper>
      </ChartContent>
    </ChartCard>
  );
};

export default UserGrowthChart;