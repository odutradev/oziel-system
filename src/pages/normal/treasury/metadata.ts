import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Tesouraria", url: "/dashboard/treasury" }
    ],
    pageTitle: "Gestão de Tesouraria"
};

export default metadata;