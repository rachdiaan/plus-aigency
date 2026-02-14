"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";

/* ── Product dropdown items ── */
const products = [
    { icon: "🤖", label: "AI Chat Bot", desc: "Smart AI-powered chatbot", href: "/chat-bot", internal: true },
    { icon: "🎧", label: "Customer Support", desc: "Smarter support decisions", href: "https://plusthe.site/customer-support/" },
    { icon: "📱", label: "Mobile App", desc: "Mobile-first experiences", href: "https://plusthe.site/mobile-app/" },
    { icon: "📊", label: "CRM Platform", desc: "Client management tools", href: "https://plusthe.site/crm/" },
    { icon: "🚀", label: "Digital Agency", desc: "Full-service digital solutions", href: "/digital-agency", internal: true },
    { icon: "🎮", label: "Mobile Game", desc: "Immersive gaming experiences", href: "/mobile-game", internal: true },
];

const homeLinks = [
    { label: "About", href: "/#about" },
    { label: "Products", href: "/#products", hasDropdown: true },
    { label: "AI Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
];

const subpageLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/#products", hasDropdown: true },
    { label: "AI Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
];

/* ── Theme Toggle ── */
function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-6 w-6" />; // Placeholder
    }

    const isLight = theme === "light";

    return (
        <button
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className="theme-toggle"
            aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
            title={`Switch to ${isLight ? "dark" : "light"} mode`}
        >
            {isLight ? (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ) : (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" strokeLinecap="round" />
                    <line x1="12" y1="21" x2="12" y2="23" strokeLinecap="round" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeLinecap="round" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeLinecap="round" />
                    <line x1="1" y1="12" x2="3" y2="12" strokeLinecap="round" />
                    <line x1="21" y1="12" x2="23" y2="12" strokeLinecap="round" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeLinecap="round" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeLinecap="round" />
                </svg>
            )}
        </button>
    );
}

