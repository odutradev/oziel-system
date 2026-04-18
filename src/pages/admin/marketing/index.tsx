import { Tabs, Tab, Box } from "@mui/material";

import ScheduleModal from "./subcomponents/scheduleModal";
import CalendarTable from "./subcomponents/calendarTable";
import ReviewModal from "./subcomponents/reviewModal";
import DraftsTable from "./subcomponents/draftsTable";
import DraftModal from "./subcomponents/draftModal";
import { PageContainer, TabPanelContainer } from "./styles";
import useMarketingHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const MarketingManagement = () => {
    const {
        handleOpenScheduleModal, handleOpenReviewModal, handleOpenDraftModal, handleScheduleDraft, handleDeleteDraft, handleSendApproval, handleReviewItem, handleCloseModals, handleSaveDraft, handleTabChange,
        calendarItems, selectedCalendarItem, scheduleModalOpen, reviewModalOpen, draftModalOpen, selectedDraft, currentTab, loading, drafts
    } = useMarketingHook();

    const activeDraft = drafts.find(d => d._id === selectedDraft);
    const activeCalendarItem = calendarItems.find(c => c._id === selectedCalendarItem);

    return (
        <Layout {...metadata}>
            <PageContainer>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={currentTab} onChange={(_, newValue) => handleTabChange(newValue)} aria-label="marketing tabs">
                        <Tab label="Rascunhos" disabled={loading} />
                        <Tab label="Calendário e Aprovações" disabled={loading} />
                    </Tabs>
                </Box>
                <TabPanelContainer>
                    {currentTab === 0 && <DraftsTable drafts={drafts} onEdit={handleOpenDraftModal} onSchedule={(id) => handleOpenScheduleModal(id)} onDelete={handleDeleteDraft} onNew={() => handleOpenDraftModal()} />}
                    {currentTab === 1 && <CalendarTable items={calendarItems} onReview={handleOpenReviewModal} onSendApproval={handleSendApproval} onEdit={handleOpenDraftModal} />}
                </TabPanelContainer>
                <DraftModal open={draftModalOpen} draft={activeDraft} onClose={handleCloseModals} onSave={handleSaveDraft} />
                <ScheduleModal open={scheduleModalOpen} draftId={selectedDraft} onClose={handleCloseModals} onSave={handleScheduleDraft} />
                <ReviewModal open={reviewModalOpen} item={activeCalendarItem} onClose={handleCloseModals} onSave={handleReviewItem} />
            </PageContainer>
        </Layout>
    );
};

export default MarketingManagement;