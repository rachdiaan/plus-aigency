import React, { useState } from "react";
import { BookOpen, X, ChevronRight, Layout, Network, Image as ImageIcon, Users, Code, Info } from "lucide-react";
import { UserGuide } from "./UserGuide";
import { Mentoring } from "./Mentoring";
import { SystemArchitecture } from "./SystemArchitecture";
import { NetworkTopology } from "./NetworkTopology";
import { UIMockups } from "./UIMockups";

interface DocModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: string;
    onStartTour: (tab: string) => void;
}

export const DocumentationModal: React.FC<DocModalProps> = ({ isOpen, onClose, initialTab = 'guide', onStartTour }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    if (!isOpen) return null;

    const tabs = [
        { id: 'guide', label: 'User Guide', icon: <BookOpen size={18} /> },
        { id: 'mentoring', label: 'Mentoring', icon: <Users size={18} /> },
        { id: 'uml', label: 'System UML', icon: <Code size={18} /> },
        { id: 'network', label: 'Network', icon: <Network size={18} /> },
        { id: 'mockup', label: 'UI Mockups', icon: <Layout size={18} /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'guide': return <UserGuide onStartTour={(t) => { onClose(); onStartTour(t); }} />;
            case 'mentoring': return <Mentoring />;
            case 'uml': return <SystemArchitecture />;
            case 'network': return <NetworkTopology />;
            case 'mockup': return <UIMockups />;
            default: return <div className="p-10 text-center"><Info className="mx-auto mb-4 text-slate-300" size={48} /><p className="text-slate-500">Konten sedang disiapkan.</p></div>;
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className="bg-white dark:bg-slate-900 w-full max-w-6xl h-[85vh] rounded-3xl shadow-2xl relative flex overflow-hidden border border-white/10 flex-col md:flex-row animate-in zoom-in-95 duration-300">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-950/50 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5 flex flex-col">
                    <div className="p-6 border-b border-slate-200 dark:border-white/5">
                        <div className="flex items-center gap-2 text-brand font-black text-xl"><BookOpen className="fill-brand" /> PLUS<span className="text-slate-800 dark:text-white font-light">Docs</span></div>
                        <p className="text-xs text-slate-500 mt-1 pl-8">Documentation & Help Center</p>
                    </div>
                    <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group ${activeTab === tab.id ? 'bg-white dark:bg-slate-800 text-brand shadow-sm ring-1 ring-slate-200 dark:ring-white/5' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}
                            >
                                <div className="flex items-center gap-3">{tab.icon} {tab.label}</div>
                                {activeTab === tab.id && <ChevronRight size={14} className="text-brand animate-in slide-in-from-left-2" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
                    <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/5">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{tabs.find(t => t.id === activeTab)?.label}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Viewing documentation for current session.</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-500 hover:text-red-500">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};
