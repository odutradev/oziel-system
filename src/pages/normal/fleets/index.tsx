import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

import { PageContainer, HeaderControls, ActionButtonsWrapper } from "./styles";
import FleetsTable from "./subcomponents/fleetsTable";
import FleetModal from "./subcomponents/fleetModal";
import Layout from "@components/layout";
import useFleetsHook from "./hooks";
import metadata from "./metadata";

const Fleets = () => {
    const { meta, fleets, modalOpen, formData, handleSave, handleDelete, handleOpenModal, handleCloseModal, handleFormChange, handlePaginationChange } = useFleetsHook();

    return (
        <Layout {...metadata}>
            <PageContainer>
                <HeaderControls>
                    <ActionButtonsWrapper>
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal()}>
                            Nova Frota
                        </Button>
                    </ActionButtonsWrapper>
                </HeaderControls>
                <FleetsTable meta={meta} fleets={fleets} onEdit={handleOpenModal} onDelete={handleDelete} onPaginationChange={handlePaginationChange} />
                <FleetModal open={modalOpen} formData={formData} onClose={handleCloseModal} onSave={handleSave} onChange={handleFormChange} />
            </PageContainer>
        </Layout>
    );
};

export default Fleets;