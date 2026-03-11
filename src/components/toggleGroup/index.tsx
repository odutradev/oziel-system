import ToggleButton from '@mui/material/ToggleButton';

import { StyledToggleGroup } from './styles';

import type { ToggleGroupProps } from './types';

const ToggleGroup: React.FC<ToggleGroupProps> = ({ options, value, exclusive = true, disabled = false, onChange, ...rest }) => {
  return (
    <StyledToggleGroup
      exclusive={exclusive}
      disabled={disabled}
      onChange={onChange}
      value={value}
      {...rest}
    >
      {options.map((opt) => (
        <ToggleButton
          key={opt.value}
          value={opt.value}
          sx={{ flex: 1, width: '100%' }}
        >
          {opt.label}
        </ToggleButton>
      ))}
    </StyledToggleGroup>
  );
};

export default ToggleGroup;