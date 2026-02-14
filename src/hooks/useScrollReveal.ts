"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const targets = entry.target.querySelectorAll(".fade-up");
                        targets.forEach((target) => {
                            target.classList.add("visible");
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.05, rootMargin: "0px 0px -80px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}
