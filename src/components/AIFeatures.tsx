"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const aiFeatures = [
    {
        title: "AI Image Generator",
        description: "Create beautiful art with artificial intelligence. Three APIs integrated: OpenAI, Stable Diffusion and Stability AI — 100+ models combined.",
        icon: "🎨",
        accent: "primary" as const,
    },
    {
        title: "AI Text Generator",
        description: "Write smarter and save time with AI-powered tools. Generate copy, content, and creative writing that connects with your audience.",
        icon: "✍️",
        accent: "secondary" as const,
    },
    {
        title: "AI Chat Bot",
        description: "Personal AI Chat Bot — cost-effective, 24/7 availability, and flexible. Seamless conversations and instant answers for any need.",
        icon: "💬",
        accent: "primary" as const,
    },
    {
        title: "AI Video Generator",
        description: "AI video that works while you sleep. Text-to-Video generation for seamless integration and engaging multimedia content.",
        icon: "🎬",
        accent: "tertiary" as const,
    },
    {
        title: "AI Music Generator",
        description: "Create music generated using text. Text-to-Music generation API for seamless integration and engaging audio content creation.",
        icon: "🎵",
        accent: "secondary" as const,
    },
];

const accentMap = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    tertiary: "bg-tertiary/10",
};

const services = [
    {
        title: "Cloud Solutions",
        description: "Tailored cloud services to enhance your business operations and scalability.",
        icon: "☁️",
    },
    {
        title: "Marketing Solutions",
        description: "Customized marketing strategies that yield impactful results and drive engagement.",
        icon: "📈",
    },
    {
        title: "Innovative Solutions",
        description: "Cutting-edge services that enable businesses to excel in the digital realm.",
        icon: "💡",
    },
];



export default function AIFeatures() {
    const ref = useScrollReveal();

    return (
        <section id="features" className="py-24 lg:py-32 bg-background">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* AI Features */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="fade-up inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
                        AI Features
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                        Powered by Artificial Intelligence
                    </h2>
                    <p className="fade-up fade-up-delay-2 mt-4 text-base leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                        From image generation to music creation — our AI tools help you build smarter and faster.
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {aiFeatures.map((f, i) => (
                        <div
                            key={i}
                            className="group rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30"
                        >
                            <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accentMap[f.accent]} text-2xl transition-transform group-hover:scale-110`}>
                                {f.icon}
                            </span>
                            <h3 className="mt-5 text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">{f.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{f.description}</p>
                        </div>
                    ))}
                </div>

                {/* Services row */}
                <div className="mt-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="fade-up inline-block rounded-full bg-tertiary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tertiary">
                            IT Solutions
                        </span>
                        <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
                            Digital Strategies That Drive Growth
                        </h2>
                    </div>

                    <div className="fade-up fade-up-delay-2 mt-12 grid gap-6 sm:grid-cols-3">
                        {services.map((s, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-tertiary/30"
                            >
                                <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-tertiary/10 text-xl mb-4">
                                    {s.icon}
                                </span>
                                <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">{s.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{s.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
