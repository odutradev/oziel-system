import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';

import { menuItemsAdmin, menuItemsViewer } from '../../routes/menuItems';
import ProfileManager from './subcomponents/profileManager';
import LayoutDrawer from './subcomponents/layoutDrawer';
import MenuSection from './subcomponents/menuSection';
import Content from './subcomponents/content';
import useMountOnce from '@hooks/useMountOnce';
import Navbar from './subcomponents/navbar';
import useSystemStore from '@stores/system';
import Loading from '@components/loading';
import Errors from '@components/errors';
import useUserStore from '@stores/user';
import useDevice from '@hooks/useDevice';
import { getUser } from '@actions/user';
import { MenuContent } from './styles';

import type { LayoutProps } from './types';

const Layout = ({ children, breadcrumbs, navbarComponent, disableGetUser, loading, pageTitle = 'AMaisFácil', padding = 3 }: LayoutProps) => {
  const { system, updateSystem } = useSystemStore(x => x);
  const [hasPermission] = useState(true);
  const { user } = useUserStore(x => x);
  const { isMobile } = useDevice();
  const location = useLocation();
  const navigate = useNavigate();

  const width = isMobile ? '100%' : (system.menuOpen ? 240 : 56);
  const contentWidth = isMobile ? '100%' : `calc(100% - ${width}px)`;

  useMountOnce(async () => {
    if (!disableGetUser) getUser();
    if (user?.status === 'blocked') navigate('/account-blocked');
  });

  useEffect(() => {
    if (isMobile) updateSystem({ menuOpen: false });
  }, [isMobile, updateSystem]);

  const handleClose = () => updateSystem({ menuOpen: false });

  const handleNavigation = () => {
    if (isMobile) handleClose();
  };

  const menuItems = user?.role === 'normal' ? menuItemsViewer : menuItemsAdmin;

  const activePath = useMemo(() => {
    const allItems = menuItems.flatMap(section => section.items);
    const matches = allItems.filter(item => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`));
    return matches.sort((a, b) => b.path.length - a.path.length)[0]?.path || '';
  }, [location.pathname, menuItems]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <title>{pageTitle}</title>
      <LayoutDrawer
        open={system.menuOpen}
        breadcrumbs={breadcrumbs}
        isMobile={isMobile}
        onClose={handleClose}
        width={width}
      >
        <MenuContent>
          {menuItems.map(section => (
            <MenuSection
              key={section.sectionName}
              section={section}
              activePath={activePath}
              lastBreadcrumbUrl={breadcrumbs?.[breadcrumbs?.length]?.url}
              onNavigate={handleNavigation}
            />
          ))}
        </MenuContent>
        <ProfileManager onNavigate={handleNavigation} />
      </LayoutDrawer>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: contentWidth }}>
        <Navbar breadcrumbs={breadcrumbs} rightComponent={navbarComponent} padding={padding} />
        {hasPermission ? (
          <Content padding={padding}>
            {(system.loading || loading) ? <Loading /> : children}
          </Content>
        ) : (
          <Errors message="Você não possui permissão para acessar essa funcionalidade." />
        )}
      </Box>
    </Box>
  );
};

export default Layout;