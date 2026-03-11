import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: 'Dashboard', url: '/dashboard/general' },
        { name: 'Admin', url: '/dashboard/admin/emails' },
        { name: 'Templates de Email', url: '/dashboard/admin/emails' }
    ],
    pageTitle: "Gestão de Templates",
    padding: 3
};  

export default metadata;
