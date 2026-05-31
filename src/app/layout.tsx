import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "plus. — Indonesia's No.1 Digital AI-gency",
  description:
    "One integrated platform for brands that want to move fast, stay consistent, and still look premium — powered by AI and real creative minds.",
  keywords: [
    "digital agency",
    "AI",
    "branding",
    "chatbot",
    "CRM",
    "mobile app",
    "Indonesia",
  ],
  openGraph: {
    title: "plus. — Build Smarter Brands. Faster.",
    description:
      "One integrated platform buat brands yang pengen move fast, stay consistent, dan still look premium—powered by AI and real creative minds.",
    type: "website",
    url: "https://www.plusthe.site",
  },
  icons: {
    icon: "/favicon.png", // Optimized square favicon
  },
  alternates: {
    canonical: "https://www.plusthe.site",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme / language */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
              var lang = localStorage.getItem('plus-language');
              if (lang === 'en' || lang === 'id') {
                document.documentElement.lang = lang;
              }
            } catch(e) {}
          })();
        `}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {/* Ambient glow effects for dark mode */}
            <div className="glow-ambient glow-ambient-1" aria-hidden="true" />
            <div className="glow-ambient glow-ambient-2" aria-hidden="true" />
            {/* Organization Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "plus.",
                  "url": "https://www.plusthe.site",
                  "logo": "https://www.plusthe.site/logo.png",
                  "sameAs": [
                    "https://instagram.com/plusthe.site",
                    "https://x.com/plusthe_site"
                  ]
                })
              }}
            />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
