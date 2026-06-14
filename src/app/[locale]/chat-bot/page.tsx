"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/i18n/I18nProvider";

/* ─────────────────────── DATA (bilingual) ─────────────────────── */

const capIcons = ["🧠", "🎨", "📊", "🎙️", "👥", "⚡"] as const;
const capColors = ["primary", "secondary", "tertiary", "primary", "secondary", "tertiary"] as const;
const chatMeta = [
    { role: "bot" as const, delay: 0 },
    { role: "user" as const, delay: 1200 },
    { role: "bot" as const, delay: 2800 },
    { role: "user" as const, delay: 5000 },
    { role: "bot" as const, delay: 6500 },
];
const planMeta = [
    { name: "Starter", price: "$25", period: "/month", highlight: false },
    { name: "Premium", price: "$50", period: "/month", highlight: true },
];
const tmMeta = [
    { name: "Mary Jones", avatar: "MJ" },
    { name: "Andrew Walker", avatar: "AW" },
    { name: "Kate Doe", avatar: "KD" },
];

type Copy = {
    hero: { badge: string; titleA: string; titleB: string; desc: string; studio: string; pills: string[]; ctaTry: string; ctaView: string; trust: string; assistant: string; status: string; placeholder: string };
    caps: { tag: string; titleA: string; titleB: string; subtitle: string; learnMore: string; items: { title: string; desc: string }[] };
    chat: string[];
    pricing: { tag: string; title: string; subtitle: string; mostPopular: string; choose: string; teamStat: React.ReactNode; plans: { features: string[] }[] };
    testimonials: { tag: string; title: string; items: { quote: string; role: string }[] };
    faq: { tag: string; title: string; items: { q: string; a: string }[] };
    cta: { tag: string; titleA: string; titleB: string; subtitle: string; launch: string; back: string };
};

