import { Pagination as MuiPagination, Select, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ theme }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: theme.spacing(1)
    }
}));

export const StyledPagination = styled(MuiPagination)(({ theme }) => ({
    '& .MuiPaginationItem-root': {
        fontWeight: 500,
        '&.Mui-selected': {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark
            }
        }
    }
}));

export const RowsContainer = styled(Box)({
    alignItems: 'center',
    display: 'flex'
});

export const StyledSelect = styled(Select)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    fontWeight: 500,
    '& .MuiSelect-select': {
        paddingRight: '24px !important',
        paddingBottom: '4px',
        paddingTop: '4px'
    },
    '& .MuiSvgIcon-root': {
        color: theme.palette.text.secondary
    }
}));