import React from 'react';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-500">
                    <div>
                        <h3 className="text-slate-900 font-bold text-lg mb-4">Autonomous Intelligent Systems Lab</h3>
                        <p className="text-sm">
                            Advancing the frontier of artificial intelligence and cognitive systems through interdisciplinary research.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-slate-900 font-bold text-lg mb-4">Contact</h3>
                        <div className="flex items-center space-x-2 text-sm mb-2">
                            <Mail size={16} />
                            <span>jeha@seoultech.ac.kr</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <MapPin size={16} />
                            <span>Room 702, Frontier Hall (#32)</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-slate-900 font-bold text-lg mb-4">Legal</h3>
                        <p className="text-sm">&copy; {new Date().getFullYear()} AIS Lab.</p>
                        <p className="text-sm">All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