const COPY: Record<"en" | "id", Copy> = {
    en: {
        hero: {
            badge: "AI-Powered Chat Bot",
            titleA: "Simplify Your Life",
            titleB: "With Our Chatbot",
            desc: "Your Smartest AI Chatbot — Always Ready to Assist! Experience seamless conversations, instant answers, and 24/7 support. Powered by cutting-edge AI from the",
            studio: "plus. AI Marketing Studio",
            pills: ["AI Content Planner", "Image Generator", "KOL Finder", "Live Ops"],
            ctaTry: "Try AI Studio",
            ctaView: "View Capabilities",
            trust: "Trusted by 120+ professionals",
            assistant: "plus. AI Assistant",
            status: "Online — Always ready",
            placeholder: "Type your message...",
        },
        caps: {
            tag: "Capabilities",
            titleA: "Your Virtual Agent for",
            titleB: "Smarter Interactions",
            subtitle: "We harness the power of AI and collaboration to deliver tailored marketing solutions that drive success for MSMEs.",
            learnMore: "Learn more →",
            items: [
                { title: "AI Content Planner", desc: "Generate smart content calendars with AI-driven suggestions tailored to your brand and audience." },
                { title: "Visual Generator", desc: "Create stunning marketing visuals, banners, and social media assets with AI image generation." },
                { title: "Strategy Analyzer", desc: "Analyze viral potential, predict engagement, and optimize your content strategy in real-time." },
                { title: "Live Stream Tools", desc: "AI-powered live streaming assistant with auto-captions, real-time analytics, and audience engagement." },
                { title: "KOL Database", desc: "Find verified influencers with engagement rates, pricing, and audience demographics at your fingertips." },
                { title: "AI Voice Assistant", desc: "Hands-free marketing automation — dictate briefs, get AI suggestions, and manage campaigns by voice." },
            ],
        },
        chat: [
            "Hi! 👋 I'm plus. AI assistant. How can I help your business today?",
            "I need a content plan for my coffee shop's Instagram",
            "Great! I'll create a 7-day content calendar for your coffee shop. Here's what I suggest:\n\n📅 Mon: Behind-the-scenes brewing\n📅 Tue: Customer testimonial repost\n📅 Wed: Tips & tricks (latte art)\n📅 Thu: New menu highlight\n📅 Fri: Weekend promo teaser\n📅 Sat: User-generated content\n📅 Sun: Relaxing vibes reel",
            "That's perfect! Can you also generate a visual for Monday's post?",
            "Absolutely! 🎨 I'm generating a warm, aesthetic behind-the-scenes visual with your brand colors... Done! You can download it from the Visual Generator tab.",
        ],
        pricing: {
            tag: "Flexible Pricing",
            title: "Pick the Perfect Plan for Your Team",
            subtitle: "Customized pricing solutions crafted to deliver value while ensuring satisfaction.",
            mostPopular: "Most Popular",
            choose: "Choose Plan",
            teamStat: <>We are a team of <strong className="text-slate-900 dark:text-white">120+ dedicated professionals</strong> united by vision.</>,
            plans: [
                { features: ["1,000 AI messages/month", "Basic content planner", "5 image generations/day", "Email support"] },
                { features: ["Unlimited AI messages", "Advanced content planner", "Unlimited image generation", "KOL database access", "Live stream tools", "Priority support 24/7"] },
            ],
        },
        testimonials: {
            tag: "Testimonials",
            title: "What Our Clients Say",
            items: [
                { quote: "Collaborating with plus. was an exceptional journey. They truly grasped our goals and produced a solution that aligned perfectly with our vision.", role: "CEO, Laketown OH" },
                { quote: "Working with plus. was a game changer. Their team crafted a platform that's both beautiful and intuitive, elevating our user engagement.", role: "CTO, ITactics CA" },
                { quote: "Their expertise in blending technology with design truly impressed me. The platform transformed our digital engagement completely.", role: "CMO, Los Angeles CA" },
            ],
        },
        faq: {
            tag: "Need Assistance?",
            title: "Frequently Asked Questions",
            items: [
                { q: "What are the first steps?", a: "Simply sign up, connect your social accounts, and our AI will analyze your brand to provide tailored content suggestions within minutes." },
                { q: "Do you offer virtual consultations?", a: "Yes! Our AI assistant provides 24/7 virtual consultations. Premium users also get access to human marketing experts for strategy sessions." },
                { q: "What industries do you specialize in?", a: "We serve MSMEs across F&B, fashion, beauty, tech, travel, and more. Our AI adapts to any industry's unique marketing needs." },
                { q: "Do you collaborate with startups?", a: "Absolutely! We specialize in empowering startups with tailored AI solutions that drive growth and efficiency. Our Starter plan is perfect for new ventures." },
            ],
        },
        cta: {
            tag: "Get Started",
            titleA: "Ready to Transform Your",
            titleB: "Marketing with AI?",
            subtitle: "Join 120+ businesses already using plus. AI Marketing Studio to grow their brand faster and smarter.",
            launch: "Launch AI Studio",
            back: "Back to Home",
        },
    },
    id: {
        hero: {
            badge: "Chatbot AI Bertenaga AI",
            titleA: "Permudah Hidup Anda",
            titleB: "Dengan Chatbot Kami",
            desc: "Chatbot AI tercerdas Anda — selalu siap membantu! Rasakan percakapan mulus, jawaban instan, dan dukungan 24/7. Didukung AI mutakhir dari",
            studio: "plus. AI Marketing Studio",
            pills: ["AI Content Planner", "Image Generator", "Pencari KOL", "Live Ops"],
            ctaTry: "Coba AI Studio",
            ctaView: "Lihat Kemampuan",
            trust: "Dipercaya 120+ profesional",
            assistant: "Asisten AI plus.",
            status: "Online — Selalu siap",
            placeholder: "Ketik pesan Anda...",
        },
        caps: {
            tag: "Kemampuan",
            titleA: "Agen Virtual Anda untuk",
            titleB: "Interaksi yang Lebih Cerdas",
            subtitle: "Kami memanfaatkan kekuatan AI dan kolaborasi untuk menghadirkan solusi marketing yang disesuaikan demi kesuksesan UKM.",
            learnMore: "Selengkapnya →",
            items: [
                { title: "AI Content Planner", desc: "Buat kalender konten cerdas dengan saran berbasis AI yang disesuaikan dengan brand dan audiens Anda." },
                { title: "Visual Generator", desc: "Ciptakan visual marketing, banner, dan aset media sosial yang memukau dengan AI image generation." },
                { title: "Strategy Analyzer", desc: "Analisis potensi viral, prediksi engagement, dan optimalkan strategi konten Anda secara real-time." },
                { title: "Live Stream Tools", desc: "Asisten live streaming bertenaga AI dengan auto-caption, analitik real-time, dan engagement audiens." },
                { title: "Database KOL", desc: "Temukan influencer terverifikasi lengkap dengan engagement rate, harga, dan demografi audiens dalam genggaman." },
                { title: "AI Voice Assistant", desc: "Otomasi marketing hands-free — diktekan brief, dapatkan saran AI, dan kelola kampanye dengan suara." },
            ],
        },
        chat: [
            "Hai! 👋 Saya asisten AI plus. Ada yang bisa saya bantu untuk bisnis Anda hari ini?",
            "Saya butuh rencana konten untuk Instagram kedai kopi saya",
            "Bagus! Saya akan membuat kalender konten 7 hari untuk kedai kopi Anda. Berikut saran saya:\n\n📅 Sen: Behind-the-scenes proses seduh\n📅 Sel: Repost testimoni pelanggan\n📅 Rab: Tips & trik (latte art)\n📅 Kam: Highlight menu baru\n📅 Jum: Teaser promo akhir pekan\n📅 Sab: Konten dari pengguna\n📅 Min: Reel suasana santai",
            "Sempurna! Bisa juga buatkan visual untuk postingan hari Senin?",
            "Tentu! 🎨 Saya sedang membuat visual behind-the-scenes yang hangat dan estetik dengan warna brand Anda... Selesai! Anda bisa mengunduhnya dari tab Visual Generator.",
        ],
        pricing: {
            tag: "Harga Fleksibel",
            title: "Pilih Paket yang Tepat untuk Tim Anda",
            subtitle: "Solusi harga yang disesuaikan untuk memberi nilai sekaligus memastikan kepuasan Anda.",
            mostPopular: "Paling Populer",
            choose: "Pilih Paket",
            teamStat: <>Kami adalah tim beranggotakan <strong className="text-slate-900 dark:text-white">120+ profesional berdedikasi</strong> yang bersatu dalam satu visi.</>,
            plans: [
                { features: ["1.000 pesan AI/bulan", "Content planner dasar", "5 generasi gambar/hari", "Dukungan email"] },
                { features: ["Pesan AI tanpa batas", "Content planner lanjutan", "Generasi gambar tanpa batas", "Akses database KOL", "Tools live stream", "Dukungan prioritas 24/7"] },
            ],
        },
        testimonials: {
            tag: "Testimoni",
            title: "Apa Kata Klien Kami",
            items: [
                { quote: "Berkolaborasi dengan plus. adalah perjalanan yang luar biasa. Mereka benar-benar memahami tujuan kami dan menghasilkan solusi yang selaras sempurna dengan visi kami.", role: "CEO, Laketown OH" },
                { quote: "Bekerja dengan plus. mengubah segalanya. Tim mereka merancang platform yang indah sekaligus intuitif, meningkatkan engagement pengguna kami.", role: "CTO, ITactics CA" },
                { quote: "Keahlian mereka memadukan teknologi dengan desain sungguh mengesankan. Platform ini benar-benar mengubah engagement digital kami.", role: "CMO, Los Angeles CA" },
            ],
        },
        faq: {
            tag: "Butuh Bantuan?",
            title: "Pertanyaan yang Sering Diajukan",
            items: [
                { q: "Apa langkah pertamanya?", a: "Cukup daftar, hubungkan akun media sosial Anda, dan AI kami akan menganalisis brand Anda untuk memberikan saran konten yang disesuaikan dalam hitungan menit." },
                { q: "Apakah ada konsultasi virtual?", a: "Ya! Asisten AI kami menyediakan konsultasi virtual 24/7. Pengguna Premium juga mendapat akses ke pakar marketing manusia untuk sesi strategi." },
                { q: "Industri apa yang menjadi spesialisasi Anda?", a: "Kami melayani UKM di bidang F&B, fashion, kecantikan, teknologi, travel, dan lainnya. AI kami beradaptasi dengan kebutuhan marketing unik setiap industri." },
                { q: "Apakah Anda bekerja sama dengan startup?", a: "Tentu saja! Kami mengkhususkan diri memberdayakan startup dengan solusi AI yang mendorong pertumbuhan dan efisiensi. Paket Starter kami sempurna untuk usaha baru." },
            ],
        },
        cta: {
            tag: "Mulai Sekarang",
            titleA: "Siap Mengubah",
            titleB: "Marketing Anda dengan AI?",
            subtitle: "Bergabunglah dengan 120+ bisnis yang sudah menggunakan plus. AI Marketing Studio untuk menumbuhkan brand mereka lebih cepat dan cerdas.",
            launch: "Luncurkan AI Studio",
            back: "Kembali ke Beranda",
        },
    },
};

