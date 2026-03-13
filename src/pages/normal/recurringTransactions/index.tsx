import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

import RecurringTable from "./subcomponents/recurringTable";
import RecurringModal from "./subcomponents/recurringModal";
import { PageContainer, HeaderControls } from "./styles";
import useRecurringHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const RecurringTransactions = () => {
    const { meta, transactions, modalOpen, formData, handleSave, handleDelete, handleOpenModal, handleCloseModal, handleFormChange, handlePaginationChange } = useRecurringHook();

    return (
        <Layout {...metadata}>
            <PageContainer>
                <HeaderControls>
                    <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal()}>Novo Agendamento</Button>
                </HeaderControls>
                <RecurringTable meta={meta} transactions={transactions} onEdit={handleOpenModal} onDelete={handleDelete} onPaginationChange={handlePaginationChange} />
                <RecurringModal open={modalOpen} formData={formData} onClose={handleCloseModal} onSave={handleSave} onChange={handleFormChange} />
            </PageContainer>
        </Layout>
    );
};

export default RecurringTransactions;