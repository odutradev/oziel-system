import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import { PageContainer, HeaderControls, ActionButtonsWrapper } from "./styles";
import OperatorsTable from "./subcomponents/operatorsTable";
import OperatorModal from "./subcomponents/operatorModal";
import useOperatorsHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const Operators = () => {
    const { meta, operators, modalOpen, formData, handleSave, handleDelete, handleOpenModal, handleCloseModal, handleFormChange, handlePaginationChange } = useOperatorsHook();

    return (
        <Layout {...metadata}>
            <PageContainer>
                <HeaderControls>
                    <ActionButtonsWrapper>
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal()}>
                            Novo Operador
                        </Button>
                    </ActionButtonsWrapper>
                </HeaderControls>
                <OperatorsTable meta={meta} operators={operators} onEdit={handleOpenModal} onDelete={handleDelete} onPaginationChange={handlePaginationChange} />
                <OperatorModal open={modalOpen} formData={formData} onClose={handleCloseModal} onSave={handleSave} onChange={handleFormChange} />
            </PageContainer>
        </Layout>
    );
};

export default Operators;