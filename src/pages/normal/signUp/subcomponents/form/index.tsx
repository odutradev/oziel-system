import { TextField, Button, Typography, InputAdornment, IconButton, Box } from '@mui/material';
import { Visibility, VisibilityOff, Clear, Email, Lock, Person } from '@mui/icons-material';

import type { SignUpFormProps } from './types';

const SignUpForm = ({ credentials, confirmPassword, showPassword, errorMessage, success, onInputChange, onConfirmPasswordChange, onClearField, onTogglePassword, onSubmit }: SignUpFormProps) => {
  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1, width: '100%' }}>
      <TextField
        margin="normal"
        fullWidth
        id="name"
        label="Nome"
        name="name"
        autoComplete="name"
        value={credentials.name}
        onChange={onInputChange('name')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person fontSize="small" sx={{ color: '#999' }} />
            </InputAdornment>
          ),
          endAdornment: credentials.name && (
            <InputAdornment position="end">
              <IconButton
                onClick={onClearField('name')}
                edge="end"
                sx={{ p: 0.5, mr: 0.5, outline: 'none', '&:focus': { outline: 'none' } }}
                disableRipple
                disableFocusRipple
              >
                <Clear fontSize="small" sx={{ color: '#999' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        value={credentials.email}
        onChange={onInputChange('email')}
        error={!!errorMessage}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email fontSize="small" sx={{ color: '#999' }} />
            </InputAdornment>
          ),
          endAdornment: credentials.email && (
            <InputAdornment position="end">
              <IconButton
                onClick={onClearField('email')}
                edge="end"
                sx={{ p: 0.5, mr: 0.5, outline: 'none', '&:focus': { outline: 'none' } }}
                disableRipple
                disableFocusRipple
              >
                <Clear fontSize="small" sx={{ color: '#999' }} />
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
              >
                {showPassword ? <VisibilityOff fontSize="small" sx={{ color: '#999' }} /> : <Visibility fontSize="small" sx={{ color: '#999' }} />}
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
        label="Confirmar senha"
        type={showPassword ? 'text' : 'password'}
        id="confirmPassword"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        error={!!errorMessage}
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
              >
                {showPassword ? <VisibilityOff fontSize="small" sx={{ color: '#999' }} /> : <Visibility fontSize="small" sx={{ color: '#999' }} />}
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
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: success ? 'success.main' : undefined,
          '&:hover': { backgroundColor: success ? 'success.dark' : undefined }
        }}
      >
        Cadastrar
      </Button>
    </Box>
  );
};

export default SignUpForm;