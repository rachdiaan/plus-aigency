"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/I18nProvider";

/**
 * Records a view for the article (POST /api/view) and shows the live
 * count as social proof. Renders nothing until/unless the DB returns a
 * number, so it stays invisible before Supabase is configured.
 */
export default function ArticleViews({ slug }: { slug: string }) {
    const t = useT();
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        let active = true;
        fetch("/api/view", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
        })
            .then((r) => r.json())
            .then((d) => {
                if (active && typeof d.views === "number") setViews(d.views);
            })
            .catch(() => { });
        return () => {
            active = false;
        };
    }, [slug]);

    if (views === null) return null;

    return (
        <>
            <span>•</span>
            <span>{views.toLocaleString()} {t.views}</span>
        </>
    );
}
