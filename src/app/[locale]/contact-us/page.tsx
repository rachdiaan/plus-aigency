"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useT, useLocale } from "@/i18n/I18nProvider";

export default function ContactUsPage() {
    const t = useT();
    const locale = useLocale();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            setStatus("error");
            setErrorMessage(t.contact.requiredFields);
            return;
        }

        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, company, message }),
            });

            const data = await response.json();
            if (response.ok) {
                setStatus("success");
                setName("");
                setEmail("");
                setCompany("");
                setMessage("");
            } else {
                setStatus("error");
                setErrorMessage(data.error || t.contact.submitError);
            }
        } catch {
            setStatus("error");
            setErrorMessage(t.contact.networkError);
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 dark:bg-[#0B1120] bg-grid pt-28 pb-16 lg:pt-36">
                <div className="glow-ambient glow-ambient-1" aria-hidden="true" />
                <div className="glow-ambient glow-ambient-2" aria-hidden="true" />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <Link
                            href={`/${locale}`}
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:text-primary-dark mb-6 transition-colors"
                        >
                            <svg className="h-3 w-3 rotate-180" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            {t.contact.backToHome}
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                            {t.contact.title} <span className="gradient-text">{t.contact.titleHighlight}</span>
                        </h1>
                        <p className="mt-4 text-base leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                            {t.contact.subtitle}
                        </p>
                    </div>

                    <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-slate-900/80 p-8 shadow-xl backdrop-blur-md">
                        {status === "success" ? (
                            <div className="text-center py-8">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-6">
                                    <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">{t.contact.successTitle}</h3>
                                <p className="mt-3 text-sm text-[#475569] dark:text-[#94A3B8]">
                                    {t.contact.successMessage}
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:scale-105 transition-all"
                                >
                                    {t.contact.sendAnother}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                {status === "error" && (
                                    <div className="rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/30 p-4 text-sm text-rose-600 dark:text-rose-400">
                                        <strong>{t.contact.errorLabel} </strong> {errorMessage}
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                                        {t.contact.nameLabel} <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        disabled={status === "loading"}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-2 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-slate-400 focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                                        placeholder={t.contact.namePlaceholder}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                                        {t.contact.emailLabel} <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        disabled={status === "loading"}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-2 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-slate-400 focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                                        placeholder={t.contact.emailPlaceholder}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                                        {t.contact.companyLabel} <span className="text-slate-400 font-normal">({t.contact.optional})</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        disabled={status === "loading"}
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="mt-2 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-slate-400 focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                                        placeholder={t.contact.companyPlaceholder}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                                        {t.contact.messageLabel} <span className="text-rose-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        disabled={status === "loading"}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="mt-2 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-slate-400 focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                                        placeholder={t.contact.messagePlaceholder}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {t.contact.sending}
                                        </>
                                    ) : (
                                        t.contact.submitButton
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
