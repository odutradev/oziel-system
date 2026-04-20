import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import ContentStrategy from "./subcomponents/contentStrategy";
import ReviewSection from "./subcomponents/reviewSection";
import BasicInfo from "./subcomponents/basicInfo";
import FormActions from "@components/formActions";
import Layout from "@components/layout";
import useEditMarketing from "./hooks";
import metadata from "./metadata";

const EditMarketing = () => {
    const { itemID } = useParams();
    const navigate = useNavigate();
    const { handleChange, handleSendApproval, handleReview, handleSave, formData, loading, saving } = useEditMarketing(itemID);

    const isEditing = Boolean(itemID);
    const isReviewMode = formData.status === "WAITING_APPROVAL";
    const canSendReview = !isReviewMode && formData.status !== "COMPLETED";
    const pageMetadata = { ...metadata, pageTitle: isReviewMode ? "Revisar Solicitação de Marketing" : isEditing ? "Editar Solicitação de Marketing" : "Novo Rascunho de Marketing" };

    return (
        <Layout {...pageMetadata}>
            {loading ? (
                <Box alignItems="center" justifyContent="center" display="flex" p={8}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box flexDirection="column" display="flex" gap={3}>
                    <BasicInfo
                        onChange={handleChange}
                        formData={formData}
                    />
                    <ContentStrategy
                        onChange={handleChange}
                        formData={formData}
                    />
                    <ReviewSection
                        isReviewMode={isReviewMode}
                        onChange={handleChange}
                        formData={formData}
                    />
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
                </Box>
            )}
        </Layout>
    );
};

export default EditMarketing;