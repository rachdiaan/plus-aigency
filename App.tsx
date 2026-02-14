import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Calendar, Wand2, BarChart3, Palette, X, ChevronRight, Upload, Check, Zap, 
  TrendingUp, Users, Target, Settings, HelpCircle, LogOut, Sparkles, Mic, Volume2, Search, 
  BookOpen, LifeBuoy, Coffee, Megaphone, Star, MessageCircle, Filter, GraduationCap, Clock, 
  Menu, Bell, GitBranch, Code, Network, Layout, Smartphone, Globe, Cloud, Server, Lock, Cpu, 
  Database, CreditCard, CheckCircle2, Calculator, ShoppingCart, Award, ArrowRight, Video,
  PlayCircle, FileText, DollarSign, Instagram, Youtube, Share2, Image as ImageIcon, Film,
  Smile, AlertCircle, MapPin, ShieldCheck, User, Music, Radio, MonitorPlay, ShoppingBag, Send, 
  Loader2, Download, Grid, List, RefreshCw, Maximize2, Minimize2, Cast, ThumbsUp, Eye,
  ArrowDown, Box, Layers, Smartphone as MobileIcon, Laptop, Flame, Play, Pause, ChevronDown, ChevronUp,
  Sun, Moon, Rocket
} from 'lucide-react';
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Notification, TourStep, CalendarItem, KOL, Plan, ClassItem, AnalysisResult, VideoTutorial, FAQItem } from './types';

// ==========================================
// 0. CONFIGURATION & UTILS
// ==========================================

// --- GENAI CLIENT SETUP ---
const getGenAI = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
};

// --- REFINED: Structured Data Generation (JSON) ---
const callGeminiStructured = async <T,>(prompt: string, schema: Schema): Promise<T | null> => {
  const ai = getGenAI();
  if (!ai) {
      console.warn("API Key missing");
      return null;
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.7, 
      }
    });
    
    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as T;
  } catch (error) {
    console.error("Gemini Structured API Error:", error);
    return null;
  }
};

// --- REFINED: Free Text Generation ---
const callGeminiText = async (prompt: string): Promise<string | null> => {
    const ai = getGenAI();
    if (!ai) return null;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || null;
    } catch (error) {
        console.error("Gemini Text API Error:", error);
        return null;
    }
};

// --- REFINED: Image Generation ---
const callGeminiImage = async (prompt: string): Promise<string | null> => {
    const ai = getGenAI();
    if (!ai) return null;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: prompt,
            config: { }
        });
        
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData && part.inlineData.data) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Gemini Image API Error:", error);
        return null;
    }
};

// --- UTILS ---
const downloadImage = (dataUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

// ==========================================
// 1. DATA & CONSTANTS
// ==========================================

const TOUR_STEPS: Record<string, TourStep[]> = {
  planner: [
    { targetId: "inp-business-name", title: "1. Profil Bisnis", desc: "AI butuh konteks. Isi nama bisnis Anda di sini.", position: "bottom" },
    { targetId: "btn-generate-plan", title: "2. Generate Jadwal", desc: "Satu klik untuk membuat kalender konten sebulan penuh.", position: "top" }
  ],
  generator: [
    { targetId: "gen-prompt-area", title: "1. Studio Kreatif", desc: "Deskripsikan visual atau pilih gaya yang diinginkan.", position: "top" },
    { targetId: "gen-style-select", title: "2. Gaya Visual", desc: "Pilih gaya (Cinematic, 3D, dll) agar hasil lebih pro.", position: "bottom" }
  ],
  livestream: [
    { targetId: "live-preview", title: "1. Preview Stream", desc: "Tampilan avatar AI Anda saat live.", position: "right" },
    { targetId: "live-products", title: "2. Produk Unggulan", desc: "Pin produk agar muncul di layar penonton.", position: "left" }
  ],
  kol: [
    { targetId: "kol-filter", title: "1. Smart Filter", desc: "Cari KOL berdasarkan budget (Micro/Macro) dan kategori.", position: "bottom" },
    { targetId: "kol-list", title: "2. Database KOL", desc: "Pilih influencer yang sudah terverifikasi.", position: "top" }
  ]
};

const MOCK_KOLS: KOL[] = [
  { id: 1, name: "Sasa Kuliner", handle: "@sasaeats", category: "F&B", followers: "45K", er: "5.2%", price: 350000, tags: ["Micro", "Halal"], verified: true },
  { id: 2, name: "OOTD Budi", handle: "@budistyle", category: "Fashion", followers: "120K", er: "3.8%", price: 1200000, tags: ["Macro", "Style"], verified: true },
  { id: 3, name: "Gadget Rina", handle: "@rinatech", category: "Technology", followers: "25K", er: "8.5%", price: 500000, tags: ["Nano", "Review"], verified: false },
  { id: 4, name: "Mama Dapur", handle: "@mamacooks", category: "F&B", followers: "80K", er: "4.1%", price: 750000, tags: ["Micro", "Resep"], verified: true },
  { id: 5, name: "Fit with Andi", handle: "@andifit", category: "Health", followers: "200K", er: "2.9%", price: 2500000, tags: ["Macro", "Gym"], verified: true },
  { id: 6, name: "Travel Santuy", handle: "@santuytrip", category: "Travel", followers: "60K", er: "6.0%", price: 900000, tags: ["Micro", "Trip"], verified: false },
];

const PLANS: Plan[] = [
  { name: "Gratis", price: "Rp 0", period: "", features: ["1 gambar/hari", "Konsultasi AI"], highlight: false, color: "border-slate-200 dark:border-white/10" },
  { name: "Starter", price: "Rp 150rb", period: "/bln", features: ["15 gambar/bln", "Logo Generator"], highlight: true, tag: "Paling Populer", color: "border-brand" },
  { name: "Pro", price: "Rp 250rb", period: "/bln", features: ["Unlimited Gambar", "Viral Strategy"], highlight: false, color: "border-slate-200 dark:border-white/10" },
  { name: "Specialist", price: "Rp 1.2jt", period: "/bln", features: ["Auto-Posting", "Audit AI"], highlight: false, tag: "Vibe Marketing", color: "border-yellow-500" }
];

const ALACARTE_FEATURES = [
    { id: 'f1', name: 'Unlimited AI Image', price: 50000 },
    { id: 'f2', name: 'Viral Predictor', price: 35000 },
    { id: 'f3', name: 'Competitor Spy', price: 75000 },
    { id: 'f4', name: 'Auto-Posting Bot', price: 100000 },
];

const MOCK_CALENDAR: CalendarItem[] = [
    { day: 1, title: 'Behind the Scene', category: 'Awareness', desc: 'Tunjukkan proses pembuatan produk.' },
    { day: 2, title: 'Testimoni Pelanggan', category: 'Social Proof', desc: 'Repost story pelanggan yang puas.' },
    { day: 3, title: 'Tips & Trik', category: 'Education', desc: 'Bagikan cara penggunaan produk.' },
];

const MOCK_CLASSES: ClassItem[] = [
  { id: 1, title: "Jago Jualan di TikTok Shop", mentor: "Coach Rian", role: "TikTok Expert", date: "25 Nov", time: "19:00", rating: 4.9, students: 1250, price: "Gratis", image: "bg-brand" },
  { id: 2, title: "Fotografi Produk Modal HP", mentor: "Siska Visuals", role: "Photographer", date: "26 Nov", time: "10:00", rating: 4.8, students: 850, price: "Rp 50.000", image: "bg-blue-600" },
  { id: 3, title: "AI untuk Copywriting Kilat", mentor: "Dr. Prompt", role: "AI Specialist", date: "28 Nov", time: "15:00", rating: 5.0, students: 2100, price: "Rp 75.000", image: "bg-sky-600" },
  { id: 4, title: "Financial Planning UMKM", mentor: "Budi Cuan", role: "Financial Advisor", date: "30 Nov", time: "13:00", rating: 4.7, students: 600, price: "Gratis", image: "bg-green-600" },
];

const MOCK_TUTORIALS: VideoTutorial[] = [
    { id: 'v1', title: 'Cara Riset Kompetitor dalam 3 Menit', duration: '03:45', thumbnail: 'from-brand to-blue-900', views: '12K' },
    { id: 'v2', title: 'Prompt Engineering untuk Foto Makanan', duration: '05:12', thumbnail: 'from-sky-600 to-blue-900', views: '8.5K' },
    { id: 'v3', title: 'Setup Live Streaming Pertama', duration: '04:20', thumbnail: 'from-blue-600 to-brand', views: '15K' },
];

const MOCK_FAQ: FAQItem[] = [
    { q: 'Apakah hasil gambar AI bebas copyright?', a: 'Ya, semua gambar yang dihasilkan oleh Generator PLUS bebas royalti dan milik Anda sepenuhnya untuk keperluan komersial.' },
    { q: 'Bagaimana cara AI menentukan jadwal posting?', a: 'AI menganalisis tren industri Anda dan perilaku audiens target (misal: Gen Z aktif malam hari) untuk menyarankan waktu terbaik.' },
    { q: 'Apakah saya bisa membatalkan langganan?', a: 'Tentu saja. Anda bisa membatalkan kapan saja melalui menu Settings, tanpa biaya tambahan.' },
];

// ==========================================
// 2. HELPER COMPONENTS
// ==========================================

const ToastContainer: React.FC<{ notifications: Notification[] }> = ({ notifications }) => (
  <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
    {notifications.map((note) => (
      <div key={note.id} className="bg-white/90 dark:bg-surface/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right pointer-events-auto">
        {note.type === 'success' ? <div className="bg-green-500/20 p-1 rounded-full"><Check size={14} className="text-green-600 dark:text-green-400" /></div> : <div className="bg-red-500/20 p-1 rounded-full"><AlertCircle size={14} className="text-red-600 dark:text-red-400" /></div>}
        <span className="text-sm font-medium">{note.message}</span>
      </div>
    ))}
  </div>
);

const SidebarItem: React.FC<{ icon: any, label: string, active: boolean, onClick: () => void }> = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${active ? 'text-brand dark:text-white shadow-[0_0_20px_rgba(12,116,235,0.1)] bg-brand/10 dark:bg-white/5 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-brand dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}>
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand to-blue-500 rounded-l-xl" />}
    <Icon size={20} className={`relative z-10 transition-colors ${active ? 'text-brand dark:text-brand' : 'group-hover:text-brand dark:group-hover:text-brand'}`} />
    <span className="relative z-10 text-sm">{label}</span>
    {active && <ChevronRight size={16} className="relative z-10 ml-auto text-brand opacity-80" />}
  </button>
);

const InteractiveTour: React.FC<{ steps?: TourStep[], isActive: boolean, onComplete: () => void }> = ({ steps, isActive, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState<{ top: number, left: number, width: number, height: number, targetTop: number, targetLeft: number, arrowPos: string } | null>(null);

  useEffect(() => {
    if (!isActive || !steps || steps.length === 0) { if (!isActive) setCurrentStep(0); return; }
    const updatePosition = () => {
        const stepData = steps[currentStep];
        if (!stepData) return;
        const target = document.getElementById(stepData.targetId);
        if (target) {
            const rect = target.getBoundingClientRect();
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // SMART POSITIONING LOGIC
            const tooltipWidth = 320; 
            const tooltipHeight = 150; 
            const gap = 15;
            const viewportW = window.innerWidth;
            const viewportH = window.innerHeight;

            let top, left, arrowPos;
            let finalPos = stepData.position;

            if (finalPos === 'right' && rect.right + tooltipWidth + gap > viewportW) finalPos = 'left';
            if (finalPos === 'left' && rect.left - tooltipWidth - gap < 0) finalPos = 'right';
            if (finalPos === 'bottom' && rect.bottom + tooltipHeight + gap > viewportH) finalPos = 'top';
            if (finalPos === 'top' && rect.top - tooltipHeight - gap < 0) finalPos = 'bottom';

            if (window.innerWidth < 768) {
                 finalPos = rect.bottom + tooltipHeight + gap > viewportH ? 'top' : 'bottom';
                 left = 10;
                 top = finalPos === 'bottom' ? rect.bottom + gap : rect.top - tooltipHeight - gap;
                 arrowPos = finalPos;
            } else {
                if (finalPos === 'right') { top = rect.top; left = rect.right + gap; } 
                else if (finalPos === 'top') { top = rect.top - tooltipHeight - gap; left = rect.left; } 
                else if (finalPos === 'left') { top = rect.top; left = rect.left - tooltipWidth - gap; }
                else { top = rect.bottom + gap; left = rect.left; } 
                arrowPos = finalPos;
            }

            if (left < 10) left = 10;
            if (left + tooltipWidth > viewportW - 10) left = viewportW - tooltipWidth - 10;

            setPosition({ top, left, width: rect.width, height: rect.height, targetTop: rect.top, targetLeft: rect.left, arrowPos });
        }
    };
    
    const timer = setTimeout(updatePosition, 400);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => { window.removeEventListener('resize', updatePosition); window.removeEventListener('scroll', updatePosition); clearTimeout(timer); };
  }, [currentStep, isActive, steps]);

  if (!isActive || !position || !steps || !steps[currentStep]) return null;
  const stepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[70] pointer-events-none">
        <div className="absolute inset-0 bg-black/60 transition-all duration-500 backdrop-blur-[2px]" style={{clipPath: `polygon(0% 0%, 0% 100%, ${position.targetLeft}px 100%, ${position.targetLeft}px ${position.targetTop}px, ${position.targetLeft + position.width}px ${position.targetTop}px, ${position.targetLeft + position.width}px ${position.targetTop + position.height}px, ${position.targetLeft}px ${position.targetTop + position.height}px, ${position.targetLeft}px 100%, 100% 100%, 100% 0%)`}}></div>
        <div className="absolute border-2 border-brand rounded-lg shadow-[0_0_30px_rgba(12,116,235,0.8)] animate-pulse" style={{ top: position.targetTop - 4, left: position.targetLeft - 4, width: position.width + 8, height: position.height + 8 }}></div>
        <div className="absolute pointer-events-auto bg-white/95 dark:bg-surface/95 backdrop-blur-xl border border-brand/50 p-5 rounded-xl shadow-2xl w-[calc(100%-20px)] md:w-80 transition-all duration-300 animate-in zoom-in-95" style={{ top: position.top, left: position.left }}>
            <div className="flex items-start gap-3 mb-2"><HelpCircle className="text-brand dark:text-brand shrink-0" size={20} /><h4 className="font-bold text-slate-800 dark:text-white text-md">{stepData.title}</h4></div>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">{stepData.desc}</p>
            <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">{currentStep + 1} / {steps.length}</span>
                <div className="flex gap-2">
                    {currentStep > 0 && (<button onClick={() => setCurrentStep(c => c - 1)} className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 transition-colors">Back</button>)}
                    <button onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(c => c + 1); } else { onComplete(); } }} className="bg-brand hover:bg-brand/80 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-lg hover:shadow-brand/25">{currentStep === steps.length - 1 ? "Selesai" : "Lanjut"}</button>
                </div>
            </div>
        </div>
    </div>
  );
};

