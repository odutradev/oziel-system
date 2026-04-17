import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import ResourceTable from "./subcomponents/resourceTable";
import ResourceModal from "./subcomponents/resourceModal";
import { PageContainer, HeaderControls } from "./styles";
import useResourcesHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const Resources = () => {
    const {
        meta,
        items,
        loading,
        activeTab,
        modalState,
        handleSave,
        handleDelete,
        handleOpenModal,
        handleTabChange,
        handleCloseModal,
        handleFormChange,
        handlePaginationChange
    } = useResourcesHook();

    const isFleet = activeTab === "fleets";

    return (
        <Layout {...metadata} loading={loading}>
            <PageContainer>
                <HeaderControls>
                    <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal()}>
                        {isFleet ? "Nova Frota" : "Novo Operador"}
                    </Button>
                </HeaderControls>
                <ResourceTable
                    meta={meta}
                    items={items}
                    activeTab={activeTab}
                    onEdit={handleOpenModal}
                    onDelete={handleDelete}
                    onTabChange={handleTabChange}
                    onPaginationChange={handlePaginationChange}
                />
                <ResourceModal
                    state={modalState}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    onChange={handleFormChange}
                />
            </PageContainer>
        </Layout>
    );
};

export default Resources;