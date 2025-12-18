import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { coursesData } from '../data/courses';
import { CourseCategory } from '../types/Course';
import { BookOpen, ExternalLink, GraduationCap, Presentation, Users, Clock, History, Award } from 'lucide-react';
import SmoothTabs from '../components/SmoothTabs';

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

    // Hardcoded data
    const undergradCourses = {
        after2023: [
            "컴퓨터언어 (Computer Language)",
            "컴퓨터언어응용 (Applied Computer Language)",
            "딥러닝과 딥강화학습 (Deep Learning and Deep Reinforcement Learning)",
            "자동차공학실험(2) (Automotive Engineering Experiment 2)",
            "Capstone Design(1)",
            "Capstone Design(2)"
        ],
        before2023: [
            "컴퓨터언어 (Computer Language)",
            "컴퓨터언어응용 (Applied Computer Language)",
            "유공압제어 (Hydraulic and Pneumatic Control)",
            "자동차공학실험(2) (Automotive Engineering Experiment 2)",
            "Capstone Design(1)",
            "Capstone Design(2)"
        ]
    };

    const gradCourses = {
        after2021: [
            "딥러닝 (Deep Learning)",
            "딥강화학습 (Deep Reinforcement Learning)"
        ],
        before2021: [
            "지능시스템 (Intelligent Systems)",
            "머신비전 (Machine Vision)"
        ]
    };

    // Sorted Ascending (Oldest -> Newest)
    const capstoneHistory = [
        {
            year: 2019,
            projects: [
                {
                    members: "김창용, 염상식, 박정덕",
                    topic: "Deep Reinforcement Learning을 이용한 자율주행 RC Car"
                },
                {
                    members: "김환주, 이정호, 강윤구",
                    topic: "딥러닝 기반 드론 비행 중 객체 식별 및 위치 확인"
                }
            ]
        },
        {
            year: 2020,
            projects: [
                {
                    members: "전준영, 정기현, 김건태",
                    topic: "자율 주행을 위한 딥러닝 기반 주행 환경 분석"
                },
                {
                    members: "안도현, 임현섭, 정경진",
                    topic: "딥러닝을 이용한 운전자 모니터링"
                }
            ]
        },
        {
            year: 2021,
            projects: [
                {
                    members: "최지수, 고은정",
                    topic: "Distilled semantics for comprehensive scene understanding from videos"
                },
                {
                    members: "이병연, 최성훈, 김병주",
                    topic: "ORB-SLAM3"
                },
                {
                    members: "장민성, 김연서",
                    topic: "EfficientDet 을 이용한 도로 환경의 객체 검출"
                }
            ]
        },
        {
            year: 2022,
            projects: [
                {
                    members: "김보슬, 조원근, 르민황",
                    topic: "Transformer를 이용한 차선 인지"
                },
                {
                    members: "김성우, 안정현, 응웬녹홍",
                    topic: "Isaac Gym을 이용한 딥강화학습"
                },
                {
                    members: "응웬쭝남, 황홍관",
                    topic: "딥강화학습 기반 자율 주행"
                }
            ]
        },
        {
            year: 2023,
            projects: [
                {
                    members: "나성민, 전태양, 하승현, 팜태안",
                    topic: "NeRF를 이용한 NICE-SLAM 활용"
                },
                {
                    members: "응웬쭝남, 황홍관",
                    topic: "딥강화학습 기반 자율 주행"
                }
            ]
        },
        {
            year: 2025,
            projects: [
                {
                    members: "갱신 중 (Updating...)",
                    topic: "TBD"
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Courses</h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {/* Smooth Tabs */}
                <SmoothTabs
                    tabs={tabs}
                    activeId={activeTab}
                    onChange={(id) => handleTabClick(id as CourseCategory)}
                    layoutIdPrefix="courses"
                />

                {/* Content Area */}
                <div className="animate-fade-in-up">
                    {/* UNDERGRADUATE TAB */}
                    {activeTab === 'undergraduate' && (
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                {/* After 2023 Spring */}
                                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Clock size={120} className="text-blue-600" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center mb-8">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                                                <Clock size={20} />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-900">2023년 1학기 이후</h2>
                                        </div>
                                        <div className="space-y-4">
                                            {undergradCourses.after2023.map((course, idx) => (
                                                <div key={idx} className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-4"></div>
                                                    <span className="font-medium text-slate-700 text-lg">{course}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Before 2023 Spring */}
                                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <History size={120} className="text-slate-600" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center mb-8">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mr-4">
                                                <History size={20} />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-900">2023년 1학기 이전</h2>
                                        </div>
                                        <div className="space-y-4">
                                            {undergradCourses.before2023.map((course, idx) => (
                                                <div key={idx} className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                                    <div className="w-2 h-2 rounded-full bg-slate-400 mr-4"></div>
                                                    <span className="font-medium text-slate-700 text-lg">{course}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center text-slate-400 mt-12 text-sm">
                                * Curriculum changes applied from the Spring Semester of 2023.
                            </p>
                        </div>
                    )}

                    {/* GRADUATE TAB */}
                    {activeTab === 'graduate' && (
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                {/* After 2021 Spring */}
                                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Clock size={120} className="text-blue-600" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center mb-8">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                                                <Clock size={20} />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-900">2021년도 1학기 이후</h2>
                                        </div>
                                        <div className="space-y-4">
                                            {gradCourses.after2021.map((course, idx) => (
                                                <div key={idx} className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-4"></div>
                                                    <span className="font-medium text-slate-700 text-lg">{course}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Before 2021 Spring */}
                                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <History size={120} className="text-slate-600" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center mb-8">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mr-4">
                                                <History size={20} />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-900">2021년도 1학기 이전</h2>
                                        </div>
                                        <div className="space-y-4">
                                            {gradCourses.before2021.map((course, idx) => (
                                                <div key={idx} className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                                    <div className="w-2 h-2 rounded-full bg-slate-400 mr-4"></div>
                                                    <span className="font-medium text-slate-700 text-lg">{course}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center text-slate-400 mt-12 text-sm">
                                * Curriculum changes applied from the Spring Semester of 2021.
                            </p>
                        </div>
                    )}

                    {/* CAPSTONE TAB */}
                    {activeTab === 'capstone' && (
                        <div className="max-w-7xl mx-auto">
                            {/* Images Section - Full Width */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                                <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100 bg-white group">
                                    <div className="overflow-hidden">
                                        <img
                                            src="/assets/images/Research_image/capstone_1.png"
                                            alt="Capstone Design 1"
                                            className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                                        <h3 className="text-xl font-bold text-slate-800">2019 Capstone Design</h3>
                                    </div>
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100 bg-white group">
                                    <div className="overflow-hidden">
                                        <img
                                            src="/assets/images/Research_image/capstone_2.png"
                                            alt="Capstone Design 2"
                                            className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                                        <h3 className="text-xl font-bold text-slate-800">2020 Capstone Design</h3>
                                    </div>
                                </div>
                            </div>

                            {/* History Table - Refined */}
                            <div className="max-w-6xl mx-auto">
                                <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10 flex items-center justify-center gap-3">
                                    <Award className="text-blue-600" />
                                    Capstone Design History
                                </h2>

                                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 border-b border-slate-200">
                                                    <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider w-32 text-center text-nowrap">Year</th>
                                                    <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider w-1/3">Team</th>
                                                    <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Topic</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {capstoneHistory.map((item) => (
                                                    <React.Fragment key={item.year}>
                                                        {item.projects.map((proj, pIdx) => (
                                                            <tr key={`${item.year}-${pIdx}`} className="hover:bg-slate-50/80 transition-colors">
                                                                {/* Year Column - Spanning Rows */}
                                                                {pIdx === 0 && (
                                                                    <td
                                                                        rowSpan={item.projects.length}
                                                                        className="py-6 px-6 border-r border-slate-100 align-top text-center"
                                                                    >
                                                                        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-base font-bold shadow-sm">
                                                                            {item.year}
                                                                        </span>
                                                                    </td>
                                                                )}

                                                                {/* Team Column */}
                                                                <td className="py-5 px-6 border-r border-slate-100 align-top">
                                                                    <div className="flex items-start">
                                                                        <Users size={18} className="text-slate-400 mr-2 mt-0.5 flex-shrink-0 md:hidden" />
                                                                        <span className="text-slate-700 font-medium leading-relaxed">
                                                                            {proj.members}
                                                                        </span>
                                                                    </div>
                                                                </td>

                                                                {/* Topic Column */}
                                                                <td className="py-5 px-6 align-top">
                                                                    <div className="flex items-start">
                                                                        <Presentation size={18} className="text-slate-400 mr-2 mt-0.5 flex-shrink-0 md:hidden" />
                                                                        <span className="text-slate-600 font-medium leading-relaxed">
                                                                            {proj.topic}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {/* Optional Divider Row for years if needed, effectively handled by border-b in tr */}
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Courses;
