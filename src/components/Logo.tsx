import Image from "next/image";
import Link from "next/link";

/**
 * plus. brand logo.
 * - variant "dark"  (light backgrounds): /logo.png      — blue "p" + navy "lus."
 * - variant "light" (dark backgrounds):  /logo-dark.png — blue "p" + white "lus."
 * Keeps the brand blue in both themes (no flat all-white filter).
 */
export default function Logo({
    variant = "dark",
    size = "default",
    href = "/",
    className = "",
}: {
    variant?: "dark" | "light";
    size?: "small" | "default" | "large";
    href?: string;
    className?: string;
}) {
    // Aspect ratio matches the trimmed logo (~2.13:1) so it renders crisp
    // and tight — no squashing, no floating in empty space.
    const sizeMap = {
        small: { width: 51, height: 24 },
        default: { width: 72, height: 34 },
        large: { width: 90, height: 42 },
    };

    const { width, height } = sizeMap[size];

    return (
        <Link
            href={href}
            className={`logo-wrapper group relative inline-block ${className}`}
        >
            <Image
                src={variant === "light" ? "/logo-dark.png" : "/logo.png"}
                alt="plus."
                width={width}
                height={height}
                priority
                className="logo-image relative z-10 object-contain transition-transform duration-300"
            />
        </Link>
    );
}
