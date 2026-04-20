import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import MarketingForm from "./subcomponents/marketingForm";
import FormActions from "@components/formActions";
import { PageContainer } from "./styles";
import Layout from "@components/layout";
import useEditMarketing from "./hooks";
import metadata from "./metadata";

const EditMarketing = () => {
    const { itemID } = useParams();
    const navigate = useNavigate();
    const { handleChange, handleSendApproval, handleReview, handleSave, formData, loading, saving } = useEditMarketing(itemID);

    const isEditing = Boolean(itemID);
    const isReviewMode = formData.status === "WAITING_APPROVAL";
    const canSendReview = !isReviewMode && !["APPROVED", "COMPLETED"].includes(formData.status);
    const pageMetadata = { ...metadata, pageTitle: isReviewMode ? "Revisar Solicitação de Marketing" : isEditing ? "Editar Solicitação de Marketing" : "Novo Rascunho de Marketing" };

    return (
        <Layout {...pageMetadata}>
            <PageContainer>
                {loading ? (
                    <Box alignItems="center" justifyContent="center" display="flex" p={8}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <MarketingForm onChange={handleChange} formData={formData} />
                        <FormActions
                            onCancel={() => navigate("/dashboard/admin/marketing")}
                            onSave={isReviewMode ? () => handleReview(true) : handleSave}
                            onDelete={isReviewMode ? () => handleReview(false) : undefined}
                            onExtra={canSendReview ? handleSendApproval : undefined}
                            deleteDisabled={isReviewMode && !formData.feedbackNotes}
                            disabled={saving || !formData.title || !formData.description}
                            extraDisabled={saving || !formData.title || !formData.description}
                            saveLabel={isReviewMode ? "Aprovar Publicação" : "Salvar"}
                            extraLabel="Enviar para Revisão"
                            deleteLabel="Solicitar Ajustes"
                            loading={saving}
                        />
                    </>
                )}
            </PageContainer>
        </Layout>
    );
};

export default EditMarketing;