"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/i18n/I18nProvider";

/* ─────────────────────── DATA (bilingual) ─────────────────────── */

const genreMeta = [
    { img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80&auto=format", color: "from-red-500/80 to-orange-500/80", icon: "🏎️" },
    { img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80&auto=format", color: "from-emerald-500/80 to-teal-500/80", icon: "⚽" },
    { img: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=800&q=80&auto=format", color: "from-violet-500/80 to-indigo-500/80", icon: "♟️" },
    { img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80&auto=format", color: "from-rose-500/80 to-pink-500/80", icon: "⚔️" },
];
const featureIcons = ["🎮", "🌐", "🎨", "🔒", "📊", "🚀"];
const tmMeta = [
    { name: "Emily Carter", location: "Rivertown, CA", avatar: "EC" },
    { name: "Andrew Walker", location: "Omaha, NE", avatar: "AW" },
    { name: "Nicole Brown", location: "Austin, TX", avatar: "NB" },
];
const statMeta = [
    { value: "50M+", icon: "📲" },
    { value: "200+", icon: "🎮" },
    { value: "99.9%", icon: "⚡" },
    { value: "4.8★", icon: "⭐" },
];
const techStack = ["Unity", "Unreal Engine", "Godot", "Firebase", "AWS GameLift", "PlayFab", "Photon", "Nakama"];

const COPY = {
    en: {
        hero: { badge: "Mobile Game Development", titleA: "Level Up Your", titleB: "Gaming Vision", subtitle: "We combine innovation with expertise to create immersive gaming experiences that captivate millions of players worldwide.", trusted: "Trusted by 20k+ players worldwide", explore: "Explore Our Games", capabilities: "Our Capabilities", scroll: "Scroll to explore" },
        features: { tag: "Our Capabilities", titleA: "Everything You Need to", titleB: "Ship Great Games", subtitle: "A forward-thinking IT solutions provider dedicated to empowering game studios through innovative technology.", poweredBy: "Powered By", items: [
            { title: "Cross-Platform Play", desc: "Build once, play everywhere — iOS, Android, PC, and console with seamless cross-play support." },
            { title: "Multiplayer Infrastructure", desc: "Scalable server architecture supporting millions of concurrent players with low-latency matchmaking." },
            { title: "Stunning Visuals", desc: "Next-gen graphics powered by Unity and Unreal Engine with custom shaders and particle systems." },
            { title: "Anti-Cheat & Security", desc: "Enterprise-grade security protecting player data and ensuring fair competitive gameplay." },
            { title: "Live Analytics", desc: "Real-time player behavior analytics, retention tracking, and monetization optimization dashboards." },
            { title: "Live Ops Ready", desc: "Dynamic content delivery for events, seasons, battle passes, and A/B testing without app updates." },
        ] },
        showcase: { tag: "Our Projects", titleA: "Games That Players", titleB: " Love", subtitle: "From concept to chart-topping launch — explore our portfolio of games across every genre.", view: "View Project", genres: [
            { genre: "Racing", title: "High-Speed Thrills", desc: "Heart-pounding racing experiences with realistic physics, stunning tracks, and multiplayer competition." },
            { genre: "Sports", title: "Athletic Champions", desc: "Immersive sports simulations that capture the excitement of the arena with realistic gameplay mechanics." },
            { genre: "Strategy", title: "Tactical Mastery", desc: "Deep strategic gameplay that challenges your mind — build empires, command armies, and outwit opponents." },
            { genre: "Fighting", title: "Combat Arena", desc: "Intense fighting games with fluid combat systems, unique characters, and competitive ranked modes." },
        ] },
        stats: ["Downloads", "Games Shipped", "Uptime SLA", "Avg Rating"],
        testimonials: { tag: "Client Testimonials", title: "What Our Partners Say", items: [
            "plus. revolutionized our game launch with their tailored solutions. Their expertise and support were invaluable in achieving our goals.",
            "Their cutting-edge solutions and expert guidance truly elevated our game's performance. Player retention increased 340% in 3 months.",
            "plus. transformed our mobile game with their cloud solutions. The transition from beta to live was seamless and efficient.",
        ] },
        cta: { badge: "Ready to Launch?", titleA: "Transform Your Gaming", titleB: "Vision Into Reality", subtitle: "A forward-thinking studio dedicated to delivering innovative gaming experiences that drive success for every client.", start: "Get Started Now", back: "Back to Home" },
    },
    id: {
        hero: { badge: "Pengembangan Game Mobile", titleA: "Tingkatkan", titleB: "Visi Gaming Anda", subtitle: "Kami memadukan inovasi dengan keahlian untuk menciptakan pengalaman bermain imersif yang memikat jutaan pemain di seluruh dunia.", trusted: "Dipercaya 20rb+ pemain di seluruh dunia", explore: "Jelajahi Game Kami", capabilities: "Kemampuan Kami", scroll: "Gulir untuk menjelajah" },
        features: { tag: "Kemampuan Kami", titleA: "Semua yang Anda Butuhkan untuk", titleB: "Merilis Game Hebat", subtitle: "Penyedia solusi IT yang berpikir maju dan berdedikasi memberdayakan studio game melalui teknologi inovatif.", poweredBy: "Didukung Oleh", items: [
            { title: "Cross-Platform Play", desc: "Bangun sekali, mainkan di mana saja — iOS, Android, PC, dan konsol dengan dukungan cross-play yang mulus." },
            { title: "Infrastruktur Multiplayer", desc: "Arsitektur server yang skalabel mendukung jutaan pemain bersamaan dengan matchmaking latensi rendah." },
            { title: "Visual Memukau", desc: "Grafis next-gen yang didukung Unity dan Unreal Engine dengan custom shader dan sistem partikel." },
            { title: "Anti-Cheat & Keamanan", desc: "Keamanan tingkat enterprise yang melindungi data pemain dan memastikan permainan kompetitif yang adil." },
            { title: "Analitik Langsung", desc: "Analitik perilaku pemain real-time, pelacakan retensi, dan dashboard optimasi monetisasi." },
            { title: "Siap Live Ops", desc: "Pengiriman konten dinamis untuk event, season, battle pass, dan A/B testing tanpa update aplikasi." },
        ] },
        showcase: { tag: "Proyek Kami", titleA: "Game yang", titleB: " Disukai Pemain", subtitle: "Dari konsep hingga rilis yang memuncaki tangga lagu — jelajahi portofolio game kami di setiap genre.", view: "Lihat Proyek", genres: [
            { genre: "Racing", title: "Sensasi Kecepatan Tinggi", desc: "Pengalaman balap yang memacu adrenalin dengan fisika realistis, trek menakjubkan, dan kompetisi multiplayer." },
            { genre: "Olahraga", title: "Juara Atletik", desc: "Simulasi olahraga imersif yang menangkap kegembiraan arena dengan mekanik permainan yang realistis." },
            { genre: "Strategi", title: "Penguasaan Taktis", desc: "Permainan strategis mendalam yang menantang pikiran — bangun kerajaan, pimpin pasukan, dan kalahkan lawan." },
            { genre: "Fighting", title: "Arena Pertarungan", desc: "Game fighting intens dengan sistem pertarungan yang halus, karakter unik, dan mode ranked kompetitif." },
        ] },
        stats: ["Unduhan", "Game Dirilis", "Uptime SLA", "Rating Rata-rata"],
        testimonials: { tag: "Testimoni Klien", title: "Apa Kata Partner Kami", items: [
            "plus. merevolusi peluncuran game kami dengan solusi yang disesuaikan. Keahlian dan dukungan mereka sangat berharga dalam mencapai tujuan kami.",
            "Solusi mutakhir dan panduan ahli mereka benar-benar meningkatkan performa game kami. Retensi pemain naik 340% dalam 3 bulan.",
            "plus. mengubah game mobile kami dengan solusi cloud mereka. Transisi dari beta ke live berjalan mulus dan efisien.",
        ] },
        cta: { badge: "Siap Diluncurkan?", titleA: "Wujudkan Visi Gaming", titleB: "Anda Menjadi Nyata", subtitle: "Studio yang berpikir maju dan berdedikasi menghadirkan pengalaman gaming inovatif yang mendorong kesuksesan setiap klien.", start: "Mulai Sekarang", back: "Kembali ke Beranda" },
    },
};

/* ─────────────────────── SECTIONS ─────────────────────── */

function HeroSection() {
    const c = COPY[useLocale()].hero;
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80&auto=format')",
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(15,10,40,0.8) 50%, rgba(30,10,60,0.75) 100%)",
                    }}
                />
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-pulse" style={{ animationDuration: "4s" }} />
            </div>

            {/* Floating game elements */}
            <div className="absolute top-1/4 left-8 text-5xl float-animation opacity-20 hidden lg:block">🎮</div>
            <div className="absolute top-1/3 right-12 text-4xl float-animation-delayed opacity-15 hidden lg:block">🕹️</div>
            <div className="absolute bottom-1/4 left-1/4 text-3xl float-animation opacity-10 hidden lg:block">🏆</div>
            <div className="absolute bottom-1/3 right-1/4 text-4xl float-animation-delayed opacity-10 hidden lg:block">⚡</div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-5xl px-6 pt-20 text-center">
                {/* Badge */}
                <div
                    className="hero-animate inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 backdrop-blur-md"
                >
                    <span className="text-lg">🎮</span>
                    <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">
                        {c.badge}
                    </span>
                </div>

                {/* Headline */}
                <h1 className="hero-animate hero-animate-delay-1 mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-8xl">
                    <span className="block drop-shadow-2xl">{c.titleA}</span>
                    <span className="block mt-2">
                        <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FFE66D] to-[#4ECDC4] bg-clip-text text-transparent">
                            {c.titleB}
                        </span>
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-animate hero-animate-delay-2 mx-auto mt-6 max-w-2xl text-lg font-medium text-white/70 sm:text-xl leading-relaxed">
                    {c.subtitle}
                </p>

                {/* Trusted badge */}
                <div className="hero-animate hero-animate-delay-2 mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {c.trusted}
                </div>

                {/* CTAs */}
                <div className="hero-animate hero-animate-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <a
                        href="#showcase"
                        className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-2xl"
                        style={{
                            background: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%)",
                            backgroundSize: "200% 200%",
                            animation: "gradientShift 3s ease infinite",
                        }}
                    >
                        <span className="text-lg">🕹️</span>
                        {c.explore}
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                    <a
                        href="#features"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10 hover:scale-105"
                    >
                        {c.capabilities}
                    </a>
                </div>

                {/* Scroll indicator */}
                <div className="hero-animate hero-animate-delay-3 mt-16 flex flex-col items-center gap-2">
                    <span className="text-xs text-white/40 uppercase tracking-widest">{c.scroll}</span>
                    <div className="h-10 w-6 rounded-full border-2 border-white/20 p-1">
                        <div className="h-2 w-full rounded-full bg-white/40 animate-bounce" />
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32"
                style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
            />
        </section>
    );
}

