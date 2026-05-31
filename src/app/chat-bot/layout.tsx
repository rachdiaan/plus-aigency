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
        url: "https://www.plusthe.site/chat-bot",
    },
    alternates: {
        canonical: "https://www.plusthe.site/chat-bot",
    },
};

export default function ChatBotLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": "AI Chat Bot",
                        "description": "Your Smartest AI Chatbot – Always Ready to Assist! Experience seamless conversations, instant answers, and 24/7 support.",
                        "brand": {
                            "@type": "Brand",
                            "name": "plus."
                        },
                        "offers": {
                            "@type": "AggregateOffer",
                            "priceCurrency": "USD",
                            "lowPrice": "20",
                            "highPrice": "500",
                            "offerCount": "3"
                        }
                    })
                }}
            />
            {children}
        </>
    );
}
