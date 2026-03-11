import { TextField, Button, Typography, InputAdornment } from '@mui/material';
import { Email } from '@mui/icons-material';

import { FormContainer, StyledLink } from '../../styles';

import type { RequestFormProps } from './types';

const RequestForm = ({ email, errorMessage, isAuto, isLoading, onChange, onSubmit }: RequestFormProps) => {
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
        value={email}
        onChange={onChange}
        disabled={isAuto || isLoading}
        error={!!errorMessage}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email fontSize="small" sx={{ color: '#999' }} />
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
        Enviar Código
      </Button>
      {!isAuto && (
        <Typography variant="body2" align="center">
          Lembrou a senha? <StyledLink to="/signin">Entre</StyledLink>
        </Typography>
      )}
    </FormContainer>
  );
};

export default RequestForm;