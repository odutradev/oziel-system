import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import MarketingForm from "./subcomponents/marketingForm";
import FormActions from "@components/formActions";
import Layout from "@components/layout";
import { PageContainer } from "./styles";
import useEditMarketing from "./hooks";
import metadata from "./metadata";

const EditMarketing = () => {
    const { itemID } = useParams();
    const navigate = useNavigate();
    const { handleChange, handleReview, handleSave, formData, loading, saving } = useEditMarketing(itemID);

    const isEditing = Boolean(itemID);
    const isReviewMode = formData.status === "WAITING_APPROVAL";
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
                        <MarketingForm isEditing={isEditing} onChange={handleChange} formData={formData} />
                        <FormActions
                            onCancel={() => navigate("/dashboard/admin/marketing")}
                            onSave={isReviewMode ? () => handleReview(true) : handleSave}
                            onDelete={isReviewMode ? () => handleReview(false) : undefined}
                            saveLabel={isReviewMode ? "Aprovar Publicação" : "Salvar"}
                            deleteDisabled={isReviewMode && !formData.feedbackNotes}
                            disabled={saving || !formData.title || !formData.description}
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