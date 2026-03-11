import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: 'Dashboard', url: '/dashboard/general' },
        { name: 'Admin', url: '/dashboard/admin/emails' },
        { name: 'Templates', url: '/dashboard/admin/emails' },
        { name: 'Envio em Massa', url: '#' }
    ],
    pageTitle: "Envio em Massa",
    padding: 3
};  

export default metadata;
