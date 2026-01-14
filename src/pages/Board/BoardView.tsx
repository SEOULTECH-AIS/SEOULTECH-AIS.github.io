import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BoardItem } from '@/types/Board';
import { Description } from '@/types/Base';
import { MessageSquare, User, Calendar, ChevronDown, ChevronUp, Microscope, Server, Cpu, Database, HardDrive, Layout } from 'lucide-react';
import SmoothTabs from '@/components/SmoothTabs';
import './Board.css';

interface BoardViewProps {
    data: BoardItem[];
    equipmentData: Description[];
}

const formatDate = (date: { year: number; month: number; day?: number }) => {
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day || 1).padStart(2, '0')}`;
};

const BoardView: React.FC<BoardViewProps> = ({ data, equipmentData }) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const location = useLocation();

    // Check query param for initial tab
    const getInitialTab = () => {
        const params = new URLSearchParams(location.search);
        const area = params.get('area');
        return area === 'equipment' ? 'EQUIPMENT' : 'NEWS';
    };

    const [activeTab, setActiveTab] = useState<'NEWS' | 'EQUIPMENT'>(getInitialTab);

    // Sync tab with URL changes
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get('area');
        if (area === 'equipment') setActiveTab('EQUIPMENT');
        else if (area === 'news') setActiveTab('NEWS');
    }, [location.search]);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleTabChange = (id: 'NEWS' | 'EQUIPMENT') => {
        setActiveTab(id);
    };

    const renderContents = (contents: any) => {
        if (!contents) return null;
        if (typeof contents === 'string') {
            return <p className="whitespace-pre-wrap">{contents}</p>;
        }
        if (Array.isArray(contents)) {
            return (
                <ul className="list-disc list-inside space-y-2 marker:text-blue-500">
                    {contents.map((content, idx) => (
                        <li key={idx} className="pl-2">{typeof content === 'string' ? content : JSON.stringify(content)}</li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    return (
        <div className="board-wrapper">
            <div className="board-container">
                {/* Header */}
                <div className="board-header">
                    <h1 className="board-title">Board</h1>
                    <div className="board-divider"></div>
                </div>

                {/* Smooth Tabs */}
                <SmoothTabs
                    tabs={[
                        { id: 'NEWS', label: 'News', icon: <MessageSquare size={16} /> },
                        { id: 'EQUIPMENT', label: 'Research Equipment', icon: <Microscope size={16} /> }
                    ]}
                    activeId={activeTab}
                    onChange={(id) => handleTabChange(id as 'NEWS' | 'EQUIPMENT')}
                    layoutIdPrefix="board"
                />

                {/* Content */}
                <div className="animate-fade-in">
                    {activeTab === 'NEWS' ? (
                        <div className="board-list-container">
                            <div className="board-table-wrapper">
                                <table className="board-table">
                                    <thead className="board-thead">
                                        <tr>
                                            <th className="board-th w-20 text-center">No.</th>
                                            <th className="board-th">Title</th>
                                            <th className="board-th w-40">Author</th>
                                            <th className="board-th w-40">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="board-tbody">
                                        {data.map((item, index) => (
                                            <React.Fragment key={item.id}>
                                                <tr
                                                    className={`board-tr group ${expandedId === item.id ? 'bg-muted/30' : ''}`}
                                                    onClick={() => toggleExpand(item.id)}
                                                >
                                                    <td className="board-td-no">
                                                        {data.length - index}
                                                    </td>
                                                    <td className="board-td-title">
                                                        <div className="board-title-content">
                                                            <MessageSquare size={16} className={`board-icon ${expandedId === item.id ? 'opacity-100' : ''}`} />
                                                            <span className={`board-text-title ${expandedId === item.id ? 'text-primary' : ''}`}>
                                                                {item.title}
                                                            </span>
                                                            {expandedId === item.id ?
                                                                <ChevronUp size={14} className="ml-2 text-primary" /> :
                                                                <ChevronDown size={14} className="ml-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="board-td-meta">
                                                        <div className="board-meta-content">
                                                            <User size={14} className="mr-2" />
                                                            <span>{item.author}</span>
                                                        </div>
                                                    </td>
                                                    <td className="board-td-date">
                                                        <div className="board-meta-content">
                                                            <Calendar size={14} className="mr-2" />
                                                            <span>{formatDate(item.date)}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {expandedId === item.id && (
                                                    <tr className="bg-muted/10 cursor-default animate-fade-in-up">
                                                        <td colSpan={4} className="px-12 py-8">
                                                            <div className="text-foreground/80 leading-relaxed pl-6 border-l-2 border-primary/20">
                                                                {renderContents(item.contents)}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="equipment-container max-w-5xl mx-auto space-y-6">
                            {equipmentData.map((item, index) => {
                                const isCore = item.title === 'Core Infrastructure';
                                return (
                                    <div key={index} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className={`px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center ${isCore ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}>
                                            <div className={`p-2 rounded-lg mr-4 ${isCore ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                                {isCore ? <Server size={20} /> : <MessageSquare size={20} />}
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="p-8">
                                            {isCore ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {(item.contents as string[]).map((content, idx) => {
                                                        const [label, value] = content.replace('• ', '').split(': ');
                                                        let Icon = HardDrive;
                                                        if (label.includes('Personal')) Icon = Layout;
                                                        if (label.includes('Training')) Icon = Cpu;
                                                        if (label.includes('Storage')) Icon = Database;
                                                        if (label.includes('External')) Icon = Server;

                                                        return (
                                                            <div key={idx} className="flex items-start p-4 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                                                                <Icon className="text-blue-500 mt-1 mr-3 flex-shrink-0" size={18} />
                                                                <div>
                                                                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1">{label}</div>
                                                                    <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{value}</div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="text-slate-600 dark:text-slate-400 leading-relaxed pl-2 border-l-4 border-blue-500/30">
                                                    {renderContents(item.contents)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoardView;
