import ContractTable from "./subcomponents/contractTable";
import { PageContainer } from "./styles";
import useContractsHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const ContractsManagement = () => {
    const { meta, contracts, loading, handleCreate, handleEdit, handleDelete, handlePaginationChange } = useContractsHook();

    return (
        <Layout {...metadata} loading={loading}>
            <PageContainer>
                <ContractTable meta={meta} contracts={contracts} onEdit={handleEdit} onDelete={handleDelete} onPaginationChange={handlePaginationChange} onCreate={handleCreate} />
            </PageContainer>
        </Layout>
    );
};

export default ContractsManagement;