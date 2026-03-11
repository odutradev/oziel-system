import { Typography } from '@mui/material';

import { CardContainer, Header, TextContainer } from './styles';

import type { ConfigCardProps } from './types';

const ConfigCard = ({ 
  title, 
  description, 
  action, 
  active = false, 
  children, 
  ...rest 
}: ConfigCardProps) => (
  <CardContainer active={active} elevation={0} {...rest}>
    <Header>
      <TextContainer>
        <Typography fontWeight={500}>{title}</Typography>
        {description && (
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        )}
      </TextContainer>
      {action}
    </Header>
    {children}
  </CardContainer>
);

export default ConfigCard;