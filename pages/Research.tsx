import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { researchData } from '../data/research';
import SmoothTabs from '../components/SmoothTabs';

const Research = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState(researchData[0].id);

    // Sync active tab with URL query param ?area=...
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const areaParam = params.get('area');

        if (areaParam) {
            const exists = researchData.find(item => item.id === areaParam);
            if (exists) {
                setActiveId(areaParam);
            }
        } else {
            if (researchData.length > 0 && !activeId) {
                setActiveId(researchData[0].id);
            }
        }

        window.scrollTo(0, 0);
    }, [location]);

    const activeItem = researchData.find(r => r.id === activeId) || researchData[0];

    const handleTabClick = (id: string) => {
        // Update URL, let useEffect sync the state
        navigate(`?area=${id}`);
    };

    // Prepare tabs for SmoothTabs
    const tabs = researchData.map(item => ({
        id: item.id,
        label: item.title
    }));

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Research Areas</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Explore our core research topics.
                    </p>
                </div>

                {/* Smooth Tabs */}
                <SmoothTabs
                    tabs={tabs}
                    activeId={activeId}
                    onChange={handleTabClick}
                    layoutIdPrefix="research"
                />

                {/* Content Display */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    {/* Vertical Layout: Image Top, Text Bottom */}
                    <div className="flex flex-col">
                        {/* Image Section - Hidden for Research Equipment */}
                        {activeItem.title !== 'Research Equipment' && (
                            <div className="bg-slate-100 relative w-full overflow-hidden">
                                <img
                                    key={activeItem.imageUrl} // Key change forces animation re-render
                                    src={activeItem.imageUrl}
                                    alt={activeItem.title}
                                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105 animate-fadeIn"
                                    style={{ maxHeight: '600px' }} // Limit max height for extremely tall images, generally wide images will fit well
                                />
                            </div>
                        )}

                        {/* Text Section */}
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">{activeItem.title}</h2>

                            {/* Custom Markdown Renderer */}
                            <div className="text-slate-600 leading-relaxed text-lg mb-8">
                                {activeItem.description.split('\n').map((line, index) => {
                                    const trimmed = line.trim();
                                    if (!trimmed) return <div key={index} className="h-4"></div>; // Spacer for empty lines

                                    // Header 3 (###)
                                    if (trimmed.startsWith('### ')) {
                                        return (
                                            <h3 key={index} className="text-xl font-bold text-slate-900 mt-6 mb-3 border-l-4 border-blue-600 pl-3">
                                                {trimmed.replace('### ', '')}
                                            </h3>
                                        );
                                    }

                                    // List Item (*)
                                    if (trimmed.startsWith('* ')) {
                                        // Bold parsing inside list
                                        const content = trimmed.substring(2);
                                        const parts = content.split(/(\*\*.*?\*\*)/g);
                                        return (
                                            <div key={index} className="flex items-start mb-2 pl-4">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                                                <p className="flex-1">
                                                    {parts.map((part, i) => {
                                                        if (part.startsWith('**') && part.endsWith('**')) {
                                                            return <strong key={i} className="text-slate-800 font-semibold">{part.slice(2, -2)}</strong>;
                                                        }
                                                        return <span key={i}>{part}</span>;
                                                    })}
                                                </p>
                                            </div>
                                        );
                                    }

                                    // Standard Paragraph with Bold support
                                    const parts = line.split(/(\*\*.*?\*\*)/g);
                                    return (
                                        <p key={index} className="mb-2">
                                            {parts.map((part, i) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={i} className="text-slate-800 font-semibold">{part.slice(2, -2)}</strong>;
                                                }
                                                return <span key={i}>{part}</span>;
                                            })}
                                        </p>
                                    );
                                })}
                            </div>

                            {activeItem.publications && activeItem.publications.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">Selected Publications</h3>
                                    <ul className="space-y-3">
                                        {activeItem.publications.map((pub, idx) => (
                                            <li key={idx} className="flex items-start text-slate-600">
                                                <span className="mr-3 text-blue-500 mt-1.5">&bull;</span>
                                                <span className="text-sm md:text-base leading-relaxed">{pub}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Research;
