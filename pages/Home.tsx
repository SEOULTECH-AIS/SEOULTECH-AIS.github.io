import React from 'react';
import { ArrowRight, Brain, Cpu, Network, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CityDetectionBackground from '../components/CityDetectionBackground';
// Changed import from '../data/home' to '../data/research'
import { researchData } from '../data/research';
import { boardData } from '../data/board';

const Home = () => {
    // Filter research data to exclude equipment and limit to first 4 areas
    const displayResearch = researchData
        .filter(item => item.title !== 'Research Equipment')
        .slice(0, 4);

    // Helper to render icons based on index
    // Use current color to allow hover states to work
    const getIconForIndex = (index: number) => {
        const icons = [
            <Brain className="w-8 h-8" />,   // Area 1
            <Network className="w-8 h-8" />, // Area 2
            <Cpu className="w-8 h-8" />,      // Area 3
            <Brain className="w-8 h-8" />  // Area 4
        ];
        return icons[index % icons.length];
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-screen w-full overflow-hidden bg-slate-50">

                {/* Layer 1: Background (Absolute) */}
                <div className="absolute inset-0 z-0">
                    <CityDetectionBackground />
                </div>

                {/* Layer 2: Text Overlay (Absolute Centered) */}
                {/* pointer-events-none ensures clicks pass through the container */}
                <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none">
                    <div className="text-center max-w-5xl px-4 space-y-8 select-none">
                        <h2 className="text-blue-600 font-bold tracking-[0.2em] text-sm md:text-base uppercase">
                            Welcome to
                        </h2>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-none">
                            Autonomous Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Systems</span>
                        </h1>
                        <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                            Bridging the gap between biological intelligence and synthetic computation through cutting-edge research.
                        </p>
                        <div className="pt-8 w-full flex justify-center">
                            {/* Button MUST be clickable, so we explicitly add pointer-events-auto here */}
                            <Link
                                to="/research"
                                className="pointer-events-auto inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 group"
                            >
                                Explore Research
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 pointer-events-none z-20">
                    <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-slate-400 rounded-full animate-scroll"></div>
                    </div>
                </div>
            </div>

            {/* Research Summary Section */}
            <section className="py-24 bg-white relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Research Areas</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Adjusted grid for 4 items: 1 col mobile, 2 cols tablet/desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {displayResearch.map((topic, index) => (
                            <Link
                                to={`/research?area=${topic.id}`}
                                key={topic.id}
                                className="bg-white border border-slate-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col cursor-pointer block"
                            >
                                <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    {getIconForIndex(index)}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{topic.title}</h3>
                                <div className="text-slate-600 leading-relaxed mb-6 flex-grow line-clamp-3">
                                    {/* Strip markdown for summary */}
                                    {topic.description.split('### Overview')[1]?.split('###')[0].replace(/\*\*/g, '').trim().substring(0, 150) + '...'}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section className="py-24 bg-slate-50 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Latest News</h2>
                            <p className="text-slate-500">Updates from the lab and team members.</p>
                        </div>
                        <Link to="/board" className="hidden md:flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium">
                            View all posts <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {boardData.slice(0, 3).map((item) => (
                            <Link
                                to="/board"
                                key={item.id}
                                className="group block bg-white hover:border-blue-200 border border-slate-200 rounded-xl p-6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md cursor-pointer"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                                            Notice
                                        </span>
                                        <div className="flex items-center text-slate-400 text-sm whitespace-nowrap">
                                            <Calendar size={14} className="mr-1" />
                                            {item.date}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 md:hidden">
                        <Link to="/board" className="flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors font-medium">
                            View all posts <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
