import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { notFound } from "next/navigation";
import ThemeProvider from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import LanguageProvider from "@/components/LanguageProvider";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getDictionary } from "@/i18n/getDictionary";
import { locales, isLocale } from "@/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Distinctive display typeface for headings — characterful, contemporary grotesque
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE = "https://plusthe.site";

const keywordsByLocale: Record<string, string[]> = {
  en: [
    "digital agency",
    "AI agency",
    "AI chatbot service",
    "branding agency",
    "mobile app development",
    "CRM platform",
    "digital marketing",
    "AI image generator",
    "web development",
    "creative agency",
  ],
  id: [
    "digital agency Indonesia",
    "AI agency",
    "jasa chatbot AI",
    "jasa branding",
    "jasa pembuatan aplikasi mobile",
    "CRM Indonesia",
    "digital marketing",
    "AI image generator",
    "jasa pembuatan website",
    "agensi kreatif Indonesia",
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE),
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    keywords: keywordsByLocale[locale],
    alternates: {
      canonical: `${SITE}/${locale}`,
      languages: {
        en: `${SITE}/en`,
        id: `${SITE}/id`,
        "x-default": `${SITE}/en`,
      },
    },
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      type: "website",
      url: `${SITE}/${locale}`,
      locale: locale === "id" ? "id_ID" : "en_US",
      siteName: "plus.",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "plus.",
    url: SITE,
    logo: `${SITE}/favicon.png`,
    description: dict.meta.homeDescription,
    email: "support@plusthe.site",
    sameAs: ["https://www.instagram.com/plusthe.site/", "https://www.linkedin.com/company/plusthesite/"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "plus.",
    url: `${SITE}/${locale}`,
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE}/${locale}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Speed up first image paint from the CDN (better LCP) */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}>
        <ThemeProvider>
          {/* Ambient glow effects for dark mode */}
          <div className="glow-ambient glow-ambient-1" aria-hidden="true" />
          <div className="glow-ambient glow-ambient-2" aria-hidden="true" />
          <I18nProvider locale={locale} dict={dict}>
            <LanguageProvider initialLanguage={locale === "id" ? "id" : "en"}>
              {children}
            </LanguageProvider>
          </I18nProvider>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
