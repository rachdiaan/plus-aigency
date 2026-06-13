import React, { useState } from "react";
import { Wand2, Loader2, Sparkles, Download, Maximize2, Image as ImageIcon } from "lucide-react";
import { callGeminiImage, downloadImage } from "@/lib/ai";

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