const AIVoiceAssistant: React.FC<{ onAutoFill?: () => void, addNotification?: (type: 'success'|'error', msg: string) => void }> = ({ onAutoFill, addNotification }) => {
  const [isListening, setIsListening] = useState(false);
  const [minimized, setMinimized] = useState(true); 
  useEffect(() => { setTimeout(() => { if (window.innerWidth > 768) setMinimized(false); }, 2000); }, []);
  const handleMicClick = () => { setIsListening(true); setTimeout(() => { setIsListening(false); if(onAutoFill) onAutoFill(); if(addNotification) addNotification('success', 'Data diisi otomatis!'); }, 1500); };

  if (minimized) return (<button onClick={() => setMinimized(false)} className="fixed bottom-24 right-4 md:right-8 w-14 h-14 bg-gradient-to-r from-brand to-blue-600 rounded-full shadow-[0_0_20px_rgba(12,116,235,0.5)] flex items-center justify-center animate-bounce hover:scale-110 transition-transform z-40"><Sparkles className="text-white" size={24} /></button>);

  return (
    <div className="fixed bottom-24 right-4 md:right-8 z-40 w-[calc(100%-2rem)] md:w-80 max-w-sm animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-white/90 dark:bg-surface/90 backdrop-blur-xl border border-slate-200 dark:border-brand/30 rounded-2xl shadow-2xl dark:shadow-brand/50 overflow-hidden">
        <div className="h-14 bg-gradient-to-r from-blue-100 to-sky-100 dark:from-brand/50 dark:to-blue-900/50 relative flex items-center justify-between px-4"><div className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-tr from-brand to-blue-400 rounded-full flex items-center justify-center shadow-inner"><Volume2 size={14} className="text-white" /></div><span className="text-slate-800 dark:text-white font-bold text-sm">Ava Assistant</span></div><button onClick={() => setMinimized(true)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"><X size={16}/></button></div>
        <div className="p-4"><p className="text-slate-600 dark:text-slate-300 text-xs mb-4 bg-slate-50 dark:bg-white/5 p-3 rounded-lg leading-relaxed border border-slate-200 dark:border-white/5">{isListening ? "Mendengarkan..." : "Butuh bantuan mengisi form? Klik mic di bawah."}</p><button onClick={handleMicClick} className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-lg ${isListening ? 'bg-red-500/20 text-red-500 dark:text-red-400 border border-red-500/50 animate-pulse' : 'bg-gradient-to-r from-brand to-blue-600 hover:brightness-110 text-white'}`}><Mic size={14} /> {isListening ? "Mendengarkan..." : "Bicara Sekarang"}</button></div>
      </div>
    </div>
  );
};

// --- UPGRADED: DOCUMENTATION MODAL COMPONENTS ---

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
                    <button onClick={() => onStartTour('planner')} className="px-5 py-2.5 bg-white text-brand font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-lg flex items-center gap-2"><Sparkles size={16}/> Mulai Tur Planner</button>
                    <button onClick={() => onStartTour('generator')} className="px-5 py-2.5 bg-brand text-white font-bold text-sm rounded-xl hover:bg-brand/80 transition-colors shadow-lg flex items-center gap-2"><Wand2 size={16}/> Tur Generator</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Video Tutorials */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2"><PlayCircle size={20} className="text-brand dark:text-brand"/> Video Tutorial</h3>
                    
                    {/* Active Player Simulator */}
                    <div className="aspect-video bg-black rounded-xl border border-white/10 relative overflow-hidden group shadow-2xl">
                        {activeVideo ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-sky-900/20 animate-pulse"></div>
                                <div className="text-center relative z-10">
                                    <h4 className="text-white font-bold text-xl mb-2">{MOCK_TUTORIALS.find(v => v.id === activeVideo)?.title}</h4>
                                    <div className="flex items-center gap-4 justify-center">
                                        <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"><ArrowRight size={20} className="rotate-180"/></button>
                                        <button onClick={() => setActiveVideo(null)} className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform"><Pause size={24} fill="currentColor"/></button>
                                        <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"><ArrowRight size={20}/></button>
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
                            <button key={vid.id} onClick={() => setActiveVideo(vid.id)} className={`text-left group rounded-xl overflow-hidden border transition-all ${activeVideo === vid.id ? 'border-brand ring-1 ring-brand' : 'border-slate-200 dark:border-white/10 hover:border-brand/50 dark:hover:border-white/30'}`}>
                                <div className={`aspect-video bg-gradient-to-br ${vid.thumbnail} relative p-3 flex flex-col justify-end`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                    <div className="absolute center inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><div className="bg-black/50 p-2 rounded-full backdrop-blur"><Play size={16} className="text-white" fill="white"/></div></div>
                                    <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded self-end backdrop-blur relative z-10">{vid.duration}</span>
                                </div>
                                <div className="p-3 bg-white dark:bg-slate-900/50">
                                    <h5 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug group-hover:text-brand dark:group-hover:text-brand transition-colors">{vid.title}</h5>
                                    <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1"><Eye size={10}/> {vid.views} views</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2"><HelpCircle size={20} className="text-green-500 dark:text-green-400"/> FAQ</h3>
                    <div className="space-y-3">
                        {MOCK_FAQ.map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
                                <button onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)} className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.q}</span>
                                    {openFAQ === idx ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
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
                             <Star size={10} className="text-yellow-400 fill-yellow-400"/> {cls.rating}
                         </div>
                    </div>
                    <div className="flex gap-5">
                        <div className={`w-24 h-24 ${cls.image} rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-2xl`}>{cls.mentor.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                             <div className="flex gap-2 mb-1">
                                <span className="text-[10px] bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Webinar</span>
                                <span className="text-[10px] bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded uppercase font-bold">{cls.price}</span>
                             </div>
                             <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-1 leading-tight group-hover:text-brand dark:group-hover:text-brand transition-colors">{cls.title}</h4>
                             <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">{cls.mentor} • {cls.role}</p>
                             
                             <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3">
                                 <div className="flex items-center gap-3 text-slate-500 text-xs">
                                     <span className="flex items-center gap-1"><Users size={12}/> {cls.students}</span>
                                     <span className="flex items-center gap-1"><Clock size={12}/> {cls.time}</span>
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
            {/* Visual SVG Lines */}
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
                        <hr className="border-slate-300 dark:border-slate-600 my-1"/>
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
                            <hr className="border-slate-300 dark:border-slate-600 my-1"/>
                            <p>+ generateSchedule()</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 border border-brand rounded-lg w-64 shadow-lg z-10">
                        <div className="bg-blue-100 dark:bg-brand/50 p-2 border-b border-brand text-center font-bold text-brand dark:text-white text-sm">AIService</div>
                        <div className="p-3 text-xs text-slate-600 dark:text-slate-300 font-mono space-y-1">
                            <p>+ model: Gemini-Flash</p>
                            <p>+ apiKey: SecureString</p>
                            <hr className="border-slate-300 dark:border-slate-600 my-1"/>
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
             <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1}}></div>
             
             <div className="flex flex-col items-center gap-12 w-full max-w-3xl relative z-10">
                 {/* Client Layer */}
                 <div className="flex flex-col items-center">
                    <div className="bg-slate-800 dark:bg-white text-white dark:text-black px-6 py-2 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center gap-2"><Smartphone size={16}/> Client (Browser/Mobile)</div>
                    <ArrowDown className="text-slate-500 my-2" size={24}/>
                 </div>

                 {/* Edge Layer */}
                 <div className="w-full border-t border-dashed border-slate-400 dark:border-slate-600 relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-2 text-[10px] text-slate-500 uppercase tracking-widest">Edge Layer</span>
                 </div>

                 <div className="flex justify-center gap-12">
                     <div className="flex flex-col items-center">
                         <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/20 border border-orange-500 rounded-lg flex items-center justify-center text-orange-500 mb-2"><Globe size={32}/></div>
                         <p className="text-xs font-bold text-slate-600 dark:text-slate-300">CDN / WAF</p>
                     </div>
                 </div>
                 
                 <ArrowDown className="text-slate-500" size={24}/>

                 {/* App Layer */}
                 <div className="flex gap-4 p-4 border border-blue-500/30 rounded-2xl bg-blue-50 dark:bg-blue-900/10 backdrop-blur-sm relative">
                    <span className="absolute -top-3 left-4 bg-blue-600 px-2 text-[10px] text-white rounded font-bold">Kubernetes Cluster</span>
                    <div className="flex flex-col items-center p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-white/5 shadow-sm">
                        <Server size={24} className="text-blue-500 dark:text-blue-400 mb-1"/>
                        <span className="text-[10px] text-slate-600 dark:text-slate-300">App Pod 1</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-white/5 shadow-sm">
                        <Server size={24} className="text-blue-500 dark:text-blue-400 mb-1"/>
                        <span className="text-[10px] text-slate-600 dark:text-slate-300">App Pod 2</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-white/5 shadow-sm">
                        <Server size={24} className="text-blue-500 dark:text-blue-400 mb-1"/>
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
                         <div className="w-14 h-14 bg-green-100 dark:bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center text-green-500 mb-2"><Database size={24}/></div>
                         <p className="text-xs font-bold text-slate-600 dark:text-slate-300">PostgreSQL</p>
                     </div>
                     <div className="flex flex-col items-center">
                         <div className="w-14 h-14 bg-blue-100 dark:bg-brand/20 border border-brand rounded-full flex items-center justify-center text-brand mb-2"><Zap size={24}/></div>
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
                        {id:'login', label:'Login Screen', icon: Lock},
                        {id:'dash', label:'Dashboard', icon: LayoutDashboard},
                        {id:'gen', label:'AI Generator', icon: Wand2},
                        {id:'mobile', label:'Mobile View', icon: MobileIcon},
                    ].map(m => (
                        <button 
                            key={m.id} 
                            onClick={()=>setSelectedMockup(m.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${selectedMockup === m.id ? 'bg-white text-black shadow-lg dark:bg-white dark:text-black' : 'bg-white/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
                        >
                            <m.icon size={16}/> {m.label}
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

// --- MAIN MODAL WRAPPER ---
const DocumentationModal: React.FC<{ isOpen: boolean, onClose: () => void, initialTab: string, onStartTour: (tab: string) => void }> = ({ isOpen, onClose, initialTab = 'user-guide', onStartTour }) => {
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
                <div className={`p-2 rounded-lg ${tabs.find(t => t.id === activeTab)?.type === 'guide' ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'}`}>
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
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-shrink-0 md:w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all text-xs md:text-sm font-medium whitespace-nowrap ${activeTab === tab.id ? (tab.type === 'guide' ? 'bg-green-100 dark:bg-green-600/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30' : 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30') : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent'}`}>
                    <tab.icon size={16} /><span>{tab.label}</span>
                </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 bg-white dark:bg-surface/50 p-4 md:p-8 overflow-y-auto custom-scrollbar relative">
            
            {activeTab === 'mentoring' && <RenderMentoring />}
            
            {activeTab === 'flowchart' && (
                 <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="p-6 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4 animate-pulse"><GitBranch size={48} className="text-blue-500 dark:text-blue-400"/></div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">System Flowchart</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mt-2">Diagram alur data dari Input User &rarr; Pemrosesan Gemini AI &rarr; Output Konten/Visual.</p>
                 </div>
            )}

            {activeTab === 'uml' && <RenderUML />}
            {activeTab === 'network' && <RenderNetwork />}
            {activeTab === 'mockup' && <RenderMockups />}

            {activeTab === 'user-guide' && <RenderUserGuide onStartTour={onStartTour}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. FEATURE VIEWS
// ==========================================

const ViewPlanner: React.FC<{ onAutoFill: () => void, addNotification: (t: 'success'|'error', m: string) => void }> = ({ onAutoFill, addNotification }) => {
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [form, setForm] = useState({name:'', industry:'', market:'', idea:''});
  const [calendarData, setCalendarData] = useState<CalendarItem[]>(MOCK_CALENDAR);

  const handleFill = () => { setForm({name: "Kopi Senja", industry: "F&B", market: "Gen Z", idea: "Promo Akhir Bulan"}); };
  
  const handleGen = async () => {
    if (!form.name) { addNotification('error', 'Mohon isi nama bisnis.'); return; }
    setLoading(true);
    
    // Define strict schema for Gemini
    const calendarSchema: Schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                day: { type: Type.INTEGER },
                title: { type: Type.STRING },
                category: { type: Type.STRING, enum: ['Awareness', 'Sales', 'Engagement', 'Education', 'Other'] },
                desc: { type: Type.STRING },
            },
            required: ["day", "title", "category", "desc"]
        }
    };

    const prompt = `Create a 6-day social media content calendar for '${form.name}' (${form.industry}, target: ${form.market}). Focus: '${form.idea}'. Use creative and engaging Indonesian language.`;
    
    const result = await callGeminiStructured<CalendarItem[]>(prompt, calendarSchema);
    
    if (result) {
        setCalendarData(result);
        addNotification('success', 'Jadwal berhasil dibuat!');
    } else {
        addNotification('error', 'Gagal membuat jadwal, coba lagi.');
        // Fallback or keep existing
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
      <AIVoiceAssistant onAutoFill={handleFill} addNotification={addNotification} />
      
      {/* Input Section */}
      <div className="bg-white dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200 dark:border-white/10 p-6 rounded-2xl relative overflow-hidden group shadow-sm transition-colors">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-sky-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
        <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex gap-2 relative z-10"><Zap size={20} className="text-yellow-500 fill-yellow-500"/> AI Campaign Architect</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative z-10">
            {(['name', 'industry', 'market'] as const).map(f => (<div key={f} className="space-y-2"><label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{f}</label><input id={f==='name'?'inp-business-name':undefined} value={form[f]} onChange={e=>setForm({...form, [f]:e.target.value})} placeholder={`Input ${f}...`} className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white px-4 py-3 rounded-lg text-sm focus:border-brand focus:ring-1 focus:ring-brand transition-all outline-none hover:bg-white dark:hover:bg-slate-900"/></div>))}
        </div>
        <div className="space-y-2 mb-6 relative z-10"><label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Campaign Focus</label><textarea value={form.idea} onChange={e=>setForm({...form, idea:e.target.value})} placeholder="Apa tujuan kampanye bulan ini?" className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white px-4 py-3 rounded-lg text-sm h-20 resize-none focus:border-brand outline-none hover:bg-white dark:hover:bg-slate-900"/></div>
        <button id="btn-generate-plan" onClick={handleGen} disabled={loading} className="relative z-10 bg-gradient-to-r from-brand to-blue-600 hover:brightness-110 text-white px-8 py-3 rounded-lg font-bold w-full md:w-auto transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">{loading ? <><Loader2 className="animate-spin" size={18}/> Meracik Strategi...</> : <><Sparkles size={18}/> Generate Calendar</>}</button>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2"><Calendar size={20} className="text-brand dark:text-brand"/> Content Roadmap</h3>
            <div className="flex gap-2 bg-white dark:bg-slate-800/50 p-1 rounded-lg border border-slate-200 dark:border-white/10 self-end shadow-sm">
                <button onClick={()=>setViewMode('list')} className={`p-2 rounded-md transition-all ${viewMode==='list'?'bg-slate-100 dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm':'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}><List size={16}/></button>
                <button onClick={()=>setViewMode('grid')} className={`p-2 rounded-md transition-all ${viewMode==='grid'?'bg-slate-100 dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm':'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}><Grid size={16}/></button>
            </div>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800/50 rounded-xl animate-pulse border border-slate-300 dark:border-white/5"></div>)}
             </div>
          ) : (
             <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {calendarData.map((c, i) => (
                    <div key={i} className={`bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-white/5 rounded-xl hover:border-brand/30 transition-all hover:-translate-y-1 hover:shadow-lg dark:hover:bg-slate-800/60 group relative overflow-hidden ${viewMode === 'list' ? 'flex flex-col md:flex-row gap-4 p-4 items-start md:items-center' : 'p-5 flex flex-col h-full'}`}>
                        <div className={`flex items-center justify-center bg-slate-100 dark:bg-slate-900/80 rounded-lg shrink-0 border border-slate-200 dark:border-white/5 text-brand dark:text-brand ${viewMode==='list'?'w-12 h-12':'w-full h-10 mb-3'}`}>
                            <span className="text-xs font-bold uppercase tracking-wider">Day {c.day}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-slate-800 dark:text-white truncate pr-2 text-base">{c.title}</h4>
                                <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${c.category==='Sales'?'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20': c.category==='Awareness' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' : 'bg-brand/10 dark:bg-brand/10 text-brand dark:text-brand border-brand/20 dark:border-brand/20'}`}>{c.category}</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">{c.desc}</p>
                        </div>
                        {viewMode === 'list' && <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight size={16}/></button>}
                    </div>
                ))}
             </div>
          )}
      </div>
    </div>
  );
};

