import FullTable from "@components/fullTable";
import { ListContainer } from "./styles";
import { columns } from "./columns";

import type { UserListProps } from "./types";

const UserList = ({ data, meta, page, limit, onPageChange, onLimitChange, onSearch, onEdit }: UserListProps) => {
  return (
    <ListContainer>
      <FullTable
        data={data}
        columns={columns}
        title="Gestão de Usuários"
        chipName="usuários"
        totalCount={meta.total}
        page={page}
        limit={limit}
        onPaginationChange={({ currentPage, rows }) => {
          onPageChange(currentPage);
          onLimitChange(rows);
        }}
        onSearch={onSearch}
        showActions={true}
        showPagination={true}
        rowActions={[{ label: "Editar", onClick: onEdit }]}
        onRowClick={onEdit}
      />
    </ListContainer>
  );
};

export default UserList;
