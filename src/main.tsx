import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client';
import { StrictMode, useMemo } from 'react';

import { darkTheme, lightTheme } from "@styles/muiBaseTheme";
import { toastContainerConfig } from '@assets/data/toast';
import ReloadPrompt from "@components/pwa/reloadPrompt";
import DeviceProvider from '@hooks/useDevice/provider';
import useSystemTheme from "@hooks/useSystemTheme";
import defaultConfig from '@assets/config/default';
import GlobalStyles from '@styles/globalStyles';
import useMountOnce from '@hooks/useMountOnce';
import useSystemStore from '@stores/system';
import Router from '@routes/index';

const App = () => {
  const { system, updateSystem } = useSystemStore((store) => store);
  const { theme } = system;
  
  useSystemTheme();

  useMountOnce(() => {
    console.log(`version: ${defaultConfig.version} - mode: ${defaultConfig.mode}`);

    const handleOnline = () => updateSystem({ isOffline: false });
    const handleOffline = () => updateSystem({ isOffline: true });
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      updateSystem({ pwaEvent: e as BeforeInstallPromptEvent });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  });

  const toastExtra = useMemo(() => {
    return theme == 'dark' ? { theme } : {};
  }, [theme]);

  const currentTheme = theme == "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <DeviceProvider>
        <ToastContainer {...toastContainerConfig} {...toastExtra} />
        <GlobalStyles />
        <CssBaseline />
        <ReloadPrompt />
        <Router />
      </DeviceProvider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);