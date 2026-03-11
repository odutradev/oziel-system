import { OfflineBolt, Speed, TouchApp, GetApp } from '@mui/icons-material';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Container, InfoCard, FeaturesGrid, FeatureItem, Actions } from './styles';
import useSystemStore from '@stores/system';
import Layout from '@components/layout';
import useDevice from '@hooks/useDevice';

import type { FeatureItemProps } from './types';

const Feature = ({ icon, title, description }: FeatureItemProps) => (
  <FeatureItem>
    <Box sx={{ color: 'primary.main', mb: 1 }}>{icon}</Box>
    <Typography variant="subtitle2" fontWeight={600}>
      {title}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {description}
    </Typography>
  </FeatureItem>
);

const PwaInstall = () => {
  const { system, updateSystem } = useSystemStore();
  const { isPwa } = useDevice();
  const navigate = useNavigate();

  useEffect(() => {
    if (isPwa || (!system.pwaEvent && !system.pwaInstallRejected)) {
      navigate('/dashboard/general');
    }
  }, [isPwa, system.pwaEvent, system.pwaInstallRejected, navigate]);

  const handleInstall = async () => {
    if (!system.pwaEvent) return;

    system.pwaEvent.prompt();
    const { outcome } = await system.pwaEvent.userChoice;

    if (outcome === 'accepted') {
      updateSystem({ pwaEvent: null });
      navigate('/dashboard/general');
    }
  };

  const handleReject = () => {
    updateSystem({ pwaInstallRejected: true });
    navigate('/dashboard/general');
  };

  if (!system.pwaEvent) return null;

  return (
    <Layout pageTitle="Instalar Aplicativo">
      <Container>
        <InfoCard elevation={0}>
          <Box sx={{ mb: 1 }}>
            <GetApp sx={{ fontSize: 48, color: 'primary.main' }} />
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Instale o App
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Obtenha a melhor experiência possível instalando nosso aplicativo diretamente no seu dispositivo.
            </Typography>
          </Box>

          <FeaturesGrid>
            <Feature
              icon={<OfflineBolt fontSize="large" />}
              title="Acesso Offline"
              description="Acesse seus dados mesmo sem internet"
            />
            <Feature
              icon={<Speed fontSize="large" />}
              title="Mais Rápido"
              description="Carregamento instantâneo e fluido"
            />
            <Feature
              icon={<TouchApp fontSize="large" />}
              title="App Nativo"
              description="Sem barra de navegação, foco total"
            />
          </FeaturesGrid>

          <Actions>
            <Button
              variant="text"
              color="inherit"
              onClick={handleReject}
              sx={{ color: 'text.secondary' }}
            >
              Agora não
            </Button>
            <Button
              variant="contained"
              size="large"
              disableElevation
              onClick={handleInstall}
              startIcon={<GetApp />}
              sx={{ px: 4, fontWeight: 600 }}
            >
              Instalar Agora
            </Button>
          </Actions>
        </InfoCard>
      </Container>
    </Layout>
  );
};

export default PwaInstall;