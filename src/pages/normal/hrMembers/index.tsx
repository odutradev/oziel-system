import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import { PageContainer, HeaderControls, ActionButtonsWrapper } from "./styles";
import MembersTable from "./subcomponents/membersTable";
import MemberModal from "./subcomponents/memberModal";
import useHrMembersHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const HrMembers = () => {
    const { meta, members, modalOpen, formData, loading, handleSave, handleDelete, handleOpenModal, handleCloseModal, handleFormChange, handlePaginationChange } = useHrMembersHook();

    return (
        <Layout {...metadata} loading={loading}>
            <PageContainer>
                <HeaderControls>
                    <ActionButtonsWrapper>
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal()}>
                            Novo Membro
                        </Button>
                    </ActionButtonsWrapper>
                </HeaderControls>
                <MembersTable meta={meta} members={members} onEdit={handleOpenModal} onDelete={handleDelete} onPaginationChange={handlePaginationChange} />
                <MemberModal open={modalOpen} formData={formData} onClose={handleCloseModal} onSave={handleSave} onChange={handleFormChange} />
            </PageContainer>
        </Layout>
    );
};

export default HrMembers;