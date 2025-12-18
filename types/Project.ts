export type ProjectCategory = 'ongoing' | 'completed-gov' | 'completed-industry';

export interface Project {
    id: number;
    title: string;
    funding: string; // 지원기관
    period: string; // 연구기간
    content?: string; // 내용
    category: ProjectCategory;
    year?: number;
    link?: string; // Legacy support
    description?: string; // Legacy support
}
