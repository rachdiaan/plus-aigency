import Image from "next/image";
import Link from "next/link";

/**
 * plus. brand logo (from the clean wordmark, transparent background).
 * - variant "dark"  (light backgrounds): original colors (blue "p" + navy "lus.")
 * - variant "light" (dark backgrounds):  auto-whitened via CSS filter
 *   (brightness 0 + invert = solid white, transparency preserved)
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
    // Aspect ratio matches the wordmark (~2.29:1) so it renders crisp & tight.
    const sizeMap = {
        small: { width: 55, height: 24 },
        default: { width: 73, height: 32 },
        large: { width: 92, height: 40 },
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
