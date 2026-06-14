const store = new Map<string, { count: number; resetTime: number }>();

// Clean stale entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
        if (now > entry.resetTime) store.delete(key);
    }
}, 5 * 60 * 1000);

/**
 * Returns true when the caller should be blocked (limit exceeded).
 * @param key     Unique key per caller (e.g. `"contact:" + ip`)
 * @param max     Max requests allowed in the window
 * @param windowMs Window length in milliseconds
 */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
    const now = Date.now();
    const entry = store.get(key);
    if (!entry || now > entry.resetTime) {
        store.set(key, { count: 1, resetTime: now + windowMs });
        return false;
    }
    entry.count++;
    return entry.count > max;
}
