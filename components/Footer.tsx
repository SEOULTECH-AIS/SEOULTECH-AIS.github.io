import React from 'react';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">

                    {/* Left: Content (Lab Info, Contact, Legal) */}
                    <div className="text-left flex flex-col items-start">
                        {/* Title */}
                        <h3 className="text-slate-900 font-bold text-lg mb-1">Autonomous Intelligent Systems Lab</h3>

                        {/* Wrapper for Contact + Divider + Legal in one line */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">

                            {/* Contact Info Group */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1.5">
                                    <MapPin size={14} className="text-slate-400" />
                                    <span>Room 702, Frontier Hall (#32)</span>
                                </div>
                                <div className="flex items-center space-x-1.5">
                                    <Mail size={14} className="text-slate-400" />
                                    <span>jeha@seoultech.ac.kr</span>
                                </div>
                            </div>

                            {/* Divider (Hidden on very small screens if it wraps, but usually visible) */}
                            <div className="hidden sm:block h-3 w-px bg-slate-300"></div>

                            {/* Legal Info Group */}
                            <div className="flex items-center space-x-3 text-slate-400">
                                <a
                                    href="https://www.seoultech.ac.kr/sinfo/persnal/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-500 font-medium hover:text-blue-600 transition-colors"
                                >
                                    개인정보처리방침
                                </a>
                                <span className="text-slate-300">|</span>
                                <span>
                                    &copy; {new Date().getFullYear()} AIS Lab. All rights reserved.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: SeoulTech School Logo */}
                    <div className="flex-shrink-0">
                        <img
                            src="/assets/images/Logo_seoultech_bar.jpg"
                            alt="SeoulTech Logo"
                            className="h-24 w-auto object-contain mix-blend-multiply"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
