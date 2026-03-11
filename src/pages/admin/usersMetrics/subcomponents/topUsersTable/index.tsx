import { Table, TableBody, TableHead, TableRow, Chip } from '@mui/material';
import stringService from '@utils/services/stringService';

import { TableCard, CardContentArea, TableHeader, TableTitle, TableSubtitle, TableWrapper, HeaderCell, BodyCell, UserWrapper, UserAvatar, UserInfo, UserName, UserEmail, AmountText } from './styles';
import NoData from '@components/noData';

import type { TopUsersTableProps } from './types';

const TopUsersTable = ({ data }: TopUsersTableProps) => {
  const hasData = data && data.length > 0;

  return (
    <TableCard>
      <CardContentArea>
        <TableHeader>
          <TableTitle variant="h6">Top Usuários por Gasto</TableTitle>
          <TableSubtitle variant="body2">Usuários que mais geraram receita</TableSubtitle>
        </TableHeader>
        <TableWrapper>
          {!hasData ? (
            <NoData message="Nenhuma transação encontrada" />
          ) : (
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <HeaderCell>Usuário</HeaderCell>
                  <HeaderCell align="right">Transações</HeaderCell>
                  <HeaderCell align="right">Total Gasto</HeaderCell>
                  <HeaderCell align="center">Status</HeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data!.map((user) => (
                  <TableRow key={user.userId} hover>
                    <BodyCell>
                      <UserWrapper>
                        <UserAvatar>
                          {stringService.getFirstLetters(user.name, 2)}
                        </UserAvatar>
                        <UserInfo>
                          <UserName variant="body2">
                            {user.name}
                          </UserName>
                          <UserEmail variant="caption">
                            {user.email}
                          </UserEmail>
                        </UserInfo>
                      </UserWrapper>
                    </BodyCell>
                    <BodyCell align="right">
                      {user.transactionCount}
                    </BodyCell>
                    <BodyCell align="right">
                      <AmountText>
                        {user.formatted.totalSpent}
                      </AmountText>
                    </BodyCell>
                    <BodyCell align="center">
                      <Chip
                        label={user.status}
                        size="small"
                        color={user.status === 'loggedIn' ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </BodyCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableWrapper>
      </CardContentArea>
    </TableCard>
  );
};

export default TopUsersTable;