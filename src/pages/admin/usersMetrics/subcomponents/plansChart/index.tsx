import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '@mui/material';

import { ChartCard, ChartContent, ChartHeader, ChartTitle, ChartSubtitle, ChartWrapper } from './styles';
import NoData from '@components/noData';

import type { PlansChartProps } from './types';

const PlansChart = ({ data }: PlansChartProps) => {
  const theme = useTheme();

  const hasData = data?.distribution && data.distribution.length > 0;

  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main
  ];

  const chartData = hasData ? data!.distribution.map(item => ({
    ...item,
    name: item.planTitle.length > 15 ? item.planTitle.substring(0, 15) + '...' : item.planTitle
  })) : [];

  return (
    <ChartCard>
      <ChartContent>
        <ChartHeader>
          <ChartTitle variant="h6">Distribuição de Planos</ChartTitle>
          <ChartSubtitle variant="body2">Usuários por tipo de plano assinado</ChartSubtitle>
        </ChartHeader>
        <ChartWrapper>
          {!hasData ? (
             <NoData message="Nenhuma assinatura ativa encontrada" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={theme.palette.divider} />
                <XAxis type="number" stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis dataKey="name" type="category" width={100} stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false}/>
                <Tooltip
                  cursor={{ fill: theme.palette.action.hover }}
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                />
                <Bar dataKey="users" name="Usuários" radius={[0, 4, 4, 0]} barSize={30}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartWrapper>
      </ChartContent>
    </ChartCard>
  );
};

export default PlansChart;