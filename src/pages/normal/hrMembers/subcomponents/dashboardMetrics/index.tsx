import { Typography, Skeleton, Box, Chip } from "@mui/material";
import { People, GroupAdd, PersonAdd, Info } from "@mui/icons-material";

import { Container, MetricCard, Header, IconWrapper, ValueText } from "./styles";

import type { DashboardMetricsProps } from "./types";

const DashboardMetrics = ({ metrics, loading }: DashboardMetricsProps) => {
    if (loading) {
        return (
            <Container>
                {[1, 2, 3, 4].map((i) => (
                    <MetricCard key={i}>
                        <Header>
                            <Skeleton variant="circular" width={48} height={48} />
                            <Skeleton variant="text" width={100} height={24} />
                        </Header>
                        <Skeleton variant="text" width={60} height={60} />
                    </MetricCard>
                ))}
            </Container>
        );
    }

    if (!metrics) return null;

    const formatStatus = (status: string) => {
        const map: Record<string, string> = { registered: "Registrado", active: "Ativo", inactive: "Inativo", loggedIn: "Logado", blocked: "Bloqueado" };
        return map[status] || status;
    };

    return (
        <Container>
            <MetricCard>
                <Header>
                    <IconWrapper customcolor="#1976d2">
                        <People color="inherit" />
                    </IconWrapper>
                    <Typography color="text.secondary" variant="body2" fontWeight={600}>Total de Membros</Typography>
                </Header>
                <ValueText>{metrics.totalMembers}</ValueText>
            </MetricCard>

            <MetricCard>
                <Header>
                    <IconWrapper customcolor="#2e7d32">
                        <GroupAdd color="inherit" />
                    </IconWrapper>
                    <Typography color="text.secondary" variant="body2" fontWeight={600}>Total Familiares</Typography>
                </Header>
                <ValueText>{metrics.totalFamilyMembers}</ValueText>
            </MetricCard>

            <MetricCard>
                <Header>
                    <IconWrapper customcolor="#ed6c02">
                        <PersonAdd color="inherit" />
                    </IconWrapper>
                    <Typography color="text.secondary" variant="body2" fontWeight={600}>Novos no Mês</Typography>
                </Header>
                <ValueText>{metrics.newThisMonth}</ValueText>
            </MetricCard>

            <MetricCard>
                <Header>
                    <IconWrapper customcolor="#9c27b0">
                        <Info color="inherit" />
                    </IconWrapper>
                    <Typography color="text.secondary" variant="body2" fontWeight={600}>Status (Distribuição)</Typography>
                </Header>
                <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                    {Object.entries(metrics.statusDistribution || {}).map(([status, count]) => (
                        <Chip key={status} label={`${formatStatus(status)}: ${count}`} size="small" variant="outlined" />
                    ))}
                </Box>
            </MetricCard>
        </Container>
    );
};

export default DashboardMetrics;