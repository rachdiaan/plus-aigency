import Image from "next/image";
import Link from "next/link";

/**
 * plus. brand logo — uses /public/logo.png
 * 
 * Animations:
 * - Entrance: subtle slide-in + fade on page load
 * - Hover: lift + glow pulse + slight rotation
 * - Shimmer: periodic shine sweep across the logo
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
                src="/logo.png"
                alt="plus."
                width={width}
                height={height}
                priority
                className="logo-image relative z-10 object-contain transition-transform duration-300"
                style={{
                    filter: variant === "light" ? "brightness(0) invert(1)" : "none",
                }}
            />
        </Link>
    );
}
