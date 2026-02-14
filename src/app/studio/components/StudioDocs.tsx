
import React, { useState, useEffect } from "react";
import {
    LifeBuoy, GraduationCap, GitBranch, Code, Network, Layout, BookOpen, X,
    Sparkles, Wand2, PlayCircle, ArrowRight, Pause, Play, Eye, HelpCircle,
    ChevronUp, ChevronDown, User, Smartphone, ArrowDown, Globe, Server, Database,
    Lock, LayoutDashboard, Smartphone as MobileIcon, Star, Clock, Users, Zap
} from "lucide-react";
import { MOCK_TUTORIALS, MOCK_FAQ, MOCK_CLASSES } from "../lib/mockData";

// --- DOCUMENTATION MODAL COMPONENTS ---

const RenderUserGuide: React.FC<{ onStartTour: (tab: string) => void }> = ({ onStartTour }) => {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-100 to-sky-100 dark:from-brand/40 dark:to-blue-900/40 border border-slate-200 dark:border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-3xl rounded-full pointer-events-none"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Halo, Ada yang bisa kami bantu?</h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg leading-relaxed">Pelajari cara menggunakan PLUS secara maksimal dengan tur interaktif dan video tutorial singkat.</p>
                </div>
                <div className="flex gap-3 relative z-10">
                    <button onClick={() => onStartTour('planner')} className="px-5 py-2.5 bg-white text-brand font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-lg flex items-center gap-2"><Sparkles size={16} /> Mulai Tur Planner</button>
                    <button onClick={() => onStartTour('generator')} className="px-5 py-2.5 bg-brand text-white font-bold text-sm rounded-xl hover:bg-brand/80 transition-colors shadow-lg flex items-center gap-2"><Wand2 size={16} /> Tur Generator</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Video Tutorials */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2"><PlayCircle size={20} className="text-brand dark:text-brand" /> Video Tutorial</h3>

                    {/* Active Player Simulator */}
                    <div className="aspect-video bg-black rounded-xl border border-white/10 relative overflow-hidden group shadow-2xl">
                        {activeVideo ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-sky-900/20 animate-pulse"></div>
                                <div className="text-center relative z-10">
                                    <h4 className="text-white font-bold text-xl mb-2">{MOCK_TUTORIALS.find(v => v.id === activeVideo)?.title}</h4>
                                    <div className="flex items-center gap-4 justify-center">
                                        <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"><ArrowRight size={20} className="rotate-180" /></button>
                                        <button onClick={() => setActiveVideo(null)} className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform"><Pause size={24} fill="currentColor" /></button>
                                        <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"><ArrowRight size={20} /></button>
                                    </div>
                                    <p className="text-slate-400 text-xs mt-4">Simulasi Pemutar Video</p>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800"><div className="h-full bg-red-500 w-1/3"></div></div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                                <p className="text-slate-500 text-sm">Pilih video di bawah untuk memutar</p>
                            </div>
                        )}
                    </div>

                    {/* Video List */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {MOCK_TUTORIALS.map(vid => (
                            <button key={vid.id} onClick={() => setActiveVideo(vid.id)} className={`text - left group rounded - xl overflow - hidden border transition - all ${activeVideo === vid.id ? 'border-brand ring-1 ring-brand' : 'border-slate-200 dark:border-white/10 hover:border-brand/50 dark:hover:border-white/30'} `}>
                                <div className={`aspect - video bg - gradient - to - br ${vid.thumbnail} relative p - 3 flex flex - col justify - end`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                    <div className="absolute center inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><div className="bg-black/50 p-2 rounded-full backdrop-blur"><Play size={16} className="text-white" fill="white" /></div></div>
                                    <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded self-end backdrop-blur relative z-10">{vid.duration}</span>
                                </div>
                                <div className="p-3 bg-white dark:bg-slate-900/50">
                                    <h5 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug group-hover:text-brand dark:group-hover:text-brand transition-colors">{vid.title}</h5>
                                    <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1"><Eye size={10} /> {vid.views} views</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2"><HelpCircle size={20} className="text-green-500 dark:text-green-400" /> FAQ</h3>
                    <div className="space-y-3">
                        {MOCK_FAQ.map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
                                <button onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)} className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.q}</span>
                                    {openFAQ === idx ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                                </button>
                                {openFAQ === idx && (
                                    <div className="px-4 pb-4 pt-0 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20">
                                        <div className="pt-3">{item.a}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mt-4">
                        <p className="text-xs text-blue-600 dark:text-blue-300 mb-2">Butuh bantuan lebih lanjut?</p>
                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors">Hubungi Support CS</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RenderMentoring = () => (
    <div className="max-w-5xl mx-auto animate-in fade-in space-y-8">
        <div className="flex justify-between items-end">
            <div>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">PLUS Pro Academy</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Upgrade skill bisnis Anda dengan mentor kelas dunia.</p>
            </div>
            <div className="flex gap-2">
                <span className="bg-blue-100 dark:bg-brand/10 text-brand dark:text-brand px-3 py-1 rounded-full text-xs font-bold border border-blue-200 dark:border-brand/20">All Courses</span>
                <span className="text-slate-500 px-3 py-1 rounded-full text-xs font-bold hover:text-slate-900 dark:hover:text-white cursor-pointer">My Learning</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {MOCK_CLASSES.map((cls) => (
                <div key={cls.id} className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:border-brand dark:hover:border-brand/40 transition-all hover:shadow-lg dark:hover:bg-slate-800/50 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3">
                        <div className="bg-black/40 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                            <Star size={10} className="text-yellow-400 fill-yellow-400" /> {cls.rating}
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className={`w - 24 h - 24 ${cls.image} rounded - xl shadow - lg flex items - center justify - center text - white font - bold text - 2xl`}>{cls.mentor.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex gap-2 mb-1">
                                <span className="text-[10px] bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Webinar</span>
                                <span className="text-[10px] bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded uppercase font-bold">{cls.price}</span>
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-1 leading-tight group-hover:text-brand dark:group-hover:text-brand transition-colors">{cls.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">{cls.mentor} • {cls.role}</p>

                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3">
                                <div className="flex items-center gap-3 text-slate-500 text-xs">
                                    <span className="flex items-center gap-1"><Users size={12} /> {cls.students}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {cls.time}</span>
                                </div>
                                <button className="bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-brand hover:text-white transition-colors">Daftar</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const RenderUML = () => (
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

const RenderNetwork = () => (
    <div className="h-full flex flex-col">
        <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Network Topology</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Infrastruktur Server & Alur Data.</p>
        </div>
        <div className="flex-1 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-white/10 p-8 flex items-center justify-center relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1 }}></div>

            <div className="flex flex-col items-center gap-12 w-full max-w-3xl relative z-10">
                {/* Client Layer */}
                <div className="flex flex-col items-center">
                    <div className="bg-slate-800 dark:bg-white text-white dark:text-black px-6 py-2 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center gap-2"><Smartphone size={16} /> Client (Browser/Mobile)</div>
                    <ArrowDown className="text-slate-500 my-2" size={24} />
                </div>

                {/* Edge Layer */}
                <div className="w-full border-t border-dashed border-slate-400 dark:border-slate-600 relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-2 text-[10px] text-slate-500 uppercase tracking-widest">Edge Layer</span>
                </div>

                <div className="flex justify-center gap-12">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/20 border border-orange-500 rounded-lg flex items-center justify-center text-orange-500 mb-2"><Globe size={32} /></div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">CDN / WAF</p>
                    </div>
                </div>

                <ArrowDown className="text-slate-500" size={24} />

                {/* App Layer */}
                <div className="flex gap-4 p-4 border border-blue-500/30 rounded-2xl bg-blue-50 dark:bg-blue-900/10 backdrop-blur-sm relative">
                    <span className="absolute -top-3 left-4 bg-blue-600 px-2 text-[10px] text-white rounded font-bold">Kubernetes Cluster</span>
                    <div className="flex flex-col items-center p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-white/5 shadow-sm">
                        <Server size={24} className="text-blue-500 dark:text-blue-400 mb-1" />
                        <span className="text-[10px] text-slate-600 dark:text-slate-300">App Pod 1</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-white/5 shadow-sm">
                        <Server size={24} className="text-blue-500 dark:text-blue-400 mb-1" />
                        <span className="text-[10px] text-slate-600 dark:text-slate-300">App Pod 2</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-white/5 shadow-sm">
                        <Server size={24} className="text-blue-500 dark:text-blue-400 mb-1" />
                        <span className="text-[10px] text-slate-600 dark:text-slate-300">Worker</span>
                    </div>
                </div>

                <div className="flex w-full justify-between px-20 relative">
                    {/* Connecting Lines (CSS borders) */}
                    <div className="absolute top-0 left-1/2 w-px h-8 bg-slate-400 dark:bg-slate-600 -translate-x-1/2"></div>
                    <div className="absolute top-8 left-[25%] right-[25%] h-px bg-slate-400 dark:bg-slate-600"></div>
                    <div className="absolute top-8 left-[25%] w-px h-8 bg-slate-400 dark:bg-slate-600"></div>
                    <div className="absolute top-8 right-[25%] w-px h-8 bg-slate-400 dark:bg-slate-600"></div>
                </div>

                {/* Data Layer */}
                <div className="flex justify-between w-full max-w-lg mt-4">
                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-green-100 dark:bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center text-green-500 mb-2"><Database size={24} /></div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">PostgreSQL</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-blue-100 dark:bg-brand/20 border border-brand rounded-full flex items-center justify-center text-brand mb-2"><Zap size={24} /></div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Gemini API</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const RenderMockups = () => {
    const [selectedMockup, setSelectedMockup] = useState('login');

    return (
        <div className="h-full flex flex-col">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">High-Fidelity UI Mockups</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Galeri desain antarmuka aplikasi.</p>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 flex flex-col gap-2">
                    {[
                        { id: 'login', label: 'Login Screen', icon: Lock },
                        { id: 'dash', label: 'Dashboard', icon: LayoutDashboard },
                        { id: 'gen', label: 'AI Generator', icon: Wand2 },
                        { id: 'mobile', label: 'Mobile View', icon: MobileIcon },
                    ].map(m => (
                        <button
                            key={m.id}
                            onClick={() => setSelectedMockup(m.id)}
                            className={`flex items - center gap - 3 px - 4 py - 3 rounded - xl text - xs font - bold transition - all ${selectedMockup === m.id ? 'bg-white text-black shadow-lg dark:bg-white dark:text-black' : 'bg-white/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'} `}
                        >
                            <m.icon size={16} /> {m.label}
                        </button>
                    ))}
                </div>

                {/* Preview Area */}
                <div className="flex-1 bg-black rounded-2xl border-[8px] border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
                    {/* Fake Browser Bar */}
                    <div className="bg-slate-800 h-8 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="flex-1 text-center text-[10px] text-slate-400 font-mono">plus.ai/app/{selectedMockup}</div>
                    </div>

                    {/* Mockup Content - Always Dark Mode Inside Mockup for simplicity or adapt if needed */}
                    <div className="flex-1 overflow-y-auto bg-slate-900 relative">
                        {selectedMockup === 'login' && (
                            <div className="h-full flex items-center justify-center bg-slate-900">
                                <div className="w-80 p-8 rounded-2xl border border-white/10 bg-slate-800/50 backdrop-blur">
                                    <div className="text-center mb-8">
                                        <div className="w-12 h-12 bg-brand rounded-xl mx-auto mb-4 flex items-center justify-center text-white font-bold">P</div>
                                        <h4 className="text-white font-bold text-xl">Welcome Back</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-10 bg-slate-900 rounded-lg border border-white/10"></div>
                                        <div className="h-10 bg-slate-900 rounded-lg border border-white/10"></div>
                                        <button className="w-full h-10 bg-gradient-to-r from-brand to-blue-600 rounded-lg text-white font-bold text-sm">Sign In</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Other mockups kept simple */}
                        {selectedMockup === 'dash' && <div className="p-6 text-slate-500 text-center mt-20">Dashboard Mockup Preview</div>}
                        {selectedMockup === 'gen' && <div className="p-6 text-slate-500 text-center mt-20">Generator Mockup Preview</div>}
                        {selectedMockup === 'mobile' && <div className="p-6 text-slate-500 text-center mt-20">Mobile Mockup Preview</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const DocumentationModal: React.FC<{ isOpen: boolean, onClose: () => void, initialTab: string, onStartTour: (tab: string) => void }> = ({ isOpen, onClose, initialTab = 'user-guide', onStartTour }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    useEffect(() => { if (isOpen) setActiveTab(initialTab); }, [initialTab, isOpen]);
    if (!isOpen) return null;

    const tabs = [
        { id: 'user-guide', label: 'Panduan UMKM', icon: LifeBuoy, type: 'guide' },
        { id: 'mentoring', label: 'Pro Academy', icon: GraduationCap, type: 'guide' },
        { id: 'flowchart', label: 'System Flowchart', icon: GitBranch, type: 'tech' },
        { id: 'uml', label: 'UML Class Diagram', icon: Code, type: 'tech' },
        { id: 'network', label: 'Network Topology', icon: Network, type: 'tech' },
        { id: 'mockup', label: 'UI Mockups', icon: Layout, type: 'tech' },
    ];

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 dark:bg-black/90 backdrop-blur-md p-2 md:p-4 animate-in zoom-in-95 duration-300">
            <div className="bg-slate-50 dark:bg-[#0B0C15] border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-6xl h-[90vh] md:h-[85vh] flex flex-col shadow-2xl relative overflow-hidden transition-colors">
                {/* Header */}
                <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-white dark:bg-[#05050A]/50">
                    <div className="flex items-center gap-3">
                        <div className={`p - 2 rounded - lg ${tabs.find(t => t.id === activeTab)?.type === 'guide' ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'} `}>
                            {tabs.find(t => t.id === activeTab)?.type === 'guide' ? <LifeBuoy size={20} /> : <BookOpen size={20} />}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white">{tabs.find(t => t.id === activeTab)?.label}</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-xs hidden md:block">PLUS Knowledge Base</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><X size={24} /></button>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-64 bg-slate-100 dark:bg-[#05050A]/30 border-b md:border-r border-slate-200 dark:border-white/10 p-2 md:p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible no-scrollbar shrink-0">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex - shrink - 0 md: w - full flex items - center gap - 2 px - 3 py - 2.5 rounded - lg transition - all text - xs md: text - sm font - medium whitespace - nowrap ${activeTab === tab.id ? (tab.type === 'guide' ? 'bg-green-100 dark:bg-green-600/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30' : 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30') : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent'} `}>
                                <tab.icon size={16} /><span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content Area */}
                    <div className="flex-1 bg-white dark:bg-surface/50 p-4 md:p-8 overflow-y-auto custom-scrollbar relative">
                        {activeTab === 'user-guide' && <RenderUserGuide onStartTour={onStartTour} />}
                        {activeTab === 'mentoring' && <RenderMentoring />}
                        {activeTab === 'uml' && <RenderUML />}
                        {activeTab === 'network' && <RenderNetwork />}
                        {activeTab === 'mockup' && <RenderMockups />}

                        {activeTab === 'flowchart' && (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="p-6 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4 animate-pulse"><GitBranch size={48} className="text-blue-500 dark:text-blue-400" /></div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">System Flowchart</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mt-2">Diagram alur data dari Input User &rarr; Pemrosesan Gemini AI &rarr; Output Konten/Visual.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
