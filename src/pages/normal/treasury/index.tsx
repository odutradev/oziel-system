import { Typography, IconButton, Button } from "@mui/material";
import { ChevronRight, ChevronLeft, Add } from "@mui/icons-material";
import { useState } from "react";

import { PageContainer, HeaderControls, MonthSelector, ViewToggleWrapper, ActionButtonsWrapper } from "./styles";
import VaultTransactionModal from "./subcomponents/vaultTransactionModal";
import TransactionTable from "./subcomponents/transactionTable";
import TransactionModal from "./subcomponents/transactionModal";
import DashboardCards from "./subcomponents/dashboardCards";
import VaultModal from "./subcomponents/vaultModal";
import VaultsList from "./subcomponents/vaultsList";
import ToggleGroup from "@components/toggleGroup";
import useVaultsHook from "./hooks/useVaults";
import Layout from "@components/layout";
import useTreasuryHook from "./hooks";
import metadata from "./metadata";

import type { TreasuryViewType } from "./types";

const VIEW_OPTIONS = [{ value: "TRANSACTIONS", label: "Geral" }, { value: "VAULTS", label: "Caixinhas" }];

const Treasury = () => {
    const [currentView, setCurrentView] = useState<TreasuryViewType>("TRANSACTIONS");

    const { meta: transMeta, transactions, currentBalance, modalOpen: transModalOpen, selectedDate, formData: transFormData, handleSave: handleSaveTrans, handleDelete: handleDeleteTrans, handleConfirm, handleOpenModal: handleOpenTransModal, handleCloseModal: handleCloseTransModal, handleFormChange: handleTransFormChange, handleChangeMonth, handlePaginationChange: handleTransPagination } = useTreasuryHook();
    const { meta: vaultMeta, vaults, vaultModalOpen, transactionModalOpen: vaultTransModalOpen, vaultFormData, transactionFormData: vaultTransFormData, handleSaveVault, handleSaveTransaction: handleSaveVaultTrans, handleCloseVaultModal, handleCloseTransactionModal: handleCloseVaultTransModal, handleOpenVaultModal, handleOpenTransactionModal: handleOpenVaultTransModal, handleVaultFormChange, handleTransactionFormChange, handlePaginationChange: handleVaultPagination } = useVaultsHook();

    const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(selectedDate);
    const isTransactionsView = currentView === "TRANSACTIONS";

    return (
        <Layout {...metadata}>
            <PageContainer>
                <HeaderControls>
                    <ViewToggleWrapper>
                        <ToggleGroup options={VIEW_OPTIONS} value={currentView} onChange={(_, v) => v && setCurrentView(v as TreasuryViewType)} />
                    </ViewToggleWrapper>
                    <ActionButtonsWrapper>
                        {isTransactionsView && (
                            <MonthSelector>
                                <IconButton onClick={() => handleChangeMonth("prev")} size="small"><ChevronLeft /></IconButton>
                                <Typography variant="h6" textTransform="capitalize">{monthName}</Typography>
                                <IconButton onClick={() => handleChangeMonth("next")} size="small"><ChevronRight /></IconButton>
                            </MonthSelector>
                        )}
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => isTransactionsView ? handleOpenTransModal() : handleOpenVaultModal()}>
                            {isTransactionsView ? "Nova Transação" : "Nova Caixinha"}
                        </Button>
                    </ActionButtonsWrapper>
                </HeaderControls>

                {isTransactionsView ? (
                    <>
                        <DashboardCards transactions={transactions} currentBalance={currentBalance} />
                        <TransactionTable meta={transMeta} transactions={transactions} onEdit={handleOpenTransModal} onDelete={handleDeleteTrans} onConfirm={handleConfirm} onPaginationChange={handleTransPagination} />
                        <TransactionModal open={transModalOpen} formData={transFormData} onClose={handleCloseTransModal} onSave={handleSaveTrans} onChange={handleTransFormChange} />
                    </>
                ) : (
                    <>
                        <VaultsList vaults={vaults} onEdit={handleOpenVaultModal} onDeposit={(id) => handleOpenVaultTransModal(id, "DEPOSIT")} onWithdraw={(id) => handleOpenVaultTransModal(id, "WITHDRAWAL")} />
                        <VaultModal open={vaultModalOpen} formData={vaultFormData} onClose={handleCloseVaultModal} onSave={handleSaveVault} onChange={handleVaultFormChange} />
                        <VaultTransactionModal open={vaultTransModalOpen} formData={vaultTransFormData} onClose={handleCloseVaultTransModal} onSave={handleSaveVaultTrans} onChange={handleTransactionFormChange} />
                    </>
                )}
            </PageContainer>
        </Layout>
    );
};

export default Treasury;