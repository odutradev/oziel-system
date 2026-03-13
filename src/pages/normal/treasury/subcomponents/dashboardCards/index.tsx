import { AccountBalanceWallet, TrendingDown, TrendingUp, AccountBalance } from "@mui/icons-material";
import { useMemo } from "react";

import { CardsContainer, CardWrapper, CardHeader, CardTitle, CardValue, CardSubtext } from "./styles";
import { formatCurrency } from "@utils/formatters";

import type { DashboardCardsProps } from "./types";

const DashboardCards = ({ transactions, currentBalance }: DashboardCardsProps) => {
    const metrics = useMemo(() => transactions.reduce((acc, curr) => {
        const amount = curr.amount;
        if (curr.type === "INCOME") {
            acc.totalIncome += amount;
            if (curr.status === "PENDING") acc.pendingIncome += amount;
        } else {
            acc.totalExpense += amount;
            if (curr.status === "PENDING") acc.pendingExpense += amount;
        }
        return acc;
    }, { totalIncome: 0, totalExpense: 0, pendingIncome: 0, pendingExpense: 0 }), [transactions]);

    const monthlyBalance = metrics.totalIncome - metrics.totalExpense;

    return (
        <CardsContainer>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Saídas do Mês</CardTitle>
                    <TrendingDown color="error" />
                </CardHeader>
                <CardValue variantcolor="error">{formatCurrency(metrics.totalExpense)}</CardValue>
                <CardSubtext>{formatCurrency(metrics.pendingExpense)} pendentes</CardSubtext>
            </CardWrapper>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Entradas do Mês</CardTitle>
                    <TrendingUp color="success" />
                </CardHeader>
                <CardValue variantcolor="success">{formatCurrency(metrics.totalIncome)}</CardValue>
                <CardSubtext>{formatCurrency(metrics.pendingIncome)} pendentes</CardSubtext>
            </CardWrapper>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Balanço do Mês</CardTitle>
                    <AccountBalanceWallet color="info" />
                </CardHeader>
                <CardValue variantcolor="info">{formatCurrency(monthlyBalance)}</CardValue>
                <CardSubtext>Considerando todas as transações</CardSubtext>
            </CardWrapper>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Saldo Atual de Caixa</CardTitle>
                    <AccountBalance color="primary" />
                </CardHeader>
                <CardValue variantcolor="primary">{formatCurrency(currentBalance)}</CardValue>
                <CardSubtext>Valor consolidado geral</CardSubtext>
            </CardWrapper>
        </CardsContainer>
    );
};

export default DashboardCards;