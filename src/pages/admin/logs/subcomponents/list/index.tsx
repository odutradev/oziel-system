import FullTable from '@components/fullTable';
import { columns } from './columns';
import { ListContainer } from './styles';

import type { LogsListProps } from './types';

const LogsList = ({
  data,
  meta,
  page,
  limit,
  onPageChange,
  onLimitChange,
  onSearch,
  onViewDetails,
}: LogsListProps) => {
  return (
    <ListContainer>
      <FullTable
        data={data}
        columns={columns}
        title="Registro de Atividades"
        chipName="logs"
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
        rowActions={[{ label: 'Ver Detalhes', onClick: onViewDetails }]}
        onRowClick={onViewDetails}
      />
    </ListContainer>
  );
};

export default LogsList;