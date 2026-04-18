import { useNavigate } from "react-router-dom";

import ScheduleModal from "./subcomponents/scheduleModal";
import CalendarView from "./subcomponents/calendarView";
import DraftsTable from "./subcomponents/draftsTable";
import ReviewModal from "./subcomponents/reviewModal";
import { PageContainer, SectionContainer } from "./styles";
import Layout from "@components/layout";
import useMarketingHook from "./hooks";
import metadata from "./metadata";

const MarketingManagement = () => {
    const navigate = useNavigate();
    const {
        handleOpenScheduleModal, handleOpenReviewModal, handleScheduleDraft, handleDeleteDraft, handleDeleteCalendarItem, handleSendApproval, handleReviewItem, handleCloseModals,
        calendarItems, selectedCalendarItem, scheduleModalOpen, reviewModalOpen, selectedDraft, drafts
    } = useMarketingHook();

    const activeCalendarItem = calendarItems.find(c => c._id === selectedCalendarItem);

    return (
        <Layout {...metadata}>
            <PageContainer>
                <SectionContainer>
                    <CalendarView items={calendarItems} onReview={handleOpenReviewModal} onSendApproval={handleSendApproval} onDelete={handleDeleteCalendarItem} onEdit={(item) => navigate(`/dashboard/admin/marketing/edit/${item._id}`)} />
                </SectionContainer>
                <SectionContainer>
                    <DraftsTable drafts={drafts} onEdit={(item) => navigate(`/dashboard/admin/marketing/edit/${item._id}`)} onSchedule={handleOpenScheduleModal} onDelete={handleDeleteDraft} onNew={() => navigate("/dashboard/admin/marketing/new")} />
                </SectionContainer>
                <ScheduleModal open={scheduleModalOpen} draftId={selectedDraft} onClose={handleCloseModals} onSave={handleScheduleDraft} />
                <ReviewModal open={reviewModalOpen} item={activeCalendarItem} onClose={handleCloseModals} onSave={handleReviewItem} />
            </PageContainer>
        </Layout>
    );
};

export default MarketingManagement;