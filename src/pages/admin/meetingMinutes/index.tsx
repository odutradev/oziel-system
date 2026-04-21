import { useNavigate } from "react-router-dom";

import CalendarView from "./subcomponents/calendarView";
import MinutesTable from "./subcomponents/minutesTable";
import { SectionContainer, PageContainer } from "./styles";
import useMinutesHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const MeetingMinutes = () => {
    const navigate = useNavigate();
    const { handleDeleteMinute, setLimit, setPage, minutes, loading, limit, total, page } = useMinutesHook();

    return (
        <Layout {...metadata}>
            <PageContainer>
                <SectionContainer>
                    <CalendarView items={minutes} onDelete={handleDeleteMinute} onEdit={(item) => navigate(`/dashboard/admin/secretary/minutes/edit/${item._id}`)} />
                </SectionContainer>
                <SectionContainer>
                    <MinutesTable setLimit={setLimit} setPage={setPage} minutes={minutes} loading={loading} total={total} limit={limit} page={page} onDelete={handleDeleteMinute} onEdit={(item) => navigate(`/dashboard/admin/secretary/minutes/edit/${item._id}`)} onNew={() => navigate("/dashboard/admin/secretary/minutes/new")} />
                </SectionContainer>
            </PageContainer>
        </Layout>
    );
};

export default MeetingMinutes;