export type ProjectCategory = 'ongoing' | 'completed-gov' | 'completed-industry';

export interface ProjectItem {
    id: string;
    title: string;
    description?: string; // e.g., Funding agency, duration
    link?: string;
    category: ProjectCategory;
    period?: string; // e.g., "2023.01 - 2025.12"
}
