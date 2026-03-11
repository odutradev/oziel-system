import Layout from "@components/layout";
import metadata from "./metadata";
import UserList from "./subcomponents/fulllist";
import useUsers from "./hooks";

const UsersManagement = () => {
  const {
    users,
    meta,
    loading,
    page,
    limit,
    setPage,
    setLimit,
    setSearchTerm,
    handleEditUser,
  } = useUsers();

  return (
    <Layout {...metadata} loading={loading}>
      <UserList
        data={users}
        meta={meta}
        loading={loading}
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSearch={setSearchTerm}
        onEdit={handleEditUser}
      />
    </Layout>
  );
};

export default UsersManagement;