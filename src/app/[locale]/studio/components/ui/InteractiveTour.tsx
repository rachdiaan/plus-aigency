import React, { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { TourStep } from "@/types";

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
