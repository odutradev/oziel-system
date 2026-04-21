import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { Box } from '@mui/material'

import ProfileManager from './subcomponents/profileManager'
import LayoutDrawer from './subcomponents/layoutDrawer'
import { SUPER_ROLES } from '@utils/types/models/user'
import MenuSection from './subcomponents/menuSection'
import { appMenuItems } from '../../routes/menuItems'
import useMountOnce from '@hooks/useMountOnce'
import Content from './subcomponents/content'
import Navbar from './subcomponents/navbar'
import useSystemStore from '@stores/system'
import Loading from '@components/loading'
import useUserStore from '@stores/user'
import { getUser } from '@actions/user'
import Errors from '@components/errors'
import useDevice from '@hooks/useDevice'
import { MenuContent } from './styles'

import type { MenuSection as MenuSectionType } from './types'
import type { LayoutProps } from './types'

const Layout = ({
  children,
  breadcrumbs,
  navbarComponent,
  disableGetUser,
  loading,
  pageTitle = 'PRO+ GESTÃO',
  padding = 3
}: LayoutProps) => {
  const { system, updateSystem } = useSystemStore(x => x)
  const { user } = useUserStore(x => x)
  const { isMobile } = useDevice()
  const location = useLocation()
  const navigate = useNavigate()

  const width = isMobile ? '100%' : (system.menuOpen ? 240 : 56)
  const contentWidth = isMobile ? '100%' : `calc(100% - ${width}px)`

  useMountOnce(async () => {
    if (!disableGetUser) getUser()
    if (user?.status === 'blocked') navigate('/account-blocked')
  })

  useEffect(() => {
    if (isMobile) updateSystem({ menuOpen: false })
  }, [isMobile, updateSystem])

  const handleClose = () => updateSystem({ menuOpen: false })

  const handleNavigation = () => {
    if (isMobile) handleClose()
  }

  const userRole = user?.role
  const isSuperAdmin = Boolean(userRole && (SUPER_ROLES as string[]).includes(userRole))

  const filteredMenuItems = useMemo(() => {
    return appMenuItems.reduce<MenuSectionType[]>((acc, section) => {
      const validItems = section.items.filter(item => {
        if (isSuperAdmin) return true
        if (!item.permissions || item.permissions.length === 0) return true
        return Boolean(userRole && item.permissions.includes(userRole))
      })

      if (validItems.length > 0) {
        acc.push({ ...section, items: validItems })
      }

      return acc
    }, [])
  }, [userRole, isSuperAdmin])

  const activePath = useMemo(() => {
    const allItems = filteredMenuItems.flatMap(section => section.items)
    const matches = allItems.filter(item => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`))
    return matches.sort((a, b) => b.path.length - a.path.length)[0]?.path || ''
  }, [location.pathname, filteredMenuItems])

  const hasPermission = useMemo(() => {
    if (isSuperAdmin) return true

    const allAppItems = appMenuItems.flatMap(section => section.items)
    const currentItem = allAppItems.find(item => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`))

    if (!currentItem) return true
    if (!currentItem.permissions || currentItem.permissions.length === 0) return true

    return Boolean(userRole && currentItem.permissions.includes(userRole))
  }, [location.pathname, userRole, isSuperAdmin])

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
        {system.menuOpen && (
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box component="img" src="/images/logo.svg" alt="Logo" sx={{ maxWidth: '100%', maxHeight: 60, objectFit: 'contain' }} />
          </Box>
        )}
        <MenuContent>
          {filteredMenuItems.map(section => (
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
  )
}

export default Layout