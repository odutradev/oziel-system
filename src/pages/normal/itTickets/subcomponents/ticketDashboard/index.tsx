import { Assignment, ErrorOutline, Autorenew, CheckCircle } from "@mui/icons-material";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";

import { DashboardCard, IconWrapper } from "./styles";

import type { TicketDashboardProps } from "./types";

const TicketDashboard = ({ metrics, loading }: TicketDashboardProps) => {
    if (loading && !metrics) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (!metrics) return null;

    const openTickets = metrics.byStatus["OPEN"] ?? 0;
    const criticalTickets = metrics.byPriority["CRITICAL"] ?? 0;
    const closedTickets = metrics.byStatus["CLOSED"] ?? 0;

    return (
        <Box mb={4}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DashboardCard>
                        <Box>
                            <Typography color="textSecondary" variant="subtitle2">Total de Chamados</Typography>
                            <Typography variant="h4" fontWeight="bold">{metrics.total}</Typography>
                        </Box>
                        <IconWrapper variantcolor="primary">
                            <Assignment fontSize="large" />
                        </IconWrapper>
                    </DashboardCard>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DashboardCard>
                        <Box>
                            <Typography color="textSecondary" variant="subtitle2">Em Aberto</Typography>
                            <Typography variant="h4" fontWeight="bold">{openTickets}</Typography>
                        </Box>
                        <IconWrapper variantcolor="warning">
                            <Autorenew fontSize="large" />
                        </IconWrapper>
                    </DashboardCard>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DashboardCard>
                        <Box>
                            <Typography color="textSecondary" variant="subtitle2">Prioridade Crítica</Typography>
                            <Typography variant="h4" fontWeight="bold">{criticalTickets}</Typography>
                        </Box>
                        <IconWrapper variantcolor="error">
                            <ErrorOutline fontSize="large" />
                        </IconWrapper>
                    </DashboardCard>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DashboardCard>
                        <Box>
                            <Typography color="textSecondary" variant="subtitle2">Concluídos</Typography>
                            <Typography variant="h4" fontWeight="bold">{closedTickets}</Typography>
                        </Box>
                        <IconWrapper variantcolor="success">
                            <CheckCircle fontSize="large" />
                        </IconWrapper>
                    </DashboardCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TicketDashboard;