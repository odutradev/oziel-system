import { Description, Dashboard, Settings, People, Email, AccountBalance, EventRepeat } from "@mui/icons-material";

import type { MenuSection } from "../components/layout/types";

export const menuItemsAdmin: MenuSection[] = [
  {
    sectionName: 'Visão Geral',
    items: [
      { name: 'Dashboard', path: '/dashboard/general', icon: <Dashboard /> },
    ],
  },
  {
    sectionName: 'Gestão Financeira',
    items: [
      { name: 'Tesouraria', path: '/dashboard/treasury', icon: <AccountBalance /> },
      { name: 'Agendamentos', path: '/dashboard/recurring-transactions', icon: <EventRepeat /> },
    ],
  },
  {
    sectionName: 'Manutenção',
    items: [
      { name: 'Operadores', path: '/dashboard/maintenance/operators', icon: <Settings /> },
    ],
  },
  {
    sectionName: 'Gestão',
    items: [
      { name: 'Usuários', path: '/dashboard/admin/users', icon: <People /> }
    ],
  },
  {
    sectionName: 'Sistema',
    items: [
      { name: 'Emails', path: '/dashboard/admin/emails', icon: <Email /> },
      { name: 'Logs', path: '/dashboard/admin/logs', icon: <Description /> },
    ],
  },
];

export const menuItemsViewer: MenuSection[] = [
  {
    sectionName: 'Visão Geral',
    items: [
      { name: 'Dashboard', path: '/dashboard/general', icon: <Dashboard /> },
    ],
  },
  {
    sectionName: 'Gestão Financeira',
    items: [
      { name: 'Tesouraria', path: '/dashboard/treasury', icon: <AccountBalance /> },
      { name: 'Agendamentos', path: '/dashboard/recurring-transactions', icon: <EventRepeat /> },
    ],
  },
  {
    sectionName: 'Manutenção',
    items: [
      { name: 'Operadores', path: '/dashboard/maintenance/operators', icon: <Settings /> },
    ],
  }
];