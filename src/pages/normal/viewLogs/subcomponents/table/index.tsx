import FullTable from "@components/fullTable";
import { logsColumns } from "./columns";

import type { LogsTableProps } from "./types";

const LogsTable = ({ onLimitChange, onPageChange, onSearch, limit, data, meta, page }: LogsTableProps) => {
  return (
    <FullTable
      onPaginationChange={({ currentPage, rows }) => {
        onPageChange(currentPage);
        onLimitChange(rows);
      }}
      title="Logs de Atividade"
      chipName="registros"
      totalCount={meta.total}
      onSearch={onSearch}
      showActions={false}
      columns={logsColumns}
      data={data}
      limit={limit}
      page={page}
      showPagination
    />
  );
};

export default LogsTable;
