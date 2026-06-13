import React, { useState, useEffect } from "react";
import {
    ArrowRight, Loader2, Sparkles, User, Video, Mic, Settings, LogOut, Menu, Bell,
    Sun, Moon, Calendar, Wand2, Target, BarChart3, Megaphone, CreditCard, LifeBuoy,
    GitBranch, Code, BookOpen, X, ChevronRight, ShoppingCart
} from "lucide-react";
import { ToastContainer } from "./ui/ToastContainer";
import { InteractiveTour } from "./ui/InteractiveTour";
import { SidebarItem } from "./ui/SidebarItem";
import { DocumentationModal } from "./docs/DocumentationModal";
import { ViewPlanner } from "./views/core/ViewPlanner";
import { ViewGenerator } from "./views/core/ViewGenerator";
import { ViewStrategy } from "./views/core/ViewStrategy";
import { ViewLiveStream } from "./views/growth/ViewLiveStream";
import { ViewKOL } from "./views/growth/ViewKOL";
import { ViewSubscription } from "./views/growth/ViewSubscription";
import { ViewAnalytics } from "./views/growth/ViewAnalytics";
import { TOUR_STEPS, ALACARTE_FEATURES } from "@/lib/mockData";
import { Notification } from "@/types";
import { useTheme } from "@/components/ThemeProvider";
import Logo from "@/components/Logo";

