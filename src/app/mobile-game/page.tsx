"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─────────────────────── DATA ─────────────────────── */

const gameGenres = [
    {
        genre: "Racing",
        title: "High-Speed Thrills",
        desc: "Heart-pounding racing experiences with realistic physics, stunning tracks, and multiplayer competition.",
        img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80&auto=format",
        color: "from-red-500/80 to-orange-500/80",
        icon: "🏎️",
    },
    {
        genre: "Sports",
        title: "Athletic Champions",
        desc: "Immersive sports simulations that capture the excitement of the arena with realistic gameplay mechanics.",
        img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80&auto=format",
        color: "from-emerald-500/80 to-teal-500/80",
        icon: "⚽",
    },
    {
        genre: "Strategy",
        title: "Tactical Mastery",
        desc: "Deep strategic gameplay that challenges your mind — build empires, command armies, and outwit opponents.",
        img: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=800&q=80&auto=format",
        color: "from-violet-500/80 to-indigo-500/80",
        icon: "♟️",
    },
    {
        genre: "Fighting",
        title: "Combat Arena",
        desc: "Intense fighting games with fluid combat systems, unique characters, and competitive ranked modes.",
        img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80&auto=format",
        color: "from-rose-500/80 to-pink-500/80",
        icon: "⚔️",
    },
];

const features = [
    {
        icon: "🎮",
        title: "Cross-Platform Play",
        desc: "Build once, play everywhere — iOS, Android, PC, and console with seamless cross-play support.",
    },
    {
        icon: "🌐",
        title: "Multiplayer Infrastructure",
        desc: "Scalable server architecture supporting millions of concurrent players with low-latency matchmaking.",
    },
    {
        icon: "🎨",
        title: "Stunning Visuals",
        desc: "Next-gen graphics powered by Unity and Unreal Engine with custom shaders and particle systems.",
    },
    {
        icon: "🔒",
        title: "Anti-Cheat & Security",
        desc: "Enterprise-grade security protecting player data and ensuring fair competitive gameplay.",
    },
    {
        icon: "📊",
        title: "Live Analytics",
        desc: "Real-time player behavior analytics, retention tracking, and monetization optimization dashboards.",
    },
    {
        icon: "🚀",
        title: "Live Ops Ready",
        desc: "Dynamic content delivery for events, seasons, battle passes, and A/B testing without app updates.",
    },
];

const testimonials = [
    {
        quote: "plus. revolutionized our game launch with their tailored solutions. Their expertise and support were invaluable in achieving our goals.",
        name: "Emily Carter",
        location: "Rivertown, CA",
        avatar: "EC",
    },
    {
        quote: "Their cutting-edge solutions and expert guidance truly elevated our game's performance. Player retention increased 340% in 3 months.",
        name: "Andrew Walker",
        location: "Omaha, NE",
        avatar: "AW",
    },
    {
        quote: "plus. transformed our mobile game with their cloud solutions. The transition from beta to live was seamless and efficient.",
        name: "Nicole Brown",
        location: "Austin, TX",
        avatar: "NB",
    },
];

const stats = [
    { value: "50M+", label: "Downloads", icon: "📲" },
    { value: "200+", label: "Games Shipped", icon: "🎮" },
    { value: "99.9%", label: "Uptime SLA", icon: "⚡" },
    { value: "4.8★", label: "Avg Rating", icon: "⭐" },
];

const techStack = [
    "Unity",
    "Unreal Engine",
    "Godot",
    "Firebase",
    "AWS GameLift",
    "PlayFab",
    "Photon",
    "Nakama",
];

/* ─────────────────────── SECTIONS ─────────────────────── */

