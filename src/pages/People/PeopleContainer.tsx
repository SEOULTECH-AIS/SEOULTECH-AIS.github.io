import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Users, GraduationCap } from 'lucide-react';
import professorData from '@/data/people/professor.json';
import membersDataRaw from '@/data/people/members.json';
import alumniDataRaw from '@/data/people/alumni.json';
import { Person, Member, Alumni, Professor } from '@/types/Person';
import PeopleView from '@/pages/People/PeopleView';

const professor = professorData as Professor;
const members = membersDataRaw as Member[];
const alumni = alumniDataRaw as Alumni[];

const PeopleContainer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'Professor' | 'Members' | 'Alumni'>('Professor');

    const tabs: { id: 'Professor' | 'Members' | 'Alumni'; label: string; icon: React.ReactNode }[] = [
        { id: 'Professor', label: 'Professor', icon: <User size={18} /> },
        { id: 'Members', label: 'Members', icon: <Users size={18} /> },
        { id: 'Alumni', label: 'Alumni', icon: <GraduationCap size={18} /> },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get('area');
        if (area) {
            const capitalizedArea = area.charAt(0).toUpperCase() + area.slice(1);
            if (['Professor', 'Members', 'Alumni'].includes(capitalizedArea)) {
                setActiveTab(capitalizedArea as 'Professor' | 'Members' | 'Alumni');
            }
        }
    }, [location]);

    const handleTabClick = (id: 'Professor' | 'Members' | 'Alumni') => {
        setActiveTab(id);
        navigate(`/people?area=${id.toLowerCase()}`);
    };

    // Sort Members: Ph.D. first, then M.S.
    const sortedMembers = [...members].sort((a, b) => {
        const getPriority = (m: Member) => {
            if (m.currentCourse === 'Ph.D.' || m.currentCourse === 'M.S./Ph.D.' || m.role.includes('Ph.D.')) return 1;
            return 2; // M.S. and others
        };
        return getPriority(a) - getPriority(b);
    });

    // Helper to extract graduation year for sorting
    const getGraduationYear = (p: Person) => {
        // 가장 최근 학위 연도를 기준으로 정렬
        if (p.academicBackground && p.academicBackground.length > 0) {
            const lastDegree = p.academicBackground[p.academicBackground.length - 1];
            if (typeof lastDegree.year === 'number') return lastDegree.year;
            return parseInt(lastDegree.year) || 0;
        }
        return 0;
    };

    // Sort Alumni: Ascending (Oldest -> Newest)
    const sortAlumni = (list: Person[]) => {
        return [...list].sort((a, b) => getGraduationYear(a) - getGraduationYear(b));
    };

    // Split Alumni Logic
    const generalAlumni = alumni.filter(p => p.alumniType === 'General');
    const professionalAlumni = alumni.filter(p => p.alumniType === 'Professional');

    // Filter by final degree obtained
    const isPhD = (p: Person) => {
        if (!p.academicBackground) return false;
        // Check if any degree is Ph.D.
        return p.academicBackground.some(d => d.degree === 'Ph.D.');
    };

    const generalPhD = sortAlumni(generalAlumni.filter(p => isPhD(p)));
    const generalMS = sortAlumni(generalAlumni.filter(p => !isPhD(p))); // Assuming non-PhD are MS

    const professionalMS = sortAlumni(professionalAlumni);

    return (
        <PeopleView
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={handleTabClick}
            professor={professor}
            sortedMembers={sortedMembers}
            generalPhD={generalPhD}
            generalMS={generalMS}
            professionalMS={professionalMS}
        />
    );
};

export default PeopleContainer;
