import React, { useState } from "react";
import { Target, Flame, RefreshCw, Users, Zap, Loader2, Sparkles } from "lucide-react";
import { callGeminiStructured, callGeminiText } from "@/lib/ai";
import { AnalysisResult } from "@/types";
import { Schema, Type } from "@google/genai";

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
