import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layers, Globe, MapPin, FileText, BookOpen, ExternalLink, Filter, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { publicationsData } from '../data/publications';
import { PublicationCategory } from '../types/Publication';
import SmoothTabs from '../components/SmoothTabs';

const ITEMS_PER_PAGE = 15;
const PAGE_BLOCK_SIZE = 5;

const Publications = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<PublicationCategory>('all');

    // Filter State
    const [selectedYears, setSelectedYears] = useState<number[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const tabs: { id: PublicationCategory; label: string; icon: React.ReactNode }[] = [
        { id: 'all', label: 'All', icon: <Layers size={18} /> },
        { id: 'international-journal', label: 'Int. Journal', icon: <Globe size={18} /> },
        { id: 'international-conference', label: 'Int. Conference', icon: <Globe size={18} /> },
        { id: 'domestic-journal', label: 'Dom. Journal', icon: <MapPin size={18} /> },
        { id: 'domestic-conference', label: 'Dom. Conference', icon: <MapPin size={18} /> },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get('area');
        if (area && tabs.map(t => t.id).includes(area as PublicationCategory)) {
            setActiveTab(area as PublicationCategory);
            setCurrentPage(1);
        }
    }, [location]);

    const handleTabClick = (id: PublicationCategory) => {
        setActiveTab(id);
        navigate(`/publications?area=${id}`);
    };

    // Extract all unique years
    const allYears = useMemo(() => {
        const years = new Set(publicationsData.map(item => item.year));
        return Array.from(years).sort((a, b) => b - a);
    }, []);

    const toggleYear = (year: number) => {
        setSelectedYears(prev =>
            prev.includes(year)
                ? prev.filter(y => y !== year)
                : [...prev, year]
        );
        setCurrentPage(1);
    };

    const clearFilter = () => {
        setSelectedYears([]);
        setCurrentPage(1);
    };

    // 1. Filter Items
    const filteredItems = useMemo(() => {
        return publicationsData.filter(item => {
            const categoryMatch = activeTab === 'all' || item.category === activeTab;
            const yearMatch = selectedYears.length === 0 || selectedYears.includes(item.year);
            return categoryMatch && yearMatch;
        });
    }, [activeTab, selectedYears]);

    // 2. Pagination Logic
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);

    // 3. Group Paginated Items by Year
    const groupedItems = useMemo(() => {
        return paginatedItems.reduce((acc, item) => {
            if (!acc[item.year]) acc[item.year] = [];
            acc[item.year].push(item);
            return acc;
        }, {} as Record<number, typeof paginatedItems>);
    }, [paginatedItems]);

    const sortedYearsInPage = Object.keys(groupedItems).map(Number).sort((a, b) => b - a);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Use timeout to ensure scroll happens after render or simply ensure call stack clears
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    };

    // Pagination Block Calculations
    const currentBlockStart = Math.floor((currentPage - 1) / PAGE_BLOCK_SIZE) * PAGE_BLOCK_SIZE + 1;
    const currentBlockEnd = Math.min(totalPages, currentBlockStart + PAGE_BLOCK_SIZE - 1);
    const pageNumbers = Array.from({ length: currentBlockEnd - currentBlockStart + 1 }, (_, i) => currentBlockStart + i);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Publications
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {/* Categories & Filter Bar (Centered Group) */}
                {/* Fixed alignment: items-center ensures vertical centering */}
                <div className="flex flex-wrap justify-center items-center mb-10 gap-2 relative z-10">

                    {/* Tabs */}
                    <SmoothTabs
                        tabs={tabs}
                        activeId={activeTab}
                        onChange={(id) => handleTabClick(id as PublicationCategory)}
                        layoutIdPrefix="publications"
                        className="mb-0"
                    />

                    {/* Filter Button */}
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all duration-200 ${isFilterOpen || selectedYears.length > 0
                                ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                                : 'bg-white text-slate-500 border-slate-200 hover:border-blue-200 hover:text-blue-600'
                                }`}
                        >
                            <Filter size={16} />
                            <span>Year Filter</span>
                            {selectedYears.length > 0 && (
                                <span className="ml-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                    {selectedYears.length}
                                </span>
                            )}
                        </button>

                        {/* Dropdown Menu */}
                        {isFilterOpen && (
                            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-4 animate-fade-in-down origin-top-right">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm font-bold text-slate-900">Select Years</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={clearFilter}
                                            className="text-xs text-slate-500 hover:text-red-500 font-medium px-2 py-1 bg-slate-50 rounded-md hover:bg-red-50 transition-colors"
                                            title="Clear Selection"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    {allYears.map(year => (
                                        <button
                                            key={year}
                                            onClick={() => toggleYear(year)}
                                            className={`px-2 py-2 rounded-lg text-xs font-bold transition-all border ${selectedYears.includes(year)
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                                                }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-3 text-xs text-slate-400 text-center border-t border-slate-50 pt-2">
                                    {selectedYears.length === 0 ? "Showing All Years" : `${selectedYears.length} years selected`}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content List & Pagination */}
                <div className="max-w-5xl mx-auto min-h-[600px]">
                    {sortedYearsInPage.length > 0 ? (
                        sortedYearsInPage.map((year) => (
                            <div key={year} className="mb-10 animate-fade-in-up">
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-bold text-lg mr-4">
                                        {year}
                                    </div>
                                    <div className="h-px bg-slate-200 flex-grow"></div>
                                </div>
                                <div className="space-y-4">
                                    {groupedItems[year].map((paper) => (
                                        <div key={paper.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                                            <div className="flex items-start">
                                                {/* Icon */}
                                                <div className="mt-1 mr-4 p-2 bg-slate-50 text-slate-400 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors flex-shrink-0">
                                                    <FileText size={20} />
                                                </div>

                                                {/* Content Container */}
                                                <div className="flex-grow flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                                                    {/* Text Info */}
                                                    <div className="flex-grow">
                                                        <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-relaxed group-hover:text-blue-600 transition-colors">
                                                            {paper.title}
                                                        </h3>
                                                        <p className="text-slate-600 text-sm mb-2 font-medium">
                                                            {paper.author}
                                                        </p>
                                                        <div className="inline-block text-slate-500 text-sm italic">
                                                            {paper.venue}
                                                        </div>
                                                    </div>

                                                    {/* Right-aligned DOI Button (on Desktop) */}
                                                    {paper.doi && (
                                                        <div className="flex-shrink-0 md:self-center">
                                                            <a
                                                                href={`https://doi.org/${paper.doi}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 transition-all duration-200"
                                                            >
                                                                DOI <ExternalLink size={12} className="ml-1.5" />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
                            <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">No publications found for the selected filters.</p>
                        </div>
                    )}
                </div>

                {/* Advanced Pagination */}
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

export default Publications;
