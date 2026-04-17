import DashboardMetrics from "./subcomponents/dashboardMetrics";
import MembersTable from "./subcomponents/membersTable";
import { PageContainer } from "./styles";
import useHrMembersHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const HrMembers = () => {
    const { meta, members, loading, metrics, loadingMetrics, handleCreate, handleEdit, handleDelete, handlePaginationChange } = useHrMembersHook();

    return (
        <Layout {...metadata} loading={loading}>
            <PageContainer>
                <DashboardMetrics metrics={metrics} loading={loadingMetrics} />
                <MembersTable meta={meta} members={members} onEdit={handleEdit} onDelete={handleDelete} onPaginationChange={handlePaginationChange} onCreate={handleCreate} />
            </PageContainer>
        </Layout>
    );
};

export default HrMembers;