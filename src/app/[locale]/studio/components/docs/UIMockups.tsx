import React from "react";
import { Sidebar, Layout, Smartphone } from "lucide-react";

export const UIMockups = () => (
    <div className="h-full flex flex-col">
        <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">UI/UX Mockups</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Visualisasi antarmuka aplikasi.</p>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 space-y-12">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-brand/10 p-2 rounded-lg text-brand"><Layout size={20} /></div>
                    <h4 className="font-bold text-slate-800 dark:text-white">Dashboard (Desktop)</h4>
                </div>
                <div className="aspect-video bg-slate-900 border-4 border-slate-800 rounded-xl shadow-2xl overflow-hidden relative group">
                    {/* Mockup Content */}
                    <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 flex">
                        <div className="w-16 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-white/5 flex flex-col items-center py-4 gap-4">
                            <div className="w-8 h-8 bg-brand rounded-lg mb-4"></div>
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg"></div>)}
                        </div>
                        <div className="flex-1 p-6 space-y-4">
                            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-8"></div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-32 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm"></div>
                                <div className="h-32 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm"></div>
                                <div className="h-32 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm"></div>
                            </div>
                            <div className="h-64 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm mt-4"></div>
                        </div>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-brand/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-lg">High-Fidelity Dashboard</div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-brand/10 p-2 rounded-lg text-brand"><Smartphone size={20} /></div>
                    <h4 className="font-bold text-slate-800 dark:text-white">Mobile View</h4>
                </div>
                <div className="flex justify-center gap-8 bg-slate-100 dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-white/5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-[180px] h-[360px] bg-white dark:bg-slate-900 border-4 border-slate-800 rounded-[2rem] shadow-xl overflow-hidden relative group">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-b-xl z-20"></div>
                            <div className="absolute inset-0 p-4 space-y-2 pt-8">
                                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2 mb-4"></div>
                                <div className="aspect-square bg-brand/10 rounded-xl mb-2"></div>
                                <div className="space-y-1">
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded"></div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-2/3"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
