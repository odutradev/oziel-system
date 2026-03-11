import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: 'Dashboard', url: '/dashboard/general' },
        { name: 'Admin', url: '/dashboard/admin/users' },
        { name: 'Usuários', url: '/dashboard/admin/users' },
        { name: 'Editar', url: '#' }
    ],
    pageTitle: "Editar Usuário",
    padding: 3
};  

export default metadata;
