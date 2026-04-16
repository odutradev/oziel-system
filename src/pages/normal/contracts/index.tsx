import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import { PageContainer, HeaderControls, ActionButtonsWrapper } from "./styles";
import ContractTable from "./subcomponents/contractTable";
import ContractModal from "./subcomponents/contractModal";
import useContractsHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const ContractsManagement = () => {
    const { contracts, formData, modalOpen, handleOpenModal, handleCloseModal, handleFormChange, handleSave, handleDelete } = useContractsHook();

    return (
        <Layout {...metadata}>
            <PageContainer>
                <HeaderControls>
                    <ActionButtonsWrapper>
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal()}>
                            Novo Contrato
                        </Button>
                    </ActionButtonsWrapper>
                </HeaderControls>
                <ContractTable contracts={contracts} onEdit={handleOpenModal} onDelete={handleDelete} />
                <ContractModal open={modalOpen} formData={formData} handleClose={handleCloseModal} handleSave={handleSave} onChange={handleFormChange} />
            </PageContainer>
        </Layout>
    );
};

export default ContractsManagement;