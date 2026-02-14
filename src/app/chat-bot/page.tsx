"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─────────────────────── DATA ─────────────────────── */

const capabilities = [
    {
        icon: "🧠",
        title: "AI Content Planner",
        desc: "Generate smart content calendars with AI-driven suggestions tailored to your brand and audience.",
        color: "primary" as const,
    },
    {
        icon: "🎨",
        title: "Visual Generator",
        desc: "Create stunning marketing visuals, banners, and social media assets with AI image generation.",
        color: "secondary" as const,
    },
    {
        icon: "📊",
        title: "Strategy Analyzer",
        desc: "Analyze viral potential, predict engagement, and optimize your content strategy in real-time.",
        color: "tertiary" as const,
    },
    {
        icon: "🎙️",
        title: "Live Stream Tools",
        desc: "AI-powered live streaming assistant with auto-captions, real-time analytics, and audience engagement.",
        color: "primary" as const,
    },
    {
        icon: "👥",
        title: "KOL Database",
        desc: "Find verified influencers with engagement rates, pricing, and audience demographics at your fingertips.",
        color: "secondary" as const,
    },
    {
        icon: "⚡",
        title: "AI Voice Assistant",
        desc: "Hands-free marketing automation — dictate briefs, get AI suggestions, and manage campaigns by voice.",
        color: "tertiary" as const,
    },
];

const chatMessages = [
    { role: "bot" as const, text: "Hi! 👋 I'm plus. AI assistant. How can I help your business today?", delay: 0 },
    { role: "user" as const, text: "I need a content plan for my coffee shop's Instagram", delay: 1200 },
    { role: "bot" as const, text: "Great! I'll create a 7-day content calendar for your coffee shop. Here's what I suggest:\n\n📅 Mon: Behind-the-scenes brewing\n📅 Tue: Customer testimonial repost\n📅 Wed: Tips & tricks (latte art)\n📅 Thu: New menu highlight\n📅 Fri: Weekend promo teaser\n📅 Sat: User-generated content\n📅 Sun: Relaxing vibes reel", delay: 2800 },
    { role: "user" as const, text: "That's perfect! Can you also generate a visual for Monday's post?", delay: 5000 },
    { role: "bot" as const, text: "Absolutely! 🎨 I'm generating a warm, aesthetic behind-the-scenes visual with your brand colors... Done! You can download it from the Visual Generator tab.", delay: 6500 },
];

const pricingPlans = [
    {
        name: "Starter",
        price: "$25",
        period: "/month",
        features: [
            "1,000 AI messages/month",
            "Basic content planner",
            "5 image generations/day",
            "Email support",
        ],
        highlight: false,
    },
    {
        name: "Premium",
        price: "$50",
        period: "/month",
        features: [
            "Unlimited AI messages",
            "Advanced content planner",
            "Unlimited image generation",
            "KOL database access",
            "Live stream tools",
            "Priority support 24/7",
        ],
        highlight: true,
        tag: "Most Popular",
    },
];

const testimonials = [
    {
        quote: "Collaborating with plus. was an exceptional journey. They truly grasped our goals and produced a solution that aligned perfectly with our vision.",
        name: "Mary Jones",
        role: "CEO, Laketown OH",
        avatar: "MJ",
    },
    {
        quote: "Working with plus. was a game changer. Their team crafted a platform that's both beautiful and intuitive, elevating our user engagement.",
        name: "Andrew Walker",
        role: "CTO, ITactics CA",
        avatar: "AW",
    },
    {
        quote: "Their expertise in blending technology with design truly impressed me. The platform transformed our digital engagement completely.",
        name: "Kate Doe",
        role: "CMO, Los Angeles CA",
        avatar: "KD",
    },
];

const faqs = [
    {
        q: "What are the first steps?",
        a: "Simply sign up, connect your social accounts, and our AI will analyze your brand to provide tailored content suggestions within minutes.",
    },
    {
        q: "Do you offer virtual consultations?",
        a: "Yes! Our AI assistant provides 24/7 virtual consultations. Premium users also get access to human marketing experts for strategy sessions.",
    },
    {
        q: "What industries do you specialize in?",
        a: "We serve MSMEs across F&B, fashion, beauty, tech, travel, and more. Our AI adapts to any industry's unique marketing needs.",
    },
    {
        q: "Do you collaborate with startups?",
        a: "Absolutely! We specialize in empowering startups with tailored AI solutions that drive growth and efficiency. Our Starter plan is perfect for new ventures.",
    },
];

