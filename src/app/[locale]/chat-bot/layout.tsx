import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";

const SITE = "https://plusthe.site";

const meta = {
    en: {
        title: "AI Chatbot for Business — 24/7 Customer Service | plus.",
        description:
            "Smart AI chatbot for your business: automate customer replies 24/7, boost conversions, and cut support costs. Try the plus. AI Marketing Studio.",
        keywords: ["AI chatbot", "chatbot for business", "customer service AI", "WhatsApp chatbot", "AI marketing studio", "conversational AI"],
    },
    id: {
        title: "AI Chatbot untuk Bisnis — Layanan Pelanggan 24/7 | plus.",
        description:
            "Chatbot AI cerdas untuk bisnis: balas pelanggan otomatis 24/7, tingkatkan konversi, dan hemat biaya customer service. Coba AI Marketing Studio dari plus.",
        keywords: ["AI chatbot", "chatbot untuk bisnis", "chatbot AI Indonesia", "customer service AI", "chatbot WhatsApp", "otomasi layanan pelanggan"],
    },
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const loc = isLocale(locale) ? locale : defaultLocale;
    const m = meta[loc];
    return {
        title: m.title,
        description: m.description,
        keywords: m.keywords,
        alternates: {
            canonical: `${SITE}/${loc}/chat-bot`,
            languages: {
                en: `${SITE}/en/chat-bot`,
                id: `${SITE}/id/chat-bot`,
                "x-default": `${SITE}/en/chat-bot`,
            },
        },
        openGraph: {
            title: m.title,
            description: m.description,
            type: "website",
            url: `${SITE}/${loc}/chat-bot`,
            locale: loc === "id" ? "id_ID" : "en_US",
        },
        twitter: { card: "summary_large_image", title: m.title, description: m.description },
    };
}

export default function ChatBotLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
