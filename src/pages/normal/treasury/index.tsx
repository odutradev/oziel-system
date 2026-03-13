import { ChevronRight, ChevronLeft, Add } from "@mui/icons-material";
import { Typography, IconButton, Button } from "@mui/material";

import TransactionTable from "./subcomponents/transactionTable";
import TransactionModal from "./subcomponents/transactionModal";
import DashboardCards from "./subcomponents/dashboardCards";
import { PageContainer, HeaderControls, MonthSelector } from "./styles";
import Layout from "@components/layout";
import useTreasuryHook from "./hooks";
import metadata from "./metadata";

const Treasury = () => {
    const { meta, transactions, currentBalance, modalOpen, selectedDate, formData, handleSave, handleDelete, handleConfirm, handleOpenModal, handleCloseModal, handleFormChange, handleChangeMonth, handlePaginationChange } = useTreasuryHook();
    const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(selectedDate);

    return (
        <Layout {...metadata}>
            <PageContainer>
                <HeaderControls>
                    <MonthSelector>
                        <IconButton onClick={() => handleChangeMonth("prev")} size="small"><ChevronLeft /></IconButton>
                        <Typography variant="h6" textTransform="capitalize">{monthName}</Typography>
                        <IconButton onClick={() => handleChangeMonth("next")} size="small"><ChevronRight /></IconButton>
                    </MonthSelector>
                    <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal()}>Nova Transação</Button>
                </HeaderControls>
                <DashboardCards transactions={transactions} currentBalance={currentBalance} />
                <TransactionTable meta={meta} transactions={transactions} onEdit={handleOpenModal} onDelete={handleDelete} onConfirm={handleConfirm} onPaginationChange={handlePaginationChange} />
                <TransactionModal open={modalOpen} formData={formData} onClose={handleCloseModal} onSave={handleSave} onChange={handleFormChange} />
            </PageContainer>
        </Layout>
    );
};

export default Treasury;