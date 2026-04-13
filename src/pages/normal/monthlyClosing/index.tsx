import OperatorTotalsTable from "./subcomponents/operatorTotalsTable";
import { PageContainer, PrintHiddenWrapper } from "./styles";
import HeaderControls from "./subcomponents/headerControls";
import DetailsTable from "./subcomponents/detailsTable";
import SummaryCards from "./subcomponents/summaryCards";
import useMonthlyClosingHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const MonthlyClosing = () => {
    const { data, loading, selectedDate, handlePrint, handleChangeMonth } = useMonthlyClosingHook();

    return (
        <Layout {...metadata}>
            <PageContainer>
                <PrintHiddenWrapper>
                    <HeaderControls selectedDate={selectedDate} handleChangeMonth={handleChangeMonth} handlePrint={handlePrint} />
                </PrintHiddenWrapper>
                {!loading && data && (
                    <>
                        <SummaryCards totals={data.totals} />
                        <OperatorTotalsTable data={data.operatorTotals} />
                        <DetailsTable data={data.details} />
                    </>
                )}
            </PageContainer>
        </Layout>
    );
};

export default MonthlyClosing;