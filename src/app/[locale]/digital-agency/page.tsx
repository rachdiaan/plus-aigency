"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/i18n/I18nProvider";

/* ── Data (bilingual) ── */

const serviceMeta = [
    { icon: "💡", color: "primary" as const },
    { icon: "🖥️", color: "secondary" as const },
    { icon: "🎨", color: "tertiary" as const },
    { icon: "🚀", color: "primary" as const },
];
const portfolioImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&auto=format",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80&auto=format",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format",
];
const statValues = ["150+", "500+", "80+", "200+"];

const COPY = {
    en: {
        hero: { badge: "Digital Agency Services", titleA: "Digital Excellence,", titleB: "Redefined.", subtitle: "Innovative minds delivering branding, storytelling, and content daily.", explore: "Explore Services", portfolio: "View Portfolio" },
        services: { tag: "What We Do", title: "Tailored Service Offerings", subtitle: "Innovative branding that clients trust — customized service packages designed to meet your unique business requirements.", learnMore: "Learn more →", items: [
            { title: "Creative Solutions", desc: "We empower businesses through innovative branding solutions that capture attention and drive engagement." },
            { title: "IT Solutions", desc: "Creating impactful platforms for user engagement with cutting-edge technology and modern architectures." },
            { title: "Digital Design", desc: "We enhance reach with targeted visual strategies, from UI/UX to full brand identity systems." },
            { title: "Innovative Solutions", desc: "Delivering tailored IT services for your business needs — from cloud to cybersecurity to AI integration." },
        ] },
        portfolio: { tag: "Our Work", title: "Creating Impactful Experiences", subtitle: "A pioneering IT solutions provider focused on empowering businesses through innovative technology.", learnMore: "Learn More", items: [
            { title: "Solutions that Empower", desc: "Our innovative IT solutions are crafted to enhance efficiency and drive measurable business results." },
            { title: "Marketing that Captivates", desc: "We provide tailored strategies to reach your audience effectively across every digital touchpoint." },
            { title: "Digital Marketing Solutions", desc: "Our digital marketing solutions elevate your online engagement and amplify brand visibility." },
            { title: "Tailored Marketing", desc: "We deliver cutting-edge IT solutions that empower brands to stand out in competitive markets." },
        ] },
        stats: ["Innovative Solutions", "Happy Customers", "Tailored Services", "Unique Designs"],
        testimonial: { quote: "Partnering with plus. was an exceptional journey. They invested effort to grasp our goals and exceeded our expectations.", name: "Jenifer Wang", location: "Silicon Valley, CA" },
        cta: { badge: "Transforming into Reality", titleA: "We craft & enhance your", titleB: "digital presence", subtitle: "We empower businesses to build exceptional websites with ease. Our solutions simplify the web design journey, making it accessible for all.", start: "Ready to get started?", features: [{ t: "Brand Identity", s: "Brand Development" }, { t: "Design Solutions", s: "Visual Storytelling" }, { t: "Innovative IT", s: "Solutions & Strategy" }] },
    },
    id: {
        hero: { badge: "Layanan Digital Agency", titleA: "Keunggulan Digital,", titleB: "Didefinisikan Ulang.", subtitle: "Pemikir inovatif yang menghadirkan branding, storytelling, dan konten setiap hari.", explore: "Jelajahi Layanan", portfolio: "Lihat Portofolio" },
        services: { tag: "Yang Kami Lakukan", title: "Penawaran Layanan yang Disesuaikan", subtitle: "Branding inovatif yang dipercaya klien — paket layanan khusus yang dirancang untuk memenuhi kebutuhan bisnis unik Anda.", learnMore: "Selengkapnya →", items: [
            { title: "Solusi Kreatif", desc: "Kami memberdayakan bisnis melalui solusi branding inovatif yang menarik perhatian dan mendorong engagement." },
            { title: "Solusi IT", desc: "Menciptakan platform berdampak untuk engagement pengguna dengan teknologi mutakhir dan arsitektur modern." },
            { title: "Desain Digital", desc: "Kami memperluas jangkauan dengan strategi visual yang tepat sasaran, dari UI/UX hingga sistem identitas brand lengkap." },
            { title: "Solusi Inovatif", desc: "Menghadirkan layanan IT yang disesuaikan untuk kebutuhan bisnis Anda — dari cloud, keamanan siber, hingga integrasi AI." },
        ] },
        portfolio: { tag: "Karya Kami", title: "Menciptakan Pengalaman yang Berdampak", subtitle: "Penyedia solusi IT pelopor yang berfokus memberdayakan bisnis melalui teknologi inovatif.", learnMore: "Selengkapnya", items: [
            { title: "Solusi yang Memberdayakan", desc: "Solusi IT inovatif kami dirancang untuk meningkatkan efisiensi dan mendorong hasil bisnis yang terukur." },
            { title: "Marketing yang Memikat", desc: "Kami menyediakan strategi yang disesuaikan untuk menjangkau audiens Anda secara efektif di setiap titik kontak digital." },
            { title: "Solusi Digital Marketing", desc: "Solusi digital marketing kami meningkatkan engagement online dan memperkuat visibilitas brand Anda." },
            { title: "Marketing yang Disesuaikan", desc: "Kami menghadirkan solusi IT mutakhir yang memberdayakan brand untuk menonjol di pasar yang kompetitif." },
        ] },
        stats: ["Solusi Inovatif", "Pelanggan Puas", "Layanan Khusus", "Desain Unik"],
        testimonial: { quote: "Bermitra dengan plus. adalah perjalanan yang luar biasa. Mereka berupaya memahami tujuan kami dan melampaui ekspektasi kami.", name: "Jenifer Wang", location: "Silicon Valley, CA" },
        cta: { badge: "Mewujudkannya Menjadi Nyata", titleA: "Kami merancang & menyempurnakan", titleB: "kehadiran digital Anda", subtitle: "Kami memberdayakan bisnis untuk membangun website luar biasa dengan mudah. Solusi kami menyederhanakan proses desain web, membuatnya dapat diakses oleh semua.", start: "Siap memulai?", features: [{ t: "Identitas Brand", s: "Pengembangan Brand" }, { t: "Solusi Desain", s: "Visual Storytelling" }, { t: "IT Inovatif", s: "Solusi & Strategi" }] },
    },
};

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
    const c = COPY[useLocale()].hero;
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
                        {c.badge}
                    </span>
                </div>

                <h1
                    className="hero-animate hero-animate-delay-1 mt-8 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl drop-shadow-lg"
                    style={{ color: "var(--hero-text)", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
                >
                    {c.titleA}
                    <br />
                    <span className="gradient-text opacity-90">{c.titleB}</span>
                </h1>

                <p
                    className="hero-animate hero-animate-delay-2 mx-auto mt-4 text-lg font-semibold sm:text-xl drop-shadow-md"
                    style={{ color: "var(--hero-text)", textShadow: "0 1px 16px rgba(0,0,0,0.3)" }}
                >
                    {c.subtitle}
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
                        {c.explore}
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                    <a
                        href="#portfolio"
                        className="inline-flex items-center gap-2 rounded-full bg-white/20 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md border-2 border-white/50 transition-all hover:bg-white/30 hover:border-white/70 hover:scale-105 drop-shadow-md"
                        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
                    >
                        {c.portfolio}
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
    const c = COPY[useLocale()].services;

    return (
        <section id="services" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        {c.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                        {c.title}
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-lg text-base text-slate-600 dark:text-slate-400">
                        {c.subtitle}
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {c.items.map((s, i) => {
                        const col = colorMap[serviceMeta[i].color];
                        return (
                            <div
                                key={i}
                                className={`group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${col.glow}`}
                            >
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${col.bg} text-2xl`}>
                                    {serviceMeta[i].icon}
                                </div>
                                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{s.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.desc}</p>
                                <div className={`mt-4 text-xs font-semibold ${col.text} opacity-0 transition-opacity group-hover:opacity-100`}>
                                    {c.learnMore}
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
    const c = COPY[useLocale()].portfolio;

    return (
        <section id="portfolio" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/[0.2]">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                        {c.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                        {c.title}
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-lg text-base text-slate-600 dark:text-slate-400">
                        {c.subtitle}
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-8 sm:grid-cols-2">
                    {c.items.map((item, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={portfolioImages[i]}
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
                                    {c.learnMore}
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
    const labels = COPY[useLocale()].stats;

    return (
        <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
            <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-8">
                <div className="fade-up grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {statValues.map((value, i) => (
                        <div key={i} className="text-center">
                            <p className="text-4xl font-bold text-slate-900 dark:text-white lg:text-5xl">{value}</p>
                            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{labels[i]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialSection() {
    const ref = useScrollReveal();
    const c = COPY[useLocale()].testimonial;

    return (
        <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/[0.2]">
            <div ref={ref} className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                <div className="fade-up">
                    <svg className="mx-auto h-10 w-10 text-blue-500/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="mt-6 text-xl font-medium leading-relaxed text-slate-900 dark:text-white sm:text-2xl lg:text-3xl">
                        {c.quote}
                    </blockquote>
                    <div className="mt-8">
                        <p className="text-base font-semibold text-slate-900 dark:text-white">{c.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{c.location}</p>
                    </div>
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
        <section id="cta" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="fade-up relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center sm:p-16 lg:p-20">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
                    <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-blue-500/8 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-purple-500/6 blur-3xl" />

                    <div className="relative z-10">
                        <span className="inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                            {c.badge}
                        </span>
                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                            {c.titleA}
                            <br />
                            <span className="gradient-text">{c.titleB}</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-lg text-base text-slate-600 dark:text-slate-400">
                            {c.subtitle}
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href={`/${locale}#pricing`}
                                className="btn-glow inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 hover:shadow-2xl"
                            >
                                {c.start}
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>

                        {/* Bottom features */}
                        <div className="mt-12 grid gap-6 sm:grid-cols-3">
                            {c.features.map((f, i) => (
                                <div key={i} className="rounded-xl bg-slate-50 dark:bg-slate-800 p-5 border border-slate-200 dark:border-slate-700">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{f.t}</p>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{f.s}</p>
                                </div>
                            ))}
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
