import React, { useState, useEffect } from "react";
import { User, MonitorPlay, Eye, ShoppingBag, Mic, Video, Settings, Send, Cast } from "lucide-react";

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
