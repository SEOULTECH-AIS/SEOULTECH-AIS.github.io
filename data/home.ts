import { NewsItem, ResearchTopic } from '../types/Home';

export const newsData: NewsItem[] = [
    { id: 1, category: 'Publication', date: 'Dec 10, 2024', title: 'Paper accepted at AAAI 2025: "Efficient Neuromorphic Computing"' },
    { id: 2, category: 'Event', date: 'Nov 28, 2024', title: 'Prof. Ha invited speaker at KRnet 2024' },
    { id: 3, category: 'Award', date: 'Oct 15, 2024', title: 'Best Paper Award at ICROS 2024' },
    { id: 4, category: 'Lab', date: 'Sep 01, 2024', title: 'New PhD students joined the lab. Welcome!' },
];

export const researchTopicsData: ResearchTopic[] = [
    {
        title: 'Neuromorphic Computing',
        description: 'Developing hardware architectures that mimic the neural structure of the human brain for efficient processing.',
        iconName: 'Brain'
    },
    {
        title: 'Deep Learning Theory',
        description: 'Investigating the mathematical foundations of deep neural networks to improve interpretability and robustness.',
        iconName: 'Network'
    },
    {
        title: 'Autonomous Systems',
        description: 'Creating intelligent agents capable of perceiving, learning, and acting in complex real-world environments.',
        iconName: 'Cpu'
    }
];
