import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material';

import { ChartCard, ChartContent, ChartHeader, ChartTitle, ChartSubtitle, ChartWrapper } from './styles';
import NoData from '@components/noData';

import type { RetentionChartProps } from './types';

const RetentionChart = ({ data }: RetentionChartProps) => {
  const theme = useTheme();

  const hasData = data && data.length > 0;

  const formattedData = hasData ? data!.map(item => ({
    ...item,
    rate: parseFloat(item.retentionRate.replace('%', ''))
  })) : [];

  return (
    <ChartCard>
      <ChartContent>
        <ChartHeader>
          <ChartTitle variant="h6">Retenção de Usuários</ChartTitle>
          <ChartSubtitle variant="body2">Taxa de retenção por período de cadastro</ChartSubtitle>
        </ChartHeader>
        <ChartWrapper>
          {!hasData ? (
            <NoData message="Dados insuficientes para cálculo de retenção" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                <XAxis dataKey="period" stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis unit="%" stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false}/>
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                  formatter={(value: number) => [`${value}%`, 'Taxa de Retenção']}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke={theme.palette.primary.main}
                  strokeWidth={3}
                  dot={{ fill: theme.palette.primary.main, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartWrapper>
      </ChartContent>
    </ChartCard>
  );
};

export default RetentionChart;