import ScheduleModal from "./subcomponents/scheduleModal";
import CalendarView from "./subcomponents/calendarView";
import DraftsTable from "./subcomponents/draftsTable";
import ReviewModal from "./subcomponents/reviewModal";
import DraftModal from "./subcomponents/draftModal";
import { PageContainer, SectionContainer } from "./styles";
import Layout from "@components/layout";
import useMarketingHook from "./hooks";
import metadata from "./metadata";

const MarketingManagement = () => {
    const {
        handleOpenScheduleModal, handleOpenReviewModal, handleOpenDraftModal, handleScheduleDraft, handleDeleteDraft, handleSendApproval, handleReviewItem, handleCloseModals, handleSaveDraft,
        calendarItems, selectedCalendarItem, scheduleModalOpen, reviewModalOpen, draftModalOpen, selectedDraft, drafts
    } = useMarketingHook();

    const activeCalendarItem = calendarItems.find(c => c._id === selectedCalendarItem);
    const activeDraft = drafts.find(d => d._id === selectedDraft);

    return (
        <Layout {...metadata}>
            <PageContainer>
                <SectionContainer>
                    <CalendarView items={calendarItems} onReview={handleOpenReviewModal} onSendApproval={handleSendApproval} onEdit={handleOpenDraftModal} />
                </SectionContainer>
                <SectionContainer>
                    <DraftsTable drafts={drafts} onEdit={handleOpenDraftModal} onSchedule={(id) => handleOpenScheduleModal(id)} onDelete={handleDeleteDraft} onNew={() => handleOpenDraftModal()} />
                </SectionContainer>
                <DraftModal open={draftModalOpen} draft={activeDraft} onClose={handleCloseModals} onSave={handleSaveDraft} />
                <ScheduleModal open={scheduleModalOpen} draftId={selectedDraft} onClose={handleCloseModals} onSave={handleScheduleDraft} />
                <ReviewModal open={reviewModalOpen} item={activeCalendarItem} onClose={handleCloseModals} onSave={handleReviewItem} />
            </PageContainer>
        </Layout>
    );
};

export default MarketingManagement;