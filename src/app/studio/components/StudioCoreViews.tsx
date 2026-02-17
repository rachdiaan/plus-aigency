import React, { useState } from "react";
import {
    Zap, Loader2, Sparkles, Calendar, List, Grid, Wand2, Download, Maximize2, Image as ImageIcon,
    Target, Flame, RefreshCw, Users
} from "lucide-react";
import { Schema, Type } from "@google/genai";
import { AIVoiceAssistant } from "./ui/AIVoiceAssistant";
import { callGeminiStructured, callGeminiImage, callGeminiText, downloadImage } from "@/lib/ai";
import { MOCK_CALENDAR } from "@/lib/mockData";
import { CalendarItem, AnalysisResult } from "@/types";

// --- VIEW PLANNER ---
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

// --- VIEW GENERATOR ---
export const ViewGenerator: React.FC<{ addNotification: (t: 'success' | 'error', m: string) => void }> = ({ addNotification }) => {
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState('Photorealistic');
    const [ratio, setRatio] = useState('1:1');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) { addNotification('error', 'Masukkan prompt!'); return; }
        setLoading(true);
        const enhancedPrompt = `Create a ${ratio} image. Style: ${style}. Subject: ${prompt}. High quality, detailed, professional lighting.`;
        const imgData = await callGeminiImage(enhancedPrompt);

        if (imgData) {
            setGeneratedImage(imgData);
            addNotification('success', 'Gambar berhasil dibuat!');
        } else {
            addNotification('error', 'Gagal membuat gambar. Coba prompt lain.');
        }
        setLoading(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24 animate-in fade-in duration-500 h-full lg:h-[calc(100vh-140px)]">
            {/* Controls Panel */}
            <div className="lg:col-span-4 flex flex-col gap-4 h-full">
                <div className="bg-card-bg backdrop-blur-sm border border-border p-6 rounded-2xl flex-1 flex flex-col shadow-lg transition-colors">
                    <div className="mb-6"><h3 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2"><Wand2 size={18} className="text-primary" /> AI Studio</h3><p className="text-muted text-xs">Powered by Gemini 2.0 Flash Image.</p></div>

                    <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <div id="gen-prompt-area" className="space-y-2">
                            <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Prompt Visual</label>
                            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Misal: Coffee shop futuristik dengan lampu neon di Jakarta Selatan, cinematic shot..." className="w-full bg-surface border border-border text-foreground p-3 rounded-lg h-32 text-sm resize-none focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all hover:bg-surface-hover" />
                        </div>

                        <div id="gen-style-select" className="space-y-2">
                            <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Visual Style</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Photorealistic', '3D Render', 'Anime', 'Oil Painting', 'Cyberpunk', 'Minimalist', 'Vintage', 'Pop Art'].map(s => (
                                    <button key={s} onClick={() => setStyle(s)} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left ${style === s ? 'bg-primary/10 border-primary text-primary shadow-sm' : 'bg-surface border-border text-muted hover:border-muted-light hover:text-foreground'}`}>{s}</button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Aspect Ratio</label>
                            <div className="flex bg-surface-hover p-1 rounded-lg border border-border">
                                {['1:1', '16:9', '9:16', '4:3'].map(r => (
                                    <button key={r} onClick={() => setRatio(r)} className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${ratio === r ? 'bg-background text-foreground shadow-sm' : 'text-muted hover:text-foreground'}`}>{r}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button onClick={handleGenerate} disabled={loading} id="gen-btn-action" className="mt-6 w-full bg-gradient-to-r from-primary to-primary-light text-white py-3 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />} Generate Visual
                    </button>
                </div>
            </div>

            {/* Preview Panel */}
            <div id="gen-result-area" className="lg:col-span-8 bg-surface border border-border rounded-2xl flex items-center justify-center relative overflow-hidden group min-h-[400px] shadow-inner transition-colors">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                {/* Background Decor */}
                {!generatedImage && !loading && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none"></div>
                )}

                {loading ? (
                    <div className="text-center relative z-10">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted animate-pulse font-medium">Meracik piksel...</p>
                        <p className="text-xs text-muted-light mt-2">Estimasi: 5-10 detik</p>
                    </div>
                ) : generatedImage ? (
                    <div className="relative w-full h-full p-4 flex items-center justify-center">
                        <img src={generatedImage} alt="Result" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-500" />
                        <div className="absolute bottom-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur rounded-full px-4 py-2 border border-white/10 translate-y-2 group-hover:translate-y-0 duration-300">
                            <button onClick={() => downloadImage(generatedImage, `plus-gen-${Date.now()}.png`)} className="text-white hover:text-primary transition-colors flex items-center gap-2 text-xs font-bold pr-3 border-r border-white/20"><Download size={16} /> Save</button>
                            <button className="text-white hover:text-primary transition-colors"><Maximize2 size={16} /></button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center relative z-10 opacity-60 dark:opacity-50 max-w-sm px-6">
                        <div className="bg-surface p-6 rounded-full inline-block mb-4 border border-border shadow-sm">
                            <ImageIcon className="text-muted" size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-muted mb-2">Canvas Kosong</h3>
                        <p className="text-muted-light text-sm">Tulis prompt di panel kiri untuk mulai membuat visual menakjubkan.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- VIEW STRATEGY ---
export const ViewStrategy: React.FC<{ addNotification: (t: 'success' | 'error', m: string) => void }> = ({ addNotification }) => {
    const [inputText, setInputText] = useState("");
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePredict = async () => {
        if (!inputText) return;
        setLoading(true);

        const schema: Schema = {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER },
                hook: { type: Type.STRING },
                fit: { type: Type.STRING },
                format: { type: Type.STRING },
                improvements: { type: Type.STRING },
            },
            required: ["score", "hook", "fit", "format", "improvements"]
        };

        const prompt = `Analyze this social media caption: "${inputText}". Rate it 0-100 on viral potential. Identify the hook strength, audience fit, best format (Reels/Post/Story), and provide 1 specific improvement tip.`;

        const data = await callGeminiStructured<AnalysisResult>(prompt, schema);

        if (data) {
            setAnalysis(data);
        } else {
            addNotification('error', 'Analisis gagal, menggunakan simulasi.');
            setAnalysis({ score: 78, hook: "Avg", fit: "85%", format: "Carousel", improvements: "Make hook shorter" });
        }
        setLoading(false);
    };

    const handleRewrite = async () => {
        if (!inputText) return;
        setLoading(true);
        const prompt = `Rewrite this caption to be more viral, engaging, and relatable for Gen Z in Bahasa Indonesia slang but polite: "${inputText}"`;
        const res = await callGeminiText(prompt);
        if (res) {
            setInputText(res);
            addNotification('success', 'Caption berhasil di-upgrade!');
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6 pb-24 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-6 rounded-2xl relative overflow-hidden shadow-lg group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full pointer-events-none group-hover:bg-primary/20 transition-all" />
                    <Target size={32} className="text-primary mb-2" />
                    <h3 className="text-5xl font-black text-foreground tracking-tight">{analysis?.score || '--'}<span className="text-lg font-normal text-muted ml-1">/100</span></h3>
                    <p className="text-sm text-primary mt-2 font-medium">Viral Probability</p>
                    {analysis && <div className="mt-3 h-1.5 w-full bg-surface rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${analysis.score}%` }}></div></div>}
                </div>
                <div className="bg-card-bg border border-border p-6 rounded-2xl col-span-2 shadow-lg transition-colors">
                    <h4 className="text-foreground font-bold mb-4 flex items-center gap-2"><Flame size={18} className="text-orange-500 fill-orange-500" /> Trending Now (Indonesia)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[{ t: "#LokalPride", v: "1.2M" }, { t: "#OOTDIndo", v: "850K" }, { t: "#KulinerViral", v: "2.1M" }, { t: "#BisnisAnakMuda", v: "500K" }].map((t, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-surface rounded-lg border border-border hover:border-orange-500/30 transition-colors cursor-pointer group">
                                <span className="text-foreground-secondary font-medium group-hover:text-orange-500 transition-colors">{t.t}</span>
                                <span className="text-green-600 dark:text-green-400 text-xs font-bold bg-green-100 dark:bg-green-500/10 px-2 py-1 rounded">{t.v}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card-bg border border-border p-6 rounded-2xl shadow-lg transition-colors">
                    <h3 className="font-bold text-foreground mb-4 flex gap-2"><Zap size={18} className="text-yellow-500" /> Content Optimizer</h3>
                    <div className="bg-surface p-1 rounded-xl border border-border focus-within:border-primary/50 transition-colors relative">
                        <textarea id="strat-input" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Tulis ide caption kasar Anda di sini..." className="w-full bg-transparent text-foreground text-sm p-4 focus:outline-none resize-none h-32" />
                        {loading && <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl"><Loader2 className="animate-spin text-primary" /></div>}
                        <div className="flex justify-between items-center px-4 py-2 border-t border-border bg-surface-hover rounded-b-lg">
                            <button onClick={handleRewrite} disabled={loading || !inputText} className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 disabled:opacity-50"><RefreshCw size={12} /> Magic Rewrite</button>
                            <button id="strat-btn" onClick={handlePredict} disabled={loading || !inputText} className="bg-foreground text-background px-5 py-2 rounded-lg text-xs font-bold hover:bg-muted-light transition-colors disabled:opacity-50">{loading ? "Analyzing..." : "Check Score"}</button>
                        </div>
                    </div>

                    {analysis && (
                        <div className="grid grid-cols-3 gap-4 mt-6 animate-in slide-in-from-top-4">
                            {[['Hook', analysis.hook, 'text-blue-600 dark:text-blue-400', 'bg-blue-100 dark:bg-blue-500/10'], ['Fit', analysis.fit, 'text-green-600 dark:text-green-400', 'bg-green-100 dark:bg-green-500/10'], ['Format', analysis.format, 'text-primary', 'bg-primary/10']].map(([l, v, tc, bg], i) => (
                                <div key={i} className={`${bg} border border-white/5 rounded-xl p-3 text-center`}>
                                    <p className={`text-[10px] uppercase font-bold opacity-70 mb-1 ${tc}`}>{l as string}</p>
                                    <p className="text-foreground font-bold">{v as string}</p>
                                </div>
                            ))}
                            <div className="col-span-3 bg-surface-hover border border-border p-4 rounded-xl flex gap-4 items-start shadow-sm">
                                <div className="bg-yellow-500/20 p-2 rounded-full shrink-0"><Sparkles size={16} className="text-yellow-600 dark:text-yellow-400" /></div>
                                <div>
                                    <p className="text-xs font-bold text-foreground mb-1">AI Recommendation</p>
                                    <p className="text-xs text-muted leading-relaxed">{analysis.improvements}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="bg-card-bg border border-border p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg transition-colors">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-4"><Users size={32} className="text-red-500 dark:text-red-400" /></div>
                    <h4 className="text-foreground font-bold mb-1">Competitor Watch</h4>
                    <p className="text-xs text-muted mb-6 px-4">Pantau gerakan kompetitor secara real-time.</p>
                    <div className="w-full space-y-3">
                        <div className="w-full bg-surface p-3 rounded-xl border border-border flex items-center gap-3 text-left hover:bg-surface-hover transition-colors cursor-pointer">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">C</div>
                            <div><p className="text-xs font-bold text-foreground">CoffeeBrandX</p><p className="text-[10px] text-muted">Post 15m ago • High Engagement</p></div>
                        </div>
                        <div className="w-full bg-surface p-3 rounded-xl border border-border flex items-center gap-3 text-left hover:bg-surface-hover transition-colors cursor-pointer">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">K</div>
                            <div><p className="text-xs font-bold text-foreground">KopiKenanganMantan</p><p className="text-[10px] text-muted">Story 2h ago • Promo Alert</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
