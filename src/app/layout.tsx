import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://plusthe.site"),
  icons: {
    icon: "/favicon.png",
  },
};

// Pass-through root. The real <html>/<body> live in app/[locale]/layout.tsx
// so the lang attribute and dictionaries can be locale-aware.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
