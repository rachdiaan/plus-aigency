"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useT } from "@/i18n/I18nProvider";

function ChevronIcon({ open }: { open: boolean }) {
    return (
        <div
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${open ? "bg-primary rotate-180" : "bg-card-bg"
                }`}
        >
            <svg
                className={`h-4 w-4 transition-colors ${open ? "text-white" : "text-muted"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const ref = useScrollReveal();
    const t = useT();

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section id="faq" className="py-24 lg:py-32 bg-background">
            <div ref={ref} className="mx-auto max-w-3xl px-6 lg:px-8">
                <div className="text-center">
                    <span className="fade-up inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        {t.faq.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                        {t.faq.title}
                    </h2>
                    <p className="fade-up fade-up-delay-2 mt-4 text-base text-[#475569] dark:text-[#94A3B8]">
                        {t.faq.description}
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-14 flex flex-col gap-4">
                    {t.faqItems.map((faq: { question: string; answer: string }, i: number) => (
                        <div
                            key={i}
                            className={`rounded-2xl border transition-all duration-300 ${openIndex === i
                                ? "border-primary/20 bg-white dark:bg-[#0B1120] shadow-lg"
                                : "border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] hover:border-primary/10"
                                }`}
                        >
                            <button
                                onClick={() => toggle(i)}
                                className="flex w-full items-center justify-between gap-4 p-6 text-left"
                            >
                                <span className="text-sm font-semibold leading-relaxed text-[#0F172A] dark:text-[#F8FAFC] sm:text-base">
                                    {faq.question}
                                </span>
                                <ChevronIcon open={openIndex === i} />
                            </button>
                            <div className={`faq-content ${openIndex === i ? "open" : ""}`}>
                                <div>
                                    <p className="px-6 pb-6 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
