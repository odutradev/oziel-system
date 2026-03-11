import { IconButton, Typography, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { getStepTitle, getStepSubtitle } from './utils';
import { PageContainer, ContentCard } from './styles';
import ConfirmForm from './subcomponents/confirm';
import RequestForm from './subcomponents/request';
import VerifyForm from './subcomponents/verify';
import usePasswordReset from './hooks';

const PasswordReset = () => {
  const {
    formData,
    step,
    errorMessage,
    showPassword,
    pinRefs,
    isAuto,
    isLoading,
    handleInputChange,
    handlePinChange,
    handlePinKeyDown,
    handlePinPaste,
    handleTogglePasswordVisibility,
    handleRequestCode,
    handleVerifyCode,
    handleConfirmPassword,
    handleBack,
  } = usePasswordReset();

  return (
    <PageContainer maxWidth="xs">
      <ContentCard>
        {(step !== 'request' || isAuto) && (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <IconButton onClick={handleBack} size="small" disabled={isLoading}>
              <ArrowBack fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Typography component="h1" variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {getStepTitle(step)}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {getStepSubtitle(step)}
        </Typography>

        {step === 'request' && (
          <RequestForm
            email={formData.email}
            errorMessage={errorMessage}
            isAuto={isAuto}
            isLoading={isLoading}
            onChange={handleInputChange('email')}
            onSubmit={handleRequestCode}
          />
        )}

        {step === 'verify' && (
          <VerifyForm
            code={formData.code}
            errorMessage={errorMessage}
            pinRefs={pinRefs}
            isLoading={isLoading}
            onPinChange={handlePinChange}
            onPinKeyDown={handlePinKeyDown}
            onPinPaste={handlePinPaste}
            onSubmit={handleVerifyCode}
          />
        )}

        {step === 'confirm' && (
          <ConfirmForm
            formData={formData}
            showPassword={showPassword}
            errorMessage={errorMessage}
            isLoading={isLoading}
            onChange={handleInputChange}
            onTogglePassword={handleTogglePasswordVisibility}
            onSubmit={handleConfirmPassword}
          />
        )}
      </ContentCard>
    </PageContainer>
  );
};

export default PasswordReset;