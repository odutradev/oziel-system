import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: 'Dashboard', url: '/dashboard/general' },
        { name: 'Meu Perfil', url: '/dashboard/profile' }
    ],
    pageTitle: "Meu Perfil"
};  

export default metadata;