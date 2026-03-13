import { AccountBalanceWallet, TrendingUp, TrendingDown, AccountBalance } from "@mui/icons-material";
import { useMemo } from "react";

import { CardsContainer, CardWrapper, CardHeader, CardTitle, CardValue, CardSubtext } from "./styles";
import { formatCurrency } from "@utils/formatters";

import type { DashboardCardsProps } from "./types";

const DashboardCards = ({ transactions, currentBalance }: DashboardCardsProps) => {
    const metrics = useMemo(() => transactions.reduce((acc, curr) => {
        const isConfirmed = curr.status === "CONFIRMED";
        if (curr.type === "INCOME") {
            if (isConfirmed) acc.income += curr.amount;
            else acc.pendingIncome += curr.amount;
        } else {
            if (isConfirmed) acc.expense += curr.amount;
            else acc.pendingExpense += curr.amount;
        }
        return acc;
    }, { income: 0, expense: 0, pendingIncome: 0, pendingExpense: 0 }), [transactions]);

    const monthlyBalance = metrics.income - metrics.expense;

    return (
        <CardsContainer>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Saldo Atual de Caixa</CardTitle>
                    <AccountBalance color="primary" />
                </CardHeader>
                <CardValue>{formatCurrency(currentBalance)}</CardValue>
                <CardSubtext>Valor consolidado geral</CardSubtext>
            </CardWrapper>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Balanço do Mês</CardTitle>
                    <AccountBalanceWallet color={monthlyBalance >= 0 ? "success" : "error"} />
                </CardHeader>
                <CardValue variantcolor={monthlyBalance >= 0 ? "success" : "error"}>{formatCurrency(monthlyBalance)}</CardValue>
                <CardSubtext>Entradas reais vs Saídas reais</CardSubtext>
            </CardWrapper>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Entradas do Mês</CardTitle>
                    <TrendingUp color="success" />
                </CardHeader>
                <CardValue variantcolor="success">{formatCurrency(metrics.income)}</CardValue>
                <CardSubtext>{formatCurrency(metrics.pendingIncome)} aguardando confirmação</CardSubtext>
            </CardWrapper>
            <CardWrapper elevation={1}>
                <CardHeader>
                    <CardTitle>Saídas do Mês</CardTitle>
                    <TrendingDown color="error" />
                </CardHeader>
                <CardValue variantcolor="error">{formatCurrency(metrics.expense)}</CardValue>
                <CardSubtext>{formatCurrency(metrics.pendingExpense)} aguardando confirmação</CardSubtext>
            </CardWrapper>
        </CardsContainer>
    );
};

export default DashboardCards;