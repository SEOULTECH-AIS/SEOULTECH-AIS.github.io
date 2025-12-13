export type CourseCategory = 'undergraduate' | 'graduate' | 'capstone';

export interface CourseItem {
    id: string; // Unique identifier
    title: string;
    description?: string;
    link?: string; // External link to course materials
    category: CourseCategory;
    semester?: string; // Optional: e.g., "2024 Spring"
}
