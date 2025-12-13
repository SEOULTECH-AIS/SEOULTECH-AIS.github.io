import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { ProjectCategory } from '../types/Project';
import { Briefcase, Building2, Factory, ExternalLink, PlayCircle } from 'lucide-react';

const Projects = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<ProjectCategory>('ongoing');

    const tabs: { id: ProjectCategory; label: string; icon: React.ReactNode }[] = [
        { id: 'ongoing', label: 'Ongoing', icon: <PlayCircle size={18} /> },
        { id: 'completed-gov', label: 'Completed [Gov]', icon: <Building2 size={18} /> },
        { id: 'completed-industry', label: 'Completed [Industry]', icon: <Factory size={18} /> },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get('area');
        if (area && ['ongoing', 'completed-gov', 'completed-industry'].includes(area)) {
            setActiveTab(area as ProjectCategory);
        }
    }, [location]);

    const handleTabClick = (id: ProjectCategory) => {
        setActiveTab(id);
        navigate(`/projects?area=${id}`);
    };

    const filteredProjects = projectsData.filter(project => project.category === activeTab);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - TITLE FIXED as requested (Projects only) */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Projects
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {/* Horizontal Tabs - Similar to People/Research */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex flex-wrap justify-center gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-md transform scale-[1.02]'
                                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <div key={project.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl ${project.category === 'ongoing' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        <Briefcase size={24} />
                                    </div>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-blue-600 transition-colors"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                </h3>
                                {project.description && (
                                    <p className="text-slate-600 mb-2 font-medium">{project.description}</p>
                                )}
                                {project.period && (
                                    <div className="text-sm text-slate-500 bg-slate-50 inline-block px-3 py-1 rounded-full border border-slate-200">
                                        {project.period}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
                            <Briefcase className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">No projects listed in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects;
