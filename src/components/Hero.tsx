export default function Hero() {
    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=1920&q=80&auto=format')",
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, var(--hero-overlay-from), var(--hero-overlay-via), var(--hero-overlay-to))`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/8" />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-1/4 left-12 h-20 w-20 rounded-full bg-primary/12 blur-xl float-animation hidden lg:block" />
            <div className="absolute bottom-1/3 right-16 h-32 w-32 rounded-full bg-secondary/10 blur-2xl float-animation-delayed hidden lg:block" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
                {/* Badge */}
                <div
                    className="hero-animate inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm"
                    style={{
                        background: "var(--hero-badge-bg)",
                        borderWidth: "1px",
                        borderColor: "var(--hero-badge-border)",
                    }}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-tertiary animate-pulse" />
                    <span
                        className="text-xs font-medium tracking-wide"
                        style={{ color: "var(--hero-text-muted)" }}
                    >
                        Indonesia&apos;s No.1 Digital AI-gency
                    </span>
                </div>

                <h1
                    className="hero-animate hero-animate-delay-1 mt-8 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl drop-shadow-lg"
                    style={{ color: "var(--hero-text)", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
                >
                    Build Smarter Brands.
                    <br />
                    <span className="opacity-90">Faster.</span>
                </h1>

                <p
                    className="hero-animate hero-animate-delay-2 mx-auto mt-4 text-xl font-semibold sm:text-2xl drop-shadow-md"
                    style={{ color: "var(--hero-text)", textShadow: "0 1px 16px rgba(0,0,0,0.3)" }}
                >
                    With AI + Human Creativity
                </p>

                <p
                    className="hero-animate hero-animate-delay-2 mx-auto mt-4 max-w-lg text-base leading-relaxed sm:text-lg drop-shadow-sm"
                    style={{ color: "var(--hero-text-muted)", textShadow: "0 1px 10px rgba(0,0,0,0.2)" }}
                >
                    One integrated platform for brands that want to move fast, stay consistent,
                    and still look premium — powered by AI and real creative minds.
                </p>

                <div className="hero-animate hero-animate-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <a
                        href="#products"
                        className="btn-glow inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all hover:scale-105 hover:shadow-2xl"
                        style={{
                            background: "var(--hero-btn-bg)",
                            color: "var(--hero-btn-text)",
                        }}
                    >
                        See How It Works
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                    <a
                        href="#pricing"
                        className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold backdrop-blur-md border-2 transition-all hover:scale-105 drop-shadow-md"
                        style={{
                            borderColor: "var(--hero-btn-outline-border)",
                            color: "var(--hero-btn-outline-text)",
                            textShadow: "var(--hero-text-shadow, none)"
                        }}
                    >
                        View Pricing
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
