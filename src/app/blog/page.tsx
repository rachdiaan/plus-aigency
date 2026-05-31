"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

interface BlogPost {
    id: number;
    title: string;
    description: string;
    date: string;
    category: "AI" | "Business" | "Design" | "Development";
    readTime: string;
    img: string;
}

const allPosts: BlogPost[] = [
    {
        id: 1,
        title: "How Generative AI is Reshaping Modern Brand Identity",
        description: "Explore how brands are leveraging OpenAI, Stable Diffusion, and next-gen creative models to stay consistent while scaling creative workflows.",
        date: "May 28, 2026",
        category: "AI",
        readTime: "5 min read",
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&auto=format",
    },
    {
        id: 2,
        title: "The Shift to AI-Powered Customer Support in 2026",
        description: "How combining automated ticketing logic with LLM reasoning is reducing ticket volumes by up to 40% for modern e-commerce stores.",
        date: "May 15, 2026",
        category: "Development",
        readTime: "4 min read",
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80&auto=format",
    },
    {
        id: 3,
        title: "5 CRM Automations That Save 15+ Hours Every Week",
        description: "Simple yet powerful automation flows for small businesses and UMKM that eliminate duplicate data entry and boost lead conversions.",
        date: "May 02, 2026",
        category: "Business",
        readTime: "6 min read",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format",
    },
    {
        id: 4,
        title: "Design Systems in Tailwind v4: Harmonizing Web Styles",
        description: "A deep dive into standardizing design systems, CSS variables, and maximizing theme loading performance on modern Next.js apps.",
        date: "April 24, 2026",
        category: "Design",
        readTime: "8 min read",
        img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80&auto=format",
    },
    {
        id: 5,
        title: "Building Immersive Game Logic with Cross-Platform Support",
        description: "Best practices for utilizing Unity and Unreal Engine pipelines to ship fast mobile gaming experiences on iOS and Android.",
        date: "April 10, 2026",
        category: "Development",
        readTime: "7 min read",
        img: "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&q=80&auto=format",
    },
    {
        id: 6,
        title: "The Synergy of AI and Human Artistry in Marketing",
        description: "Why pure AI marketing collateral falls flat, and why human-in-the-loop creative direction is the key to premium brand perception.",
        date: "March 27, 2026",
        category: "AI",
        readTime: "5 min read",
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format",
    },
];

const categories = ["All", "AI", "Business", "Design", "Development"] as const;

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("All");

    const filteredPosts = selectedCategory === "All"
        ? allPosts
        : allPosts.filter(p => p.category === selectedCategory);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 dark:bg-[#0B1120] bg-grid pt-28 pb-16 lg:pt-36">
                {/* Ambient glow effects */}
                <div className="glow-ambient glow-ambient-1" aria-hidden="true" />
                <div className="glow-ambient glow-ambient-2" aria-hidden="true" />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Header */}
                    <div className="mx-auto max-w-3xl text-center">
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:text-primary-dark mb-6 transition-colors"
                        >
                            <svg className="h-3 w-3 rotate-180" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            Back to Home
                        </a>
                        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                            Insights, Guides & <span className="gradient-text">Brand News</span>
                        </h1>
                        <p className="mt-4 text-base leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                            Discover latest trends on artificial intelligence, business automation, brand strategies, and cross-platform engineering.
                        </p>
                    </div>

                    {/* Filter Category Tabs */}
                    <div className="mt-12 flex flex-wrap justify-center gap-2">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setSelectedCategory(c)}
                                className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === c
                                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105"
                                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-slate-50 dark:hover:bg-slate-800"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Cover Image */}
                                <div className="relative h-52 overflow-hidden">
                                    <Image
                                        src={post.img}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute top-4 left-4 rounded-full bg-slate-900/60 dark:bg-slate-900/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                                        {post.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center gap-3 text-xs text-[#64748B] dark:text-[#94A3B8] mb-3">
                                        <span>{post.date}</span>
                                        <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8] line-clamp-3">
                                        {post.description}
                                    </p>
                                    <div className="mt-6 border-t border-slate-100 dark:border-[#1E293B] pt-4 flex items-center justify-between">
                                        <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                                            Read More
                                            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
