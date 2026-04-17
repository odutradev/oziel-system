import MetricsDashboardHeader from "@components/metricsDashboardHeader";
import Layout from "@components/layout";

import RecentContracts from "./subcomponents/recentContracts";
import SummaryCards from "./subcomponents/summaryCards";
import useContractsDashboard from "./hooks";
import Charts from "./subcomponents/charts";
import { PageContainer, ContentGrid } from "./styles";
import metadata from "./metadata";

const ContractsDashboard = () => {
    const { data, loading, period, startDate, endDate, handleDateChange, handlePeriodChange } = useContractsDashboard();

    return (
        <Layout {...metadata} loading={loading}>
            <PageContainer>
                <MetricsDashboardHeader
                    title="Métricas de Contratos"
                    subtitle="Acompanhamento geral de valores, status e rentabilidade"
                    period={period}
                    endDate={endDate}
                    startDate={startDate}
                    onDateChange={handleDateChange}
                    onPeriodChange={handlePeriodChange}
                />
                {data && (
                    <ContentGrid>
                        <SummaryCards summary={data.summary} />
                        <Charts distribution={data.distribution} />
                        <RecentContracts contracts={data.recentContracts} />
                    </ContentGrid>
                )}
            </PageContainer>
        </Layout>
    );
};

export default ContractsDashboard;