const ViewGenerator: React.FC<{ addNotification: (t: 'success'|'error', m: string) => void }> = ({ addNotification }) => {
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState('Photorealistic');
    const [ratio, setRatio] = useState('1:1');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) { addNotification('error', 'Masukkan prompt!'); return; }
        setLoading(true);
        const enhancedPrompt = `Create a ${ratio} image. Style: ${style}. Subject: ${prompt}. High quality, detailed, professional lighting.`;
        const imgData = await callGeminiImage(enhancedPrompt);
        
        if (imgData) {
            setGeneratedImage(imgData);
            addNotification('success', 'Gambar berhasil dibuat!');
        } else {
            addNotification('error', 'Gagal membuat gambar. Coba prompt lain.');
        }
        setLoading(false);
    };

    return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24 animate-in fade-in duration-500 h-full lg:h-[calc(100vh-140px)]">
        {/* Controls Panel */}
        <div className="lg:col-span-4 flex flex-col gap-4 h-full">
            <div className="bg-white dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200 dark:border-white/10 p-6 rounded-2xl flex-1 flex flex-col shadow-lg transition-colors">
                <div className="mb-6"><h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2"><Wand2 size={18} className="text-brand dark:text-brand"/> AI Studio</h3><p className="text-slate-500 dark:text-slate-400 text-xs">Powered by Gemini 2.5 Flash Image.</p></div>
                
                <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <div id="gen-prompt-area" className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Prompt Visual</label>
                        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Misal: Coffee shop futuristik dengan lampu neon di Jakarta Selatan, cinematic shot..." className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white p-3 rounded-lg h-32 text-sm resize-none focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all hover:bg-white dark:hover:bg-slate-900"/>
                    </div>

                    <div id="gen-style-select" className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Visual Style</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Photorealistic', '3D Render', 'Anime', 'Oil Painting', 'Cyberpunk', 'Minimalist', 'Vintage', 'Pop Art'].map(s => (
                                <button key={s} onClick={()=>setStyle(s)} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left ${style===s ? 'bg-brand/10 dark:bg-brand/20 border-brand text-brand dark:text-white shadow-[0_0_10px_rgba(12,116,235,0.3)]' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-700 dark:hover:text-slate-200'}`}>{s}</button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Aspect Ratio</label>
                        <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-lg border border-slate-200 dark:border-white/5">
                            {['1:1', '16:9', '9:16', '4:3'].map(r => (
                                <button key={r} onClick={()=>setRatio(r)} className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${ratio === r ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}>{r}</button>
                            ))}
                        </div>
                    </div>
                </div>

                <button onClick={handleGenerate} disabled={loading} id="gen-btn-action" className="mt-6 w-full bg-gradient-to-r from-brand to-blue-600 text-white py-3 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? <Loader2 className="animate-spin" size={18}/> : <Sparkles size={18}/>} Generate Visual
                </button>
            </div>
        </div>

        {/* Preview Panel */}
        <div id="gen-result-area" className="lg:col-span-8 bg-slate-100 dark:bg-[#05050A] border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group min-h-[400px] shadow-inner transition-colors">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            
            {/* Background Decor */}
            {!generatedImage && !loading && (
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-sky-500/5 dark:from-blue-900/10 dark:to-sky-900/10 pointer-events-none"></div>
            )}

            {loading ? (
                <div className="text-center relative z-10">
                    <div className="w-16 h-16 border-4 border-brand/30 border-t-brand rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400 animate-pulse font-medium">Meracik piksel...</p>
                    <p className="text-xs text-slate-500 mt-2">Estimasi: 5-10 detik</p>
                </div>
            ) : generatedImage ? (
                <div className="relative w-full h-full p-4 flex items-center justify-center">
                    <img src={generatedImage} alt="Result" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-500"/>
                    <div className="absolute bottom-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur rounded-full px-4 py-2 border border-white/10 translate-y-2 group-hover:translate-y-0 duration-300">
                        <button onClick={() => downloadImage(generatedImage, `plus-gen-${Date.now()}.png`)} className="text-white hover:text-brand transition-colors flex items-center gap-2 text-xs font-bold pr-3 border-r border-white/20"><Download size={16}/> Save</button>
                        <button className="text-white hover:text-brand transition-colors"><Maximize2 size={16}/></button>
                    </div>
                </div>
            ) : (
                <div className="text-center relative z-10 opacity-60 dark:opacity-50 max-w-sm px-6">
                    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-full inline-block mb-4 border border-slate-200 dark:border-white/5 shadow-sm">
                        <ImageIcon className="text-slate-400 dark:text-slate-500" size={48}/>
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-400 mb-2">Canvas Kosong</h3>
                    <p className="text-slate-500 text-sm">Tulis prompt di panel kiri untuk mulai membuat visual menakjubkan.</p>
                </div>
            )}
        </div>
    </div>
    );
};

