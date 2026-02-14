"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const monthlyPlans = [
    {
        name: "Starter",
        description: "Best for getting started",
        price: "$25",
        period: "/month",
        cta: "Choose Plan",
        highlighted: false,
        features: [
            "Explore our diverse offerings",
            "Innovative tech solutions",
            "Tailored service packages",
            "Flexible payment plans",
        ],
    },
    {
        name: "Professional",
        description: "Most popular choice",
        price: "$50",
        period: "/month",
        cta: "Choose Plan",
        highlighted: true,
        features: [
            "Comprehensive features included",
            "Innovative tech solutions",
            "Tailored digital strategies",
            "Comprehensive support services",
        ],
    },
    {
        name: "Premium",
        description: "For large-scale operations",
        price: "$500",
        period: "/month",
        cta: "Choose Plan",
        highlighted: false,
        features: [
            "Innovative tech solutions",
            "Tailored for you",
            "Tailored solutions for every need",
            "Transparent pricing with no surprises",
        ],
    },
];

const annualPlans = [
    {
        name: "Basic",
        description: "Best for getting started",
        price: "$30",
        period: "/month",
        cta: "Choose Plan",
        highlighted: false,
        features: [
            "Comprehensive IT support",
            "Tailored solutions available",
            "Innovative IT solutions",
            "Tailored service packages",
        ],
    },
    {
        name: "Professional",
        description: "Most popular choice",
        price: "$65",
        period: "/month",
        cta: "Choose Plan",
        highlighted: true,
        features: [
            "Innovative IT solutions",
            "Tailored service plans",
            "Innovative IT solutions",
            "Tailored service packages",
        ],
    },
    {
        name: "Premium",
        description: "For large-scale operations",
        price: "$650",
        period: "/month",
        cta: "Choose Plan",
        highlighted: false,
        features: [
            "Empowering your business",
            "Innovative solutions offered",
            "Tailored for your needs",
            "Transparent pricing",
        ],
    },
];

function CheckIcon({ highlighted }: { highlighted?: boolean }) {
    return (
        <svg
            className={`h-4 w-4 flex-shrink-0 ${highlighted ? "text-primary" : "text-tertiary"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(false);
    const ref = useScrollReveal();
    const plans = isAnnual ? annualPlans : monthlyPlans;

    return (
        <section id="pricing" className="py-24 lg:py-32 bg-slate-50 dark:bg-[#0B1120] bg-grid">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="fade-up inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        Pricing
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                        Choose the Right Plan for You
                    </h2>
                    <p className="fade-up fade-up-delay-2 mt-4 text-base leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                        Simple, transparent pricing that grows with your business.
                    </p>

                    {/* Toggle */}
                    <div className="fade-up fade-up-delay-2 mt-8 inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${!isAnnual
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                                : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${isAnnual
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                                : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]"
                                }`}
                        >
                            Annual
                        </button>
                    </div>
                </div>

                <div className="fade-up fade-up-delay-3 mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan, i) => (
                        <div
                            key={`${isAnnual ? "annual" : "monthly"}-${i}`}
                            className={`pricing-card relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${plan.highlighted
                                ? "border-primary bg-white dark:bg-slate-900 ring-1 ring-primary/20 shadow-xl shadow-primary/5"
                                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/80 shadow-sm hover:shadow-lg"
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <span className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-xs font-bold text-white shadow-md shadow-primary/30">
                                        Recommended
                                    </span>
                                </div>
                            )}

                            <div>
                                <h3
                                    className={`text-lg font-bold ${plan.highlighted ? "text-primary" : "text-[#0F172A] dark:text-[#F8FAFC]"
                                        }`}
                                >
                                    {plan.name}
                                </h3>
                                <p className="mt-1 text-sm text-[#64748B] dark:text-[#94A3B8]">{plan.description}</p>
                            </div>

                            <div className="mt-6 flex items-baseline gap-1">
                                <span className="text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
                                    {plan.price}
                                </span>
                                <span className="text-sm text-[#64748B] dark:text-[#94A3B8]">{plan.period}</span>
                            </div>

                            <a
                                href="https://plusthe.site/service-plus/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`mt-8 flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold transition-all hover:scale-105 ${plan.highlighted
                                    ? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl"
                                    : "border border-slate-200 dark:border-[#1E293B] bg-slate-50 dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-[#1E293B] dark:hover:text-white"
                                    }`}
                            >
                                {plan.cta}
                            </a>

                            <div className="mt-8 border-t border-slate-100 dark:border-[#1E293B] pt-6">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                                    What&apos;s included
                                </p>
                                <ul className="mt-4 flex flex-col gap-3.5">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-center gap-3">
                                            <CheckIcon highlighted={plan.highlighted} />
                                            <span className="text-sm text-[#475569] dark:text-[#CBD5E1]">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
