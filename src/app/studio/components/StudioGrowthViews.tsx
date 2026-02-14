import React, { useState, useEffect } from "react";
import {
    User, MonitorPlay, Eye, ShoppingBag, Mic, Video, Settings, Send, Cast,
    Megaphone, Filter, Search, Star, ShieldCheck, Check, Calculator, ShoppingCart,
    BarChart3, LogOut
} from "lucide-react";
import { MOCK_KOLS, PLANS, ALACARTE_FEATURES } from "../lib/mockData";
import { AnalysisResult } from "../types";

// --- VIEW LIVE STREAM ---
export const ViewLiveStream: React.FC<{ addNotification: (t: 'success' | 'error', m: string) => void }> = ({ addNotification }) => {
    const [isLive, setIsLive] = useState(false);
    const [viewers, setViewers] = useState(120);
    const [chatMessages, setChatMessages] = useState<{ user: string, msg: string, color: string }[]>([
        { user: "User 1", msg: "Keren banget produknya! 🔥", color: "bg-blue-500" },
        { user: "User 2", msg: "Harganya berapa kak?", color: "bg-brand" },
        { user: "User 3", msg: "Spill keranjang kuning!", color: "bg-green-500" },
    ]);

    useEffect(() => {
        if (!isLive) return;
        const interval = setInterval(() => {
            setViewers(v => v + Math.floor(Math.random() * 5) - 2);
            if (Math.random() > 0.7) {
                setChatMessages(prev => [...prev.slice(-4), {
                    user: `User ${Math.floor(Math.random() * 100)}`,
                    msg: ["Wah murah banget", "Auto checkout!", "Restock dong kak", "Warnanya ada apa aja?"][Math.floor(Math.random() * 4)],
                    color: ["bg-blue-500", "bg-brand", "bg-orange-500"][Math.floor(Math.random() * 3)]
                }]);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [isLive]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-24 animate-in fade-in duration-500 h-full lg:h-[calc(100vh-140px)]">
            {/* Main Stream Area */}
            <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                <div id="live-preview" className="bg-black border border-white/10 rounded-2xl flex-1 relative overflow-hidden group shadow-2xl min-h-[400px]">
                    {/* Mock Video Feed */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
                        {isLive ? (
                            <div className="text-center animate-pulse">
                                <div className="w-32 h-32 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-brand shadow-[0_0_30px_rgba(12,116,235,0.4)]"><User size={64} className="text-brand" /></div>
                                <p className="text-brand font-bold">AI Avatar Broadcasting...</p>
                            </div>
                        ) : (
                            <div className="text-center opacity-50">
                                <MonitorPlay size={48} className="mx-auto mb-2 text-slate-500" />
                                <p className="text-slate-400">Stream Offline</p>
                            </div>
                        )}
                    </div>

                    {/* Overlays */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
                        <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`}></div>
                        <span className="text-xs font-bold text-white">{isLive ? 'LIVE' : 'OFFLINE'}</span>
                    </div>
                    {isLive && <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2 border border-white/10 animate-in fade-in">
                        <Eye size={14} className="text-white" />
                        <span className="text-xs font-bold text-white">{viewers}</span>
                    </div>}

                    {/* Product Pop-up Overlay */}
                    {isLive && (
                        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-xl flex gap-3 items-center max-w-xs animate-in slide-in-from-left shadow-xl">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center"><ShoppingBag className="text-black" size={20} /></div>
                            <div><p className="text-xs font-bold text-white">Paket Bundling Kopi</p><p className="text-xs text-yellow-400 font-bold">Rp 85.000 <span className="line-through text-slate-400 ml-1 font-normal">100rb</span></p></div>
                            <button className="bg-brand hover:bg-brand/80 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg ml-auto transition-colors shadow-lg">Buy</button>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="bg-card-bg border border-border p-4 rounded-xl flex justify-between items-center shadow-lg transition-colors">
                    <div className="flex gap-4">
                        <button className="p-3 bg-surface-hover rounded-lg hover:bg-surface text-foreground transition-colors relative shadow-sm"><Mic size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-tertiary rounded-full border border-surface"></span></button>
                        <button className="p-3 bg-surface-hover rounded-lg hover:bg-surface text-foreground transition-colors shadow-sm"><Video size={20} /></button>
                        <button className="p-3 bg-surface-hover rounded-lg hover:bg-surface text-foreground transition-colors shadow-sm"><Settings size={20} /></button>
                    </div>
                    <button onClick={() => { setIsLive(!isLive); addNotification('success', isLive ? 'Stream Ended' : 'You are Live!'); }} className={`px-8 py-3 rounded-lg font-bold transition-all shadow-lg text-white ${isLive ? 'bg-red-600 hover:bg-red-500 shadow-red-900/20' : 'bg-tertiary hover:bg-tertiary-light shadow-green-900/20'}`}>
                        {isLive ? 'End Stream' : 'Go Live'}
                    </button>
                </div>
            </div>

            {/* Sidebar: Chat & Products */}
            <div className="flex flex-col gap-4 h-full">
                <div className="bg-card-bg border border-border rounded-2xl flex-1 flex flex-col overflow-hidden shadow-lg transition-colors min-h-[300px]">
                    <div className="p-3 border-b border-border bg-surface"><h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Live Chat</h4></div>
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar">
                        {chatMessages.map((c, i) => (
                            <div key={i} className="flex gap-2 items-start animate-in slide-in-from-bottom-2">
                                <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white ${c.color}`}>{c.user.charAt(0)}</div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-light">{c.user}</p>
                                    <p className="text-xs text-foreground">{c.msg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-border bg-surface flex gap-2">
                        <input placeholder="Type as Host..." className="bg-background border border-border text-foreground text-xs rounded-lg px-3 py-2 flex-1 outline-none focus:ring-1 focus:ring-primary transition-all" />
                        <button className="bg-primary hover:bg-primary-dark p-2 rounded-lg text-white transition-colors"><Send size={14} /></button>
                    </div>
                </div>

                <div id="live-products" className="bg-card-bg border border-border rounded-2xl h-1/3 flex flex-col overflow-hidden shadow-lg transition-colors min-h-[150px]">
                    <div className="p-3 border-b border-border bg-surface flex justify-between items-center"><h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Pinned Products</h4><button className="text-[10px] text-primary hover:text-primary-light transition-colors">+ Add</button></div>
                    <div className="p-3 overflow-y-auto space-y-2">
                        <div className="flex gap-3 bg-surface-hover p-2 rounded-lg border border-border shadow-sm">
                            <div className="w-10 h-10 bg-background rounded flex items-center justify-center"><ShoppingBag size={16} className="text-foreground" /></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-foreground truncate">Paket Bundling</p>
                                <p className="text-[10px] text-muted">Rp 85.000</p>
                            </div>
                            <button className="text-primary hover:text-primary-light transition-colors"><Cast size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- VIEW KOL ---
export const ViewKOL: React.FC<{ addNotification: (t: 'success' | 'error', m: string) => void }> = ({ addNotification }) => {
    const [filters, setFilters] = useState({ cat: 'All', price: 'All', search: '' });
    const filtered = MOCK_KOLS.filter(k =>
        (filters.cat === 'All' || k.category === filters.cat) &&
        (filters.price === 'All' || (filters.price === 'Micro' ? k.price < 500000 : k.price >= 500000)) &&
        k.name.toLowerCase().includes(filters.search.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-24 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><h2 className="text-2xl font-bold text-slate-800 dark:text-white">KOL Collaboration</h2><button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg font-bold text-sm flex gap-2 shadow-lg hover:shadow-yellow-600/20 transition-all transform hover:-translate-y-0.5"><Megaphone size={16} /> Kampanye Baru</button></div>

            {/* Filter Section */}
            <div id="kol-filter" className="bg-card-bg backdrop-blur-sm p-4 rounded-xl border border-border flex flex-col md:flex-row gap-4 items-center shadow-lg transition-colors">
                <div className="flex items-center gap-2 text-muted font-bold"><Filter size={16} /> Filter:</div>
                <select onChange={e => setFilters({ ...filters, cat: e.target.value })} className="bg-surface border border-border text-foreground text-sm rounded-lg px-3 py-2 focus:border-primary outline-none hover:bg-surface-hover transition-colors cursor-pointer w-full md:w-auto">
                    <option value="All">Semua Kategori</option>
                    <option value="F&B">F&B</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Technology">Technology</option>
                </select>
                <select onChange={e => setFilters({ ...filters, price: e.target.value })} className="bg-surface border border-border text-foreground text-sm rounded-lg px-3 py-2 focus:border-primary outline-none hover:bg-surface-hover transition-colors cursor-pointer w-full md:w-auto">
                    <option value="All">Semua Harga</option>
                    <option value="Micro">Micro (&lt;500rb)</option>
                    <option value="Macro">Macro (&gt;500rb)</option>
                </select>
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3 top-2.5 text-muted-light" size={16} />
                    <input onChange={e => setFilters({ ...filters, search: e.target.value })} type="text" placeholder="Cari influencer..." className="w-full bg-surface border border-border text-foreground text-sm rounded-lg pl-9 pr-4 py-2 focus:border-primary outline-none hover:bg-surface-hover transition-colors" />
                </div>
            </div>

            {/* KOL Cards */}
            <div id="kol-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(k => (
                    <div key={k.id} className="bg-card-bg border border-border p-5 rounded-2xl relative group hover:border-primary/50 transition-all hover:bg-surface-hover hover:shadow-xl hover:-translate-y-1">
                        <div className="absolute top-4 right-4 text-yellow-500"><Star size={16} /></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-full p-0.5 shadow-lg">
                                <div className="w-full h-full bg-background rounded-full flex items-center justify-center text-lg font-bold text-foreground uppercase">{k.name.substring(0, 2)}</div>
                            </div>
                            <div>
                                <div className="flex items-center gap-1"><h4 className="text-foreground font-bold">{k.name}</h4>{k.verified && <ShieldCheck size={14} className="text-primary fill-primary/20" />}</div>
                                <p className="text-xs text-primary">{k.handle}</p>
                                <div className="flex gap-1 mt-1">{k.tags.map((t, i) => <span key={i} className="text-[10px] bg-surface-hover px-2 py-0.5 rounded-full text-muted">{t}</span>)}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-surface rounded-xl border border-border">
                            <div className="text-center">
                                <p className="text-[10px] text-muted uppercase font-bold">Followers</p>
                                <p className="text-foreground font-bold text-sm">{k.followers}</p>
                            </div>
                            <div className="text-center border-l border-border">
                                <p className="text-[10px] text-muted uppercase font-bold">ER</p>
                                <p className="text-tertiary font-bold text-sm">{k.er}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div><p className="text-[10px] text-muted">Mulai dari</p><p className="text-foreground font-bold">Rp {k.price.toLocaleString()}</p></div>
                            <button onClick={() => addNotification('success', 'Proposal terkirim!')} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg transition-colors shadow-lg">Kontak</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- VIEW SUBSCRIPTION ---
export const ViewSubscription: React.FC<{ addNotification: (t: 'success' | 'error', m: string) => void }> = ({ addNotification }) => {
    const [customFeatures, setCustomFeatures] = useState<Record<string, boolean>>({});
    const toggleFeature = (id: string) => setCustomFeatures(prev => ({ ...prev, [id]: !prev[id] }));
    const calculateTotal = () => ALACARTE_FEATURES.reduce((acc, f) => customFeatures[f.id] ? acc + f.price : acc, 0);
    const formatPrice = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

    return (
        <div className="space-y-12 pb-24 animate-in fade-in duration-500">
            <div className="text-center max-w-3xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pilih Paket Berlangganan</h2><p className="text-muted text-sm">Mulai gratis atau buat paket custom sesuai kebutuhan bisnis Anda.</p></div>
            <div id="sub-plans" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">{PLANS.map((plan, idx) => (<div key={idx} className={`relative bg-card-bg border ${plan.color} rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 group shadow-sm`}>{plan.tag && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">{plan.tag}</div>}<div className="mb-6"><h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{plan.name}</h3><div className="flex items-end gap-1"><span className="text-2xl font-bold text-foreground">{plan.price}</span><span className="text-xs text-muted mb-1">{plan.period}</span></div></div><div className="flex-1 space-y-3 mb-8">{plan.features.map((f, i) => (<div key={i} className="flex gap-2 text-xs text-muted-light"><Check size={14} className="text-tertiary shrink-0" />{f}</div>))}</div><button onClick={() => addNotification('success', `Paket ${plan.name} dipilih`)} className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg ${plan.highlight ? 'bg-primary hover:bg-primary-dark text-white' : 'bg-surface text-foreground border border-border hover:bg-surface-hover'}`}>Pilih</button></div>))}</div>
            <div id="sub-calculator" className="bg-card-bg border border-border rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-3 shadow-2xl transition-colors"><div className="lg:col-span-2 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border"><div className="flex items-center gap-3 mb-6"><div className="p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl"><Calculator size={24} /></div><div><h3 className="text-xl font-bold text-foreground">Metode A La Carte</h3><p className="text-muted text-xs">Bayar fitur yang Anda butuhkan saja.</p></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{ALACARTE_FEATURES.map((feat) => (<div key={feat.id} onClick={() => toggleFeature(feat.id)} className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${customFeatures[feat.id] ? 'bg-primary/5 border-primary shadow-lg' : 'bg-surface border-border hover:bg-surface-hover'}`}><div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${customFeatures[feat.id] ? 'bg-primary border-primary' : 'border-muted-light'}`}>{customFeatures[feat.id] && <Check size={12} className="text-white" />}</div><div><h4 className="text-sm font-bold text-foreground">{feat.name}</h4><span className="text-xs text-primary">{formatPrice(feat.price)}</span></div></div>))}</div></div><div className="p-6 md:p-8 bg-surface-hover flex flex-col justify-between h-full"><div><h4 className="font-bold text-foreground mb-4 flex items-center gap-2"><ShoppingCart size={18} /> Ringkasan</h4><div className="space-y-2 mb-4">{Object.keys(customFeatures).length === 0 ? <p className="text-xs text-muted italic text-center py-4">Belum ada fitur dipilih.</p> : ALACARTE_FEATURES.filter(f => customFeatures[f.id]).map(f => <div key={f.id} className="flex justify-between text-xs text-muted-light animate-in slide-in-from-right"><span>{f.name}</span><span>{formatPrice(f.price)}</span></div>)}</div></div><div><div className="flex justify-between items-end mb-4"><span className="text-muted text-sm">Total Bulanan</span><span className="text-2xl font-bold text-foreground">{formatPrice(calculateTotal())}</span></div><button disabled={calculateTotal() === 0} onClick={() => addNotification('success', 'Paket Custom aktif!')} className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl disabled:opacity-50 transition-colors shadow-lg">Langganan Sekarang</button></div></div></div>
        </div>
    );
};

// --- VIEW ANALYTICS ---
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
