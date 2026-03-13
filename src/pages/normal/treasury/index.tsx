import { Add, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Typography, IconButton, Button } from "@mui/material";

import { PageContainer, HeaderControls, MonthSelector } from "./styles";
import TransactionModal from "./subcomponents/transactionModal";
import TransactionList from "./subcomponents/transactionList";
import DashboardCards from "./subcomponents/dashboardCards";
import Layout from "@components/layout";
import useTreasuryHook from "./hooks";
import metadata from "./metadata";

const Treasury = () => {
    const {
        data,
        modalOpen,
        selectedDate,
        formData,
        handleSave,
        handleDelete,
        handleConfirm,
        handleOpenModal,
        handleCloseModal,
        handleFormChange,
        handleChangeMonth
    } = useTreasuryHook();

    const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(selectedDate);

    return (
        <Layout {...metadata}>
            <PageContainer component="main">
                <HeaderControls component="section">
                    <MonthSelector>
                        <IconButton onClick={() => handleChangeMonth("prev")} size="small"><ChevronLeft /></IconButton>
                        <Typography variant="h6" textTransform="capitalize">{monthName}</Typography>
                        <IconButton onClick={() => handleChangeMonth("next")} size="small"><ChevronRight /></IconButton>
                    </MonthSelector>
                    <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal()}>
                        Nova Transação
                    </Button>
                </HeaderControls>

                <DashboardCards transactions={data?.transactions ?? []} currentBalance={data?.currentBalance ?? 0} />

                <TransactionList transactions={data?.transactions ?? []} onEdit={handleOpenModal} onDelete={handleDelete} onConfirm={handleConfirm} />

                <TransactionModal open={modalOpen} formData={formData} onClose={handleCloseModal} onSave={handleSave} onChange={handleFormChange} />
            </PageContainer>
        </Layout>
    );
};

export default Treasury;