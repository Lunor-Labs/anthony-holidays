/**
 * In-memory sliding window rate limiter for API endpoints (inquiries, reviews).
 * Resilient and safe in serverless/Node environments.
 */

interface RateLimitRecord {
  count: number
  expiresAt: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()

// Clean up expired records every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (record.expiresAt < now) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

/**
 * Checks if a client identifier (e.g. IP address or email) has exceeded maxRequests within windowMs.
 * Returns { allowed: boolean, remaining: number, resetInSeconds: number }
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60 * 1000,
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || record.expiresAt < now) {
    rateLimitMap.set(identifier, {
      count: 1,
      expiresAt: now + windowMs,
    })
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    }
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((record.expiresAt - now) / 1000),
    }
  }

  record.count += 1
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetInSeconds: Math.ceil((record.expiresAt - now) / 1000),
  }
}
