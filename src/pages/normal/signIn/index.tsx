import { Box, Typography } from '@mui/material'

import { PageContainer, ContentCard, FooterContainer, StyledLink } from './styles'
import SignInForm from './subcomponents/form'
import useSignIn from './hooks'

const SignIn = () => {
  const { credentials, showPassword, errorMessage, success, handleInputChange, handleClearEmail, handleTogglePasswordVisibility, handleSubmit } = useSignIn()

  return (
    <PageContainer maxWidth="sm">
      <ContentCard>
        <Box
          src="/images/logo.svg"
          component="img"
          alt="Logo"
          sx={{ width: '100%', maxWidth: 450, height: 'auto', mb: 2, objectFit: 'contain' }}
        />
        <Typography component="h1" variant="h3" fontWeight={700} color="primary.main" mb={1}>
          PRO+ GESTÃO
        </Typography>
        <Typography component="h2" variant="h5" fontWeight={600} mb={1}>
          Bem-vindo de volta!
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Faça login para continuar sua jornada
        </Typography>
        <SignInForm
          credentials={credentials}
          showPassword={showPassword}
          errorMessage={errorMessage}
          success={success}
          onInputChange={handleInputChange}
          onClearEmail={handleClearEmail}
          onTogglePassword={handleTogglePasswordVisibility}
          onSubmit={handleSubmit}
        />
        <FooterContainer>
          <Typography variant="body2" noWrap>
            Não tem uma conta? <StyledLink href="/signup">Cadastre-se</StyledLink>
          </Typography>
          <Typography variant="body2" noWrap>
            Esqueceu a senha? <StyledLink href="/password-reset">Redefinir</StyledLink>
          </Typography>
        </FooterContainer>
      </ContentCard>
    </PageContainer>
  )
}

export default SignIn