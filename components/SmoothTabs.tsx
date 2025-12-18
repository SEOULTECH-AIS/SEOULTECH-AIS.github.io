import React from 'react';
import { motion } from 'framer-motion';

export interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface SmoothTabsProps {
    tabs: TabItem[];
    activeId: string;
    onChange: (id: string) => void;
    layoutIdPrefix?: string; // To avoid ID collisions if multiple tab groups exist
    className?: string;
}

const SmoothTabs: React.FC<SmoothTabsProps> = ({ tabs, activeId, onChange, layoutIdPrefix = 'tab', className }) => {
    return (
        <div className={`flex justify-center ${className ?? 'mb-12'}`}>
            <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 inline-flex flex-wrap justify-center gap-2 relative">
                {tabs.map((tab) => {
                    const isActive = activeId === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={`group flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-200 relative z-10 ${isActive ? 'text-white' : 'text-slate-500 hover:text-blue-600'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId={`${layoutIdPrefix}-active-pill`}
                                    className="absolute inset-0 bg-blue-600 rounded-lg shadow-md -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {tab.icon && <span className={`mr-2 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`}>{tab.icon}</span>}
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SmoothTabs;
