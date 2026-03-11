import { Button, Typography } from '@mui/material';
import { LockReset } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { ActionContainer, DangerItem, ItemInfo } from './styles';
import EditSection from '@components/editSection';

import type { ActionSectionProps } from './types';

const ActionSection = ({ userEmail }: ActionSectionProps) => {
  const navigate = useNavigate();

  const handlePasswordReset = () => {
    if (!userEmail) return;
    const params = new URLSearchParams({ email: userEmail, auto: 'true' });
    navigate(`/password-reset?${params.toString()}`);
  };

  return (
    <EditSection title="Segurança e Ações Críticas">
      <ActionContainer>
        <DangerItem>
          <ItemInfo>
            <Typography variant="subtitle2" fontWeight={600}>
              Redefinir senha da conta
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Um código será enviado no e-mail para redefinir a senha posteriormente.
            </Typography>
          </ItemInfo>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            startIcon={<LockReset />}
            onClick={handlePasswordReset}
            sx={{ minWidth: 160 }}
          >
            Redefinir Senha
          </Button>
        </DangerItem>
      </ActionContainer>
    </EditSection>
  );
};

export default ActionSection;