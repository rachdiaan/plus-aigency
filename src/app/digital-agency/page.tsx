"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ── Data ── */

const services = [
    {
        icon: "💡",
        title: "Creative Solutions",
        desc: "We empower businesses through innovative branding solutions that capture attention and drive engagement.",
        color: "primary" as const,
    },
    {
        icon: "🖥️",
        title: "IT Solutions",
        desc: "Creating impactful platforms for user engagement with cutting-edge technology and modern architectures.",
        color: "secondary" as const,
    },
    {
        icon: "🎨",
        title: "Digital Design",
        desc: "We enhance reach with targeted visual strategies, from UI/UX to full brand identity systems.",
        color: "tertiary" as const,
    },
    {
        icon: "🚀",
        title: "Innovative Solutions",
        desc: "Delivering tailored IT services for your business needs — from cloud to cybersecurity to AI integration.",
        color: "primary" as const,
    },
];

const portfolio = [
    {
        title: "Solutions that Empower",
        desc: "Our innovative IT solutions are crafted to enhance efficiency and drive measurable business results.",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format",
    },
    {
        title: "Marketing that Captivates",
        desc: "We provide tailored strategies to reach your audience effectively across every digital touchpoint.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&auto=format",
    },
    {
        title: "Digital Marketing Solutions",
        desc: "Our digital marketing solutions elevate your online engagement and amplify brand visibility.",
        img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80&auto=format",
    },
    {
        title: "Tailored Marketing",
        desc: "We deliver cutting-edge IT solutions that empower brands to stand out in competitive markets.",
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format",
    },
];

const stats = [
    { value: "150+", label: "Innovative Solutions" },
    { value: "500+", label: "Happy Customers" },
    { value: "80+", label: "Tailored Services" },
    { value: "200+", label: "Unique Designs" },
];

const colorMap = {
    primary: {
        bg: "bg-blue-500/10",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
        glow: "group-hover:shadow-blue-500/10",
    },
    secondary: {
        bg: "bg-purple-500/10",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800",
        glow: "group-hover:shadow-purple-500/10",
    },
    tertiary: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-800",
        glow: "group-hover:shadow-emerald-500/10",
    },
};

/* ── Sections ── */

