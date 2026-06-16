import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { locales, defaultLocale } from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

/** Refresh the Supabase auth session cookie (admin area). */
async function updateSession(request: NextRequest) {
    let response = NextResponse.next({ request });
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return response;

    const supabase = createServerClient(url, key, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                response = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options)
                );
            },
        },
    });
    await supabase.auth.getUser();
    return response;
}

function getPreferredLocale(request: NextRequest): string {
    // 1. Cookie set by the language switcher
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
        return cookieLocale;
    }

    // 2. Accept-Language header
    const accept = request.headers.get("accept-language");
    if (accept) {
        const preferred = accept
            .split(",")
            .map((part) => part.split(";")[0].trim().toLowerCase());
        for (const lang of preferred) {
            const base = lang.split("-")[0];
            if ((locales as readonly string[]).includes(base)) {
                return base;
            }
        }
    }

    // 3. Fallback
    return defaultLocale;
}

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip Next internals, API routes, and files with extensions
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname === "/sitemap.xml" ||
        pathname === "/robots.txt" ||
        pathname === "/llms.txt" ||
        pathname === "/favicon.ico" ||
        pathname === "/favicon.png" ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    // Admin area: refresh the Supabase session, never locale-redirect.
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
        return await updateSession(request);
    }

    // Already has a supported locale prefix? Continue.
    const hasLocale = locales.some(
        (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );
    if (hasLocale) {
        return NextResponse.next();
    }

    // Redirect to the locale-prefixed URL
    const locale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        // Match all paths except Next internals and static assets
        "/((?!_next|api|.*\\..*).*)",
    ],
};
