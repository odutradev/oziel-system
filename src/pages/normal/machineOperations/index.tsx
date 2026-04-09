import { ChevronRight, ChevronLeft, Add } from "@mui/icons-material";
import { Typography, IconButton, Button } from "@mui/material";

import { PageContainer, HeaderControls, MonthSelector, ActionButtonsWrapper } from "./styles";
import DashboardCards from "./subcomponents/dashboardCards";
import OperationTable from "./subcomponents/operationTable";
import OperationModal from "./subcomponents/operationModal";
import useMachineOperationsHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const MachineOperations = () => {
    const { metrics, operators, fleets, operations, modalOpen, formData, selectedDate, handleSave, handleDelete, handleStatusChange, handleOpenModal, handleCloseModal, handleFormChange, handleChangeMonth } = useMachineOperationsHook();
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
                    <ActionButtonsWrapper>
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal()}>
                            Nova Operação
                        </Button>
                    </ActionButtonsWrapper>
                </HeaderControls>
                <DashboardCards metrics={metrics} />
                <OperationTable operations={operations} operators={operators} fleets={fleets} onEdit={handleOpenModal} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                <OperationModal open={modalOpen} formData={formData} operators={operators} fleets={fleets} onClose={handleCloseModal} onSave={handleSave} onChange={handleFormChange} />
            </PageContainer>
        </Layout>
    );
};

export default MachineOperations;