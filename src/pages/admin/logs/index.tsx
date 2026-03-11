import Layout from '@components/layout';

import StatsCards from './subcomponents/stats';
import LogsList from './subcomponents/list';
import LogDetails from './subcomponents/details';
import useLogs from './hooks';
import metadata from './metadata';

const SystemLogs = () => {
  const {
    logs,
    meta,
    loading,
    page,
    limit,
    stats,
    selectedLog,
    setPage,
    setLimit,
    setSearchTerm,
    setSelectedLog
  } = useLogs();

  return (
    <Layout {...metadata} loading={loading}>
      <StatsCards stats={stats} />
      <LogsList
        data={logs}
        meta={meta}
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSearch={setSearchTerm}
        onViewDetails={setSelectedLog}
      />
      <LogDetails
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
      />
    </Layout>
  );
};

export default SystemLogs;