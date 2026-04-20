import { CircularProgress, Button } from '@mui/material';

import { Container } from './styles';

import type { FormActionsProps } from './types';

const FormActions = ({ onSave, onCancel, onDelete, onExtra, saveLabel = 'Salvar', cancelLabel = 'Cancelar', deleteLabel = 'Excluir', extraLabel = 'Ação Extra', disabled = false, deleteDisabled = false, extraDisabled = false, loading = false, align = 'right' }: FormActionsProps) => (
  <Container align={align}>
    {onDelete && (
      <Button variant="text" color="error" onClick={onDelete} disabled={loading || deleteDisabled} sx={{ mr: align === 'right' ? 'auto' : 2, px: 2 }}>
        {deleteLabel}
      </Button>
    )}
    <Button variant="text" color="inherit" onClick={onCancel} disabled={loading} sx={{ px: 4 }}>
      {cancelLabel}
    </Button>
    {onExtra && (
      <Button variant="outlined" color="primary" onClick={onExtra} disabled={loading || extraDisabled} sx={{ px: 4, py: 1.2 }}>
        {extraLabel}
      </Button>
    )}
    <Button variant="contained" onClick={onSave} disabled={disabled || loading} sx={{ px: 4, py: 1.2, minWidth: 120 }}>
      {loading ? <CircularProgress size={24} color="inherit" /> : saveLabel}
    </Button>
  </Container>
);

export default FormActions;