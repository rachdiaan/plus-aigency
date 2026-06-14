"use client";

import ProductPageTemplate from "@/components/ProductPageTemplate";

const featureIcons = ["📈", "👤", "🧠", "⚙️", "📧", "📊"];
const avatars = [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80&auto=format",
];

export default function CRMPage() {
    return (
        <ProductPageTemplate
            pageKey="crmPage"
            featureIcons={featureIcons}
            avatars={avatars}
            themeColors={{
                bgGradient: "from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
                badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                badgeDotColor: "bg-emerald-500",
                statsBg: "bg-gradient-to-r from-emerald-600 to-teal-600",
            }}
        />
    );
}
