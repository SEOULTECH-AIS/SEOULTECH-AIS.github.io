export interface NewsItem {
    id: number;
    category: string;
    date: string;
    title: string;
}

export interface ResearchTopic {
    title: string;
    description: string;
    iconName: 'Brain' | 'Cpu' | 'Network'; // We'll map string names to icons in the component
}
