import React from "react";
import { Check, AlertCircle } from "lucide-react";
import { Notification } from "@/types";

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
