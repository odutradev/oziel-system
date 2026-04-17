import LogsTable from "./subcomponents/table";
import Layout from "@components/layout";
import metadata from "./metadata";
import useLogs from "./hooks";

const Logs = () => {
  const { logs, meta, loading, page, limit, setPage, setLimit, setSearchTerm } = useLogs();

  return (
    <Layout {...metadata} loading={loading}>
      <LogsTable
        onLimitChange={setLimit}
        onPageChange={setPage}
        onSearch={setSearchTerm}
        loading={loading}
        data={logs}
        meta={meta}
        limit={limit}
        page={page}
      />
    </Layout>
  );
};

export default Logs;