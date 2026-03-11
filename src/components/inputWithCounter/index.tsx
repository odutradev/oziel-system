import { TextField, InputAdornment } from '@mui/material';

import { Container, CounterText } from './styles';
import { getCounterColor } from './utils';

import type { InputWithCounterProps } from './types';

const InputWithCounter = ({ maxLength, value, onChange, sx, ...rest }: InputWithCounterProps) => {
  const currentLength = typeof value === 'string' ? value.length : 0;
  const remaining = maxLength - currentLength;

  return (
    <Container sx={sx}>
      <TextField
        {...rest}
        value={value}
        onChange={onChange}
        inputProps={{ maxLength, ...rest.inputProps }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <CounterText color={getCounterColor(currentLength, maxLength)}>
                  {remaining}
                </CounterText>
              </InputAdornment>
            )
          }
        }}
        fullWidth
      />
    </Container>
  );
};

export default InputWithCounter;