const ViewStrategy: React.FC<{ addNotification: (t: 'success'|'error', m: string) => void }> = ({ addNotification }) => {
  const [inputText, setInputText] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!inputText) return;
    setLoading(true);

    const schema: Schema = {
        type: Type.OBJECT,
        properties: {
            score: { type: Type.INTEGER },
            hook: { type: Type.STRING },
            fit: { type: Type.STRING },
            format: { type: Type.STRING },
            improvements: { type: Type.STRING },
        },
        required: ["score", "hook", "fit", "format", "improvements"]
    };

    const prompt = `Analyze this social media caption: "${inputText}". Rate it 0-100 on viral potential. Identify the hook strength, audience fit, best format (Reels/Post/Story), and provide 1 specific improvement tip.`;
    
    const data = await callGeminiStructured<AnalysisResult>(prompt, schema);

    if (data) {
        setAnalysis(data);
    } else {
        addNotification('error', 'Analisis gagal, menggunakan simulasi.');
        setAnalysis({ score: 78, hook: "Avg", fit: "85%", format: "Carousel", improvements: "Make hook shorter" });
    }
    setLoading(false);
  };

  const handleRewrite = async () => {
     if(!inputText) return;
     setLoading(true);
     const prompt = `Rewrite this caption to be more viral, engaging, and relatable for Gen Z in Bahasa Indonesia slang but polite: "${inputText}"`;
     const res = await callGeminiText(prompt);
     if(res) { 
         setInputText(res); 
         addNotification('success', 'Caption berhasil di-upgrade!'); 
    }
     setLoading(false);
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-100 to-sky-100 dark:from-brand/40 dark:to-blue-900/40 border border-brand/20 dark:border-brand/30 p-6 rounded-2xl relative overflow-hidden shadow-lg group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 dark:bg-brand/20 blur-3xl rounded-full pointer-events-none group-hover:bg-brand/30 transition-all"/>
            <Target size={32} className="text-brand dark:text-brand mb-2"/>
            <h3 className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">{analysis?.score || '--'}<span className="text-lg font-normal text-slate-500 dark:text-slate-400 ml-1">/100</span></h3>
            <p className="text-sm text-brand dark:text-brand mt-2 font-medium">Viral Probability</p>
            {analysis && <div className="mt-3 h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-brand rounded-full transition-all duration-1000" style={{width: `${analysis.score}%`}}></div></div>}
          </div>
          <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 p-6 rounded-2xl col-span-2 shadow-lg transition-colors">
            <h4 className="text-slate-800 dark:text-white font-bold mb-4 flex items-center gap-2"><Flame size={18} className="text-orange-500 fill-orange-500"/> Trending Now (Indonesia)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[{t:"#LokalPride", v:"1.2M"}, {t:"#OOTDIndo", v:"850K"}, {t:"#KulinerViral", v:"2.1M"}, {t:"#BisnisAnakMuda", v:"500K"}].map((t,i)=>(
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-white/5 hover:border-orange-500/30 transition-colors cursor-pointer group">
                        <span className="text-slate-700 dark:text-white font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{t.t}</span>
                        <span className="text-green-600 dark:text-green-400 text-xs font-bold bg-green-100 dark:bg-green-500/10 px-2 py-1 rounded">{t.v}</span>
                    </div>
                ))}
            </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-lg transition-colors">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex gap-2"><Zap size={18} className="text-yellow-500"/> Content Optimizer</h3>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-1 rounded-xl border border-slate-200 dark:border-white/5 focus-within:border-brand/50 transition-colors relative">
                  <textarea id="strat-input" value={inputText} onChange={(e)=>setInputText(e.target.value)} placeholder="Tulis ide caption kasar Anda di sini..." className="w-full bg-transparent text-slate-800 dark:text-white text-sm p-4 focus:outline-none resize-none h-32"/>
                  {loading && <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl"><Loader2 className="animate-spin text-brand"/></div>}
                  <div className="flex justify-between items-center px-4 py-2 border-t border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900/80 rounded-b-lg">
                      <button onClick={handleRewrite} disabled={loading||!inputText} className="text-xs font-bold text-brand dark:text-brand hover:text-brand flex items-center gap-1 disabled:opacity-50"><RefreshCw size={12}/> Magic Rewrite</button>
                      <button id="strat-btn" onClick={handlePredict} disabled={loading || !inputText} className="bg-slate-900 dark:bg-white text-white dark:text-black px-5 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50">{loading?"Analyzing...":"Check Score"}</button>
                  </div>
              </div>
              
              {analysis && (
                  <div className="grid grid-cols-3 gap-4 mt-6 animate-in slide-in-from-top-4">
                      {[['Hook', analysis.hook, 'text-blue-600 dark:text-blue-400', 'bg-blue-100 dark:bg-blue-500/10'], ['Fit', analysis.fit, 'text-green-600 dark:text-green-400', 'bg-green-100 dark:bg-green-500/10'], ['Format', analysis.format, 'text-brand dark:text-brand', 'bg-brand/10 dark:bg-brand/10']].map(([l, v, tc, bg], i) => (
                          <div key={i} className={`${bg} border border-white/5 rounded-xl p-3 text-center`}>
                              <p className={`text-[10px] uppercase font-bold opacity-70 mb-1 ${tc}`}>{l as string}</p>
                              <p className="text-slate-900 dark:text-white font-bold">{v as string}</p>
                          </div>
                      ))}
                      <div className="col-span-3 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 p-4 rounded-xl flex gap-4 items-start shadow-sm">
                          <div className="bg-yellow-500/20 p-2 rounded-full shrink-0"><Sparkles size={16} className="text-yellow-600 dark:text-yellow-400"/></div>
                          <div>
                              <p className="text-xs font-bold text-slate-800 dark:text-white mb-1">AI Recommendation</p>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{analysis.improvements}</p>
                          </div>
                      </div>
                  </div>
              )}
          </div>
          <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg transition-colors">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-4"><Users size={32} className="text-red-500 dark:text-red-400"/></div>
              <h4 className="text-slate-800 dark:text-white font-bold mb-1">Competitor Watch</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 px-4">Pantau gerakan kompetitor secara real-time.</p>
              <div className="w-full space-y-3">
                  <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-white/5 flex items-center gap-3 text-left hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">C</div>
                    <div><p className="text-xs font-bold text-slate-800 dark:text-white">CoffeeBrandX</p><p className="text-[10px] text-slate-500">Post 15m ago • High Engagement</p></div>
                  </div>
                  <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-white/5 flex items-center gap-3 text-left hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">K</div>
                    <div><p className="text-xs font-bold text-slate-800 dark:text-white">KopiKenanganMantan</p><p className="text-[10px] text-slate-500">Story 2h ago • Promo Alert</p></div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  );
};

