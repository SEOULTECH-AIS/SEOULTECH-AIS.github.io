import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { coursesData } from '../data/courses';
import { CourseCategory } from '../types/Course';
import { BookOpen, ExternalLink, GraduationCap, Presentation, Users } from 'lucide-react';

const Courses = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<CourseCategory>('undergraduate');

    const tabs: { id: CourseCategory; label: string; icon: React.ReactNode }[] = [
        { id: 'undergraduate', label: 'Undergraduate', icon: <BookOpen size={18} /> },
        { id: 'graduate', label: 'Graduate', icon: <GraduationCap size={18} /> },
        { id: 'capstone', label: 'Capstone Design', icon: <Users size={18} /> },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get('area');
        if (area && ['undergraduate', 'graduate', 'capstone'].includes(area)) {
            setActiveTab(area as CourseCategory);
        }
    }, [location]);

    const handleTabClick = (id: CourseCategory) => {
        setActiveTab(id);
        navigate(`/courses?area=${id}`);
    };

    const filteredCourses = coursesData.filter(course => course.category === activeTab);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Courses
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

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <div key={course.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                        <Presentation size={24} />
                                    </div>
                                    {course.link && (
                                        <a
                                            href={course.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-blue-600 transition-colors"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                                {course.description && (
                                    <p className="text-slate-600 mb-4 line-clamp-2">{course.description}</p>
                                )}
                                {course.semester && (
                                    <div className="text-sm text-slate-500 font-medium bg-slate-50 inline-block px-3 py-1 rounded-full">
                                        {course.semester}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
                            <Presentation className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">No courses available in this category yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Courses;
