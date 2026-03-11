import type { MenuSection } from "../../types";

export interface LayoutMenuSectionProps {
    lastBreadcrumbUrl?: string;
    section: MenuSection;
    onNavigate?: () => void;
};