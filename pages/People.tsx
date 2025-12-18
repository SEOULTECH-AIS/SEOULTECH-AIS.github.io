import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, MapPin, GraduationCap, Briefcase, Award, User, Users, BookOpen, Scroll, Calendar, Phone } from 'lucide-react';
import { peopleData } from '../data/people';
import { Person } from '../types/Person';

import SmoothTabs from '../components/SmoothTabs';

const People = () => {
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
            // Map lowercase area from Navbar (e.g. 'members') to capitalized State (e.g. 'Members')
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

    const professor = peopleData.find(p => p.category === 'Professor');
    const members = peopleData.filter(p => p.category === 'Member');
    const alumni = peopleData.filter(p => p.category === 'Alumni');

    // Sort Members: Ph.D. first, then M.S. (including mapped Researchers)
    const sortedMembers = [...members].sort((a, b) => {
        const getPriority = (p: Person) => {
            if (p.degree === 'Ph.D.' || p.degree === 'M.S./Ph.D.' || (!p.degree && p.role.includes('Ph.D.'))) return 1;
            return 2; // M.S. and others
        };
        return getPriority(a) - getPriority(b);
    });

    // Helper to extract year from bio for sorting
    const getYear = (p: Person) => {
        if (!p.bio) return 0;
        const match = p.bio.match(/\d{4}/);
        return match ? parseInt(match[0]) : 0;
    };

    // Sort Alumni: Ascending (Oldest -> Newest)
    const sortAlumni = (list: Person[]) => {
        return [...list].sort((a, b) => getYear(a) - getYear(b));
    };

    // Split Alumni Logic
    const generalAlumni = alumni.filter(p => p.alumniCategory === 'General' || (!p.alumniCategory && p.category === 'Alumni'));
    const professionalAlumni = alumni.filter(p => p.alumniCategory === 'Professional');

    const generalPhD = sortAlumni(generalAlumni.filter(p => p.alumniDegree === 'Ph.D.'));
    const generalMS = sortAlumni(generalAlumni.filter(p => p.alumniDegree === 'M.S.' || !p.alumniDegree));

    const professionalMS = sortAlumni(professionalAlumni);

    const ProfileCard = ({ person }: { person: Person }) => {
        const isAlumni = person.category === 'Alumni';

        const parsedBio = (() => {
            if (!person.bio) return null;
            const parts = person.bio.split('|').map(s => s.trim());

            if (person.category === 'Member') {
                return {
                    topic: parts[0] || '',
                    affiliation: parts[1] || ''
                };
            } else if (person.category === 'Alumni') {
                return {
                    year: parts[0] || '',
                    workplace: parts[1] === '-' ? '' : parts[1] || '',
                    thesis: parts[2] || ''
                };
            }
            return { raw: person.bio };
        })();

        const getYearRange = (yearStr: string, degree?: string) => {
            const year = parseInt(yearStr);
            if (isNaN(year)) return yearStr;
            if (degree === 'Ph.D.') return `${year - 4} - ${year}`;
            else return `${year - 2} - ${year}`;
        };

        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-center md:items-start hover:shadow-md transition-shadow">
                <div className="w-32 h-40 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-100 shadow-inner">
                    <img
                        src={person.img}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image'; }}
                    />
                </div>
                <div className="flex-grow text-center md:text-left w-full">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{person.name}</h3>
                    {!isAlumni && (
                        <div className="text-blue-600 font-medium text-sm mb-3 bg-blue-50 inline-block px-3 py-1 rounded-lg border border-blue-100">
                            {person.degree === 'Ph.D.' ? 'Ph.D. Course' :
                                person.degree === 'M.S.' ? 'M.S. Course' :
                                    person.degree === 'M.S./Ph.D.' ? 'M.S./Ph.D. Course' :
                                        person.role.includes('Researcher') ? 'M.S. Course' :
                                            person.role}
                        </div>
                    )}
                    {person.email && (
                        <div className="flex items-center justify-center md:justify-start space-x-2 text-slate-600 text-sm mb-3">
                            <Mail size={14} className="text-slate-400" />
                            <span>{person.email}</span>
                        </div>
                    )}
                    <div className="text-slate-600 text-sm leading-relaxed mt-4 border-t border-slate-50 pt-3 space-y-2 text-left">
                        {parsedBio ? (
                            <>
                                {person.category === 'Member' && (
                                    <>
                                        {(parsedBio as any).topic && (
                                            <div className="flex items-start">
                                                <BookOpen size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="font-medium text-slate-700">{(parsedBio as any).topic}</span>
                                            </div>
                                        )}
                                        {(parsedBio as any).affiliation && (
                                            <div className="flex items-start">
                                                <GraduationCap size={16} className="text-slate-400 mr-2 mt-0.5 flex-shrink-0" />
                                                <div className="flex flex-col text-slate-500">
                                                    {(parsedBio as any).affiliation.split(',').map((school: string, idx: number) => (
                                                        <span key={idx}>{school.trim()}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                                {person.category === 'Alumni' && (
                                    <>
                                        {(parsedBio as any).year && (
                                            <div className="flex items-center">
                                                <Calendar size={16} className="text-slate-400 mr-2 flex-shrink-0" />
                                                <span className="text-slate-600 font-semibold">
                                                    {getYearRange((parsedBio as any).year, person.alumniDegree || person.role)}
                                                </span>
                                            </div>
                                        )}
                                        {(parsedBio as any).workplace && (
                                            <div className="flex items-start">
                                                <Briefcase size={16} className="text-slate-400 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-700 font-medium">{(parsedBio as any).workplace}</span>
                                            </div>
                                        )}
                                        {(parsedBio as any).thesis && (
                                            <div className="flex items-start">
                                                <Scroll size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-600 italic">{(parsedBio as any).thesis}</span>
                                            </div>
                                        )}
                                    </>
                                )}
                                {(parsedBio as any).raw && <p>{(parsedBio as any).raw}</p>}
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        People
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                <SmoothTabs
                    tabs={tabs}
                    activeId={activeTab}
                    onChange={(id) => handleTabClick(id as any)}
                    layoutIdPrefix="people"
                />

                <div className="animate-fade-in-up">
                    {activeTab === 'Professor' && professor && (
                        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-8 md:p-12">
                                {/* Professor Profile */}
                                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-16 border-b border-slate-100 pb-12">
                                    <div className="w-64 h-80 flex-shrink-0 bg-slate-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                                        <img src={professor.img} alt={professor.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow text-center md:text-left pt-2">
                                        <h2 className="text-4xl font-extrabold text-slate-900 mb-2">{professor.name}</h2>
                                        <p className="text-xl text-slate-600 mb-6 font-medium leading-relaxed">
                                            Professor <br className="md:hidden" /> Dept. of Automotive Engineering
                                        </p>
                                        <div className="space-y-3 text-slate-600 mb-8">
                                            <div className="flex items-center justify-center md:justify-start space-x-4">
                                                <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-blue-600">
                                                    <Mail size={18} />
                                                </div>
                                                <span className="text-lg font-medium">{professor.email}</span>
                                            </div>
                                            <div className="flex items-center justify-center md:justify-start space-x-4">
                                                <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-blue-600">
                                                    <Phone size={18} />
                                                </div>
                                                <span className="text-lg font-medium">{professor.phone}</span>
                                            </div>
                                            <div className="flex items-center justify-center md:justify-start space-x-4">
                                                <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-blue-600">
                                                    <MapPin size={18} />
                                                </div>
                                                <span className="text-lg font-medium">Room 719, Frontier Hall (#32), SeoulTech</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                            <button onClick={() => window.open('https://scholar.google.com/citations?view_op=list_works&hl=ko&hl=ko&user=d3UH4WoAAAAJ&pagesize=80', '_blank')} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">Google Scholar</button>
                                            <button onClick={() => window.open('https://orcid.org/0000-0002-4144-1000', '_blank')} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">ORCID</button>
                                            <button className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">CV</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Research Interests (New Section from 'Research Activities' image) */}
                                {professor.researchInterests && (
                                    <section className="mb-16">
                                        <div className="flex items-center mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mr-4">
                                                <BookOpen size={28} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900">Research Interests</h3>
                                        </div>
                                        <div className="pl-4 md:pl-16">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {professor.researchInterests.map((item, idx) => (
                                                    <div key={idx} className="flex items-start">
                                                        <div className="w-2 h-2 mt-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                                                        <span className="text-slate-700 font-medium">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Education */}
                                <section className="mb-16">
                                    <div className="flex items-center mb-8">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mr-4">
                                            <GraduationCap size={28} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900">Education</h3>
                                    </div>
                                    <div className="pl-4 md:pl-16 space-y-8">
                                        {professor.education ? professor.education.map((edu, idx) => (
                                            <div key={idx} className="relative border-l-2 border-slate-100 pl-6 pb-2">
                                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                                                    <h4 className="text-xl font-bold text-slate-800">{edu.degree}</h4>
                                                    <span className="text-slate-500 font-medium">{edu.year}</span>
                                                </div>
                                                <p className="text-lg text-slate-600 mb-2">{edu.school}</p>
                                                {edu.thesis && (
                                                    <div className="bg-slate-50 p-4 rounded-lg items-start flex">
                                                        <Scroll size={16} className="text-slate-400 mr-2 mt-1 flex-shrink-0" />
                                                        <p className="text-slate-600 italic text-sm">{edu.thesis}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )) : <p className="text-lg text-slate-400 italic">Details to be updated...</p>}
                                    </div>
                                </section>

                                {/* Employment */}
                                <section className="mb-16">
                                    <div className="flex items-center mb-8">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mr-4">
                                            <Briefcase size={28} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900">Employment</h3>
                                    </div>
                                    <div className="pl-4 md:pl-16 space-y-6">
                                        {professor.career ? professor.career.map((career, idx) => (
                                            <div key={idx} className="flex flex-col md:flex-row gap-2 md:gap-8">
                                                <div className="md:w-48 flex-shrink-0">
                                                    <span className="font-bold text-slate-500">{career.period}</span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-lg text-slate-800 font-medium">{career.role}</p>
                                                </div>
                                            </div>
                                        )) : <p className="text-lg text-slate-400 italic">Details to be updated...</p>}
                                    </div>
                                </section>

                                {/* Professional Activities / Awards */}
                                <section>
                                    <div className="flex items-center mb-8">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mr-4">
                                            <Award size={28} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900">Awards & Honors</h3>
                                    </div>
                                    <div className="pl-4 md:pl-16 space-y-4 text-slate-700">
                                        {professor.awards ? professor.awards.map((award, idx) => (
                                            <div key={idx} className="flex items-start">
                                                <div className="w-1.5 h-1.5 mt-2.5 bg-slate-400 rounded-full mr-3 flex-shrink-0"></div>
                                                <span className="text-lg leading-relaxed">{award}</span>
                                            </div>
                                        )) : <p className="text-lg text-slate-400 italic">Details to be updated...</p>}
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Members' && (
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {sortedMembers.map((p, idx) => (
                                    <ProfileCard key={idx} person={p} />
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'Alumni' && (
                        <div className="max-w-6xl mx-auto space-y-24">
                            <section>
                                <div className="mb-12 text-center md:text-left">
                                    <h2 className="text-3xl font-extrabold text-slate-900 inline-flex items-center gap-3">
                                        General Graduate School
                                        <span className="text-lg font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">일반대학원</span>
                                    </h2>
                                </div>
                                <div className="space-y-16">
                                    {generalPhD.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-700 mb-8 flex items-center">
                                                <div className="w-1.5 h-6 bg-blue-600 mr-3 rounded-full"></div>
                                                Ph.D.
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {generalPhD.map((p, idx) => (
                                                    <ProfileCard key={idx} person={p} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {generalMS.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-700 mb-8 flex items-center">
                                                <div className="w-1.5 h-6 bg-blue-600 mr-3 rounded-full"></div>
                                                M.S.
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {generalMS.map((p, idx) => (
                                                    <ProfileCard key={idx} person={p} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                            <div className="w-full h-px bg-slate-200"></div>
                            <section>
                                <div className="mb-12 text-center md:text-left">
                                    <h2 className="text-3xl font-extrabold text-slate-900 inline-flex items-center gap-3">
                                        Professional Graduate School
                                        <span className="text-lg font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">전문대학원</span>
                                    </h2>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-700 mb-8 flex items-center">
                                        <div className="w-1.5 h-6 bg-blue-600 mr-3 rounded-full"></div>
                                        M.S.
                                    </h3>
                                    {professionalMS.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {professionalMS.map((p, idx) => (
                                                <ProfileCard key={idx} person={p} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
                                            No alumni data available for this category.
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default People;