function HeroSection() {
    return (
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&q=80&auto=format')",
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, var(--hero-overlay-from), var(--hero-overlay-via), var(--hero-overlay-to))`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-transparent to-primary/8" />
            </div>

            {/* Floating elements */}
            <div className="absolute top-1/4 right-16 h-24 w-24 rounded-full bg-secondary/12 blur-xl float-animation hidden lg:block" />
            <div className="absolute bottom-1/4 left-12 h-20 w-20 rounded-full bg-primary/10 blur-2xl float-animation-delayed hidden lg:block" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
                <div
                    className="hero-animate inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm"
                    style={{
                        background: "var(--hero-badge-bg)",
                        borderWidth: "1px",
                        borderColor: "var(--hero-badge-border)",
                    }}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                    <span
                        className="text-xs font-medium tracking-wide"
                        style={{ color: "var(--hero-text-muted)" }}
                    >
                        Digital Agency Services
                    </span>
                </div>

                <h1
                    className="hero-animate hero-animate-delay-1 mt-8 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl drop-shadow-lg"
                    style={{ color: "var(--hero-text)", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
                >
                    Digital Excellence,
                    <br />
                    <span className="gradient-text opacity-90">Redefined.</span>
                </h1>

                <p
                    className="hero-animate hero-animate-delay-2 mx-auto mt-4 text-lg font-semibold sm:text-xl drop-shadow-md"
                    style={{ color: "var(--hero-text)", textShadow: "0 1px 16px rgba(0,0,0,0.3)" }}
                >
                    Innovative minds delivering branding, storytelling, and content daily.
                </p>

                <div className="hero-animate hero-animate-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <a
                        href="#services"
                        className="btn-glow inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all hover:scale-105 hover:shadow-2xl"
                        style={{
                            background: "var(--hero-btn-bg)",
                            color: "var(--hero-btn-text)",
                        }}
                    >
                        Explore Services
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                    <a
                        href="#portfolio"
                        className="inline-flex items-center gap-2 rounded-full bg-white/20 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md border-2 border-white/50 transition-all hover:bg-white/30 hover:border-white/70 hover:scale-105 drop-shadow-md"
                        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
                    >
                        View Portfolio
                    </a>
                </div>
            </div>

            {/* Bottom fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-24"
                style={{
                    background: `linear-gradient(to top, var(--background), transparent)`,
                }}
            />
        </section>
    );
}

function ServicesSection() {
    const ref = useScrollReveal();

    return (
        <section id="services" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        What We Do
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                        Tailored Service Offerings
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-lg text-base text-slate-600 dark:text-slate-400">
                        Innovative branding that clients trust — customized service packages designed to meet your unique business requirements.
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((s, i) => {
                        const c = colorMap[s.color];
                        return (
                            <div
                                key={i}
                                className={`group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${c.glow}`}
                            >
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} text-2xl`}>
                                    {s.icon}
                                </div>
                                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{s.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.desc}</p>
                                <div className={`mt-4 text-xs font-semibold ${c.text} opacity-0 transition-opacity group-hover:opacity-100`}>
                                    Learn more →
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function PortfolioSection() {
    const ref = useScrollReveal();

    return (
        <section id="portfolio" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/[0.2]">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                        Our Work
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                        Creating Impactful Experiences
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-lg text-base text-slate-600 dark:text-slate-400">
                        A pioneering IT solutions provider focused on empowering businesses through innovative technology.
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-8 sm:grid-cols-2">
                    {portfolio.map((item, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
                                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 transition-all group-hover:gap-2">
                                    Learn More
                                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
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
        <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
            <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-8">
                <div className="fade-up grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {stats.map((s, i) => (
                        <div key={i} className="text-center">
                            <p className="text-4xl font-bold text-slate-900 dark:text-white lg:text-5xl">{s.value}</p>
                            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialSection() {
    const ref = useScrollReveal();

    return (
        <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/[0.2]">
            <div ref={ref} className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                <div className="fade-up">
                    <svg className="mx-auto h-10 w-10 text-blue-500/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="mt-6 text-xl font-medium leading-relaxed text-slate-900 dark:text-white sm:text-2xl lg:text-3xl">
                        Partnering with plus. was an exceptional journey. They invested effort to grasp our goals and exceeded our expectations.
                    </blockquote>
                    <div className="mt-8">
                        <p className="text-base font-semibold text-slate-900 dark:text-white">Jenifer Wang</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Silicon Valley, CA</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CTASection() {
    const ref = useScrollReveal();

    return (
        <section id="cta" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="fade-up relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center sm:p-16 lg:p-20">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
                    <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-blue-500/8 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-purple-500/6 blur-3xl" />

                    <div className="relative z-10">
                        <span className="inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                            Transforming into Reality
                        </span>
                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                            We craft &amp; enhance your
                            <br />
                            <span className="gradient-text">digital presence</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-lg text-base text-slate-600 dark:text-slate-400">
                            We empower businesses to build exceptional websites with ease. Our solutions simplify the web design journey, making it accessible for all.
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="/#pricing"
                                className="btn-glow inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 hover:shadow-2xl"
                            >
                                Ready to get started?
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                        </div>

                        {/* Bottom features */}
                        <div className="mt-12 grid gap-6 sm:grid-cols-3">
                            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-5 border border-slate-200 dark:border-slate-700">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Brand Identity</p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Brand Development</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-5 border border-slate-200 dark:border-slate-700">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Design Solutions</p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Visual Storytelling</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-5 border border-slate-200 dark:border-slate-700">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Innovative IT</p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Solutions & Strategy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Page ── */

export default function DigitalAgencyPage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <ServicesSection />
                <PortfolioSection />
                <StatsSection />
                <TestimonialSection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
