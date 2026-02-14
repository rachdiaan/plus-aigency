import React, { useState, useEffect } from "react";
import { Check, AlertCircle, HelpCircle, ChevronRight, X, Volume2, Mic, Sparkles } from "lucide-react";
import { Notification, TourStep } from "../types";

export const ToastContainer: React.FC<{ notifications: Notification[] }> = ({ notifications }) => (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {notifications.map((note) => (
            <div key={note.id} className="bg-white/90 dark:bg-surface/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right pointer-events-auto">
                {note.type === 'success' ? <div className="bg-green-500/20 p-1 rounded-full"><Check size={14} className="text-green-600 dark:text-green-400" /></div> : <div className="bg-red-500/20 p-1 rounded-full"><AlertCircle size={14} className="text-red-600 dark:text-red-400" /></div>}
                <span className="text-sm font-medium">{note.message}</span>
            </div>
        ))}
    </div>
);

export const SidebarItem: React.FC<{ icon: any, label: string, active: boolean, onClick: () => void }> = ({ icon: Icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${active ? 'text-brand dark:text-white shadow-[0_0_20px_rgba(12,116,235,0.1)] bg-brand/10 dark:bg-white/5 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-brand dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}>
        {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand to-blue-500 rounded-l-xl" />}
        <Icon size={20} className={`relative z-10 transition-colors ${active ? 'text-brand dark:text-brand' : 'group-hover:text-brand dark:group-hover:text-brand'}`} />
        <span className="relative z-10 text-sm">{label}</span>
        {active && <ChevronRight size={16} className="relative z-10 ml-auto text-brand opacity-80" />}
    </button>
);

export const InteractiveTour: React.FC<{ steps?: TourStep[], isActive: boolean, onComplete: () => void }> = ({ steps, isActive, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [position, setPosition] = useState<{ top: number, left: number, width: number, height: number, targetTop: number, targetLeft: number, arrowPos: string } | null>(null);

    useEffect(() => {
        if (!isActive || !steps || steps.length === 0) { if (!isActive) setCurrentStep(0); return; }
        const updatePosition = () => {
            const stepData = steps[currentStep];
            if (!stepData) return;
            const target = document.getElementById(stepData.targetId);
            if (target) {
                const rect = target.getBoundingClientRect();
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // SMART POSITIONING LOGIC
                const tooltipWidth = 320;
                const tooltipHeight = 150;
                const gap = 15;
                const viewportW = window.innerWidth;
                const viewportH = window.innerHeight;

                let top = 0, left = 0, arrowPos;
                let finalPos = stepData.position;

                if (finalPos === 'right' && rect.right + tooltipWidth + gap > viewportW) finalPos = 'left';
                if (finalPos === 'left' && rect.left - tooltipWidth - gap < 0) finalPos = 'right';
                if (finalPos === 'bottom' && rect.bottom + tooltipHeight + gap > viewportH) finalPos = 'top';
                if (finalPos === 'top' && rect.top - tooltipHeight - gap < 0) finalPos = 'bottom';

                if (window.innerWidth < 768) {
                    finalPos = rect.bottom + tooltipHeight + gap > viewportH ? 'top' : 'bottom';
                    left = 10;
                    top = finalPos === 'bottom' ? rect.bottom + gap : rect.top - tooltipHeight - gap;
                    arrowPos = finalPos;
                } else {
                    if (finalPos === 'right') { top = rect.top; left = rect.right + gap; }
                    else if (finalPos === 'top') { top = rect.top - tooltipHeight - gap; left = rect.left; }
                    else if (finalPos === 'left') { top = rect.top; left = rect.left - tooltipWidth - gap; }
                    else { top = rect.bottom + gap; left = rect.left; }
                    arrowPos = finalPos;
                }

                if (left < 10) left = 10;
                if (left + tooltipWidth > viewportW - 10) left = viewportW - tooltipWidth - 10;

                setPosition({ top, left, width: rect.width, height: rect.height, targetTop: rect.top, targetLeft: rect.left, arrowPos });
            }
        };

        const timer = setTimeout(updatePosition, 400);
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);
        return () => { window.removeEventListener('resize', updatePosition); window.removeEventListener('scroll', updatePosition); clearTimeout(timer); };
    }, [currentStep, isActive, steps]);

    if (!isActive || !position || !steps || !steps[currentStep]) return null;
    const stepData = steps[currentStep];

    return (
        <div className="fixed inset-0 z-[70] pointer-events-none">
            <div className="absolute inset-0 bg-black/60 transition-all duration-500 backdrop-blur-[2px]" style={{ clipPath: `polygon(0% 0%, 0% 100%, ${position.targetLeft}px 100%, ${position.targetLeft}px ${position.targetTop}px, ${position.targetLeft + position.width}px ${position.targetTop}px, ${position.targetLeft + position.width}px ${position.targetTop + position.height}px, ${position.targetLeft}px ${position.targetTop + position.height}px, ${position.targetLeft}px 100%, 100% 100%, 100% 0%)` }}></div>
            <div className="absolute border-2 border-brand rounded-lg shadow-[0_0_30px_rgba(12,116,235,0.8)] animate-pulse" style={{ top: position.targetTop - 4, left: position.targetLeft - 4, width: position.width + 8, height: position.height + 8 }}></div>
            <div className="absolute pointer-events-auto bg-white/95 dark:bg-surface/95 backdrop-blur-xl border border-brand/50 p-5 rounded-xl shadow-2xl w-[calc(100%-20px)] md:w-80 transition-all duration-300 animate-in zoom-in-95" style={{ top: position.top, left: position.left }}>
                <div className="flex items-start gap-3 mb-2"><HelpCircle className="text-brand dark:text-brand shrink-0" size={20} /><h4 className="font-bold text-slate-800 dark:text-white text-md">{stepData.title}</h4></div>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">{stepData.desc}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">{currentStep + 1} / {steps.length}</span>
                    <div className="flex gap-2">
                        {currentStep > 0 && (<button onClick={() => setCurrentStep(c => c - 1)} className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 transition-colors">Back</button>)}
                        <button onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(c => c + 1); } else { onComplete(); } }} className="bg-brand hover:bg-brand/80 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-lg hover:shadow-brand/25">{currentStep === steps.length - 1 ? "Selesai" : "Lanjut"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
