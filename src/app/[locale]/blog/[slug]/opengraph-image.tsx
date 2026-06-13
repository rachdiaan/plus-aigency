import { ImageResponse } from "next/og";
import { articles } from "@/data/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "plus. Blog";
export const dynamicParams = false;

export function generateStaticParams() {
    return articles.map((article) => ({ locale: article.locale ?? "id", slug: article.slug }));
}

export default async function Image({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);
    const title = article?.title ?? "plus. Blog";
    const category = article?.category ?? "Blog";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px",
                    background:
                        "linear-gradient(135deg, #0B1120 0%, #111c34 55%, #1b1240 100%)",
                    color: "#F8FAFC",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", fontSize: 52, fontWeight: 800, letterSpacing: "-0.03em" }}>
                        plus<span style={{ color: "#4F6EF7" }}>.</span>
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#A5B4FC",
                            border: "2px solid rgba(165,180,252,0.4)",
                            borderRadius: 999,
                            padding: "10px 26px",
                        }}
                    >
                        {category}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        fontSize: title.length > 70 ? 60 : 72,
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        maxWidth: "1000px",
                    }}
                >
                    {title}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#94A3B8" }}>
                    <div
                        style={{
                            width: 48,
                            height: 8,
                            borderRadius: 999,
                            background: "linear-gradient(90deg, #4F6EF7, #7C5CFC)",
                        }}
                    />
                    plusthe.site
                </div>
            </div>
        ),
        { ...size }
    );
}
