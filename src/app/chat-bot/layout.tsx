import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Chat Bot — plus.",
    description:
        "Your Smartest AI Chatbot – Always Ready to Assist! Experience seamless conversations, instant answers, and 24/7 support.",
    openGraph: {
        title: "AI Chat Bot — plus.",
        description:
            "Your Smartest AI Chatbot – Always Ready to Assist! Experience seamless conversations, instant answers, and 24/7 support.",
        type: "website",
        url: "https://plusthe.site/chat-bot",
    },
};

export default function ChatBotLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
