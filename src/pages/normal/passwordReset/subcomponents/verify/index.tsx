import { TextField, Button, Typography } from '@mui/material';

import { FormContainer, PinContainer } from '../../styles';

import type { VerifyFormProps } from './types';

const VerifyForm = ({ code, errorMessage, pinRefs, isLoading, onPinChange, onPinKeyDown, onPinPaste, onSubmit }: VerifyFormProps) => {
  return (
    <FormContainer noValidate onSubmit={onSubmit}>
      <PinContainer>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <TextField
            key={index}
            inputRef={(el) => (pinRefs.current[index] = el)}
            value={code[index] || ''}
            onChange={(e) => onPinChange(index, e.target.value)}
            onKeyDown={(e) => onPinKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)}
            onPaste={onPinPaste}
            disabled={isLoading}
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontSize: '1.5rem', padding: '12px' },
            }}
            sx={{
              width: 50,
              '& input': {
                padding: '12px',
              },
            }}
            error={!!errorMessage}
          />
        ))}
      </PinContainer>
      {errorMessage && (
        <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} disabled={isLoading}>
        Verificar Código
      </Button>
    </FormContainer>
  );
};

export default VerifyForm;