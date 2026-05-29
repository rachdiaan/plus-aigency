"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Logo from "@/components/Logo";
import { useTranslation } from "@/components/LanguageProvider";

const productLinks = [
    { labelKey: "Chat Bot", href: "/chat-bot" },
    { labelKey: "Customer Support", href: "/customer-support" },
    { labelKey: "Mobile App", href: "/mobile-app" },
    { labelKey: "CRM", href: "/crm" },
    { labelKey: "Digital Agency", href: "/digital-agency" },
    { labelKey: "Mobile Game", href: "/mobile-game" },
];

const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/plusthesite/" },
    { label: "Facebook", href: "https://www.facebook.com/plusthesite/" },
    { label: "X (Twitter)", href: "https://x.com/plusthesite" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/plusthesite/" },
];

export default function Footer() {
    const ref = useScrollReveal();
    const t = useTranslation();

    const companyLinks = [
        { label: t.footer.aboutUs, href: "https://plusthe.site/about-us-1/" },
        { label: t.footer.ourWork, href: "https://plusthe.site/our-work-1/" },
        { label: t.footer.services, href: "https://plusthe.site/services-1/" },
        { label: t.pricing.badge, href: "https://plusthe.site/pricing/" },
        { label: t.navbar.aiFeatures, href: "https://plusthe.site/ai-features/" },
        { label: t.footer.blog, href: "https://plusthe.site/blog-standard/" },
    ];

    return (
        <footer id="contact" className="bg-footer-bg text-footer-text">
            <div ref={ref} className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
                    {/* Logo + tagline */}
                    <div className="fade-up max-w-xs">
                        <Logo variant="light" size="large" />
                        <p className="mt-3 text-sm leading-relaxed text-footer-muted">
                            {t.footer.tagline}
                        </p>
                    </div>

                    {/* Link columns */}
                    <div className="fade-up fade-up-delay-1 flex flex-wrap gap-16">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-footer-muted">
                                {t.footer.productsLabel}
                            </p>
                            <div className="mt-4 flex flex-col gap-3">
                                {productLinks.map((link) => (
                                    <a
                                        key={link.labelKey}
                                        href={link.href}
                                        className="text-sm text-footer-muted transition-colors hover:text-footer-text"
                                    >
                                        {link.labelKey}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-footer-muted">
                                {t.footer.companyLabel}
                            </p>
                            <div className="mt-4 flex flex-col gap-3">
                                {companyLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-footer-muted transition-colors hover:text-footer-text"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-footer-muted">
                                {t.footer.connectLabel}
                            </p>
                            <div className="mt-4 flex flex-col gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
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
                            href="https://plusthe.site/contact-us/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-footer-border px-7 py-3 text-sm font-semibold text-footer-text transition-all hover:border-footer-text hover:bg-footer-text hover:text-footer-bg hover:scale-105"
                        >
                            {t.footer.contactUs}
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
                        © {new Date().getFullYear()} plus. {t.footer.copyright}
                    </p>
                    <a
                        href="#hero"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-footer-border text-footer-muted transition-all hover:border-footer-text hover:text-footer-text hover:scale-110"
                        aria-label="Back to top"
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
