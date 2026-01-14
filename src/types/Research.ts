import { Description } from '@/types/Base';

export type ResearchIconName = 'Brain' | 'Network' | 'Cpu' | 'ScanEye' | 'Microscope' | 'Map' | 'Type' | 'Zap' | 'Settings';

export interface ResearchTopic {
    id: string;
    title: string;
    icon: ResearchIconName;
    shortDescription?: string;
    description: Description[];
    originalUrl?: string;
    imageUrl?: string;
    publications?: string[];
}