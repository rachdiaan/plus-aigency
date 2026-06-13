import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
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
  metadataBase: new URL("https://plusthe.site"),
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
  alternates: {
    canonical: "https://plusthe.site",
  },
  openGraph: {
    title: "plus. — Build Smarter Brands. Faster.",
    description:
      "One integrated platform buat brands yang pengen move fast, stay consistent, dan still look premium—powered by AI and real creative minds.",
    type: "website",
    url: "https://plusthe.site",
  },
  icons: {
    icon: "/favicon.png", // Optimized square favicon
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "plus.",
  url: "https://plusthe.site",
  logo: "https://plusthe.site/favicon.png",
  description:
    "Indonesia's No.1 Digital AI-gency — platform terintegrasi untuk branding, AI, dan solusi digital.",
  sameAs: [
    "https://www.instagram.com/",
    "https://www.linkedin.com/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Ambient glow effects for dark mode */}
          <div className="glow-ambient glow-ambient-1" aria-hidden="true" />
          <div className="glow-ambient glow-ambient-2" aria-hidden="true" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
