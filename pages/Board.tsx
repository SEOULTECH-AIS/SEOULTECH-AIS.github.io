import React from 'react';
import { boardData } from '../data/board';
import { Layout, MessageSquare, User, Calendar } from 'lucide-react';

const Board = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Board
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {/* Board List */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider w-20 text-center">No.</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider w-40">Author</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider w-40">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {boardData.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group cursor-pointer">
                                        <td className="px-6 py-5 text-center text-slate-500 font-medium">
                                            {boardData.length - index}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center">
                                                <MessageSquare size={16} className="text-blue-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="text-slate-900 font-medium group-hover:text-blue-600 transition-colors">
                                                    {item.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center text-slate-500">
                                                <User size={14} className="mr-2" />
                                                <span>{item.author}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex items-center text-slate-400">
                                                <Calendar size={14} className="mr-2" />
                                                <span>{item.date}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Board;
