import { IconButton, Tooltip, Button } from "@mui/material";
import { Send, Add, Refresh } from "@mui/icons-material";

import { Container, HeaderActions } from "./styles";
import FullTable from "@components/fullTable";
import type { EmailListProps } from "./types";
import { columns } from "./columns";

const EmailList = ({ data, meta, page, limit, onPageChange, onLimitChange, onSearch, onEdit, onSeed, onBulkSend, onCreate }: EmailListProps) => {
  return (
    <Container>
      <FullTable
        data={data}
        columns={columns}
        title="Templates de Email"
        chipName="templates"
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
        headerContent={
          <HeaderActions>
            <Tooltip title="Resetar templates padrão">
              <IconButton size="small" onClick={onSeed} color="primary">
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>
            <Button variant="outlined" size="small" startIcon={<Send />} onClick={onBulkSend}>
              Envio em Massa
            </Button>
            <Button variant="contained" size="small" startIcon={<Add />} onClick={onCreate}>
              Novo Template
            </Button>
          </HeaderActions>
        }
      />
    </Container>
  );
};

export default EmailList;
