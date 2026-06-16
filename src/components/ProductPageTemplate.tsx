"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { translations } from "@/lib/translations";
import { useLocale } from "@/i18n/I18nProvider";

interface Testimonial {
    quote: string;
    name: string;
    role: string;
}

interface Feature {
    title: string;
    desc: string;
}

interface Stat {
    value: string;
    label: string;
}

interface ProductPageData {
    heroBadge: string;
    heroHeading1: string;
    heroHeading2: string;
    heroDesc: string;
    heroCta1: string;
    heroCta2: string;
    featuresBadge: string;
    featuresHeading: string;
    featuresDesc: string;
    features: readonly Feature[];
    stats: readonly Stat[];
    testimonialsBadge: string;
    testimonialsHeading: string;
    testimonials: readonly Testimonial[];
    ctaHeading1: string;
    ctaHeading2: string;
    ctaDesc: string;
    ctaCta1: string;
    ctaCta2: string;
}

interface ProductPageTemplateProps {
    pageKey: "crmPage" | "customerSupportPage" | "mobileAppPage" | "aiImagePage" | "aiTextPage" | "aiVideoPage" | "aiMusicPage" | "chatBotPage";
    featureIcons: readonly string[];
    avatars: readonly string[];
    themeColors?: {
        bgGradient?: string;
        badgeColor?: string;
        badgeDotColor?: string;
        statsBg?: string;
    };
}

const defaultColors = {
    bgGradient: "from-blue-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
    badgeColor: "bg-primary/10 text-primary",
    badgeDotColor: "bg-primary",
    statsBg: "bg-gradient-to-r from-primary to-secondary",
};

const featureColors = ["primary", "secondary", "tertiary", "primary", "secondary", "tertiary"] as const;
const colorMap = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    tertiary: "bg-tertiary/10 text-tertiary",
};

export default function ProductPageTemplate({
    pageKey,
    featureIcons,
    avatars,
    themeColors = {},
}: ProductPageTemplateProps) {
    const locale = useLocale();
    // Product-page copy is plain data, read by the URL locale (one i18n system).
    const p = translations[locale][pageKey] as unknown as ProductPageData;

    const heroRef = useScrollReveal();
    const featRef = useScrollReveal();
    const statsRef = useScrollReveal();
    const testRef = useScrollReveal();
    const ctaRef = useScrollReveal();

    const colors = { ...defaultColors, ...themeColors };

    if (!p) {
        return null;
    }

    return (
        <>
            <Navbar />
            <main>
                {/* ── Hero ── */}
                <section className={`relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br ${colors.bgGradient}`}>
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] dark:opacity-[0.04]" />
                    <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[35%] bg-secondary/8 rounded-full blur-[100px]" />
                    <div ref={heroRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 lg:py-40">
                        <div className="max-w-3xl">
                            <span className={`fade-up inline-flex items-center gap-2 rounded-full ${colors.badgeColor} px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${colors.badgeDotColor} animate-pulse`} />
                                {p.heroBadge}
                            </span>
                            <h1 className="fade-up fade-up-delay-1 text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-5xl lg:text-6xl leading-[1.1]">
                                {p.heroHeading1}<br />
                                <span className="gradient-text">{p.heroHeading2}</span>
                            </h1>
                            <p className="fade-up fade-up-delay-2 mt-6 text-lg leading-relaxed text-[#475569] dark:text-[#94A3B8] max-w-xl">
                                {p.heroDesc}
                            </p>
                            <div className="fade-up fade-up-delay-3 mt-10 flex flex-col sm:flex-row gap-4">
                                <Link href={`/${locale}#pricing`} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:scale-105 transition-all">
                                    {p.heroCta1}
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <Link href={`/${locale}#contact`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 dark:border-slate-700 px-8 py-3.5 text-sm font-semibold hover:scale-105 transition-all text-[#0F172A] dark:text-white">
                                    {p.heroCta2}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Features ── */}
                <section className="py-24 lg:py-32 bg-background">
                    <div ref={featRef} className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <span className="fade-up inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
                                {p.featuresBadge}
                            </span>
                            <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl whitespace-pre-line">
                                {p.featuresHeading}
                            </h2>
                            <p className="fade-up fade-up-delay-2 mt-4 text-base leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                                {p.featuresDesc}
                            </p>
                        </div>
                        <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {p.features?.map((f, i) => (
                                <div key={i} className="group rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
                                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colorMap[featureColors[i % featureColors.length]]} text-2xl transition-transform group-hover:scale-110`}>
                                        {featureIcons[i % featureIcons.length]}
                                    </span>
                                    <h3 className="mt-5 text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">{f.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Stats ── */}
                {p.stats && p.stats.length > 0 && (
                    <section className={`py-20 ${colors.statsBg}`}>
                        <div ref={statsRef} className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="fade-up grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
                                {p.stats.map((s, i) => (
                                    <div key={i}>
                                        <p className="text-4xl font-bold tracking-tight">{s.value}</p>
                                        <p className="mt-2 text-sm font-medium text-white/70">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Testimonials ── */}
                {p.testimonials && p.testimonials.length > 0 && (
                    <section className="py-24 lg:py-32 bg-section-alt">
                        <div ref={testRef} className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <span className="fade-up inline-block rounded-full bg-tertiary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tertiary">
                                    {p.testimonialsBadge}
                                </span>
                                <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
                                    {p.testimonialsHeading}
                                </h2>
                            </div>
                            <div className="fade-up fade-up-delay-2 mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {p.testimonials.map((tm, i) => (
                                    <div key={i} className="rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] p-8 transition-all hover:shadow-lg">
                                        <p className="text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1] italic">&ldquo;{tm.quote}&rdquo;</p>
                                        <div className="mt-6 flex items-center gap-3">
                                            <Image src={avatars[i % avatars.length]} alt={tm.name} width={40} height={40} className="rounded-full object-cover h-10 w-10" />
                                            <div>
                                                <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">{tm.name}</p>
                                                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{tm.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── CTA ── */}
                <section className="py-24 lg:py-32 bg-background">
                    <div ref={ctaRef} className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                        <h2 className="fade-up text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                            {p.ctaHeading1}<br /><span className="gradient-text">{p.ctaHeading2}</span>
                        </h2>
                        <p className="fade-up fade-up-delay-1 mt-6 text-lg text-[#475569] dark:text-[#94A3B8]">{p.ctaDesc}</p>
                        <div className="fade-up fade-up-delay-2 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href={`/${locale}#pricing`} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:scale-105 transition-all">
                                {p.ctaCta1}
                            </Link>
                            <Link href={`/${locale}#contact`} className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 dark:border-slate-700 px-8 py-4 text-sm font-semibold hover:scale-105 transition-all text-[#0F172A] dark:text-white">
                                {p.ctaCta2}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