export const StudioDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
    const [activeTab, setActiveTab] = useState('planner');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isTourActive, setIsTourActive] = useState(false);

    // States for Documentation
    const [isDocsOpen, setIsDocsOpen] = useState(false);
    const [docsInitialTab, setDocsInitialTab] = useState('user-guide');
    const [isFloatingDockOpen, setIsFloatingDockOpen] = useState(false);

    useEffect(() => {
        if (TOUR_STEPS[activeTab]) {
            setIsTourActive(false);
            setTimeout(() => setIsTourActive(true), 300);
        } else {
            setIsTourActive(false);
        }
    }, [activeTab]);

    const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, type, message }]);
        setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
    };

    const openDocs = (tab: string) => {
        setDocsInitialTab(tab);
        setIsDocsOpen(true);
        setIsFloatingDockOpen(false);
    };

    const handleStartTour = (tab: string) => {
        setActiveTab(tab);
        setIsDocsOpen(false);
        setIsTourActive(true);
        addNotification('info', `Memulai tur ${tab}...`);
    };

    const renderContent = () => {
        const props = { addNotification };
        switch (activeTab) {
            case 'planner': return <ViewPlanner onAutoFill={() => { }} {...props} />;
            case 'generator': return <ViewGenerator {...props} />;
            case 'strategy': return <ViewStrategy {...props} />;
            case 'livestream': return <ViewLiveStream {...props} />;
            case 'analytics': return <ViewAnalytics />;
            case 'kol': return <ViewKOL {...props} />;
            case 'subscription': return <ViewSubscription {...props} />;
            default: return <ViewPlanner onAutoFill={() => { }} {...props} />;
        }
    };

    return (
        <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden selection:bg-primary selection:text-white relative transition-colors duration-300">
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <ToastContainer notifications={notifications} />
            <InteractiveTour steps={TOUR_STEPS[activeTab]} isActive={isTourActive} onComplete={() => setIsTourActive(false)} />
            <DocumentationModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} initialTab={docsInitialTab} onStartTour={handleStartTour} />

            {/* Floating Knowledge Dock */}
            <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
                {isFloatingDockOpen && (
                    <div className="flex flex-col gap-2 mb-2 animate-in slide-in-from-bottom-4">
                        <button onClick={() => openDocs('user-guide')} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg text-xs font-bold transition-all hover:scale-105"><LifeBuoy size={16} /> Panduan</button>
                        <button onClick={() => openDocs('flowchart')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg text-xs font-bold transition-all hover:scale-105"><GitBranch size={16} /> Flowchart</button>
                        <button onClick={() => openDocs('uml')} className="flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand/80 text-white rounded-full shadow-lg text-xs font-bold transition-all hover:scale-105"><Code size={16} /> Technical</button>
                    </div>
                )}
                <button onClick={() => setIsFloatingDockOpen(!isFloatingDockOpen)} className={`w-14 h-14 rounded-full shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center justify-center transition-all hover:scale-110 ${isFloatingDockOpen ? 'bg-slate-700 rotate-45 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'}`}><BookOpen size={24} /></button>
            </div>

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (<div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />)}

            {/* Sidebar */}
            <div className={`fixed md:static inset-y-0 left-0 w-72 bg-surface backdrop-blur-2xl border-r border-border flex flex-col p-4 z-50 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} shadow-2xl`}>
                <div className="flex items-center justify-between px-2 mb-10 mt-2">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-28">
                            <Logo variant={theme === 'dark' ? 'light' : 'dark'} size="default" href="/studio" />
                        </div>
                        <span className="text-[10px] text-primary font-medium tracking-widest mt-1 ml-[-8px]">STUDIO</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-muted hover:text-foreground"><X size={24} /></button>
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-[10px] font-bold text-muted uppercase tracking-widest mb-2 mt-2">Core Tools</p>
                    <SidebarItem icon={Calendar} label="AI Planner" active={activeTab === 'planner'} onClick={() => handleTabChange('planner')} />
                    <SidebarItem icon={Wand2} label="Visual Generator" active={activeTab === 'generator'} onClick={() => handleTabChange('generator')} />
                    <SidebarItem icon={Target} label="Viral Strategy" active={activeTab === 'strategy'} onClick={() => handleTabChange('strategy')} />

                    <p className="px-4 text-[10px] font-bold text-muted uppercase tracking-widest mb-2 mt-6">Growth</p>
                    <SidebarItem icon={Video} label="Live Studio" active={activeTab === 'livestream'} onClick={() => handleTabChange('livestream')} />
                    <SidebarItem icon={BarChart3} label="Analytics" active={activeTab === 'analytics'} onClick={() => handleTabChange('analytics')} />
                    <SidebarItem icon={Megaphone} label="KOL Marketplace" active={activeTab === 'kol'} onClick={() => handleTabChange('kol')} />

                    <p className="px-4 text-[10px] font-bold text-muted uppercase tracking-widest mb-2 mt-6">Billing</p>
                    <SidebarItem icon={CreditCard} label="Subscription" active={activeTab === 'subscription'} onClick={() => handleTabChange('subscription')} />
                </div>

                <div className="mt-auto pt-6 border-t border-border space-y-3">
                    <div className="bg-background p-3 rounded-xl border border-border flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="w-10 h-10 bg-surface-hover rounded-full overflow-hidden border-2 border-primary"><User className="w-full h-full p-1 text-muted group-hover:text-foreground" /></div>
                        <div className="flex-1 min-w-0"><p className="text-sm font-bold text-foreground truncate">UMKM Maju</p><p className="text-[10px] text-tertiary font-medium">Pro Plan Active</p></div>
                        <button className="text-muted hover:text-foreground"><Settings size={18} /></button>
                    </div>

                    {/* Logout Button */}
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                        <LogOut size={20} />
                        <span className="text-sm font-bold">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full relative w-full overflow-hidden z-10">
                <header className="h-20 border-b border-border bg-navbar-bg backdrop-blur-md flex items-center justify-between px-6 md:px-10 sticky top-0 z-20 transition-colors">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-muted hover:text-foreground"><Menu size={24} /></button>
                        <div>
                            <h1 className="text-xl font-bold text-foreground capitalize">{activeTab === 'livestream' ? 'Live Studio' : activeTab.replace('-', ' ')}</h1>
                            <p className="text-xs text-muted hidden md:block">Real-time AI Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-surface border border-border px-3 py-1.5 rounded-full">
                            <div className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></div>
                            <span className="text-xs text-muted">System Operational</span>
                        </div>

                        {/* Dark Mode Toggle */}
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-toggle-bg text-toggle-icon hover:bg-surface-hover transition-colors shadow-sm" title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button className="p-2 text-muted hover:text-foreground relative bg-toggle-bg rounded-full hover:bg-surface-hover transition-colors shadow-sm"><Bell size={20} /><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span></button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};
