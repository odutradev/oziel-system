import { SearchOff } from '@mui/icons-material';

import { Container, IconWrapper, Message } from './styles';

import type { NoDataProps } from './types';

const NoData = ({ message = 'Nenhum dado encontrado', height }: NoDataProps) => {
  return (
    <Container height={height}>
      <IconWrapper>
        <SearchOff />
      </IconWrapper>
      <Message variant="body1">
        {message}
      </Message>
    </Container>
  );
};

export default NoData;