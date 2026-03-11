import { FormControl, MenuItem, Typography, SelectChangeEvent, useTheme, useMediaQuery } from '@mui/material';

import { Container, StyledPagination, RowsContainer, StyledSelect } from './styles';

import type { PaginationProps } from './types';

const Pagination = ({ onPaginationChange, totalItems, currentPage, rowsPerPage }: PaginationProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handlePageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
    onPaginationChange({ currentPage: page, rows: rowsPerPage })
  };

  const handleRowsChange = (e: SelectChangeEvent<unknown>) => {
    const newRows = Number(e.target.value)
    onPaginationChange({ currentPage: 1, rows: newRows })
  };

  return (
    <Container>
      <StyledPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        siblingCount={isMobile ? 0 : 1}
        boundaryCount={isMobile ? 1 : 2}
        size={isMobile ? "small" : "medium"}
      />
      <RowsContainer>
        <Typography variant="body1" mr={1}>
          {isMobile ? 'Linhas:' : 'Linhas por página:'}
        </Typography>
        <FormControl variant="outlined" size="small">
          <StyledSelect value={rowsPerPage} onChange={handleRowsChange}>
            {[15, 30, 50, 100].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      </RowsContainer>
    </Container>
  );
};

export default Pagination;