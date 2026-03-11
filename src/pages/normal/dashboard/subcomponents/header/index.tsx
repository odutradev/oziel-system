import { Typography } from '@mui/material';

import { HeaderContainer } from './styles';

import type { WelcomeHeaderProps } from './types';

const WelcomeHeader = ({ user }: WelcomeHeaderProps) => {
  const userName = user?.name?.split(' ')[0] || 'Usuário';

  return (
    <HeaderContainer>
      <Typography variant="h4" fontWeight={800} color="text.primary">
        Olá, {userName}!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
        Aqui está o resumo geral das suas atividades e status do sistema.
      </Typography>
    </HeaderContainer>
  );
};

export default WelcomeHeader;