function FeaturesSection() {
    const ref = useScrollReveal();
    const c = COPY[useLocale()].features;

    return (
        <section id="features" className="py-24 lg:py-32 bg-background">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        <span>⚡</span> {c.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        {c.titleA}
                        <br />
                        <span className="gradient-text">{c.titleB}</span>
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-xl text-base text-foreground-secondary">
                        {c.subtitle}
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {c.items.map((f, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/30"
                        >
                            {/* Hover glow */}
                            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10 group-hover:scale-150" />

                            <div className="relative z-10">
                                <span className="text-3xl">{featureIcons[i]}</span>
                                <h3 className="mt-4 text-lg font-bold text-foreground">{f.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tech Stack */}
                <div className="fade-up mt-16 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-5">{c.poweredBy}</p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-muted transition-all hover:text-foreground hover:border-primary/30 hover:bg-primary/5"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ShowcaseSection() {
    const ref = useScrollReveal();
    const c = COPY[useLocale()].showcase;

    return (
        <section id="showcase" className="py-24 lg:py-32 bg-section-alt overflow-hidden">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
                        <span>🎯</span> {c.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        {c.titleA}
                        <span className="gradient-text">{c.titleB}</span>
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-lg text-base text-foreground-secondary">
                        {c.subtitle}
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-8 sm:grid-cols-2">
                    {c.genres.map((game, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-3xl border border-border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                            style={{ minHeight: "320px" }}
                        >
                            {/* Background image */}
                            <Image
                                src={genreMeta[i].img}
                                alt={game.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />

                            {/* Gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${genreMeta[i].color} opacity-70 transition-opacity duration-300 group-hover:opacity-85`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                {/* Genre tag */}
                                <div className="mb-auto mt-4">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm border border-white/20">
                                        {genreMeta[i].icon} {game.genre}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-extrabold text-white drop-shadow-lg sm:text-3xl">
                                    {game.title}
                                </h3>
                                <p className="mt-2 text-sm text-white/80 leading-relaxed max-w-md">
                                    {game.desc}
                                </p>

                                {/* Hover action */}
                                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    {c.view}
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatsSection() {
    const ref = useScrollReveal();
    const labels = COPY[useLocale()].stats;

    return (
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-secondary/3" />

            <div ref={ref} className="relative mx-auto max-w-5xl px-6 lg:px-8">
                <div className="fade-up grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {statMeta.map((s, i) => (
                        <div key={i} className="group text-center">
                            <span className="block text-3xl mb-3 transition-transform group-hover:scale-125 group-hover:-rotate-12">{s.icon}</span>
                            <p className="text-4xl font-extrabold text-foreground lg:text-5xl">{s.value}</p>
                            <p className="mt-2 text-sm font-medium text-muted">{labels[i]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialsSection() {
    const ref = useScrollReveal();
    const c = COPY[useLocale()].testimonials;

    return (
        <section className="py-24 lg:py-32 bg-section-alt">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-flex items-center gap-2 rounded-full bg-tertiary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tertiary">
                        <span>💬</span> {c.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {c.title}
                    </h2>
                </div>

                <div className="fade-up fade-up-delay-2 mt-14 grid gap-8 sm:grid-cols-3">
                    {c.items.map((quote, i) => (
                        <div
                            key={i}
                            className="group relative rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-tertiary/20"
                        >
                            {/* Quote icon */}
                            <svg className="h-8 w-8 text-tertiary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>

                            <p className="text-sm leading-relaxed text-foreground-secondary italic">
                                &ldquo;{quote}&rdquo;
                            </p>

                            <div className="mt-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                                    {tmMeta[i].avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{tmMeta[i].name}</p>
                                    <p className="text-xs text-muted">{tmMeta[i].location}</p>
                                </div>
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
    const c = COPY[locale].cta;

    return (
        <section id="cta" className="py-24 lg:py-32 bg-background">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="fade-up relative overflow-hidden rounded-3xl border border-border text-center"
                    style={{ minHeight: "400px" }}
                >
                    {/* BG */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80&auto=format')",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-purple-900/60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 sm:px-12 sm:py-20 lg:py-24">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm">
                            🚀 {c.badge}
                        </span>

                        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-lg">
                            {c.titleA}
                            <br />
                            <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FFE66D] to-[#4ECDC4] bg-clip-text text-transparent">
                                {c.titleB}
                            </span>
                        </h2>

                        <p className="mx-auto mt-4 max-w-lg text-base text-white/60 leading-relaxed">
                            {c.subtitle}
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                            <Link
                                href={`/${locale}#pricing`}
                                className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-2xl"
                                style={{
                                    background: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%)",
                                    backgroundSize: "200% 200%",
                                    animation: "gradientShift 3s ease infinite",
                                }}
                            >
                                {c.start}
                                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                href={`/${locale}`}
                                className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10 hover:scale-105"
                            >
                                {c.back}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function MobileGamePage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <ShowcaseSection />
                <StatsSection />
                <TestimonialsSection />
                <CTASection />
            </main>
            <Footer />

            {/* Extra keyframe for gradient CTA buttons */}
            <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </>
    );
}
