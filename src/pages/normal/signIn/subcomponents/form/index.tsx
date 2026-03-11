import { TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Clear, Email, Lock } from '@mui/icons-material';

import { FormContainer } from './styles';

import type { SignInFormProps } from '../../types';

const SignInForm = ({ credentials, showPassword, errorMessage, success, onInputChange, onClearEmail, onTogglePassword, onSubmit }: SignInFormProps) => {
  return (
    <FormContainer noValidate onSubmit={onSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        value={credentials.email}
        onChange={onInputChange('email')}
        error={!!errorMessage}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email fontSize="small" sx={{ color: 'action.active' }} />
            </InputAdornment>
          ),
          endAdornment: credentials.email && (
            <InputAdornment position="end">
              <IconButton
                onClick={onClearEmail}
                edge="end"
                size="small"
                disableRipple
              >
                <Clear fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={credentials.password}
        onChange={onInputChange('password')}
        error={!!errorMessage}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock fontSize="small" sx={{ color: 'action.active' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={onTogglePassword}
                edge="end"
                size="small"
                disableRipple
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {errorMessage && (
        <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={success}
        sx={{
          mt: 3,
          mb: 2,
          bgcolor: success ? 'success.main' : 'primary.main',
          '&:hover': { bgcolor: success ? 'success.dark' : 'primary.dark' }
        }}
      >
        {success ? 'Entrando...' : 'Entrar'}
      </Button>
    </FormContainer>
  );
};

export default SignInForm;