const colorMap = {
    primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", glow: "group-hover:shadow-primary/10" },
    secondary: { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary/20", glow: "group-hover:shadow-secondary/10" },
    tertiary: { bg: "bg-tertiary/10", text: "text-tertiary", border: "border-tertiary/20", glow: "group-hover:shadow-tertiary/10" },
};

/* ─────────────────────── COMPONENTS ─────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChatDemo({ p }: { p: any }) {
    const [visibleMessages, setVisibleMessages] = useState<number>(0);
    const messagesRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const c = COPY[locale];

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];
        chatMeta.forEach((msg, i) => {
            timers.push(
                setTimeout(() => setVisibleMessages((prev) => Math.max(prev, i + 1)), msg.delay)
            );
        });
        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        // Scroll only the chat container — never the whole page
        const el = messagesRef.current;
        if (el) {
            el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        }
    }, [visibleMessages]);

    return (
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-5 py-4">
                <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold">AI</div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{c.hero.assistant}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{c.hero.status}</p>
                </div>
                <div className="ml-auto flex gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /></div>
            </div>

            {/* Messages */}
            <div ref={messagesRef} className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950/50">
                {c.chat.slice(0, visibleMessages).map((text, i) => (
                    <div
                        key={i}
                        className={`flex ${chatMeta[i].role === "user" ? "justify-end" : "justify-start"}`}
                        style={{
                            animation: "fadeSlideUp 0.3s ease-out forwards",
                        }}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${chatMeta[i].role === "user"
                                ? "bg-blue-600 text-white rounded-br-md"
                                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-md"
                                }`}
                        >
                            {text}
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {visibleMessages < c.chat.length && visibleMessages > 0 && (
                    <div className="flex justify-start">
                        <div className="flex gap-1 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-bl-md">
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                )}
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-2">
                    <input
                        type="text"
                        placeholder={c.hero.placeholder}
                        className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none"
                        readOnly
                    />
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-transform hover:scale-110">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────── SECTIONS ─────────────────────── */

function HeroSection() {
    const locale = useLocale();
    const c = COPY[locale];
    return (
        <section className="relative min-h-screen overflow-hidden flex items-center">
            {/* Background */}
            <div className="absolute inset-0 bg-background">
                {/* Animated gradient mesh */}
                <div className="absolute inset-0 opacity-30"
                    style={{
                        background: "radial-gradient(ellipse at 20% 50%, rgba(79,110,247,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(124,92,252,0.12) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(16,185,129,0.08) 0%, transparent 50%)",
                    }}
                />
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                    {/* Left: content */}
                    <div>
                        <div className="hero-animate inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                                {c.hero.badge}
                            </span>
                        </div>

                        <h1 className="hero-animate hero-animate-delay-1 mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-5xl lg:text-6xl">
                            {c.hero.titleA}
                            <br />
                            <span className="gradient-text">{c.hero.titleB}</span>
                        </h1>

                        <p className="hero-animate hero-animate-delay-2 mt-5 max-w-lg text-base leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                            {c.hero.desc}{" "}
                            <Link
                                href={`/${locale}/studio`}
                                className="font-semibold text-primary hover:underline"
                            >
                                {c.hero.studio}
                            </Link>.
                        </p>

                        {/* Feature pills */}
                        <div className="hero-animate hero-animate-delay-2 mt-6 flex flex-wrap gap-2">
                            {c.hero.pills.map((f) => (
                                <span key={f} className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                                    {f}
                                </span>
                            ))}
                        </div>

                        <div className="hero-animate hero-animate-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={`/${locale}/studio`}
                                className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 hover:shadow-2xl"
                            >
                                <span>🚀</span>
                                {c.hero.ctaTry}
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <a
                                href="#capabilities"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-8 py-3.5 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105"
                            >
                                {c.hero.ctaView}
                            </a>
                        </div>

                        {/* Trust badge */}
                        <div className="hero-animate hero-animate-delay-3 mt-6 flex items-center gap-3 text-sm text-[#64748B] dark:text-[#94A3B8]">
                            <div className="flex -space-x-2">
                                {["bg-primary", "bg-secondary", "bg-tertiary", "bg-primary-dark"].map((bg, i) => (
                                    <div key={i} className={`h-7 w-7 rounded-full ${bg} border-2 border-white dark:border-slate-950 flex items-center justify-center text-[10px] font-bold text-white`}>
                                        {["MJ", "AW", "KD", "EC"][i]}
                                    </div>
                                ))}
                            </div>
                            <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">{c.hero.trust}</span>
                        </div>
                    </div>

                    {/* Right: live chat demo */}
                    <div className="hero-animate hero-animate-delay-2 relative">
                        {/* Glow behind */}
                        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-tertiary/10 blur-2xl" />
                        <div className="relative">
                            <ChatDemo />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CapabilitiesSection() {
    const ref = useScrollReveal();
    const c = COPY[useLocale()];

    return (
        <section id="capabilities" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/[0.2]">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                        <span>⚡</span> {c.caps.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                        {c.caps.titleA}
                        <br />
                        <span className="gradient-text">{c.caps.titleB}</span>
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-xl text-base text-slate-600 dark:text-slate-400">
                        {c.caps.subtitle}
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {c.caps.items.map((item, i) => {
                        const colors = colorMap[capColors[i]];
                        return (
                            <div
                                key={i}
                                className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${colors.glow}`}
                            >
                                <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-all group-hover:bg-blue-500/10 group-hover:scale-150" />
                                <div className="relative z-10">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} text-2xl`}>
                                        {capIcons[i]}
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
                                    <div className={`mt-4 text-xs font-semibold ${colors.text} opacity-0 transition-opacity group-hover:opacity-100`}>
                                        {c.caps.learnMore}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function PricingSection() {
    const ref = useScrollReveal();
    const locale = useLocale();
    const c = COPY[locale];

    return (
        <section id="pricing-plans" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
            <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        {c.pricing.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        {c.pricing.title}
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-lg text-base text-slate-600 dark:text-slate-400">
                        {c.pricing.subtitle}
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-14 grid gap-8 sm:grid-cols-2">
                    {c.pricing.plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${planMeta[i].highlight
                                ? "border-blue-500 bg-white dark:bg-slate-900 shadow-blue-500/10 scale-[1.02]"
                                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                                }`}
                        >
                            {planMeta[i].highlight && (
                                <span className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                    {c.pricing.mostPopular}
                                </span>
                            )}

                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{planMeta[i].name}</p>
                            <div className="mt-3 flex items-baseline gap-1">
                                <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{planMeta[i].price}</span>
                                <span className="text-base text-slate-500 dark:text-slate-400">{planMeta[i].period}</span>
                            </div>

                            <ul className="mt-8 space-y-3">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <svg className={`h-4 w-4 shrink-0 ${planMeta[i].highlight ? "text-blue-500" : "text-emerald-500"}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/${locale}#pricing`}
                                className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all hover:scale-105 ${planMeta[i].highlight
                                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
                                    : "border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                                    }`}
                            >
                                {c.pricing.choose}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Team stat */}
                <p className="fade-up mt-10 text-center text-sm text-slate-500">
                    {c.pricing.teamStat}
                </p>
            </div>
        </section>
    );
}

