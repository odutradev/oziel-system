import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import { PageContainer, HeaderControls, ActionButtonsWrapper } from "./styles";
import MembersTable from "./subcomponents/membersTable";
import useHrMembersHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const HrMembers = () => {
    const { meta, members, loading, handleCreate, handleEdit, handleDelete, handlePaginationChange } = useHrMembersHook();

    return (
        <Layout {...metadata} loading={loading}>
            <PageContainer>
                <HeaderControls>
                    <ActionButtonsWrapper>
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleCreate}>
                            Novo Membro
                        </Button>
                    </ActionButtonsWrapper>
                </HeaderControls>
                <MembersTable meta={meta} members={members} onEdit={handleEdit} onDelete={handleDelete} onPaginationChange={handlePaginationChange} />
            </PageContainer>
        </Layout>
    );
};

export default HrMembers;