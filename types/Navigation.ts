export interface NavItem {
    name: string;
    path: string;
    iconName?: 'Home' | 'Users' | 'BookOpen' | 'GraduationCap' | 'Mail';
    dropdown?: { name: string; hash: string }[];
}
