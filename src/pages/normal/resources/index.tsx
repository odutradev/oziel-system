import ResourceTable from "./subcomponents/resourceTable";
import ResourceModal from "./subcomponents/resourceModal";
import { PageContainer } from "./styles";
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

    return (
        <Layout {...metadata} loading={loading}>
            <PageContainer>
                <ResourceTable
                    meta={meta}
                    items={items}
                    activeTab={activeTab}
                    onEdit={handleOpenModal}
                    onCreate={() => handleOpenModal()}
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