import { TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';

import { FormContainer } from '../../styles';

import type { ConfirmFormProps } from './types';

const ConfirmForm = ({ formData, showPassword, errorMessage, isLoading, onChange, onTogglePassword, onSubmit }: ConfirmFormProps) => {
  return (
    <FormContainer noValidate onSubmit={onSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="newPassword"
        label="Nova Senha"
        type={showPassword ? 'text' : 'password'}
        id="newPassword"
        autoComplete="new-password"
        value={formData.newPassword}
        onChange={onChange('newPassword')}
        error={!!errorMessage}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock fontSize="small" sx={{ color: '#999' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={onTogglePassword}
                edge="end"
                sx={{ p: 0.5, mr: 0.5, outline: 'none', '&:focus': { outline: 'none' } }}
                disableRipple
                disableFocusRipple
                disabled={isLoading}
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" sx={{ color: '#999' }} />
                ) : (
                  <Visibility fontSize="small" sx={{ color: '#999' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirmar Nova Senha"
        type={showPassword ? 'text' : 'password'}
        id="confirmPassword"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={onChange('confirmPassword')}
        error={!!errorMessage}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock fontSize="small" sx={{ color: '#999' }} />
            </InputAdornment>
          ),
        }}
      />
      {errorMessage && (
        <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
        Redefinir Senha
      </Button>
    </FormContainer>
  );
};

export default ConfirmForm;