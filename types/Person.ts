export interface Person {
    name: string;
    role: string;
    img: string;
    bio: string;
    email?: string;
    category: 'Professor' | 'Member' | 'Alumni';

    // New specific fields
    degree?: 'Ph.D.' | 'M.S.' | 'M.S./Ph.D.' | 'Researcher';
    alumniCategory?: 'General' | 'Professional';
    alumniDegree?: 'Ph.D.' | 'M.S.';
    
    // Professor Specifics
    phone?: string;
    education?: { degree: string; school: string; year: string; thesis?: string }[];
    career?: { period: string; role: string; }[];
    awards?: string[];
    researchInterests?: string[];
}
