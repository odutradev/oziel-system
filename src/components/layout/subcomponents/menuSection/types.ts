import type { MenuSection } from "../../types";

export interface LayoutMenuSectionProps {
    activePath: string;
    lastBreadcrumbUrl?: string;
    section: MenuSection;
    onNavigate?: () => void;
};