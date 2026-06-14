import React from "react";
import { BarChart3 } from "lucide-react";

export const ViewAnalytics = () => (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[{ l: "Total Reach", v: "450K", c: "text-primary" }, { l: "Engagement", v: "12.5%", c: "text-secondary" }, { l: "Conversion", v: "3.2%", c: "text-tertiary" }].map((s, i) => (
                <div key={i} className="bg-card-bg border border-border p-5 rounded-2xl backdrop-blur-sm hover:bg-surface-hover transition-colors shadow-lg">
                    <p className="text-xs text-muted uppercase font-bold">{s.l}</p>
                    <h3 className={`text-3xl font-black ${s.c} mt-1`}>{s.v}</h3>
                    <div className="w-full bg-surface-hover h-1 mt-4 rounded-full overflow-hidden"><div className={`h-full w-[70%] ${s.c.replace('text', 'bg')}`}></div></div>
                </div>
            ))}
        </div>
        <div className="bg-card-bg border border-border p-6 rounded-2xl h-80 flex items-end gap-2 relative shadow-xl overflow-hidden transition-colors">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
            <h3 className="absolute top-6 left-6 font-bold text-foreground z-10 flex items-center gap-2"><BarChart3 size={18} className="text-primary" /> Audience Growth</h3>
            {[40, 60, 35, 80, 65, 90, 70, 100, 85, 95, 75, 60].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-primary/50 to-primary-light/50 hover:to-primary-light rounded-t-sm transition-all relative group" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface text-foreground text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 shadow-md">{h}%</div>
                </div>
            ))}
        </div>
    </div>
);
