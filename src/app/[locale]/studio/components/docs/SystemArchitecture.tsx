import React from "react";

export const SystemArchitecture = () => (
    <div className="h-full flex flex-col">
        <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">System Architecture (Class Diagram)</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Representasi visual struktur data inti.</p>
        </div>
        <div className="flex-1 bg-white dark:bg-slate-900/50 relative overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center p-8">
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                </defs>
                <line x1="50%" y1="180" x2="30%" y2="350" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="50%" y1="180" x2="70%" y2="350" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="70%" y1="450" x2="70%" y2="520" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
            </svg>

            <div className="relative w-full max-w-4xl h-[600px] flex flex-col items-center justify-between py-10">

                {/* Top Node */}
                <div className="bg-white dark:bg-slate-800 border-2 border-brand rounded-lg w-64 shadow-[0_0_20px_rgba(12,116,235,0.3)] z-10">
                    <div className="bg-blue-100 dark:bg-brand/50 p-2 border-b border-brand text-center font-bold text-brand dark:text-white text-sm">UserController</div>
                    <div className="p-3 text-xs text-slate-600 dark:text-slate-300 font-mono space-y-1">
                        <p>+ userId: String</p>
                        <p>+ email: String</p>
                        <hr className="border-slate-300 dark:border-slate-600 my-1" />
                        <p>+ createCampaign()</p>
                        <p>+ generateContent()</p>
                    </div>
                </div>

                {/* Middle Nodes */}
                <div className="flex justify-between w-full px-20">
                    <div className="bg-white dark:bg-slate-800 border border-blue-500 rounded-lg w-64 shadow-lg z-10">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 border-b border-blue-500 text-center font-bold text-blue-900 dark:text-white text-sm">PlannerModule</div>
                        <div className="p-3 text-xs text-slate-600 dark:text-slate-300 font-mono space-y-1">
                            <p>+ campaignId: UUID</p>
                            <p>+ startDate: Date</p>
                            <hr className="border-slate-300 dark:border-slate-600 my-1" />
                            <p>+ generateSchedule()</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 border border-brand rounded-lg w-64 shadow-lg z-10">
                        <div className="bg-blue-100 dark:bg-brand/50 p-2 border-b border-brand text-center font-bold text-brand dark:text-white text-sm">AIService</div>
                        <div className="p-3 text-xs text-slate-600 dark:text-slate-300 font-mono space-y-1">
                            <p>+ model: Gemini-Flash</p>
                            <p>+ apiKey: SecureString</p>
                            <hr className="border-slate-300 dark:border-slate-600 my-1" />
                            <p>+ callTextAPI(prompt)</p>
                            <p>+ callImageAPI(prompt)</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Node */}
                <div className="bg-white dark:bg-slate-800 border border-green-500 rounded-lg w-64 shadow-lg z-10 mt-auto">
                    <div className="bg-green-100 dark:bg-green-900/50 p-2 border-b border-green-500 text-center font-bold text-green-900 dark:text-white text-sm">GoogleCloudPlatform</div>
                    <div className="p-3 text-xs text-slate-600 dark:text-slate-300 font-mono space-y-1">
                        <p>+ Vertex AI</p>
                        <p>+ Cloud Storage</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
