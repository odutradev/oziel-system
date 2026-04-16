import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import { PageContainer, HeaderControls, ActionButtonsWrapper } from "./styles";
import RequestTable from "./subcomponents/requestTable";
import RequestModal from "./subcomponents/requestModal";
import ReviewModal from "./subcomponents/reviewModal";
import useMarketingRequestsHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const MarketingRequests = () => {
    const { requests, formData, modalOpen, reviewOpen, reviewData, handleOpenModal, handleCloseModal, handleFormChange, handleSave, handleOpenReview, handleCloseReview, handleReviewSave, handleReviewChange, handleSendApproval } = useMarketingRequestsHook();

    return (
        <Layout {...metadata}>
            <PageContainer>
                <HeaderControls>
                    <ActionButtonsWrapper>
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal()}>
                            Nova Solicitação
                        </Button>
                    </ActionButtonsWrapper>
                </HeaderControls>
                <RequestTable requests={requests} onEdit={handleOpenModal} onReview={handleOpenReview} onSendApproval={handleSendApproval} />
                <RequestModal open={modalOpen} formData={formData} handleClose={handleCloseModal} handleSave={handleSave} onChange={handleFormChange} />
                <ReviewModal open={reviewOpen} reviewData={reviewData} handleClose={handleCloseReview} handleSave={handleReviewSave} onChange={handleReviewChange} />
            </PageContainer>
        </Layout>
    );
};

export default MarketingRequests;