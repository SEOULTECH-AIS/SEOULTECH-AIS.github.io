import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FolderOpen, Archive, CheckCircle, Clock, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, Building2, Factory, PlayCircle } from 'lucide-react';
import { projectsData } from '../data/projects';
import { ProjectCategory } from '../types/Project';
import SmoothTabs from '../components/SmoothTabs';

const ITEMS_PER_PAGE = 15;
const PAGE_BLOCK_SIZE = 5;

const Projects = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<ProjectCategory>('ongoing');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);

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
            setCurrentPage(1);
        }
    }, [location]);

    const handleTabClick = (id: ProjectCategory) => {
        setActiveTab(id);
        navigate(`/projects?area=${id}`);
    };

    // Filter Items by Category
    const filteredItems = useMemo(() => {
        return projectsData.filter(item => item.category === activeTab);
    }, [activeTab]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    };

    // Pagination Block Calculations
    const currentBlockStart = Math.floor((currentPage - 1) / PAGE_BLOCK_SIZE) * PAGE_BLOCK_SIZE + 1;
    const currentBlockEnd = Math.min(totalPages, currentBlockStart + PAGE_BLOCK_SIZE - 1);
    const pageNumbers = Array.from({ length: currentBlockEnd - currentBlockStart + 1 }, (_, i) => currentBlockStart + i);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Projects
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {/* Smooth Tabs */}
                <SmoothTabs
                    tabs={tabs}
                    activeId={activeTab}
                    onChange={(id) => handleTabClick(id as ProjectCategory)}
                    layoutIdPrefix="projects"
                />

                {/* Content Area - Table View */}
                <div className="max-w-7xl mx-auto min-h-[500px] animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        {filteredItems.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-500 uppercase tracking-wider">
                                            {/* 'No' column removed */}
                                            <th className="py-4 px-6 w-[40%]">Project Name</th>
                                            <th className="py-4 px-6 w-[15%]">Content</th>
                                            <th className="py-4 px-6 w-[30%]">Funding Agency</th>
                                            <th className="py-4 px-6 text-center w-[15%]">Period</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {paginatedItems.map((project) => (
                                            <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="py-5 px-6">
                                                    <div className="text-slate-900 font-semibold text-base mb-1">
                                                        {project.title}
                                                    </div>
                                                </td>
                                                <td className="py-5 px-6 text-slate-600">
                                                    {project.content ? project.content : '-'}
                                                </td>
                                                <td className="py-5 px-6 text-slate-600 font-medium">
                                                    {project.funding}
                                                </td>
                                                <td className="py-5 px-6 text-center text-slate-500 text-sm font-medium whitespace-nowrap">
                                                    {project.period}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                <FolderOpen size={48} className="mb-4 opacity-50" />
                                <p className="text-lg font-medium">No projects found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-12 mb-8 select-none">
                        {/* First Page */}
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg border transition-all ${currentPage === 1
                                ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-blue-600'
                                }`}
                            title="First Page"
                        >
                            <ChevronsLeft size={18} />
                        </button>

                        {/* Previous Page */}
                        <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg border transition-all ${currentPage === 1
                                ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-blue-600'
                                }`}
                            title="Previous Page"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {/* Page Numbers Block */}
                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-lg text-sm font-bold border transition-all ${currentPage === page
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-blue-600'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next Page */}
                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg border transition-all ${currentPage === totalPages
                                ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-blue-600'
                                }`}
                            title="Next Page"
                        >
                            <ChevronRight size={18} />
                        </button>

                        {/* Last Page */}
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg border transition-all ${currentPage === totalPages
                                ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-blue-600'
                                }`}
                            title="Last Page"
                        >
                            <ChevronsRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
