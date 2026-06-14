"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Logo from "@/components/Logo";
import Newsletter from "@/components/Newsletter";
import { useT, useLocale } from "@/i18n/I18nProvider";

export default function Footer() {
    const ref = useScrollReveal();
    const t = useT();
    const locale = useLocale();

    const productLinks = [
        { label: t.products.items.chatbot.title, href: `/${locale}/chat-bot`, internal: true },
        { label: t.products.items.support.title, href: "https://plusthe.site/customer-support/", internal: false },
        { label: t.products.items.mobileApp.title, href: "https://plusthe.site/mobile-app/", internal: false },
        { label: t.products.items.crm.title, href: "https://plusthe.site/crm/", internal: false },
        { label: t.products.items.agency.title, href: `/${locale}/digital-agency`, internal: true },
        { label: t.products.items.game.title, href: `/${locale}/mobile-game`, internal: true },
    ];

    const companyLinks = [
        { label: t.nav.about, href: "https://plusthe.site/about-us-1/", internal: false },
        { label: t.nav.aiFeatures, href: "https://plusthe.site/ai-features/", internal: false },
        { label: t.nav.pricing, href: "https://plusthe.site/pricing/", internal: false },
        { label: t.nav.blog, href: `/${locale}/blog`, internal: true },
    ];

    const socialLinks = [
        { label: "Instagram", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "X (Twitter)", href: "#" },
    ];

    return (
        <footer id="contact" className="bg-footer-bg text-footer-text">
            <div ref={ref} className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                {/* Newsletter */}
                <div className="fade-up mx-auto mb-16 max-w-2xl">
                    <Newsletter />
                </div>

                <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
                    {/* Logo + tagline */}
                    <div className="fade-up max-w-xs">
                        <Logo variant="light" size="large" href={`/${locale}`} />
                        <p className="mt-3 text-sm leading-relaxed text-footer-muted">
                            {t.footer.tagline}
                        </p>
                    </div>

                    {/* Link columns */}
                    <div className="fade-up fade-up-delay-1 flex flex-wrap gap-16">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-footer-muted">
                                {t.footer.products}
                            </p>
                            <div className="mt-4 flex flex-col gap-3">
                                {productLinks.map((link) =>
                                    link.internal ? (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className="text-sm text-footer-muted transition-colors hover:text-footer-text"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-footer-muted transition-colors hover:text-footer-text"
                                        >
                                            {link.label}
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-footer-muted">
                                {t.footer.company}
                            </p>
                            <div className="mt-4 flex flex-col gap-3">
                                {companyLinks.map((link) =>
                                    link.internal ? (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className="text-sm text-footer-muted transition-colors hover:text-footer-text"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-footer-muted transition-colors hover:text-footer-text"
                                        >
                                            {link.label}
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-footer-muted">
                                {t.footer.connect}
                            </p>
                            <div className="mt-4 flex flex-col gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="text-sm text-footer-muted transition-colors hover:text-footer-text"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="fade-up fade-up-delay-2 flex flex-col items-start gap-5">
                        <a
                            href="/contact-us"
                            className="rounded-full border border-footer-border px-7 py-3 text-sm font-semibold text-footer-text transition-all hover:border-footer-text hover:bg-footer-text hover:text-footer-bg hover:scale-105"
                        >
                            {t.footer.contactUs} →
                        </a>
                        <a
                            href="mailto:support@plusthe.site"
                            className="text-xl font-bold text-footer-text transition-colors hover:text-primary sm:text-2xl"
                        >
                            support@plusthe.site
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-footer-border pt-8 sm:flex-row">
                    <p className="text-sm text-footer-muted">
                        © {new Date().getFullYear()} plus. {t.footer.rights}
                    </p>
                    <a
                        href="#hero"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-footer-border text-footer-muted transition-all hover:border-footer-text hover:text-footer-text hover:scale-110"
                        aria-label={t.footer.backToTop}
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
