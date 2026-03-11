import Layout from "@components/layout";
import EmailList from "./subcomponents/list";
import useEmailTemplates from "./hooks";
import metadata from "./metadata";

const EmailsManagement = () => {
  const { state, handlers } = useEmailTemplates();

  return (
    <Layout {...metadata} loading={state.loading}>
      <EmailList
        data={state.templates}
        meta={state.meta}
        loading={state.loading}
        page={state.page}
        limit={state.limit}
        onPageChange={handlers.setPage}
        onLimitChange={handlers.setLimit}
        onSearch={handlers.setSearchTerm}
        onEdit={handlers.handleEditTemplate}
        onSeed={handlers.handleSeedTemplates}
        onBulkSend={handlers.handleSendBulk}
        onCreate={handlers.handleCreateTemplate}
      />
    </Layout>
  );
};

export default EmailsManagement;