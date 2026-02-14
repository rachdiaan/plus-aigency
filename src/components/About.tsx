"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function About() {
    const ref = useScrollReveal();

    return (
        <section id="about" className="py-24 lg:py-32 bg-background">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
                    {/* Left images */}
                    <div className="relative hidden w-64 flex-shrink-0 lg:block fade-up">
                        <div className="clip-parallelogram overflow-hidden rounded-xl shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80&auto=format"
                                alt="Business collaboration"
                                width={260}
                                height={360}
                                className="h-80 w-full object-cover img-zoom"
                                unoptimized
                            />
                        </div>
                        <div className="clip-parallelogram mt-4 overflow-hidden rounded-xl shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80&auto=format"
                                alt="Team collaboration"
                                width={260}
                                height={260}
                                className="h-56 w-full object-cover img-zoom"
                                unoptimized
                            />
                        </div>
                    </div>

                    {/* Center text */}
                    <div className="flex-1 text-center">
                        <span className="fade-up inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                            About Plus
                        </span>
                        <h2 className="fade-up fade-up-delay-1 mt-5 text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-5xl lg:text-6xl">
                            Driven by
                            <br />
                            <span className="gradient-text">Innovation</span>
                        </h2>
                        <p className="fade-up fade-up-delay-2 mx-auto mt-6 max-w-md text-base leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                            plus. is a forward-thinking IT solutions provider dedicated to empowering
                            businesses through innovative technology and tailored services. We bridge
                            the gap between technology and business needs, providing solutions that
                            enhance efficiency and drive growth.
                        </p>

                        {/* Stats row */}
                        <div className="fade-up fade-up-delay-3 mt-10 flex justify-center gap-10">
                            <div>
                                <p className="text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">AI+</p>
                                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">Powered</p>
                            </div>
                            <div className="h-12 w-px bg-slate-200 dark:bg-[#1E293B]" />
                            <div>
                                <p className="text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">6+</p>
                                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">Products</p>
                            </div>
                            <div className="h-12 w-px bg-slate-200 dark:bg-[#1E293B]" />
                            <div>
                                <p className="text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">5+</p>
                                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">AI Tools</p>
                            </div>
                        </div>
                    </div>

                    {/* Right image */}
                    <div className="relative hidden w-64 flex-shrink-0 lg:block fade-up fade-up-delay-2">
                        <div className="clip-parallelogram overflow-hidden rounded-xl shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80&auto=format"
                                alt="Modern workspace"
                                width={260}
                                height={360}
                                className="h-80 w-full object-cover img-zoom"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile images row */}
                <div className="fade-up mt-12 grid grid-cols-3 gap-4 lg:hidden">
                    <div className="overflow-hidden rounded-xl shadow-md">
                        <Image
                            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&q=80&auto=format"
                            alt="Business collaboration"
                            width={200}
                            height={200}
                            className="h-32 w-full object-cover"
                            unoptimized
                        />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-md">
                        <Image
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80&auto=format"
                            alt="Modern workspace"
                            width={200}
                            height={200}
                            className="h-32 w-full object-cover"
                            unoptimized
                        />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-md">
                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&q=80&auto=format"
                            alt="Team collaboration"
                            width={200}
                            height={200}
                            className="h-32 w-full object-cover"
                            unoptimized
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
