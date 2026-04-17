import { formatCurrency } from "@utils/formatters";

import { CardsGrid, CardContainer, CardTitle, CardValue } from "./styles";

import type { SummaryCardsProps } from "./types";

const SummaryCards = ({ summary }: SummaryCardsProps) => {
    if (!summary) return null;

    return (
        <CardsGrid>
            <CardContainer>
                <CardTitle>Total de Contratos</CardTitle>
                <CardValue>{summary.totalContracts}</CardValue>
            </CardContainer>
            <CardContainer>
                <CardTitle>Custo Total Base</CardTitle>
                <CardValue>{formatCurrency(summary.totalValue)}</CardValue>
            </CardContainer>
            <CardContainer>
                <CardTitle>Valor Total de Venda</CardTitle>
                <CardValue>{formatCurrency(summary.totalSalePrice)}</CardValue>
            </CardContainer>
            <CardContainer>
                <CardTitle>Lucro Esperado</CardTitle>
                <CardValue isprofit="true">{formatCurrency(summary.expectedProfit)}</CardValue>
            </CardContainer>
            <CardContainer>
                <CardTitle>Margem de Lucro</CardTitle>
                <CardValue isprofit="true">{summary.profitMarginPercentage.toFixed(2)}%</CardValue>
            </CardContainer>
        </CardsGrid>
    );
};

export default SummaryCards;