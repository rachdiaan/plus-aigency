import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, defaultLocale } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "plus. — Global Digital AI-gency";

export default async function Image({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    background:
                        "linear-gradient(135deg, #0B1120 0%, #111c34 55%, #1b1240 100%)",
                    color: "#F8FAFC",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em" }}>
                    plus<span style={{ color: "#4F6EF7" }}>.</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        marginTop: 28,
                        fontSize: 76,
                        fontWeight: 800,
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        maxWidth: "950px",
                    }}
                >
                    {dict.meta.ogTitle}
                </div>
                <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#94A3B8", maxWidth: "900px" }}>
                    {dict.meta.ogDescription}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 44, fontSize: 28, color: "#A5B4FC" }}>
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
