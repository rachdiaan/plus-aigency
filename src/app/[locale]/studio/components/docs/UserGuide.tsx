import React, { useState } from "react";
import { Sparkles, Wand2, PlayCircle, ArrowRight, Pause, Play, Eye, HelpCircle, ChevronUp, ChevronDown } from "lucide-react";
import { MOCK_TUTORIALS, MOCK_FAQ } from "@/lib/mockData";

export const UserGuide: React.FC<{ onStartTour: (tab: string) => void }> = ({ onStartTour }) => {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-100 to-sky-100 dark:from-brand/40 dark:to-blue-900/40 border border-slate-200 dark:border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-3xl rounded-full pointer-events-none"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Halo, Ada yang bisa kami bantu?</h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg leading-relaxed">Pelajari cara menggunakan PLUS secara maksimal dengan tur interaktif dan video tutorial singkat.</p>
                </div>
                <div className="flex gap-3 relative z-10">
                    <button onClick={() => onStartTour('planner')} className="px-5 py-2.5 bg-white text-brand font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-lg flex items-center gap-2"><Sparkles size={16} /> Mulai Tur Planner</button>
                    <button onClick={() => onStartTour('generator')} className="px-5 py-2.5 bg-brand text-white font-bold text-sm rounded-xl hover:bg-brand/80 transition-colors shadow-lg flex items-center gap-2"><Wand2 size={16} /> Tur Generator</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Video Tutorials */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2"><PlayCircle size={20} className="text-brand dark:text-brand" /> Video Tutorial</h3>

                    {/* Active Player Simulator */}
                    <div className="aspect-video bg-black rounded-xl border border-white/10 relative overflow-hidden group shadow-2xl">
                        {activeVideo ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-sky-900/20 animate-pulse"></div>
                                <div className="text-center relative z-10">
                                    <h4 className="text-white font-bold text-xl mb-2">{MOCK_TUTORIALS.find(v => v.id === activeVideo)?.title}</h4>
                                    <div className="flex items-center gap-4 justify-center">
                                        <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"><ArrowRight size={20} className="rotate-180" /></button>
                                        <button onClick={() => setActiveVideo(null)} className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform"><Pause size={24} fill="currentColor" /></button>
                                        <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"><ArrowRight size={20} /></button>
                                    </div>
                                    <p className="text-slate-400 text-xs mt-4">Simulasi Pemutar Video</p>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800"><div className="h-full bg-red-500 w-1/3"></div></div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                                <p className="text-slate-500 text-sm">Pilih video di bawah untuk memutar</p>
                            </div>
                        )}
                    </div>

                    {/* Video List */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {MOCK_TUTORIALS.map(vid => (
                            <button key={vid.id} onClick={() => setActiveVideo(vid.id)} className={`text-left group rounded-xl overflow-hidden border transition-all ${activeVideo === vid.id ? 'border-brand ring-1 ring-brand' : 'border-slate-200 dark:border-white/10 hover:border-brand/50 dark:hover:border-white/30'}`}>
                                <div className={`aspect-video bg-gradient-to-br ${vid.thumbnail} relative p-3 flex flex-col justify-end`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                    <div className="absolute center inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><div className="bg-black/50 p-2 rounded-full backdrop-blur"><Play size={16} className="text-white" fill="white" /></div></div>
                                    <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded self-end backdrop-blur relative z-10">{vid.duration}</span>
                                </div>
                                <div className="p-3 bg-white dark:bg-slate-900/50">
                                    <h5 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug group-hover:text-brand dark:group-hover:text-brand transition-colors">{vid.title}</h5>
                                    <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1"><Eye size={10} /> {vid.views} views</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2"><HelpCircle size={20} className="text-green-500 dark:text-green-400" /> FAQ</h3>
                    <div className="space-y-3">
                        {MOCK_FAQ.map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
                                <button onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)} className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.q}</span>
                                    {openFAQ === idx ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                                </button>
                                {openFAQ === idx && (
                                    <div className="px-4 pb-4 pt-0 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20">
                                        <div className="pt-3">{item.a}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mt-4">
                        <p className="text-xs text-blue-600 dark:text-blue-300 mb-2">Butuh bantuan lebih lanjut?</p>
                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors">Hubungi Support CS</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
