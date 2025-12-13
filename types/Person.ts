export interface Person {
    name: string;
    role: string;
    img: string;
    bio: string;
    email?: string;
    category: 'Professor' | 'Member' | 'Alumni';
}
