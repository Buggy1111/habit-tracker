import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { apiLogger } from "@/lib/logger"

// For development: in-memory storage
// For production: Upstash Redis (set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN)
const useRedis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN

let redis: Redis | undefined
let inMemoryStore: Map<string, { count: number; resetAt: number }> | undefined

if (useRedis) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
  apiLogger.info("Rate limiting using Upstash Redis")
} else {
  inMemoryStore = new Map()
  apiLogger.info("Rate limiting using in-memory storage (development mode)")
}

/**
 * Rate limiter for authentication endpoints (login, register)
 * Limit: 5 requests per 15 minutes
 */
export const authRateLimiter = useRedis
  ? new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: true,
      prefix: "@upstash/ratelimit:auth",
    })
  : null

/**
 * Rate limiter for API endpoints (general)
 * Limit: 100 requests per 1 minute
 */
export const apiRateLimiter = useRedis
  ? new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(100, "1 m"),
      analytics: true,
      prefix: "@upstash/ratelimit:api",
    })
  : null

/**
 * Simple in-memory rate limiter for development
 * @param key - Unique identifier (e.g., IP address or user ID)
 * @param limit - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Object with success status and remaining requests
 */
export async function inMemoryRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ success: boolean; remaining: number; reset: number }> {
  if (!inMemoryStore) {
    return { success: true, remaining: limit, reset: Date.now() + windowMs }
  }

  const now = Date.now()
  const record = inMemoryStore.get(key)

  // No record or reset time passed
  if (!record || now > record.resetAt) {
    inMemoryStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })
    return {
      success: true,
      remaining: limit - 1,
      reset: now + windowMs,
    }
  }

  // Increment count
  if (record.count < limit) {
    record.count++
    return {
      success: true,
      remaining: limit - record.count,
      reset: record.resetAt,
    }
  }

  // Rate limit exceeded
  return {
    success: false,
    remaining: 0,
    reset: record.resetAt,
  }
}

/**
 * Apply rate limiting to authentication routes (login, register)
 * @param identifier - IP address or user identifier
 * @returns Rate limit result
 */
export async function checkAuthRateLimit(identifier: string) {
  if (authRateLimiter) {
    return await authRateLimiter.limit(identifier)
  }

  // Fallback to in-memory for development
  // 5 requests per 15 minutes
  return await inMemoryRateLimit(identifier, 5, 15 * 60 * 1000)
}

/**
 * Apply rate limiting to general API routes
 * @param identifier - IP address or user identifier
 * @returns Rate limit result
 */
export async function checkApiRateLimit(identifier: string) {
  if (apiRateLimiter) {
    return await apiRateLimiter.limit(identifier)
  }

  // Fallback to in-memory for development
  // 100 requests per 1 minute
  return await inMemoryRateLimit(identifier, 100, 60 * 1000)
}

/**
 * Get IP address from request headers
 * @param request - Next.js request object
 * @returns IP address or fallback
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIp) {
    return realIp.trim()
  }

  return "unknown"
}
