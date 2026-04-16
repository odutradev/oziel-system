import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Chamados TI", url: "/dashboard/tickets" }
    ],
    pageTitle: "Gestão de Chamados de TI"
};

export default metadata;