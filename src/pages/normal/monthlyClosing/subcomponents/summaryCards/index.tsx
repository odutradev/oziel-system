import { MonetizationOn, AccessTime } from "@mui/icons-material";

import { CardsContainer, CardWrapper, CardHeader, CardTitle, CardValue, CardSubtext } from "./styles";
import { formatCurrency } from "@utils/formatters";

import type { SummaryCardsProps } from "./types";

const SummaryCards = ({ totals }: SummaryCardsProps) => {
    if (!totals) return null;

    return (
        <CardsContainer>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Receita Total Bruta</CardTitle>
                    <MonetizationOn color="success" />
                </CardHeader>
                <CardValue variantcolor="success">{formatCurrency(totals.revenue)}</CardValue>
                <CardSubtext>Valor acumulado de todas as operações no mês</CardSubtext>
            </CardWrapper>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Horas Trabalhadas</CardTitle>
                    <AccessTime color="info" />
                </CardHeader>
                <CardValue variantcolor="info">{totals.hours.toFixed(2)}h</CardValue>
                <CardSubtext>Soma total de horas registradas no período</CardSubtext>
            </CardWrapper>
        </CardsContainer>
    );
};

export default SummaryCards;