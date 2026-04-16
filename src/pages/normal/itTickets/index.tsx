import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import { PageContainer, HeaderControls, ActionButtonsWrapper } from "./styles";
import TicketTable from "./subcomponents/ticketTable";
import TicketModal from "./subcomponents/ticketModal";
import useTicketsHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const TicketsManagement = () => {
    const { tickets, formData, modalOpen, handleOpenModal, handleCloseModal, handleFormChange, handleSave, handleDelete } = useTicketsHook();

    return (
        <Layout {...metadata}>
            <PageContainer>
                <HeaderControls>
                    <ActionButtonsWrapper>
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal()}>
                            Novo Chamado
                        </Button>
                    </ActionButtonsWrapper>
                </HeaderControls>
                <TicketTable tickets={tickets} onEdit={handleOpenModal} onDelete={handleDelete} />
                <TicketModal open={modalOpen} formData={formData} handleClose={handleCloseModal} handleSave={handleSave} onChange={handleFormChange} />
            </PageContainer>
        </Layout>
    );
};

export default TicketsManagement;