import { Box, Chip, IconButton, InputAdornment, Menu, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import Pagination from '@components/pagination';
import { useState, MouseEvent } from 'react';

import { Container, Header, HeaderLeft, HeaderRight, SearchInput, Footer, StyledTableContainer } from './styles';

import type { FullTableProps } from './types';

const FullTable = <T,>({ data = [], columns, title, totalCount, page, limit, onPaginationChange, onSearch, showActions = true, showPagination = true, chipName = 'itens', rowActions = [], onRowClick, headerContent }: FullTableProps<T>) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [search, setSearch] = useState('');

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, row: T) => {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
    setSelectedRow(row)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
    setSelectedRow(null)
  }

  const safeData = data || [];

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Typography fontWeight={600}>{title}</Typography>
          <Chip label={`${totalCount} ${chipName}`} size="small" color="primary" />
        </HeaderLeft>
        <HeaderRight>
          {headerContent}
          {onSearch && (
            <SearchInput
              placeholder="Pesquisar..."
              size="small"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                onSearch?.(e.target.value)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </HeaderRight>
      </Header>

      <StyledTableContainer>
        {safeData.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={6}
          >
            <InboxIcon fontSize="large" color="disabled" />
            <Typography color="text.secondary" mt={1}>
              Nenhum dado disponível
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={String(col.key)} align={col.align || 'left'}>
                    {col.label}
                  </TableCell>
                ))}
                {showActions && <TableCell align="right">Ações</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {safeData.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  onClick={() => onRowClick?.(row)}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map((col) => (
                    <TableCell key={String(col.key)} align={col.align || 'left'}>
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </TableCell>
                  ))}
                  {showActions && (
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
                        <MoreHorizIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </StyledTableContainer>

      {showPagination && safeData.length > 0 && (
        <Footer>
          <Pagination
            totalItems={totalCount}
            currentPage={page}
            rowsPerPage={limit}
            onPaginationChange={onPaginationChange}
          />
        </Footer>
      )}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {rowActions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleMenuClose()
              if (selectedRow) action.onClick(selectedRow)
            }}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  )
}

export default FullTable;