"use client";

import ProductPageTemplate from "@/components/ProductPageTemplate";

const featureIcons = ["🎧", "🎫", "💬", "📚", "📊", "🤖"];
const avatars = [
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80&auto=format",
];

export default function CustomerSupportPage() {
    return (
        <ProductPageTemplate
            pageKey="customerSupportPage"
            featureIcons={featureIcons}
            avatars={avatars}
        />
    );
}