function HeroSection() {
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
                        Mobile Game Development
                    </span>
                </div>

                {/* Headline */}
                <h1 className="hero-animate hero-animate-delay-1 mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-8xl">
                    <span className="block drop-shadow-2xl">Level Up Your</span>
                    <span className="block mt-2">
                        <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FFE66D] to-[#4ECDC4] bg-clip-text text-transparent">
                            Gaming Vision
                        </span>
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-animate hero-animate-delay-2 mx-auto mt-6 max-w-2xl text-lg font-medium text-white/70 sm:text-xl leading-relaxed">
                    We combine innovation with expertise to create immersive gaming experiences
                    that captivate millions of players worldwide.
                </p>

                {/* Trusted badge */}
                <div className="hero-animate hero-animate-delay-2 mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Trusted by 20k+ players worldwide
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
                        Explore Our Games
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                    <a
                        href="#features"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10 hover:scale-105"
                    >
                        Our Capabilities
                    </a>
                </div>

                {/* Scroll indicator */}
                <div className="hero-animate hero-animate-delay-3 mt-16 flex flex-col items-center gap-2">
                    <span className="text-xs text-white/40 uppercase tracking-widest">Scroll to explore</span>
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

    return (
        <section id="features" className="py-24 lg:py-32 bg-background">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        <span>⚡</span> Our Capabilities
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Everything You Need to
                        <br />
                        <span className="gradient-text">Ship Great Games</span>
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-xl text-base text-foreground-secondary">
                        A forward-thinking IT solutions provider dedicated to empowering game studios through innovative technology.
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/30"
                        >
                            {/* Hover glow */}
                            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10 group-hover:scale-150" />

                            <div className="relative z-10">
                                <span className="text-3xl">{f.icon}</span>
                                <h3 className="mt-4 text-lg font-bold text-foreground">{f.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tech Stack */}
                <div className="fade-up mt-16 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-5">Powered By</p>
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

    return (
        <section id="showcase" className="py-24 lg:py-32 bg-section-alt overflow-hidden">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
                        <span>🎯</span> Our Projects
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Games That Players
                        <span className="gradient-text"> Love</span>
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-lg text-base text-foreground-secondary">
                        From concept to chart-topping launch — explore our portfolio of games across every genre.
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-8 sm:grid-cols-2">
                    {gameGenres.map((game, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-3xl border border-border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                            style={{ minHeight: "320px" }}
                        >
                            {/* Background image */}
                            <Image
                                src={game.img}
                                alt={game.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />

                            {/* Gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${game.color} opacity-70 transition-opacity duration-300 group-hover:opacity-85`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                {/* Genre tag */}
                                <div className="mb-auto mt-4">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm border border-white/20">
                                        {game.icon} {game.genre}
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
                                    View Project
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

    return (
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-secondary/3" />

            <div ref={ref} className="relative mx-auto max-w-5xl px-6 lg:px-8">
                <div className="fade-up grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {stats.map((s, i) => (
                        <div key={i} className="group text-center">
                            <span className="block text-3xl mb-3 transition-transform group-hover:scale-125 group-hover:-rotate-12">{s.icon}</span>
                            <p className="text-4xl font-extrabold text-foreground lg:text-5xl">{s.value}</p>
                            <p className="mt-2 text-sm font-medium text-muted">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialsSection() {
    const ref = useScrollReveal();

    return (
        <section className="py-24 lg:py-32 bg-section-alt">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-flex items-center gap-2 rounded-full bg-tertiary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tertiary">
                        <span>💬</span> Client Testimonials
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        What Our Partners Say
                    </h2>
                </div>

                <div className="fade-up fade-up-delay-2 mt-14 grid gap-8 sm:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="group relative rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-tertiary/20"
                        >
                            {/* Quote icon */}
                            <svg className="h-8 w-8 text-tertiary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>

                            <p className="text-sm leading-relaxed text-foreground-secondary italic">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            <div className="mt-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                                    <p className="text-xs text-muted">{t.location}</p>
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
                            🚀 Ready to Launch?
                        </span>

                        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-lg">
                            Transform Your Gaming
                            <br />
                            <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FFE66D] to-[#4ECDC4] bg-clip-text text-transparent">
                                Vision Into Reality
                            </span>
                        </h2>

                        <p className="mx-auto mt-4 max-w-lg text-base text-white/60 leading-relaxed">
                            A forward-thinking studio dedicated to delivering innovative gaming experiences
                            that drive success for every client.
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                            <a
                                href="/#pricing"
                                className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-2xl"
                                style={{
                                    background: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%)",
                                    backgroundSize: "200% 200%",
                                    animation: "gradientShift 3s ease infinite",
                                }}
                            >
                                Get Started Now
                                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10 hover:scale-105"
                            >
                                Back to Home
                            </a>
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
