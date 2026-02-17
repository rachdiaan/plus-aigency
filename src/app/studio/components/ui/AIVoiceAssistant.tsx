import React, { useState, useEffect } from "react";
import { X, Volume2, Mic, Sparkles } from "lucide-react";

export const AIVoiceAssistant: React.FC<{ onAutoFill?: () => void, addNotification?: (type: 'success' | 'error', msg: string) => void }> = ({ onAutoFill, addNotification }) => {
    const [isListening, setIsListening] = useState(false);
    const [minimized, setMinimized] = useState(true);
    useEffect(() => { setTimeout(() => { if (window.innerWidth > 768) setMinimized(false); }, 2000); }, []);
    const handleMicClick = () => { setIsListening(true); setTimeout(() => { setIsListening(false); if (onAutoFill) onAutoFill(); if (addNotification) addNotification('success', 'Data diisi otomatis!'); }, 1500); };

    if (minimized) return (<button onClick={() => setMinimized(false)} className="fixed bottom-24 right-4 md:right-8 w-14 h-14 bg-gradient-to-r from-brand to-blue-600 rounded-full shadow-[0_0_20px_rgba(12,116,235,0.5)] flex items-center justify-center animate-bounce hover:scale-110 transition-transform z-40"><Sparkles className="text-white" size={24} /></button>);

    return (
        <div className="fixed bottom-24 right-4 md:right-8 z-40 w-[calc(100%-2rem)] md:w-80 max-w-sm animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-white/90 dark:bg-surface/90 backdrop-blur-xl border border-slate-200 dark:border-brand/30 rounded-2xl shadow-2xl dark:shadow-brand/50 overflow-hidden">
                <div className="h-14 bg-gradient-to-r from-blue-100 to-sky-100 dark:from-brand/50 dark:to-blue-900/50 relative flex items-center justify-between px-4"><div className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-tr from-brand to-blue-400 rounded-full flex items-center justify-center shadow-inner"><Volume2 size={14} className="text-white" /></div><span className="text-slate-800 dark:text-white font-bold text-sm">Ava Assistant</span></div><button onClick={() => setMinimized(true)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"><X size={16} /></button></div>
                <div className="p-4"><p className="text-slate-600 dark:text-slate-300 text-xs mb-4 bg-slate-50 dark:bg-white/5 p-3 rounded-lg leading-relaxed border border-slate-200 dark:border-white/5">{isListening ? "Mendengarkan..." : "Butuh bantuan mengisi form? Klik mic di bawah."}</p><button onClick={handleMicClick} className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-lg ${isListening ? 'bg-red-500/20 text-red-500 dark:text-red-400 border border-red-500/50 animate-pulse' : 'bg-gradient-to-r from-brand to-blue-600 hover:brightness-110 text-white'}`}><Mic size={14} /> {isListening ? "Mendengarkan..." : "Bicara Sekarang"}</button></div>
            </div>
        </div>
    );
};
