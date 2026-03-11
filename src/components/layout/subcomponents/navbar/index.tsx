import { Menu as MenuIcon, MenuOpen as MenuOpenIcon, GetApp as GetAppIcon } from '@mui/icons-material';
import { Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import { useEffect, useRef } from 'react';

import BreadcrumbsDisplay from '../breadcrumbsDisplay';
import UserCoins from '@components/userCoins';
import useSystemStore from '@stores/system';
import { StyledAppBar } from './styles';

import type { LayoutNavbarProps } from './types';

const Navbar = ({ breadcrumbs, rightComponent, padding = 3 }: LayoutNavbarProps) => {
  const { system, updateSystem } = useSystemStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      updateSystem({ navbarSize: { width, height } });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [updateSystem]);

  const toggleDrawer = () => updateSystem({ menuOpen: !system.menuOpen });

  const handleInstallClick = () => {
    if (system.pwaEvent) {
      system.pwaEvent.prompt();
      system.pwaEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          updateSystem({ pwaEvent: null });
        }
      });
    }
  };

  return (
    <StyledAppBar position="static" open={system.menuOpen} elevation={0} ref={ref}>
      <Toolbar
        variant="dense"
        sx={{
          px: padding,
          alignItems: 'center',
          display: 'flex',
          width: '100%',
        }}
      >
        <IconButton edge="start" onClick={toggleDrawer} sx={{ mr: 1, ml: 0, position:{ left: -6 } }}>
          {system.menuOpen ? (
            <MenuOpenIcon fontSize="small" />
          ) : (
            <MenuIcon fontSize="small" />
          )}
        </IconButton>

        {breadcrumbs?.length ? (
          <Box
            sx={{
              overflow: 'hidden',
              display: 'flex',
              flex: '0 0 50%',
            }}
          >
            <BreadcrumbsDisplay 
              items={breadcrumbs}
              sx={{
                flexWrap: 'nowrap',
                display: 'flex',
                width: '100%',
              }}
              itemSx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                overflow: 'hidden',
                fontSize: '0.75rem',
                minWidth: 0,
                flex: 1,
              }}
            />
          </Box>
        ) : null}

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {rightComponent}
          {system.pwaEvent && (
            <Tooltip title="Instalar Aplicativo">
              <IconButton onClick={handleInstallClick} size="small" sx={{ px: 1 }}>
                <GetAppIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <UserCoins enableHoverMenu />
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}

export default Navbar;