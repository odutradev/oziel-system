import { AssignmentTurnedIn, Description, AccountBalance, EventRepeat, LocalShipping, Engineering, Dashboard, Settings, People, Email, Badge } from "@mui/icons-material";

import type { MenuSection } from "../components/layout/types";

export const menuItemsAdmin: MenuSection[] = [
  {
    sectionName: 'Visão Geral',
    items: [
      { name: 'Dashboard', path: '/dashboard/general', icon: <Dashboard /> },
    ],
  },
  {
    sectionName: 'Recursos Humanos',
    items: [
      { name: 'Monitorados', path: '/dashboard/hr/members', icon: <Badge /> },
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
      { name: 'Operações', path: '/dashboard/maintenance/operations', icon: <Engineering /> },
      { name: 'Fechamento', path: '/dashboard/maintenance/monthly-closing', icon: <AssignmentTurnedIn /> },
      { name: 'Operadores', path: '/dashboard/maintenance/operators', icon: <Settings /> },
      { name: 'Frotas', path: '/dashboard/maintenance/fleets', icon: <LocalShipping /> },
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
    sectionName: 'Recursos Humanos',
    items: [
      { name: 'Monitorados', path: '/dashboard/hr/members', icon: <Badge /> },
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
      { name: 'Operações', path: '/dashboard/maintenance/operations', icon: <Engineering /> },
      { name: 'Fechamento', path: '/dashboard/maintenance/monthly-closing', icon: <AssignmentTurnedIn /> },
      { name: 'Operadores', path: '/dashboard/maintenance/operators', icon: <Settings /> },
      { name: 'Frotas', path: '/dashboard/maintenance/fleets', icon: <LocalShipping /> },
    ],
  }
];