/* ── Chevron icon ── */
function ChevronDown({ open, className }: { open: boolean; className?: string }) {
    return (
        <svg
            className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""} ${className ?? ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

/* ── Desktop Dropdown ── */
function ProductsDropdown({ scrolled }: { scrolled: boolean }) {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(true);
    };

    const handleLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150);
    };

    // Close on click outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className={`nav-link inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-widest transition-colors ${scrolled
                    ? "text-muted hover:text-foreground"
                    : "text-[#0F172A] hover:text-primary dark:text-white/90 dark:hover:text-white"
                    }`}
            >
                Products
                <ChevronDown open={open} />
            </button>

            {/* Dropdown Panel */}
            <div
                className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-200 ${open
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
            >
                <div className="w-[340px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 shadow-2xl backdrop-blur-xl">
                    {/* Header */}
                    <div className="px-3 py-2 mb-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] dark:text-[#94A3B8]">
                            Our Products
                        </p>
                    </div>

                    {/* Items */}
                    {products.map((p) => (
                        <a
                            key={p.label}
                            href={p.href}
                            {...(p.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                            onClick={() => setOpen(false)}
                            className="group flex items-center gap-3.5 rounded-xl px-3 py-3 transition-all hover:bg-blue-50 dark:hover:bg-slate-800"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-lg transition-transform group-hover:scale-110">
                                {p.icon}
                            </span>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
                                    {p.label}
                                    {p.internal && (
                                        <span className="rounded bg-blue-100 dark:bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-blue-600 dark:text-blue-400">
                                            New
                                        </span>
                                    )}
                                </p>
                                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] truncate">{p.desc}</p>
                            </div>
                            <svg
                                className="ml-auto h-3.5 w-3.5 shrink-0 text-[#94A3B8] dark:text-[#64748B] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    ))}

                    {/* Footer link */}
                    <div className="mt-1 border-t border-slate-200 dark:border-slate-700 px-3 py-3">
                        <a
                            href="/#products"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-800 dark:hover:text-blue-300"
                        >
                            View All Products
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Navbar ── */
export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const navLinks = isHome ? homeLinks : subpageLinks;

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Safety check for hydration mismatch on logo variant
    const currentTheme = mounted ? theme : "light"; // Default to light on server/hydration

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "navbar-scrolled py-3"
                : "bg-transparent border-b border-transparent py-5"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* Logo */}
                {/* Logic: Dark mode = white logo, Light mode = dark logo */}
                <Logo variant={currentTheme === 'dark' ? "light" : "dark"} />

                {/* Desktop nav */}
                <div className="hidden items-center gap-10 md:flex">
                    {navLinks.map((link) =>
                        link.hasDropdown ? (
                            <ProductsDropdown key={link.label} scrolled={scrolled} />
                        ) : (
                            <a
                                key={link.label}
                                href={link.href}
                                className={`nav-link text-[13px] font-semibold uppercase tracking-widest transition-colors ${scrolled
                                    ? "text-muted hover:text-foreground"
                                    : "text-[#0F172A] hover:text-primary dark:text-white/90 dark:hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </a>
                        )
                    )}
                </div>

                {/* Right side: theme toggle + CTA */}
                <div className="hidden items-center gap-3 md:flex">
                    <ThemeToggle />
                    <a
                        href={isHome ? "#contact" : "/#pricing"}
                        className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105 bg-foreground text-background hover:opacity-90 shadow-md`}
                    >
                        {isHome ? "Contact Us" : "View Pricing"}
                    </a>
                </div>

                {/* Mobile: theme toggle + hamburger */}
                <div className="flex items-center gap-3 md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="flex flex-col gap-1.5"
                        aria-label="Toggle menu"
                    >
                        {[0, 1, 2].map((idx) => (
                            <span
                                key={idx}
                                className={`h-0.5 w-6 transition-all duration-300 ${scrolled
                                    ? "bg-foreground"
                                    : "bg-foreground dark:bg-white"
                                    } ${idx === 0 && mobileOpen ? "translate-y-2 rotate-45" : ""
                                    } ${idx === 1 && mobileOpen ? "opacity-0" : ""
                                    } ${idx === 2 && mobileOpen ? "-translate-y-2 -rotate-45" : ""
                                    }`}
                            />
                        ))}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`overflow-hidden transition-all duration-300 md:hidden ${mobileOpen ? "max-h-[600px]" : "max-h-0"
                    }`}
            >
                <div className="flex flex-col gap-1 px-6 py-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-xl">
                    {navLinks.map((link) =>
                        link.hasDropdown ? (
                            <div key={link.label}>
                                {/* Products accordion trigger */}
                                <button
                                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                                    className="flex w-full items-center justify-between py-2 text-sm font-semibold uppercase tracking-widest text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
                                >
                                    Products
                                    <ChevronDown open={mobileProductsOpen} />
                                </button>

                                {/* Products accordion content */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${mobileProductsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="grid grid-cols-2 gap-2 pb-3 pt-1">
                                        {products.map((p) => (
                                            <a
                                                key={p.label}
                                                href={p.href}
                                                {...(p.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                                                onClick={() => { setMobileOpen(false); setMobileProductsOpen(false); }}
                                                className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-slate-800 px-3 py-2.5 transition-colors hover:bg-blue-50 dark:hover:bg-slate-700"
                                            >
                                                <span className="text-base">{p.icon}</span>
                                                <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{p.label}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="py-2 text-sm font-semibold uppercase tracking-widest text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
                            >
                                {link.label}
                            </a>
                        )
                    )}
                    <a
                        href={isHome ? "#contact" : "/#pricing"}
                        onClick={() => setMobileOpen(false)}
                        className="mt-2 inline-block rounded-full bg-slate-900 dark:bg-white px-6 py-2.5 text-center text-sm font-semibold text-white dark:text-slate-900"
                    >
                        {isHome ? "Contact Us" : "View Pricing"}
                    </a>
                </div>
            </div>
        </nav>
    );
}
