import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useTheme } from "@mui/material/styles";

import { CONTRACT_STATUS_TRANSLATIONS, CONTRACT_SITUATION_TRANSLATIONS, CONTRACT_TYPE_TRANSLATIONS } from "@utils/types/models/contract";
import { ChartsContainer, ChartWrapper, ChartTitle, ChartBody } from "./styles";
import { formatCurrency } from "@utils/formatters";

import type { ContractStatusType, ContractSituationType, ContractType } from "@utils/types/models/contract";
import type { ChartsProps } from "./types";

const STATUS_COLORS = { ACTIVE: "#2e7d32", INACTIVE: "#d32f2f" };
const SITUATION_COLORS = { REGULAR: "#0288d1", IRREGULAR: "#ed6c02" };
const TYPE_COLORS = { PNAE: "#9c27b0", PAA: "#00bcd4", OTHERS: "#ff9800" };

const Charts = ({ distribution }: ChartsProps) => {
    const theme = useTheme();

    if (!distribution) return null;

    const statusData = distribution.byStatus.map(item => ({
        name: CONTRACT_STATUS_TRANSLATIONS[item.status as ContractStatusType] || item.status,
        value: item.value,
        color: STATUS_COLORS[item.status as keyof typeof STATUS_COLORS] || theme.palette.grey[500]
    }));

    const situationData = distribution.bySituation.map(item => ({
        name: CONTRACT_SITUATION_TRANSLATIONS[item.situation as ContractSituationType] || item.situation,
        value: item.value,
        color: SITUATION_COLORS[item.situation as keyof typeof SITUATION_COLORS] || theme.palette.grey[500]
    }));

    const typeData = distribution.byType.map(item => ({
        name: CONTRACT_TYPE_TRANSLATIONS[item.type as ContractType] || item.type,
        value: item.value,
        color: TYPE_COLORS[item.type as keyof typeof TYPE_COLORS] || theme.palette.grey[500]
    }));

    const renderTooltip = (props: any) => {
        const { active, payload } = props;
        if (!active || !payload || !payload.length) return null;
        return (
            <div style={{ backgroundColor: theme.palette.background.paper, padding: "8px 12px", border: `1px solid ${theme.palette.divider}`, borderRadius: 4 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{payload[0].name}</p>
                <p style={{ margin: 0, color: payload[0].payload.color }}>{formatCurrency(payload[0].value)}</p>
            </div>
        );
    };

    return (
        <ChartsContainer>
            <ChartWrapper>
                <ChartTitle>Volume Financeiro por Status</ChartTitle>
                <ChartBody>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5}>
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={renderTooltip} />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartBody>
            </ChartWrapper>
            <ChartWrapper>
                <ChartTitle>Volume Financeiro por Situação</ChartTitle>
                <ChartBody>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={situationData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5}>
                                {situationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={renderTooltip} />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartBody>
            </ChartWrapper>
            <ChartWrapper>
                <ChartTitle>Volume Financeiro por Tipo</ChartTitle>
                <ChartBody>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5}>
                                {typeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={renderTooltip} />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartBody>
            </ChartWrapper>
        </ChartsContainer>
    );
};

export default Charts;