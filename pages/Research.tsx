import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { researchData } from '../data/research';

const Research = () => {
    const location = useLocation();
    const [activeId, setActiveId] = useState(researchData[0].id);

    // Sync active tab with URL query param ?area=...
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const areaParam = params.get('area');
        if (areaParam && researchData.some(r => r.id === areaParam)) {
            setActiveId(areaParam);
        }
    }, [location]);

    const activeItem = researchData.find(r => r.id === activeId) || researchData[0];

    const handleTabClick = (id: string) => {
        setActiveId(id);
        const newUrl = window.location.hash.split('?')[0] + `?area=${id}`;
        window.location.hash = newUrl.replace('#', '');
    };

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

                {/* Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 inline-flex flex-wrap justify-center gap-2">
                        {researchData.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabClick(item.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${activeId === item.id
                                    ? 'bg-blue-600 text-white shadow-md z-10'
                                    : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
                                    }`}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Display */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Image Section */}
                        <div className="bg-slate-100 relative h-64 md:h-auto overflow-hidden">
                            <img
                                key={activeItem.imageUrl} // Key change forces animation re-render
                                src={activeItem.imageUrl}
                                alt={activeItem.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 animate-fadeIn"
                            />
                        </div>

                        {/* Text Section */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">{activeItem.title}</h2>
                            <div className="text-slate-600 leading-relaxed text-lg mb-8 whitespace-pre-wrap">
                                {activeItem.description}
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

                            <div className="mt-auto">
                                <a
                                    href={activeItem.originalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 font-semibold hover:underline"
                                >
                                    View Original Page &rarr;
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Research;

