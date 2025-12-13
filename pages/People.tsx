import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { peopleData } from '../data/people';
import { Person } from '../types/Person';

const People = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('Professor');
    const [people, setPeople] = useState<Person[]>([]);

    const tabs = ['Professor', 'Members', 'Alumni'];

    // Sync tab with URL Query Param (?tab=...)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tabParam = params.get('tab');

        if (tabParam && tabs.map(t => t.toLowerCase()).includes(tabParam.toLowerCase())) {
            const formatted = tabParam.charAt(0).toUpperCase() + tabParam.slice(1).toLowerCase();
            setActiveTab(formatted);
        }
    }, [location]);

    // Load data based on active tab
    useEffect(() => {
        let data: Person[] = [];
        if (activeTab === 'Professor') {
            data = peopleData.filter(p => p.category === 'Professor');
        } else if (activeTab === 'Members') {
            data = peopleData.filter(p => p.category === 'Member');
        } else if (activeTab === 'Alumni') {
            data = peopleData.filter(p => p.category === 'Alumni');
        }
        setPeople(data);
    }, [activeTab]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        const newUrl = window.location.hash.split('?')[0] + `?tab=${tab.toLowerCase()}`;
        window.location.hash = newUrl.replace('#', '');
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Our People</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Autonomous Intelligent Systems LAB
                    </p>
                </div>

                {/* Custom Tab Navigation */}
                <div className="flex justify-center mb-16">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 inline-flex flex-wrap justify-center gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabClick(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${activeTab === tab
                                        ? 'bg-blue-600 text-white shadow-md z-10'
                                        : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {people.map((person, idx) => (
                        <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group ring-1 ring-slate-200">
                            <div className="aspect-square overflow-hidden relative">
                                <img
                                    src={person.img && !person.img.startsWith('/module/upload') ? person.img : `https://via.placeholder.com/400x400?text=${person.name}`}
                                    onError={(e) => { e.currentTarget.src = `https://via.placeholder.com/400x400?text=${person.name}`; }}
                                    alt={person.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6 relative">
                                <div className="absolute -top-10 left-6 right-6">
                                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-md ring-1 ring-slate-100/50">
                                        <h3 className="text-xl font-bold text-slate-900 text-center">{person.name}</h3>
                                        <p className="text-blue-600 font-semibold text-sm text-center">{person.role || 'Researcher'}</p>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <p className="text-slate-600 text-sm leading-relaxed text-center line-clamp-3">
                                        {person.bio}
                                    </p>
                                    {person.email && (
                                        <p className="text-slate-500 text-xs text-center mt-2 font-mono">
                                            {person.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {people.length === 0 && (
                        <div className="col-span-full text-center py-20 text-slate-400">
                            No members found in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default People;
