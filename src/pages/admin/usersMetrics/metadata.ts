import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: 'Dashboard', url: '/dashboard/general' },
        { name: 'Administração', url: '#' },
        { name: 'Métricas de Usuários', url: '/dashboard/admin/users-metrics' }
    ],
    pageTitle: "Métricas de Usuários",
    padding: 3
};

export default metadata;