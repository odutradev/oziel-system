import { FormControl, useMediaQuery, MenuItem, useTheme } from '@mui/material';

import { StyledPagination, RowsContainer, StyledSelect, Container } from './styles';

import type { SelectChangeEvent } from '@mui/material';
import type { PaginationProps } from './types';

const ROWS_OPTIONS = [10, 20, 50, 100];

const Pagination = ({ onPaginationChange, totalItems, currentPage, rowsPerPage }: PaginationProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (totalItems === 0) return null;

    const totalPages = Math.ceil(totalItems / rowsPerPage);

    const handlePageChange = (_: unknown, page: number) => {
        onPaginationChange({ currentPage: page, rows: rowsPerPage });
    };

    const handleRowsChange = (e: SelectChangeEvent<unknown>) => {
        onPaginationChange({ currentPage: 1, rows: Number(e.target.value) });
    };

    return (
        <Container>
            <StyledPagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                boundaryCount={isMobile ? 1 : 2}
                size={isMobile ? "small" : "medium"}
                shape="rounded"
                siblingCount={0}
            />
            <RowsContainer>
                <FormControl variant="standard" size="small">
                    <StyledSelect value={rowsPerPage} onChange={handleRowsChange} disableUnderline>
                        {ROWS_OPTIONS.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt} / pág</MenuItem>
                        ))}
                    </StyledSelect>
                </FormControl>
            </RowsContainer>
        </Container>
    );
};

export default Pagination;