// Minimal in-memory token-bucket rate limiter for the contact form.
// Good enough for a single-instance deploy. For durable, multi-instance limits,
// swap this for @upstash/ratelimit (see the post-build checklist).

type Bucket = { tokens: number; updated: number };
const buckets = new Map<string, Bucket>();

const CAPACITY = 5; // burst
const REFILL_PER_MS = 5 / (60 * 60 * 1000); // ~5 per hour

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: CAPACITY, updated: now };

  bucket.tokens = Math.min(
    CAPACITY,
    bucket.tokens + (now - bucket.updated) * REFILL_PER_MS,
  );
  bucket.updated = now;

  if (bucket.tokens < 1) {
    buckets.set(key, bucket);
    const retryAfter = Math.ceil((1 - bucket.tokens) / REFILL_PER_MS / 1000);
    return { ok: false, retryAfter };
  }

  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return { ok: true, retryAfter: 0 };
}
