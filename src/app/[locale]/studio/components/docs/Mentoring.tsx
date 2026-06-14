import React from "react";
import { Star, Users, Clock } from "lucide-react";
import { MOCK_CLASSES } from "@/lib/mockData";

export const Mentoring = () => (
    <div className="max-w-5xl mx-auto animate-in fade-in space-y-8">
        <div className="flex justify-between items-end">
            <div>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">PLUS Pro Academy</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Upgrade skill bisnis Anda dengan mentor kelas dunia.</p>
            </div>
            <div className="flex gap-2">
                <span className="bg-blue-100 dark:bg-brand/10 text-brand dark:text-brand px-3 py-1 rounded-full text-xs font-bold border border-blue-200 dark:border-brand/20">All Courses</span>
                <span className="text-slate-500 px-3 py-1 rounded-full text-xs font-bold hover:text-slate-900 dark:hover:text-white cursor-pointer">My Learning</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {MOCK_CLASSES.map((cls) => (
                <div key={cls.id} className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:border-brand dark:hover:border-brand/40 transition-all hover:shadow-lg dark:hover:bg-slate-800/50 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3">
                        <div className="bg-black/40 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                            <Star size={10} className="text-yellow-400 fill-yellow-400" /> {cls.rating}
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className={`w-24 h-24 ${cls.image} rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-2xl`}>{cls.mentor.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex gap-2 mb-1">
                                <span className="text-[10px] bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Webinar</span>
                                <span className="text-[10px] bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded uppercase font-bold">{cls.price}</span>
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-1 leading-tight group-hover:text-brand dark:group-hover:text-brand transition-colors">{cls.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">{cls.mentor} • {cls.role}</p>

                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3">
                                <div className="flex items-center gap-3 text-slate-500 text-xs">
                                    <span className="flex items-center gap-1"><Users size={12} /> {cls.students}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {cls.time}</span>
                                </div>
                                <button className="bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-brand hover:text-white transition-colors">Daftar</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
