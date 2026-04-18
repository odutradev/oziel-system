import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Marketing", url: "/dashboard/admin/marketing" },
        { name: "Edição", url: "" }
    ],
    pageTitle: "Editar Marketing"
};

export default metadata;