import React from "react";
import { ChevronRight } from "lucide-react";

export const SidebarItem: React.FC<{ icon: any, label: string, active: boolean, onClick: () => void }> = ({ icon: Icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${active ? 'text-brand dark:text-white shadow-[0_0_20px_rgba(12,116,235,0.1)] bg-brand/10 dark:bg-white/5 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-brand dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}>
        {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand to-blue-500 rounded-l-xl" />}
        <Icon size={20} className={`relative z-10 transition-colors ${active ? 'text-brand dark:text-brand' : 'group-hover:text-brand dark:group-hover:text-brand'}`} />
        <span className="relative z-10 text-sm">{label}</span>
        {active && <ChevronRight size={16} className="relative z-10 ml-auto text-brand opacity-80" />}
    </button>
);
