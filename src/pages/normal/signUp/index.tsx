import { Typography } from '@mui/material';

import { PageContainer, ContentCard, FooterContainer, StyledLink } from './styles';
import SignUpForm from './subcomponents/form';
import useSignUp from './hooks';

const SignUp = () => {
  const { credentials, confirmPassword, showPassword, errorMessage, success, handleInputChange, handleConfirmPasswordChange, handleClearField, handleTogglePasswordVisibility, handleSubmit } = useSignUp();

  return (
    <PageContainer maxWidth="sm">
      <ContentCard>
        <Typography component="h1" variant="h4" fontWeight={600} mb={1}>
          Bem-vindo!
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Faça cadastro para continuar sua jornada
        </Typography>

        <SignUpForm
          credentials={credentials}
          confirmPassword={confirmPassword}
          showPassword={showPassword}
          errorMessage={errorMessage}
          success={success}
          onInputChange={handleInputChange}
          onConfirmPasswordChange={handleConfirmPasswordChange}
          onClearField={handleClearField}
          onTogglePassword={handleTogglePasswordVisibility}
          onSubmit={handleSubmit}
        />

        <FooterContainer>
          <Typography variant="body2" noWrap>
            Já tem uma conta? <StyledLink to="/signin">Entre</StyledLink>
          </Typography>
        </FooterContainer>
      </ContentCard>
    </PageContainer>
  );
};

export default SignUp;