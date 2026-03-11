import { Button, CircularProgress } from '@mui/material';

import { Container } from './styles';

import type { FormActionsProps } from './types';

const FormActions = ({
  onSave,
  onCancel,
  onDelete,
  saveLabel = 'Salvar',
  cancelLabel = 'Cancelar',
  deleteLabel = 'Excluir',
  disabled = false,
  loading = false,
  align = 'right',
}: FormActionsProps) => (
  <Container align={align}>
    {onDelete && (
      <Button
        variant="text"
        color="error"
        onClick={onDelete}
        disabled={loading}
        sx={{ mr: align === 'right' ? 'auto' : 2, px: 2 }}
      >
        {deleteLabel}
      </Button>
    )}
    <Button
      variant="text"
      color="inherit"
      onClick={onCancel}
      disabled={loading}
      sx={{ px: 4 }}
    >
      {cancelLabel}
    </Button>
    <Button
      variant="contained"
      onClick={onSave}
      disabled={disabled || loading}
      sx={{ px: 4, py: 1.2, minWidth: 120 }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : saveLabel}
    </Button>
  </Container>
);

export default FormActions;