const colorMap = {
    primary: {
        bg: "bg-primary/10",
        text: "text-primary",
        border: "border-primary/20",
        glow: "group-hover:shadow-primary/10",
    },
    secondary: {
        bg: "bg-secondary/10",
        text: "text-secondary",
        border: "border-secondary/20",
        glow: "group-hover:shadow-secondary/10",
    },
    tertiary: {
        bg: "bg-tertiary/10",
        text: "text-tertiary",
        border: "border-tertiary/20",
        glow: "group-hover:shadow-tertiary/10",
    },
};

/* ─────────────────────── COMPONENTS ─────────────────────── */

function ChatDemo() {
    const [visibleMessages, setVisibleMessages] = useState<number>(0);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];
        chatMessages.forEach((msg, i) => {
            timers.push(
                setTimeout(() => setVisibleMessages((prev) => Math.max(prev, i + 1)), msg.delay)
            );
        });
        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [visibleMessages]);

    return (
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-5 py-4">
                <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold">
                        AI
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">plus. AI Assistant</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Online — Always ready</p>
                </div>
                <div className="ml-auto flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950/50">
                {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        style={{
                            animation: "fadeSlideUp 0.3s ease-out forwards",
                        }}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${msg.role === "user"
                                ? "bg-blue-600 text-white rounded-br-md"
                                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-md"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {visibleMessages < chatMessages.length && visibleMessages > 0 && (
                    <div className="flex justify-start">
                        <div className="flex gap-1 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-bl-md">
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input bar */}
            <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-2">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none"
                        readOnly
                    />
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-transform hover:scale-110">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────── SECTIONS ─────────────────────── */

function HeroSection() {
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
                                AI-Powered Chat Bot
                            </span>
                        </div>

                        <h1 className="hero-animate hero-animate-delay-1 mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-5xl lg:text-6xl">
                            Simplify Your Life
                            <br />
                            <span className="gradient-text">With Our Chatbot</span>
                        </h1>

                        <p className="hero-animate hero-animate-delay-2 mt-5 max-w-lg text-base leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                            Your Smartest AI Chatbot — Always Ready to Assist! Experience seamless conversations,
                            instant answers, and 24/7 support. Powered by cutting-edge AI from the{" "}
                            <a
                                href="https://github.com/rachdiaan/plus-aigency"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-primary hover:underline"
                            >
                                plus. AI Marketing Studio
                            </a>.
                        </p>

                        {/* Feature pills */}
                        <div className="hero-animate hero-animate-delay-2 mt-6 flex flex-wrap gap-2">
                            {["AI Content Planner", "Image Generator", "KOL Finder", "Live Ops"].map((f) => (
                                <span key={f} className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                                    {f}
                                </span>
                            ))}
                        </div>

                        <div className="hero-animate hero-animate-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="/studio"
                                className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 hover:shadow-2xl"
                            >
                                <span>🚀</span>
                                Try AI Studio
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                            <a
                                href="#capabilities"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-8 py-3.5 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105"
                            >
                                View Capabilities
                            </a>
                        </div>

                        {/* Trust badge */}
                        <div className="hero-animate hero-animate-delay-3 mt-6 flex items-center gap-3 text-sm text-[#64748B] dark:text-[#94A3B8]">
                            <div className="flex -space-x-2">
                                {["bg-primary", "bg-secondary", "bg-tertiary", "bg-primary-dark"].map((c, i) => (
                                    <div key={i} className={`h-7 w-7 rounded-full ${c} border-2 border-white dark:border-slate-950 flex items-center justify-center text-[10px] font-bold text-white`}>
                                        {["MJ", "AW", "KD", "EC"][i]}
                                    </div>
                                ))}
                            </div>
                            <span>Trusted by <strong className="text-[#0F172A] dark:text-[#F8FAFC]">120+ professionals</strong></span>
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

    return (
        <section id="capabilities" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/[0.2]">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                        <span>⚡</span> Capabilities
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                        Your Virtual Agent for
                        <br />
                        <span className="gradient-text">Smarter Interactions</span>
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-xl text-base text-slate-600 dark:text-slate-400">
                        We harness the power of AI and collaboration to deliver tailored marketing solutions
                        that drive success for MSMEs.
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {capabilities.map((c, i) => {
                        const colors = colorMap[c.color];
                        return (
                            <div
                                key={i}
                                className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${colors.glow}`}
                            >
                                <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-all group-hover:bg-blue-500/10 group-hover:scale-150" />
                                <div className="relative z-10">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} text-2xl`}>
                                        {c.icon}
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{c.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{c.desc}</p>
                                    <div className={`mt-4 text-xs font-semibold ${colors.text} opacity-0 transition-opacity group-hover:opacity-100`}>
                                        Learn more →
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

    return (
        <section id="pricing-plans" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
            <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        Flexible Pricing
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Pick the Perfect Plan for Your Team
                    </h2>
                    <p className="fade-up fade-up-delay-2 mx-auto mt-4 max-w-lg text-base text-slate-600 dark:text-slate-400">
                        Customized pricing solutions crafted to deliver value while ensuring satisfaction.
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-14 grid gap-8 sm:grid-cols-2">
                    {pricingPlans.map((plan, i) => (
                        <div
                            key={i}
                            className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${plan.highlight
                                ? "border-blue-500 bg-white dark:bg-slate-900 shadow-blue-500/10 scale-[1.02]"
                                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                                }`}
                        >
                            {plan.tag && (
                                <span className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                    {plan.tag}
                                </span>
                            )}

                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{plan.name}</p>
                            <div className="mt-3 flex items-baseline gap-1">
                                <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                                <span className="text-base text-slate-500 dark:text-slate-400">{plan.period}</span>
                            </div>

                            <ul className="mt-8 space-y-3">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <svg className={`h-4 w-4 shrink-0 ${plan.highlight ? "text-blue-500" : "text-emerald-500"}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="/#pricing"
                                className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all hover:scale-105 ${plan.highlight
                                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
                                    : "border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                                    }`}
                            >
                                Choose Plan
                            </a>
                        </div>
                    ))}
                </div>

                {/* Team stat */}
                <p className="fade-up mt-10 text-center text-sm text-slate-500">
                    We are a team of <strong className="text-slate-900 dark:text-white">120+ dedicated professionals</strong> united by vision.
                </p>
            </div>
        </section>
    );
}

function TestimonialsSection() {
    const ref = useScrollReveal();

    return (
        <section className="py-24 lg:py-32 bg-slate-50 dark:bg-[#0B1120]">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-flex items-center gap-2 rounded-full bg-tertiary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tertiary">
                        <span>💬</span> Testimonials
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
                        What Our Clients Say
                    </h2>
                </div>

                <div className="fade-up fade-up-delay-2 mt-14 grid gap-8 sm:grid-cols-3">
                    {testimonials.map((t, i) => (
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
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{t.name}</p>
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

    return (
        <section className="py-24 lg:py-32 bg-white dark:bg-slate-950">
            <div ref={ref} className="mx-auto max-w-3xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        Need Assistance?
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="fade-up fade-up-delay-2 mt-14 space-y-3">
                    {faqs.map((faq, i) => (
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
                            <span>🚀</span> Get Started
                        </span>
                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
                            Ready to Transform Your
                            <br />
                            <span className="gradient-text">Marketing with AI?</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-lg text-base text-[#475569] dark:text-[#CBD5E1]">
                            Join 120+ businesses already using plus. AI Marketing Studio to grow their brand
                            faster and smarter.
                        </p>

                        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="/studio"
                                className="btn-glow inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 hover:shadow-2xl"
                            >
                                Launch AI Studio
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-8 py-3.5 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105"
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

export default function ChatBotPage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <CapabilitiesSection />
                <PricingSection />
                <TestimonialsSection />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />

            <style jsx global>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </>
    );
}
