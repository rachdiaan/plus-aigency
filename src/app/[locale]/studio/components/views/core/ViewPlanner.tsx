import React, { useState } from "react";
import { Zap, Loader2, Sparkles, Calendar, List, Grid } from "lucide-react";
import { AIVoiceAssistant } from "../../ui/AIVoiceAssistant";
import { callGeminiStructured } from "@/lib/ai";
import { MOCK_CALENDAR } from "@/lib/mockData";
import { CalendarItem } from "@/types";
import { Schema, Type } from "@google/genai";

export const ViewPlanner: React.FC<{ onAutoFill: () => void, addNotification: (t: 'success' | 'error', m: string) => void }> = ({ onAutoFill, addNotification }) => {
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [form, setForm] = useState({ name: '', industry: '', market: '', idea: '' });
    const [calendarData, setCalendarData] = useState<CalendarItem[]>(MOCK_CALENDAR);

    const handleFill = () => { setForm({ name: "Kopi Senja", industry: "F&B", market: "Gen Z", idea: "Promo Akhir Bulan" }); };

    const handleGen = async () => {
        if (!form.name) { addNotification('error', 'Mohon isi nama bisnis.'); return; }
        setLoading(true);

        // Define strict schema for Gemini
        const calendarSchema: Schema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    category: { type: Type.STRING, enum: ['Awareness', 'Sales', 'Engagement', 'Education', 'Other'] },
                    desc: { type: Type.STRING },
                },
                required: ["day", "title", "category", "desc"]
            }
        };

        const prompt = `Create a 6-day social media content calendar for '${form.name}' (${form.industry}, target: ${form.market}). Focus: '${form.idea}'. Use creative and engaging Indonesian language.`;

        const result = await callGeminiStructured<CalendarItem[]>(prompt, calendarSchema);

        if (result) {
            setCalendarData(result);
            addNotification('success', 'Jadwal berhasil dibuat!');
        } else {
            addNotification('error', 'Gagal membuat jadwal, coba lagi.');
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6 pb-24 animate-in fade-in duration-500">
            <AIVoiceAssistant onAutoFill={handleFill} addNotification={addNotification} />

            {/* Input Section */}
            <div className="bg-card-bg backdrop-blur-sm border border-border p-6 rounded-2xl relative overflow-hidden group shadow-sm transition-colors">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="font-bold text-foreground mb-6 flex gap-2 relative z-10"><Zap size={20} className="text-yellow-500 fill-yellow-500" /> AI Campaign Architect</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative z-10">
                    {(['name', 'industry', 'market'] as const).map(f => (<div key={f} className="space-y-2"><label className="text-[10px] font-bold text-muted uppercase tracking-wider">{f}</label><input id={f === 'name' ? 'inp-business-name' : undefined} value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} placeholder={`Input ${f}...`} className="w-full bg-surface border border-border text-foreground px-4 py-3 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none hover:bg-surface-hover" /></div>))}
                </div>
                <div className="space-y-2 mb-6 relative z-10"><label className="text-[10px] font-bold text-muted uppercase tracking-wider">Campaign Focus</label><textarea value={form.idea} onChange={e => setForm({ ...form, idea: e.target.value })} placeholder="Apa tujuan kampanye bulan ini?" className="w-full bg-surface border border-border text-foreground px-4 py-3 rounded-lg text-sm h-20 resize-none focus:border-primary outline-none hover:bg-surface-hover" /></div>
                <button id="btn-generate-plan" onClick={handleGen} disabled={loading} className="relative z-10 bg-gradient-to-r from-primary to-primary-light hover:brightness-110 text-white px-8 py-3 rounded-lg font-bold w-full md:w-auto transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">{loading ? <><Loader2 className="animate-spin" size={18} /> Meracik Strategi...</> : <><Sparkles size={18} /> Generate Calendar</>}</button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2"><Calendar size={20} className="text-primary" /> Content Roadmap</h3>
                    <div className="flex gap-2 bg-surface p-1 rounded-lg border border-border self-end shadow-sm">
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-surface-hover text-foreground shadow-sm' : 'text-muted hover:text-foreground'}`}><List size={16} /></button>
                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-surface-hover text-foreground shadow-sm' : 'text-muted hover:text-foreground'}`}><Grid size={16} /></button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-surface animate-pulse rounded-xl border border-border"></div>)}
                    </div>
                ) : (
                    <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                        {calendarData.map((c, i) => (
                            <div key={i} className={`bg-card-bg border border-border rounded-xl hover:border-primary/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-surface-hover group relative overflow-hidden ${viewMode === 'list' ? 'flex flex-col md:flex-row gap-4 p-4 items-start md:items-center' : 'p-5 flex flex-col h-full'}`}>
                                <div className={`flex items-center justify-center bg-surface rounded-lg shrink-0 border border-border text-primary ${viewMode === 'list' ? 'w-12 h-12' : 'w-full h-10 mb-3'}`}>
                                    <span className="text-xs font-bold uppercase tracking-wider">Day {c.day}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-foreground truncate pr-2 text-base">{c.title}</h4>
                                        <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${c.category === 'Sales' ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20' : c.category === 'Awareness' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>{c.category}</span>
                                    </div>
                                    <p className="text-sm text-muted line-clamp-3 leading-relaxed">{c.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
