import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

export const StyledToggleGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: '100%',
  '& .MuiToggleButtonGroup-grouped': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    '&:not(:first-of-type)': {
      marginLeft: '-1px',
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderBottomLeftRadius: theme.shape.borderRadius,
    },
    '&:last-of-type': {
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
      borderColor: `${theme.palette.divider} !important`,
      color: theme.palette.text.primary,
      zIndex: 1,
    },
    '&:hover': {
      borderColor: theme.palette.text.primary,
      zIndex: 2,
    },
  },
}));