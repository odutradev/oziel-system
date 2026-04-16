import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Marketing", url: "/dashboard/admin/marketing" }
    ],
    pageTitle: "Gestão de Solicitações de Marketing"
};

export default metadata;