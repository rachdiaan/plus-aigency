import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Chatbot untuk Bisnis — Layanan Pelanggan 24/7 | plus.",
    description:
        "Chatbot AI cerdas untuk bisnis Indonesia: balas pelanggan otomatis 24/7, tingkatkan konversi, dan hemat biaya customer service. Coba AI Marketing Studio dari plus.",
    keywords: [
        "AI chatbot",
        "chatbot untuk bisnis",
        "chatbot AI Indonesia",
        "customer service AI",
        "chatbot WhatsApp",
        "AI marketing studio",
        "otomasi layanan pelanggan",
    ],
    alternates: {
        canonical: "https://plusthe.site/chat-bot",
    },
    openGraph: {
        title: "AI Chatbot untuk Bisnis — Layanan Pelanggan 24/7 | plus.",
        description:
            "Chatbot AI cerdas untuk bisnis Indonesia: balas pelanggan otomatis 24/7, tingkatkan konversi, dan hemat biaya customer service.",
        type: "website",
        url: "https://plusthe.site/chat-bot",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Chatbot untuk Bisnis — Layanan Pelanggan 24/7 | plus.",
        description:
            "Chatbot AI cerdas untuk bisnis Indonesia: balas pelanggan otomatis 24/7 dan tingkatkan konversi.",
    },
};

export default function ChatBotLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
