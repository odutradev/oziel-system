import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface UploadBoxProps {
  isDragging: boolean;
  hasError: boolean;
}

export const UploadBox = styled(Box)<UploadBoxProps>(({ theme, isDragging, hasError }) => ({
  border: `2px dashed ${hasError ? theme.palette.error.main : isDragging ? theme.palette.primary.main : theme.palette.divider}`,
  borderRadius: (theme.shape.borderRadius as number) * 2,
  padding: theme.spacing(6),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: isDragging ? theme.palette.action.hover : theme.palette.background.paper,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

export const HiddenInput = styled('input')({
  display: 'none',
});