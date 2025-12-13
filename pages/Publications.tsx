import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { publicationsData } from '../data/publications';
import { PublicationCategory } from '../types/Publication';
import { BookOpen, FileText, Globe, MapPin, Layers, ExternalLink } from 'lucide-react';

const Publications = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<PublicationCategory>('all');

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
        }
    }, [location]);

    const handleTabClick = (id: PublicationCategory) => {
        setActiveTab(id);
        navigate(`/publications?area=${id}`);
    };

    // Filter Logic
    const filteredItems = activeTab === 'all'
        ? publicationsData
        : publicationsData.filter(item => item.category === activeTab);

    // Group by Year
    const groupedItems = filteredItems.reduce((acc, item) => {
        if (!acc[item.year]) acc[item.year] = [];
        acc[item.year].push(item);
        return acc;
    }, {} as Record<number, typeof filteredItems>);

    // Sort years descending
    const sortedYears = Object.keys(groupedItems).map(Number).sort((a, b) => b - a);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Publications
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {/* Horizontal Tabs */}
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

                {/* Content List */}
                <div className="max-w-5xl mx-auto">
                    {sortedYears.length > 0 ? (
                        sortedYears.map((year) => (
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
                            <p className="text-slate-500 font-medium">No publications found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Publications;
