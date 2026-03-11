import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: 'Geral', url: '/dashboard/general' },
        { name: 'Visão Geral', url: '/dashboard/general' }
    ],
    pageTitle: "Dashboard"
};  

export default metadata;