import React, { useEffect } from "react";
import { ArrowRight, Wand2 } from "lucide-react";
import Logo from "@/components/Logo";
import { useTheme } from "@/components/ThemeProvider";
import { useLocale } from "@/i18n/I18nProvider";

const COPY = {
    en: {
        badge: "New: Viral Strategy Generator V2.0",
        title: "One AI for\nAll Business Needs",
        subtitle: "More than just tools. PLUS is a smart ecosystem that automatically manages your content, strategy, and business growth.",
        ctaPrimary: "Try Free Now",
        ctaDemo: "Book Demo",
        pills: ["Auto-Posting", "KOL Finder", "Live Stream Avatar", "Competitor Spy"],
    },
    id: {
        badge: "Baru: Viral Strategy Generator V2.0",
        title: "Satu AI untuk\nSemua Kebutuhan Bisnis",
        subtitle: "Lebih dari sekadar tools. PLUS adalah ekosistem pintar yang mengelola konten, strategi, dan pertumbuhan bisnis Anda secara otomatis.",
        ctaPrimary: "Coba Gratis Sekarang",
        ctaDemo: "Book Demo",
        pills: ["Auto-Posting", "KOL Finder", "Live Stream Avatar", "Competitor Spy"],
    },
};

export const StudioLanding: React.FC<{ onStart: () => void, onLoginClick: () => void }> = ({ onStart, onLoginClick }) => {
    const { theme } = useTheme();
    const locale = useLocale();
    const c = COPY[locale] ?? COPY.en;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            document.querySelectorAll('.parallax').forEach((el) => {
                const speed = parseFloat((el as HTMLElement).getAttribute('data-speed') || '1');
                const x = (window.innerWidth - e.pageX * speed) / 100;
                const y = (window.innerHeight - e.pageY * speed) / 100;
                (el as HTMLElement).style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-500">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="parallax absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px]" data-speed="2"></div>
                <div className="parallax absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px]" data-speed="-1"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/textures/noise.svg')] opacity-[0.02] dark:opacity-[0.04]"></div>
            </div>

            {/* Header */}
            <nav className="relative z-20 flex justify-between items-center px-6 lg:px-8 py-5">
                <div className="flex items-center gap-3">
                    <Logo variant={theme === 'dark' ? 'light' : 'dark'} size="default" href={`/${locale}/studio`} />
                    <span className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mt-1 bg-blue-50 dark:bg-slate-900/50 px-2 py-0.5 rounded border border-blue-200 dark:border-slate-800 backdrop-blur-sm">Studio</span>
                </div>
                <button onClick={onLoginClick} className="rounded-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 px-6 py-2.5 text-sm font-semibold transition-all hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 backdrop-blur-sm shadow-sm hover:shadow-md">
                    Login Account
                </button>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 container mx-auto px-6 h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-md mb-8 animate-in slide-in-from-top-4 duration-700 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{c.badge}</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-slate-900 dark:text-white animate-in zoom-in-95 duration-700 delay-100 whitespace-pre-line">
                    {c.title}
                </h1>

                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed animate-in fade-in duration-700 delay-200">
                    {c.subtitle}
                </p>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto animate-in slide-in-from-bottom-8 duration-700 delay-300">
                    <button onClick={onStart} className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-xl shadow-blue-500/10">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {c.ctaPrimary}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                    <a href={`/${locale}/contact-us`} className="px-8 py-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-full font-bold text-lg hover:bg-slate-200 dark:hover:bg-slate-900 transition-all backdrop-blur-sm flex items-center justify-center gap-2 text-slate-700 dark:text-white">
                        {c.ctaDemo}
                    </a>
                </div>

                {/* Feature Pills */}
                <div className="mt-20 flex flex-wrap justify-center gap-4 opacity-0 animate-in fade-in duration-700 delay-500 fill-mode-forwards">
                    {c.pills.map((f, i) => (
                        <div key={i} className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-500/30 hover:text-slate-700 dark:hover:text-white transition-all cursor-default shadow-sm">
                            <Wand2 size={12} className="text-blue-600 dark:text-blue-500" /> {f}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
