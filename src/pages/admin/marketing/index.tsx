import { useNavigate } from "react-router-dom";

import CalendarView from "./subcomponents/calendarView";
import ScheduleModal from "./subcomponents/scheduleModal";
import DraftsTable from "./subcomponents/draftsTable";
import { SectionContainer, PageContainer } from "./styles";
import useMarketingHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const MarketingManagement = () => {
    const navigate = useNavigate();
    const { handleOpenScheduleModal, handleScheduleDraft, handleDeleteDraft, handleDeleteCalendarItem, handleSendApproval, handleCloseModals, calendarItems, scheduleModalOpen, selectedDraft, drafts } = useMarketingHook();

    return (
        <Layout {...metadata}>
            <PageContainer>
                <SectionContainer>
                    <CalendarView items={calendarItems} onSendApproval={handleSendApproval} onDelete={handleDeleteCalendarItem} onEdit={(item) => navigate(`/dashboard/admin/marketing/edit/${item._id}`)} />
                </SectionContainer>
                <SectionContainer>
                    <DraftsTable drafts={drafts} onEdit={(item) => navigate(`/dashboard/admin/marketing/edit/${item._id}`)} onSchedule={handleOpenScheduleModal} onDelete={handleDeleteDraft} onNew={() => navigate("/dashboard/admin/marketing/new")} />
                </SectionContainer>
                <ScheduleModal open={scheduleModalOpen} draftId={selectedDraft} onClose={handleCloseModals} onSave={handleScheduleDraft} />
            </PageContainer>
        </Layout>
    );
};

export default MarketingManagement;