function TestimonialsSection() {
    const ref = useScrollReveal();
    const c = COPY[useLocale()];

    return (
        <section className="py-24 lg:py-32 bg-slate-50 dark:bg-[#0B1120]">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-flex items-center gap-2 rounded-full bg-tertiary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tertiary">
                        <span>💬</span> {c.testimonials.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
                        {c.testimonials.title}
                    </h2>
                </div>

                <div className="fade-up fade-up-delay-2 mt-14 grid gap-8 sm:grid-cols-3">
                    {c.testimonials.items.map((t, i) => (
                        <div
                            key={i}
                            className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <svg className="h-8 w-8 text-primary/15 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className="text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1] italic">&ldquo;{t.quote}&rdquo;</p>
                            <div className="mt-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                                    {tmMeta[i].avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{tmMeta[i].name}</p>
                                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQSection() {
    const ref = useScrollReveal();
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    const c = COPY[useLocale()];

    return (
        <section className="py-24 lg:py-32 bg-white dark:bg-slate-950">
            <div ref={ref} className="mx-auto max-w-3xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        {c.faq.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
                        {c.faq.title}
                    </h2>
                </div>

                <div className="fade-up fade-up-delay-2 mt-14 space-y-3">
                    {c.faq.items.map((faq, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 transition-all hover:border-blue-500/20"
                        >
                            <button
                                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                                className="flex w-full items-center justify-between px-6 py-5 text-left"
                            >
                                <span className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] pr-4">{faq.q}</span>
                                <svg
                                    className={`h-4 w-4 shrink-0 text-[#94A3B8] dark:text-[#64748B] transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                                <p className="px-6 pb-5 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTASection() {
    const ref = useScrollReveal();
    const locale = useLocale();
    const c = COPY[locale];

    return (
        <section className="py-24 lg:py-32 bg-slate-50 dark:bg-[#0B1120]">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="fade-up relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center sm:p-16">
                    {/* Decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                    <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-secondary/6 blur-3xl" />

                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 rounded-full bg-tertiary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tertiary">
                            <span>🚀</span> {c.cta.tag}
                        </span>
                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
                            {c.cta.titleA}
                            <br />
                            <span className="gradient-text">{c.cta.titleB}</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-lg text-base text-[#475569] dark:text-[#CBD5E1]">
                            {c.cta.subtitle}
                        </p>

                        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href={`/${locale}/studio`}
                                className="btn-glow inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 hover:shadow-2xl"
                            >
                                {c.cta.launch}
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                href={`/${locale}`}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-8 py-3.5 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105"
                            >
                                {c.cta.back}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function ChatBotPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t: any = useTranslation();
    const p = t.chatBotPage;
    const capsRef = useScrollReveal();
    const priceRef = useScrollReveal();
    const testRef = useScrollReveal();
    const faqRef = useScrollReveal();
    const ctaRef = useScrollReveal();
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <>
            <Navbar />
            <main>
                {/* ── Hero ── */}
                <section className="relative min-h-screen overflow-hidden flex items-center">
                    <div className="absolute inset-0 bg-background">
                        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(79,110,247,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(124,92,252,0.12) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(16,185,129,0.08) 0%, transparent 50%)" }} />
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                    </div>
                    <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                            <div>
                                <div className="hero-animate inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                    <span className="text-xs font-semibold tracking-wider text-primary uppercase">{p.heroBadge}</span>
                                </div>
                                <h1 className="hero-animate hero-animate-delay-1 mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-5xl lg:text-6xl">
                                    {p.heroHeading1}<br /><span className="gradient-text">{p.heroHeading2}</span>
                                </h1>
                                <p className="hero-animate hero-animate-delay-2 mt-5 max-w-lg text-base leading-relaxed text-[#475569] dark:text-[#CBD5E1]">{p.heroDesc}</p>
                                <div className="hero-animate hero-animate-delay-2 mt-6 flex flex-wrap gap-2">
                                    {["AI Content Planner", "Image Generator", "KOL Finder", "Live Ops"].map((f) => (
                                        <span key={f} className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">{f}</span>
                                    ))}
                                </div>
                                <div className="hero-animate hero-animate-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
                                    <a href="/studio" className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 hover:shadow-2xl">
                                        <span>🚀</span>{p.heroCta1}
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                    </a>
                                    <a href="#capabilities" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-8 py-3.5 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105">{p.heroCta2}</a>
                                </div>
                                <div className="hero-animate hero-animate-delay-3 mt-6 flex items-center gap-3 text-sm text-[#64748B] dark:text-[#94A3B8]">
                                    <div className="flex -space-x-2">
                                        {["bg-primary", "bg-secondary", "bg-tertiary", "bg-primary-dark"].map((c, i) => (
                                            <div key={i} className={`h-7 w-7 rounded-full ${c} border-2 border-white dark:border-slate-950 flex items-center justify-center text-[10px] font-bold text-white`}>{["MJ", "AW", "KD", "EC"][i]}</div>
                                        ))}
                                    </div>
                                    <span>Trusted by <strong className="text-[#0F172A] dark:text-[#F8FAFC]">120+ professionals</strong></span>
                                </div>
                            </div>
                            <div className="hero-animate hero-animate-delay-2 relative">
                                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-tertiary/10 blur-2xl" />
                                <div className="relative"><ChatDemo p={p} /></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Capabilities ── */}
                <section id="capabilities" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/[0.2]">
                    <div ref={capsRef} className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="text-center">
                            <span className="fade-up inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400"><span>⚡</span> {p.capsBadge}</span>
                            <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl whitespace-pre-line">{p.capsHeading}</h2>
                            <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-xl text-base text-slate-600 dark:text-slate-400">{p.capsDesc}</p>
                        </div>
                        <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {capIcons.map((icon, i) => {
                                const colors = colorMap[capColors[i]];
                                return (
                                    <div key={i} className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${colors.glow}`}>
                                        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-all group-hover:bg-blue-500/10 group-hover:scale-150" />
                                        <div className="relative z-10">
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} text-2xl`}>{icon}</div>
                                            <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{capabilities[i].title}</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{capabilities[i].desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Pricing ── */}
                <section id="pricing-plans" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
                    <div ref={priceRef} className="mx-auto max-w-5xl px-6 lg:px-8">
                        <div className="text-center">
                            <span className="fade-up inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">{p.pricingBadge}</span>
                            <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{p.pricingHeading}</h2>
                            <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-lg text-base text-slate-600 dark:text-slate-400">{p.pricingDesc}</p>
                        </div>
                        <div className="fade-up fade-up-delay-3 mt-14 grid gap-8 sm:grid-cols-2">
                            {pricingPlans.map((plan, i) => (
                                <div key={i} className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${plan.highlight ? "border-blue-500 bg-white dark:bg-slate-900 shadow-blue-500/10 scale-[1.02]" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"}`}>
                                    {plan.tag && <span className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{plan.tag}</span>}
                                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{plan.name}</p>
                                    <div className="mt-3 flex items-baseline gap-1"><span className="text-5xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span><span className="text-base text-slate-500 dark:text-slate-400">{plan.period}</span></div>
                                    <ul className="mt-8 space-y-3">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                                <svg className={`h-4 w-4 shrink-0 ${plan.highlight ? "text-blue-500" : "text-emerald-500"}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="/#pricing" className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all hover:scale-105 ${plan.highlight ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90" : "border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"}`}>{p.pricingCta}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Testimonials ── */}
                <section className="py-24 lg:py-32 bg-slate-50 dark:bg-[#0B1120]">
                    <div ref={testRef} className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="text-center">
                            <span className="fade-up inline-flex items-center gap-2 rounded-full bg-tertiary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tertiary"><span>💬</span> {p.testimonialsBadge}</span>
                            <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">{p.testimonialsHeading}</h2>
                        </div>
                        <div className="fade-up fade-up-delay-2 mt-14 grid gap-8 sm:grid-cols-3">
                            {testimonials.map((tm, i) => (
                                <div key={i} className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                    <svg className="h-8 w-8 text-primary/15 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                                    <p className="text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1] italic">&ldquo;{tm.quote}&rdquo;</p>
                                    <div className="mt-6 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">{tm.avatar}</div>
                                        <div><p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{tm.name}</p><p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{tm.role}</p></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section className="py-24 lg:py-32 bg-white dark:bg-slate-950">
                    <div ref={faqRef} className="mx-auto max-w-3xl px-6 lg:px-8">
                        <div className="text-center">
                            <span className="fade-up inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">{p.faqBadge}</span>
                            <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">{p.faqHeading}</h2>
                        </div>
                        <div className="fade-up fade-up-delay-2 mt-14 space-y-3">
                            {faqs.map((faq, i) => (
                                <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 transition-all hover:border-blue-500/20">
                                    <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left">
                                        <span className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] pr-4">{faq.q}</span>
                                        <svg className={`h-4 w-4 shrink-0 text-[#94A3B8] dark:text-[#64748B] transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                                        <p className="px-6 pb-5 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="py-24 lg:py-32 bg-slate-50 dark:bg-[#0B1120]">
                    <div ref={ctaRef} className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="fade-up relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center sm:p-16">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                            <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-secondary/6 blur-3xl" />
                            <div className="relative z-10">
                                <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">{p.ctaHeading1}<br /><span className="gradient-text">{p.ctaHeading2}</span></h2>
                                <p className="mx-auto mt-4 max-w-lg text-base text-[#475569] dark:text-[#CBD5E1]">{p.ctaDesc}</p>
                                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                    <a href="/studio" className="btn-glow inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 hover:shadow-2xl">{p.ctaCta1}<svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
                                    <a href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-8 py-3.5 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105">{p.ctaCta2}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

/* Capabilities data kept for icon/color since titles stay same across both languages for now */
const capabilities = [
    { title: "AI Content Planner", desc: "Generate smart content calendars with AI-driven suggestions tailored to your brand and audience." },
    { title: "Visual Generator", desc: "Create stunning marketing visuals, banners, and social media assets with AI image generation." },
    { title: "Strategy Analyzer", desc: "Analyze viral potential, predict engagement, and optimize your content strategy in real-time." },
    { title: "Live Stream Tools", desc: "AI-powered live streaming assistant with auto-captions, real-time analytics, and audience engagement." },
    { title: "KOL Database", desc: "Find verified influencers with engagement rates, pricing, and audience demographics at your fingertips." },
    { title: "AI Voice Assistant", desc: "Hands-free marketing automation — dictate briefs, get AI suggestions, and manage campaigns by voice." },
];
