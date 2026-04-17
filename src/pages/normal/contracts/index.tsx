import ContractGrid from "./subcomponents/contractGrid";
import useContractsHook from "./hooks";
import { PageContainer } from "./styles";
import Layout from "@components/layout";
import metadata from "./metadata";

const ContractsManagement = () => {
    const { meta, contracts, loading, handleCreate, handleEdit, handleDelete, handlePaginationChange } = useContractsHook();

    return (
        <Layout {...metadata} loading={loading}>
            <PageContainer>
                <ContractGrid meta={meta} contracts={contracts} onEdit={handleEdit} onDelete={handleDelete} onPaginationChange={handlePaginationChange} onCreate={handleCreate} />
            </PageContainer>
        </Layout>
    );
};

export default ContractsManagement;