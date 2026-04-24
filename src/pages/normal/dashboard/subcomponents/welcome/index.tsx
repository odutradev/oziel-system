import { Typography } from '@mui/material'

import { WelcomeContainer } from './styles'

const WelcomeMessage = () => {
  return (
    <WelcomeContainer>
      <Typography component="h1" variant="h3" fontWeight={700} color="primary.main" mb={2}>
        PRO+ GESTÃO
      </Typography>
      <Typography component="h2" variant="h5" fontWeight={600} mb={1}>
        Seja bem-vindo ao sistema!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Todas as funcionalidades disponíveis estão no menu lateral esquerdo.
      </Typography>
    </WelcomeContainer>
  )
}

export default WelcomeMessage