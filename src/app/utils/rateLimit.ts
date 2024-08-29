import { LRUCache } from 'lru-cache';
import { headers } from 'next/headers';

const tokenCache = new LRUCache<string, number>({
    max: 5,
    ttl: 60 * 1000,
});

export const rateLimit = (ip: string, limit = 5): boolean => {
    console.log(headers().get("x-forwarded-for"));

    const tokenCount = tokenCache.get(ip) || 0;

    if (tokenCount >= limit) {
        return false;
    }

    tokenCache.set(ip, tokenCount + 1);
    return true;
};