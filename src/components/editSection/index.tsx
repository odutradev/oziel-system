import { Typography } from '@mui/material';

import { StyledPaper, HeaderContainer } from './styles';

import type { EditSectionProps } from './types';

const EditSection = ({ children, title, headerAction, ...rest }: EditSectionProps) => {
  return (
    <StyledPaper elevation={0} {...rest}>
      {(title || headerAction) && (
        <HeaderContainer>
          {title && (
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
          )}
          {headerAction}
        </HeaderContainer>
      )}
      {children}
    </StyledPaper>
  );
};

export default EditSection;