const ViewLiveStream: React.FC<{ addNotification: (t: 'success'|'error', m: string) => void }> = ({ addNotification }) => {
    const [isLive, setIsLive] = useState(false);
    const [viewers, setViewers] = useState(120);
    const [chatMessages, setChatMessages] = useState<{user: string, msg: string, color: string}[]>([
        {user: "User 1", msg: "Keren banget produknya! 🔥", color: "bg-blue-500"},
        {user: "User 2", msg: "Harganya berapa kak?", color: "bg-brand"},
        {user: "User 3", msg: "Spill keranjang kuning!", color: "bg-green-500"},
    ]);
    
    useEffect(() => {
        if(!isLive) return;
        const interval = setInterval(() => {
            setViewers(v => v + Math.floor(Math.random() * 5) - 2);
            if(Math.random() > 0.7) {
                setChatMessages(prev => [...prev.slice(-4), {
                    user: `User ${Math.floor(Math.random()*100)}`,
                    msg: ["Wah murah banget", "Auto checkout!", "Restock dong kak", "Warnanya ada apa aja?"][Math.floor(Math.random()*4)],
                    color: ["bg-blue-500", "bg-brand", "bg-orange-500"][Math.floor(Math.random()*3)]
                }]);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [isLive]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-24 animate-in fade-in duration-500 h-full lg:h-[calc(100vh-140px)]">
            {/* Main Stream Area */}
            <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                <div id="live-preview" className="bg-black border border-white/10 rounded-2xl flex-1 relative overflow-hidden group shadow-2xl">
                    {/* Mock Video Feed */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
                        {isLive ? (
                             <div className="text-center animate-pulse">
                                <div className="w-32 h-32 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-brand shadow-[0_0_30px_rgba(12,116,235,0.4)]"><User size={64} className="text-brand"/></div>
                                <p className="text-brand font-bold">AI Avatar Broadcasting...</p>
                             </div>
                        ) : (
                            <div className="text-center opacity-50">
                                <MonitorPlay size={48} className="mx-auto mb-2 text-slate-500"/>
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
                        <Eye size={14} className="text-white"/>
                        <span className="text-xs font-bold text-white">{viewers}</span>
                    </div>}

                    {/* Product Pop-up Overlay */}
                    {isLive && (
                        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-xl flex gap-3 items-center max-w-xs animate-in slide-in-from-left shadow-xl">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center"><ShoppingBag className="text-black" size={20}/></div>
                            <div><p className="text-xs font-bold text-white">Paket Bundling Kopi</p><p className="text-xs text-yellow-400 font-bold">Rp 85.000 <span className="line-through text-slate-400 ml-1 font-normal">100rb</span></p></div>
                            <button className="bg-brand hover:bg-brand/80 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg ml-auto transition-colors shadow-lg">Buy</button>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 p-4 rounded-xl flex justify-between items-center shadow-lg transition-colors">
                    <div className="flex gap-4">
                        <button className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-colors relative"><Mic size={20}/><span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-slate-800"></span></button>
                        <button className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-colors"><Video size={20}/></button>
                        <button className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-colors"><Settings size={20}/></button>
                    </div>
                    <button onClick={()=>{setIsLive(!isLive); addNotification('success', isLive ? 'Stream Ended' : 'You are Live!');}} className={`px-8 py-3 rounded-lg font-bold transition-all shadow-lg ${isLive ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/20' : 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20'}`}>
                        {isLive ? 'End Stream' : 'Go Live'}
                    </button>
                </div>
            </div>

            {/* Sidebar: Chat & Products */}
            <div className="flex flex-col gap-4 h-full">
                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-lg transition-colors">
                    <div className="p-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50"><h4 className="text-xs font-bold text-slate-700 dark:text-white uppercase tracking-wider">Live Chat</h4></div>
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar">
                        {chatMessages.map((c, i) => (
                            <div key={i} className="flex gap-2 items-start animate-in slide-in-from-bottom-2">
                                <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white ${c.color}`}>{c.user.charAt(0)}</div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{c.user}</p>
                                    <p className="text-xs text-slate-800 dark:text-slate-200">{c.msg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 flex gap-2">
                        <input placeholder="Type as Host..." className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-none text-slate-800 dark:text-white text-xs rounded-lg px-3 py-2 flex-1 outline-none focus:ring-1 focus:ring-brand transition-all"/>
                        <button className="bg-brand hover:bg-brand/80 p-2 rounded-lg text-white transition-colors"><Send size={14}/></button>
                    </div>
                </div>

                <div id="live-products" className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 rounded-2xl h-1/3 flex flex-col overflow-hidden shadow-lg transition-colors">
                    <div className="p-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center"><h4 className="text-xs font-bold text-slate-700 dark:text-white uppercase tracking-wider">Pinned Products</h4><button className="text-[10px] text-brand dark:text-brand hover:text-brand/80 dark:hover:text-white transition-colors">+ Add</button></div>
                    <div className="p-3 overflow-y-auto space-y-2">
                         <div className="flex gap-3 bg-slate-100 dark:bg-slate-700/30 p-2 rounded-lg border border-brand/20 dark:border-brand/50 shadow-sm">
                            <div className="w-10 h-10 bg-white rounded flex items-center justify-center"><ShoppingBag size={16} className="text-black"/></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-slate-800 dark:text-white truncate">Paket Bundling</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">Rp 85.000</p>
                            </div>
                            <button className="text-brand dark:text-brand hover:text-brand/80 dark:hover:text-white transition-colors"><Cast size={16}/></button>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ViewKOL: React.FC<{ addNotification: (t: 'success'|'error', m: string) => void }> = ({ addNotification }) => {
    const [filters, setFilters] = useState({cat: 'All', price: 'All', search: ''});
    const filtered = MOCK_KOLS.filter(k => 
        (filters.cat === 'All' || k.category === filters.cat) &&
        (filters.price === 'All' || (filters.price === 'Micro' ? k.price < 500000 : k.price >= 500000)) &&
        k.name.toLowerCase().includes(filters.search.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-24 animate-in fade-in duration-500">
            <div className="flex justify-between items-center"><h2 className="text-2xl font-bold text-slate-800 dark:text-white">KOL Collaboration</h2><button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg font-bold text-sm flex gap-2 shadow-lg hover:shadow-yellow-600/20 transition-all transform hover:-translate-y-0.5"><Megaphone size={16}/> Kampanye Baru</button></div>
            
            {/* Filter Section */}
            <div id="kol-filter" className="bg-white dark:bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-slate-200 dark:border-white/10 flex flex-col md:flex-row gap-4 items-center shadow-lg transition-colors">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold"><Filter size={16}/> Filter:</div>
                <select onChange={e=>setFilters({...filters, cat:e.target.value})} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white text-sm rounded-lg px-3 py-2 focus:border-brand outline-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <option value="All">Semua Kategori</option>
                    <option value="F&B">F&B</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Technology">Technology</option>
                </select>
                <select onChange={e=>setFilters({...filters, price:e.target.value})} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white text-sm rounded-lg px-3 py-2 focus:border-brand outline-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <option value="All">Semua Harga</option>
                    <option value="Micro">Micro (&lt;500rb)</option>
                    <option value="Macro">Macro (&gt;500rb)</option>
                </select>
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" size={16}/>
                    <input onChange={e=>setFilters({...filters, search:e.target.value})} type="text" placeholder="Cari influencer..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white text-sm rounded-lg pl-9 pr-4 py-2 focus:border-brand outline-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"/>
                </div>
            </div>

            {/* KOL Cards */}
            <div id="kol-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(k => (
                    <div key={k.id} className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-white/10 p-5 rounded-2xl relative group hover:border-yellow-500/50 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:shadow-xl hover:-translate-y-1">
                        <div className="absolute top-4 right-4 text-yellow-500"><Star size={16}/></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-brand to-blue-600 rounded-full p-0.5 shadow-lg">
                                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-lg font-bold text-slate-800 dark:text-white uppercase">{k.name.substring(0,2)}</div>
                            </div>
                            <div>
                                <div className="flex items-center gap-1"><h4 className="text-slate-800 dark:text-white font-bold">{k.name}</h4>{k.verified && <ShieldCheck size={14} className="text-blue-500 dark:text-blue-400 fill-blue-500/20 dark:fill-blue-400/20"/>}</div>
                                <p className="text-xs text-brand dark:text-brand">{k.handle}</p>
                                <div className="flex gap-1 mt-1">{k.tags.map((t,i)=><span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-300">{t}</span>)}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-white/5">
                            <div className="text-center">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Followers</p>
                                <p className="text-slate-800 dark:text-white font-bold text-sm">{k.followers}</p>
                            </div>
                            <div className="text-center border-l border-slate-200 dark:border-white/10">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">ER</p>
                                <p className="text-green-600 dark:text-green-400 font-bold text-sm">{k.er}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div><p className="text-[10px] text-slate-500">Mulai dari</p><p className="text-slate-800 dark:text-white font-bold">Rp {k.price.toLocaleString()}</p></div>
                            <button onClick={()=>addNotification('success', 'Proposal terkirim!')} className="px-4 py-2 bg-brand hover:bg-brand/80 text-white text-xs font-bold rounded-lg transition-colors shadow-lg">Kontak</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ViewSubscription: React.FC<{ addNotification: (t: 'success'|'error', m: string) => void }> = ({ addNotification }) => {
  const [customFeatures, setCustomFeatures] = useState<Record<string, boolean>>({});
  const toggleFeature = (id: string) => setCustomFeatures(prev => ({ ...prev, [id]: !prev[id] }));
  const calculateTotal = () => ALACARTE_FEATURES.reduce((acc, f) => customFeatures[f.id] ? acc + f.price : acc, 0);
  const formatPrice = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-500">
      <div className="text-center max-w-3xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Pilih Paket Berlangganan</h2><p className="text-slate-500 dark:text-slate-400 text-sm">Mulai gratis atau buat paket custom sesuai kebutuhan bisnis Anda.</p></div>
      <div id="sub-plans" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">{PLANS.map((plan, idx) => (<div key={idx} className={`relative bg-white dark:bg-[#1a1b26]/50 border ${plan.color} rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/10 group shadow-sm`}>{plan.tag && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">{plan.tag}</div>}<div className="mb-6"><h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-brand dark:group-hover:text-brand transition-colors">{plan.name}</h3><div className="flex items-end gap-1"><span className="text-2xl font-bold text-slate-800 dark:text-white">{plan.price}</span><span className="text-xs text-slate-500 mb-1">{plan.period}</span></div></div><div className="flex-1 space-y-3 mb-8">{plan.features.map((f, i) => (<div key={i} className="flex gap-2 text-xs text-slate-600 dark:text-slate-300"><Check size={14} className="text-green-500 shrink-0"/>{f}</div>))}</div><button onClick={() => addNotification('success', `Paket ${plan.name} dipilih`)} className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg ${plan.highlight ? 'bg-brand hover:bg-brand/80 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>Pilih</button></div>))}</div>
      <div id="sub-calculator" className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-3 shadow-2xl transition-colors"><div className="lg:col-span-2 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10"><div className="flex items-center gap-3 mb-6"><div className="p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl"><Calculator size={24} /></div><div><h3 className="text-xl font-bold text-slate-800 dark:text-white">Metode A La Carte</h3><p className="text-slate-500 dark:text-slate-400 text-xs">Bayar fitur yang Anda butuhkan saja.</p></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{ALACARTE_FEATURES.map((feat) => (<div key={feat.id} onClick={() => toggleFeature(feat.id)} className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${customFeatures[feat.id] ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-lg' : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-800'}`}><div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${customFeatures[feat.id] ? 'bg-blue-500 border-blue-500' : 'border-slate-400 dark:border-slate-600'}`}>{customFeatures[feat.id] && <Check size={12} className="text-white"/>}</div><div><h4 className="text-sm font-bold text-slate-800 dark:text-white">{feat.name}</h4><span className="text-xs text-blue-600 dark:text-blue-400">{formatPrice(feat.price)}</span></div></div>))}</div></div><div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-900/80 flex flex-col justify-between h-full"><div><h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><ShoppingCart size={18}/> Ringkasan</h4><div className="space-y-2 mb-4">{Object.keys(customFeatures).length === 0 ? <p className="text-xs text-slate-500 italic text-center py-4">Belum ada fitur dipilih.</p> : ALACARTE_FEATURES.filter(f => customFeatures[f.id]).map(f => <div key={f.id} className="flex justify-between text-xs text-slate-600 dark:text-slate-300 animate-in slide-in-from-right"><span>{f.name}</span><span>{formatPrice(f.price)}</span></div>)}</div></div><div><div className="flex justify-between items-end mb-4"><span className="text-slate-500 dark:text-slate-400 text-sm">Total Bulanan</span><span className="text-2xl font-bold text-slate-800 dark:text-white">{formatPrice(calculateTotal())}</span></div><button disabled={calculateTotal()===0} onClick={()=>addNotification('success', 'Paket Custom aktif!')} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl disabled:opacity-50 transition-colors shadow-lg">Langganan Sekarang</button></div></div></div>
    </div>
  );
};

const ViewAnalytics = () => (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[{l:"Total Reach", v:"450K", c:"text-blue-600 dark:text-blue-400"}, {l:"Engagement", v:"12.5%", c:"text-brand dark:text-brand"}, {l:"Conversion", v:"3.2%", c:"text-green-600 dark:text-green-400"}].map((s,i) => (
                 <div key={i} className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors shadow-lg">
                     <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">{s.l}</p>
                     <h3 className={`text-3xl font-black ${s.c} mt-1`}>{s.v}</h3>
                     <div className="w-full bg-slate-100 dark:bg-slate-700/50 h-1 mt-4 rounded-full overflow-hidden"><div className={`h-full w-[70%] ${s.c.replace('text','bg')}`}></div></div>
                 </div>
             ))}
        </div>
        <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 p-6 rounded-2xl h-80 flex items-end gap-2 relative shadow-xl overflow-hidden transition-colors">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent pointer-events-none"></div>
             <h3 className="absolute top-6 left-6 font-bold text-slate-800 dark:text-white z-10 flex items-center gap-2"><BarChart3 size={18} className="text-brand dark:text-brand"/> Audience Growth</h3>
             {[40,60,35,80,65,90,70,100,85,95,75,60].map((h,i)=>(
                 <div key={i} className="flex-1 bg-gradient-to-t from-brand/50 to-blue-500/50 hover:to-blue-400 rounded-t-sm transition-all relative group" style={{height:`${h}%`}}>
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 shadow-md">{h}%</div>
                 </div>
             ))}
        </div>
    </div>
);

// ==========================================
// 4. MAIN APP PAGES (SPA)
// ==========================================

const LandingPage: React.FC<{ onLoginClick: () => void }> = ({ onLoginClick }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-darkbg text-slate-800 dark:text-white transition-colors duration-500">
             {/* Navbar */}
             <nav className="fixed w-full z-50 bg-white/80 dark:bg-[#05050A]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
                 <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-brand to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">P</div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">PLUS</span>
                     </div>
                     <div className="flex items-center gap-4">
                         <button onClick={onLoginClick} className="px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-white transition-colors">Masuk</button>
                         <button onClick={onLoginClick} className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-full hover:bg-brand dark:hover:bg-brand dark:hover:text-white transition-all shadow-lg transform hover:-translate-y-0.5">Mulai Gratis</button>
                     </div>
                 </div>
             </nav>

             {/* Hero Section */}
             <section className="relative pt-40 pb-20 overflow-hidden">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand/20 rounded-full blur-[120px] pointer-events-none"></div>
                 <div className="container mx-auto px-6 text-center relative z-10">
                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-brand/30 border border-brand/20 dark:border-brand/30 text-brand dark:text-brand text-xs font-bold mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
                         <Sparkles size={14} /> <span>AI Marketing Assistant #1 untuk UMKM</span>
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                         Marketing Viral <br/>
                         <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand via-blue-600 to-sky-600">Dalam Sekejap.</span>
                     </h1>
                     <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                         PLUS menggunakan AI canggih untuk membuat konten, desain visual, dan strategi pemasaran yang terukur. Tanpa perlu skill desain atau copywriting.
                     </p>
                     <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
                         <button onClick={onLoginClick} className="px-8 py-4 bg-gradient-to-r from-brand to-blue-600 text-white font-bold rounded-full text-lg shadow-xl shadow-brand/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                             Coba Sekarang <Rocket size={20}/>
                         </button>
                         <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-bold rounded-full text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                             <PlayCircle size={20}/> Tonton Demo
                         </button>
                     </div>
                 </div>
             </section>

             {/* Features Grid */}
             <section className="py-20 bg-white dark:bg-[#0B0C15] border-t border-slate-200 dark:border-white/5">
                 <div className="container mx-auto px-6">
                     <div className="text-center mb-16">
                         <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Fitur Super Power</h2>
                         <p className="text-slate-500 dark:text-slate-400">Semua yang Anda butuhkan untuk mendominasi pasar.</p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {[
                             { icon: Calendar, title: "Content Planner", desc: "Buat jadwal konten sebulan penuh dalam 1 klik dengan strategi AI." },
                             { icon: Wand2, title: "Visual Generator", desc: "Hasilkan gambar produk profesional tanpa fotografer mahal." },
                             { icon: Target, title: "Viral Strategy", desc: "Analisis tren dan optimalkan caption agar konten masuk FYP." },
                             { icon: Megaphone, title: "KOL Marketplace", desc: "Temukan influencer yang tepat sesuai budget dan target pasar." },
                             { icon: Video, title: "Live Studio", desc: "Avatar AI yang bisa melakukan live streaming 24 jam non-stop." },
                             { icon: BarChart3, title: "Smart Analytics", desc: "Pantau performa kampanye dengan insight yang mudah dipahami." }
                         ].map((f, i) => (
                             <div key={i} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-brand/50 transition-all hover:-translate-y-2 group">
                                 <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                     <f.icon size={28} className="text-brand dark:text-brand" />
                                 </div>
                                 <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">{f.title}</h3>
                                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{f.desc}</p>
                             </div>
                         ))}
                     </div>
                 </div>
             </section>

             {/* Social Proof */}
             <section className="py-20 border-t border-slate-200 dark:border-white/5">
                 <div className="container mx-auto px-6 text-center">
                     <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Dipercaya oleh 5,000+ UMKM Indonesia</p>
                     <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                         {/* Placeholder Logos */}
                         {['Kopi Kenangan', 'Erigo', 'Bittersweet', 'Brodo', 'Somethinc'].map((brand, i) => (
                             <span key={i} className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">{brand}</span>
                         ))}
                     </div>
                 </div>
             </section>

             {/* Footer */}
             <footer className="py-10 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#05050A]">
                 <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                     <p className="text-sm text-slate-500">© 2024 PLUS AI Studio. All rights reserved.</p>
                     <div className="flex gap-6">
                         <a href="#" className="text-sm text-slate-500 hover:text-brand transition-colors">Privacy Policy</a>
                         <a href="#" className="text-sm text-slate-500 hover:text-brand transition-colors">Terms of Service</a>
                         <a href="#" className="text-sm text-slate-500 hover:text-brand transition-colors">Contact</a>
                     </div>
                 </div>
             </footer>
        </div>
    );
};

const LoginPage: React.FC<{ onLoginSuccess: () => void, onBack: () => void }> = ({ onLoginSuccess, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API Call
        setTimeout(() => {
            setLoading(false);
            onLoginSuccess();
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-darkbg flex items-center justify-center p-4 relative overflow-hidden">
             {/* Background Elements */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                 <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[100px]"></div>
                 <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]"></div>
             </div>

             <button onClick={onBack} className="absolute top-8 left-8 p-2 rounded-full bg-white dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 z-20">
                 <ArrowRight className="rotate-180" size={24}/>
             </button>

             <div className="bg-white/80 dark:bg-surface/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md relative z-10 animate-in zoom-in-95 duration-500">
                 <div className="text-center mb-8">
                     <div className="w-16 h-16 bg-gradient-to-tr from-brand to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg mx-auto mb-4">P</div>
                     <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome Back</h2>
                     <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Masuk untuk melanjutkan kampanye Anda.</p>
                 </div>

                 <form onSubmit={handleLogin} className="space-y-4">
                     <div>
                         <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
                         <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"/>
                     </div>
                     <div>
                         <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Password</label>
                         <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"/>
                     </div>
                     
                     <div className="flex justify-between items-center text-xs">
                         <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                             <input type="checkbox" className="rounded border-slate-300 text-brand focus:ring-brand"/> Remember me
                         </label>
                         <a href="#" className="text-brand hover:text-brand/80 font-bold">Lupa Password?</a>
                     </div>

                     <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-brand to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-brand/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                         {loading ? <Loader2 className="animate-spin" size={20}/> : "Sign In"}
                     </button>
                 </form>

                 <div className="my-8 flex items-center gap-4">
                     <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
                     <span className="text-xs text-slate-400 font-medium">ATAU</span>
                     <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
                 </div>

                 <div className="space-y-3">
                     <button className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-3">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google"/>
                        Masuk dengan Google
                     </button>
                 </div>

                 <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-8">
                     Belum punya akun? <a href="#" className="text-brand font-bold hover:underline">Daftar Sekarang</a>
                 </p>
             </div>
        </div>
    );
};

// --- MAIN DASHBOARD VIEW (Previously HypeItApp) ---
// This component now only handles the authenticated state view
const DashboardView: React.FC<{ onLogout: () => void, toggleTheme: () => void, theme: 'light'|'dark' }> = ({ onLogout, toggleTheme, theme }) => {
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

  const addNotification = (type: 'success'|'error'|'info', message: string) => {
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
      case 'planner': return <ViewPlanner onAutoFill={()=>{}} {...props} />;
      case 'generator': return <ViewGenerator {...props} />;
      case 'strategy': return <ViewStrategy {...props} />;
      case 'livestream': return <ViewLiveStream {...props} />;
      case 'analytics': return <ViewAnalytics />;
      case 'kol': return <ViewKOL {...props} />;
      case 'subscription': return <ViewSubscription {...props} />; 
      default: return <ViewPlanner onAutoFill={()=>{}} {...props} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-darkbg text-slate-800 dark:text-slate-200 font-sans overflow-hidden selection:bg-brand selection:text-white relative transition-colors duration-300">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand/10 dark:bg-brand/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <ToastContainer notifications={notifications} />
      <InteractiveTour steps={TOUR_STEPS[activeTab]} isActive={isTourActive} onComplete={() => setIsTourActive(false)} />
      <DocumentationModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} initialTab={docsInitialTab} onStartTour={handleStartTour} />

      {/* Floating Knowledge Dock */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
          {isFloatingDockOpen && (
            <div className="flex flex-col gap-2 mb-2 animate-in slide-in-from-bottom-4">
                <button onClick={() => openDocs('user-guide')} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg text-xs font-bold transition-all hover:scale-105"><LifeBuoy size={16}/> Panduan</button>
                <button onClick={() => openDocs('flowchart')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg text-xs font-bold transition-all hover:scale-105"><GitBranch size={16}/> Flowchart</button>
                <button onClick={() => openDocs('uml')} className="flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand/80 text-white rounded-full shadow-lg text-xs font-bold transition-all hover:scale-105"><Code size={16}/> Technical</button>
            </div>
          )}
          <button onClick={() => setIsFloatingDockOpen(!isFloatingDockOpen)} className={`w-14 h-14 rounded-full shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center justify-center transition-all hover:scale-110 ${isFloatingDockOpen ? 'bg-slate-700 rotate-45 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'}`}><BookOpen size={24} /></button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (<div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />)}

      {/* Sidebar */}
      <div className={`fixed md:static inset-y-0 left-0 w-72 bg-white/90 dark:bg-surface/90 backdrop-blur-2xl border-r border-slate-200 dark:border-white/5 flex flex-col p-4 z-50 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} shadow-2xl`}>
        <div className="flex items-center justify-between px-2 mb-10 mt-2">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-brand via-blue-600 to-sky-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand/20">P</div>
              <div><span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 block leading-tight">PLUS</span><span className="text-[10px] text-brand dark:text-brand font-medium tracking-widest">PRO STUDIO</span></div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-500 dark:text-slate-400"><X size={24} /></button>
        </div>
        
        <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-2 mt-2">Core Tools</p>
          <SidebarItem icon={Calendar} label="AI Planner" active={activeTab === 'planner'} onClick={() => handleTabChange('planner')} />
          <SidebarItem icon={Wand2} label="Visual Generator" active={activeTab === 'generator'} onClick={() => handleTabChange('generator')} />
          <SidebarItem icon={Target} label="Viral Strategy" active={activeTab === 'strategy'} onClick={() => handleTabChange('strategy')} />
          
          <p className="px-4 text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-2 mt-6">Growth</p>
          <SidebarItem icon={Video} label="Live Studio" active={activeTab === 'livestream'} onClick={() => handleTabChange('livestream')} />
          <SidebarItem icon={BarChart3} label="Analytics" active={activeTab === 'analytics'} onClick={() => handleTabChange('analytics')} />
          <SidebarItem icon={Megaphone} label="KOL Marketplace" active={activeTab === 'kol'} onClick={() => handleTabChange('kol')} />
          
          <p className="px-4 text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-2 mt-6">Billing</p>
          <SidebarItem icon={CreditCard} label="Subscription" active={activeTab === 'subscription'} onClick={() => handleTabChange('subscription')} />
        </div>

        <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5 space-y-3">
            <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-white/5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden border-2 border-brand"><User className="w-full h-full p-1 text-slate-500 dark:text-slate-300"/></div>
                <div className="flex-1 min-w-0"><p className="text-sm font-bold text-slate-800 dark:text-white truncate">UMKM Maju</p><p className="text-[10px] text-green-600 dark:text-green-400 font-medium">Pro Plan Active</p></div>
                <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white"><Settings size={18}/></button>
            </div>
            
            {/* Logout Button */}
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <LogOut size={20}/>
                <span className="text-sm font-bold">Logout</span>
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative w-full overflow-hidden z-10">
        <header className="h-20 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#05050A]/80 backdrop-blur-md flex items-center justify-between px-6 md:px-10 sticky top-0 z-20 transition-colors">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"><Menu size={24} /></button>
                <div>
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white capitalize">{activeTab === 'livestream' ? 'Live Studio' : activeTab.replace('-', ' ')}</h1>
                    <p className="text-xs text-slate-500 hidden md:block">Real-time AI Dashboard</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">System Operational</span>
                </div>
                
                {/* Dark Mode Toggle */}
                <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors" title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white relative bg-slate-100 dark:bg-white/5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"><Bell size={20}/><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span></button>
            </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

// --- APP ROUTER ORCHESTRATOR ---
const App = () => {
    const [view, setView] = useState<'landing' | 'login' | 'dashboard'>('landing');
    
    // Theme State Lifted Up to control Global Theme
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as 'light'|'dark') || 'dark';
        }
        return 'dark';
    });
  
    useEffect(() => {
      const root = window.document.documentElement;
      if (theme === 'dark') {
          root.classList.add('dark');
      } else {
          root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    // Routing Logic
    const goToLogin = () => setView('login');
    const goToDashboard = () => setView('dashboard');
    const goToLanding = () => setView('landing');

    return (
        <>
            {view === 'landing' && <LandingPage onLoginClick={goToLogin} />}
            {view === 'login' && <LoginPage onLoginSuccess={goToDashboard} onBack={goToLanding} />}
            {view === 'dashboard' && <DashboardView onLogout={goToLanding} toggleTheme={toggleTheme} theme={theme} />}
        </>
    );
};

export default App;