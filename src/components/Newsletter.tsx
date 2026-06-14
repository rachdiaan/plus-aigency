"use client";

import { useState } from "react";
import { useT, useLocale } from "@/i18n/I18nProvider";

type Status = "idle" | "sending" | "success" | "error" | "invalid";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
    const t = useT();
    const locale = useLocale();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const value = email.trim().toLowerCase();
        if (!EMAIL_RE.test(value)) {
            setStatus("invalid");
            return;
        }
        setStatus("sending");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: value, locale }),
            });
            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const message =
        status === "success" ? t.newsletter.success
            : status === "error" ? t.newsletter.error
                : status === "invalid" ? t.newsletter.invalid
                    : "";

    return (
        <div className="rounded-2xl border border-footer-border bg-white/5 p-6 sm:p-7">
            <p className="text-base font-bold text-footer-text">{t.newsletter.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-footer-muted">{t.newsletter.subtitle}</p>

            <form onSubmit={submit} className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }}
                    placeholder={t.newsletter.placeholder}
                    aria-label={t.newsletter.placeholder}
                    className="flex-1 rounded-full border border-footer-border bg-white/10 px-5 py-3 text-sm text-footer-text placeholder-footer-muted outline-none transition-colors focus:border-footer-text"
                />
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-full bg-footer-text px-6 py-3 text-sm font-semibold text-footer-bg transition-all hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
                >
                    {status === "sending" ? t.newsletter.sending : t.newsletter.button}
                </button>
            </form>

            {message && (
                <p className={`mt-3 text-xs font-medium ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                    {message}
                </p>
            )}
        </div>
    );
}
