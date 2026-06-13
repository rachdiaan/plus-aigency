import React from "react";
import { Smartphone, ArrowDown, Globe, Server, Database, Zap } from "lucide-react";

export const NetworkTopology = () => (
    <div className="h-full flex flex-col">
        <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Network Topology</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Infrastruktur Server & Alur Data.</p>
        </div>
        <div className="flex-1 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-white/10 p-8 flex items-center justify-center relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1 }}></div>

            <div className="flex flex-col items-center gap-12 w-full max-w-3xl relative z-10">
                {/* Client Layer */}
                <div className="flex flex-col items-center">
                    <div className="bg-slate-800 dark:bg-white text-white dark:text-black px-6 py-2 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center gap-2"><Smartphone size={16} /> Client (Browser/Mobile)</div>
                    <ArrowDown className="text-slate-500 my-2" size={24} />
                </div>

                {/* Edge Layer */}
                <div className="w-full border-t border-dashed border-slate-400 dark:border-slate-600 relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-2 text-[10px] text-slate-500 uppercase tracking-widest">Edge Layer</span>
                </div>

                <div className="flex justify-center gap-12">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/20 border border-orange-500 rounded-lg flex items-center justify-center text-orange-500 mb-2"><Globe size={32} /></div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">CDN / WAF</p>
                    </div>
                </div>

                <ArrowDown className="text-slate-500" size={24} />

                {/* App Layer */}
                <div className="flex gap-4 p-4 border border-blue-500/30 rounded-2xl bg-blue-50 dark:bg-blue-900/10 backdrop-blur-sm relative">
                    <span className="absolute -top-3 left-4 bg-blue-600 px-2 text-[10px] text-white rounded font-bold">Kubernetes Cluster</span>
                    <div className="flex flex-col items-center p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-white/5 shadow-sm">
                        <Server size={24} className="text-blue-500 dark:text-blue-400 mb-1" />
                        <span className="text-[10px] text-slate-600 dark:text-slate-300">App Pod 1</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-white/5 shadow-sm">
                        <Server size={24} className="text-blue-500 dark:text-blue-400 mb-1" />
                        <span className="text-[10px] text-slate-600 dark:text-slate-300">App Pod 2</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-white/5 shadow-sm">
                        <Server size={24} className="text-blue-500 dark:text-blue-400 mb-1" />
                        <span className="text-[10px] text-slate-600 dark:text-slate-300">Worker</span>
                    </div>
                </div>

                <div className="flex w-full justify-between px-20 relative">
                    {/* Connecting Lines (CSS borders) */}
                    <div className="absolute top-0 left-1/2 w-px h-8 bg-slate-400 dark:bg-slate-600 -translate-x-1/2"></div>
                    <div className="absolute top-8 left-[25%] right-[25%] h-px bg-slate-400 dark:bg-slate-600"></div>
                    <div className="absolute top-8 left-[25%] w-px h-8 bg-slate-400 dark:bg-slate-600"></div>
                    <div className="absolute top-8 right-[25%] w-px h-8 bg-slate-400 dark:bg-slate-600"></div>
                </div>

                {/* Data Layer */}
                <div className="flex justify-between w-full max-w-lg mt-4">
                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-green-100 dark:bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center text-green-500 mb-2"><Database size={24} /></div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">PostgreSQL</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-blue-100 dark:bg-brand/20 border border-brand rounded-full flex items-center justify-center text-brand mb-2"><Zap size={24} /></div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Gemini API</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
