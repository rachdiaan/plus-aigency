"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useT } from "@/i18n/I18nProvider";

const accentMap = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    tertiary: "bg-tertiary/10",
};

export default function AIFeatures() {
    const ref = useScrollReveal();
    const t = useT();
    const f = t.aiFeatures.items;
    const s = t.aiFeatures.services;

    const aiFeatures = [
        { title: f.image.title, description: f.image.description, icon: "🎨", accent: "primary" as const },
        { title: f.text.title, description: f.text.description, icon: "✍️", accent: "secondary" as const },
        { title: f.chat.title, description: f.chat.description, icon: "💬", accent: "primary" as const },
        { title: f.video.title, description: f.video.description, icon: "🎬", accent: "tertiary" as const },
        { title: f.music.title, description: f.music.description, icon: "🎵", accent: "secondary" as const },
    ];

    const services = [
        { title: s.cloud.title, description: s.cloud.description, icon: "☁️" },
        { title: s.marketing.title, description: s.marketing.description, icon: "📈" },
        { title: s.innovative.title, description: s.innovative.description, icon: "💡" },
    ];

    return (
        <section id="features" className="py-24 lg:py-32 bg-background">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* AI Features */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="fade-up inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
                        {t.aiFeatures.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                        {t.aiFeatures.title}
                    </h2>
                    <p className="fade-up fade-up-delay-2 mt-4 text-base leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                        {t.aiFeatures.description}
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {aiFeatureMeta.map((f, i) => {
                        const item = t.aiFeatures.items[i];
                        return (
                            <a
                                key={i}
                                href={f.href}
                                className="group rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 no-underline"
                            >
                                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accentMap[f.accent]} text-2xl transition-transform group-hover:scale-110`}>
                                    {f.icon}
                                </span>
                                <h3 className="mt-5 text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">{item.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.description}</p>
                            </a>
                        );
                    })}
                </div>

                {/* Services row */}
                <div className="mt-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="fade-up inline-block rounded-full bg-tertiary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tertiary">
                            {t.aiFeatures.servicesTag}
                        </span>
                        <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
                            {t.aiFeatures.servicesTitle}
                        </h2>
                    </div>

                    <div className="fade-up fade-up-delay-2 mt-12 grid gap-6 sm:grid-cols-3">
                        {servicesMeta.map((s, i) => {
                            const svc = t.aiFeatures.services[i];
                            return (
                                <div
                                    key={i}
                                    className="rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-tertiary/30"
                                >
                                    <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-tertiary/10 text-xl mb-4">
                                        {s.icon}
                                    </span>
                                    <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">{svc.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{svc.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
