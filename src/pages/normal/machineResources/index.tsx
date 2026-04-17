import ResourceTable from "./subcomponents/resourceTable";
import useMachineResourcesHook from "./hooks";
import { PageContainer } from "./styles";
import Layout from "@components/layout";
import metadata from "./metadata";

const MachineResources = () => {
    const {
        meta,
        items,
        loading,
        activeTab,
        handleEdit,
        handleCreate,
        handleDelete,
        handleTabChange,
        handlePaginationChange
    } = useMachineResourcesHook();

    return (
        <Layout {...metadata}>
            <PageContainer>
                <ResourceTable
                    meta={meta}
                    items={items}
                    loading={loading}
                    activeTab={activeTab}
                    onEdit={handleEdit}
                    onCreate={handleCreate}
                    onDelete={handleDelete}
                    onTabChange={handleTabChange}
                    onPaginationChange={handlePaginationChange}
                />
            </PageContainer>
        </Layout>
    );
};

export default MachineResources;