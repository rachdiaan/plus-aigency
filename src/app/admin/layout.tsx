import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Admin — plus.",
    robots: { index: false, follow: false },
};

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${geist.className} min-h-screen bg-slate-100 text-slate-800 antialiased`}>
                {children}
            </body>
        </html>
    );
}
