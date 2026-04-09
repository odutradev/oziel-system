import { MonetizationOn, AccessTime, PendingActions, AccountBalance } from "@mui/icons-material";

import { CardsContainer, CardWrapper, CardHeader, CardTitle, CardValue, CardSubtext } from "./styles";
import { formatCurrency } from "@utils/formatters";

import type { DashboardCardsProps } from "./types";

const DashboardCards = ({ metrics }: DashboardCardsProps) => {
    if (!metrics) return null;

    return (
        <CardsContainer>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Receita Consolidada</CardTitle>
                    <AccountBalance color="success" />
                </CardHeader>
                <CardValue variantcolor="success">{formatCurrency(metrics.consolidatedRevenue)}</CardValue>
                <CardSubtext>Valor de operações concluídas</CardSubtext>
            </CardWrapper>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Receita Pendente</CardTitle>
                    <PendingActions color="warning" />
                </CardHeader>
                <CardValue variantcolor="warning">{formatCurrency(metrics.pendingRevenue)}</CardValue>
                <CardSubtext>Valor aguardando conclusão</CardSubtext>
            </CardWrapper>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Receita Total Bruta</CardTitle>
                    <MonetizationOn color="primary" />
                </CardHeader>
                <CardValue variantcolor="primary">{formatCurrency(metrics.totalRevenue)}</CardValue>
                <CardSubtext>Projeção total do mês</CardSubtext>
            </CardWrapper>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Horas Trabalhadas</CardTitle>
                    <AccessTime color="info" />
                </CardHeader>
                <CardValue>{metrics.totalWorkedHours.toFixed(2)}h</CardValue>
                <CardSubtext>Soma de horas no mês</CardSubtext>
            </CardWrapper>
        </CardsContainer>
    );
};

export default DashboardCards;