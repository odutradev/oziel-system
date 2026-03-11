import { Typography, Button, IconButton, Fade, useTheme } from '@mui/material';
import { WifiOff, SystemUpdate, Close } from '@mui/icons-material';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useEffect, useState } from 'react';

import useSystemStore from '@stores/system';
import { StyledPaper, Header, IconWrapper, Actions } from './styles';

const ReloadPrompt = () => {
  const theme = useTheme();
  const { updateSystem } = useSystemStore();
  const [isOpen, setIsOpen] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      if (r) console.log(`SW Registered: ${r}`);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  useEffect(() => {
    updateSystem({ needRefresh, offlineReady });
  }, [needRefresh, offlineReady, updateSystem]);

  useEffect(() => {
    if (offlineReady || needRefresh) setIsOpen(true);
  }, [offlineReady, needRefresh]);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setOfflineReady(false);
      setNeedRefresh(false);
    }, 300);
  };

  const handleUpdate = () => {
    updateServiceWorker(true);
    close();
  };

  if (!isOpen && !offlineReady && !needRefresh) return null;

  const isUpdate = needRefresh;

  return (
    <Fade in={isOpen} timeout={400}>
      <StyledPaper elevation={0}>
        <Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <IconWrapper>
              {isUpdate ? <SystemUpdate fontSize="small" /> : <WifiOff fontSize="small" />}
            </IconWrapper>
            <Typography variant="body1">
              {isUpdate ? 'Atualização Disponível' : 'Modo Offline Ativo'}
            </Typography>
          </div>
          <IconButton size="small" onClick={close} aria-label="close">
            <Close fontSize="small" />
          </IconButton>
        </Header>

        <Typography variant="body2" color="text.secondary" sx={{ pl: '44px' }}>
          {isUpdate
            ? 'Uma nova versão do sistema foi detectada. Atualize para aplicar as melhorias.'
            : 'O aplicativo foi salvo em cache e está pronto para ser utilizado sem internet.'}
        </Typography>

        <Actions>
          {isUpdate ? (
            <>
              <Button
                size="small"
                color="inherit"
                onClick={close}
                sx={{ color: 'text.secondary' }}
              >
                Agora não
              </Button>
              <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={handleUpdate}
                startIcon={<SystemUpdate />}
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: '#fff',
                  '&:hover': { bgcolor: theme.palette.secondary.dark }
                }}
              >
                Atualizar Agora
              </Button>
            </>
          ) : (
            <Button
              size="small"
              color="inherit"
              onClick={close}
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              Entendi
            </Button>
          )}
        </Actions>
      </StyledPaper>
    </Fade>
  );
};

export default ReloadPrompt;