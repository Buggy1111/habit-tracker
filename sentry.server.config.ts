// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  // Percentage of transactions to sample for performance monitoring
  // 1.0 = 100%, 0.1 = 10%
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Filter out sensitive data
  beforeSend(event, hint) {
    // Remove query strings from URLs (may contain sensitive data)
    if (event.request?.url) {
      event.request.url = event.request.url.split("?")[0]
    }

    // Remove sensitive headers
    if (event.request?.headers) {
      delete event.request.headers["authorization"]
      delete event.request.headers["cookie"]
      delete event.request.headers["x-api-key"]
    }

    // Filter out database connection errors (contain credentials)
    const error = hint.originalException
    if (error && typeof error === "object" && "message" in error) {
      const message = String(error.message)

      // Don't send database connection strings
      if (message.includes("postgresql://") || message.includes("DATABASE_URL")) {
        return null
      }

      // Don't send Prisma connection errors (may leak credentials)
      if (message.includes("P1001") || message.includes("Can't reach database")) {
        // Log to console instead (for debugging)
        console.error("Database connection error (not sent to Sentry):", message)
        return null
      }

      // Don't send rate limit errors (expected behavior)
      if (message.includes("Too many requests") || message.includes("Rate limit")) {
        return null
      }
    }

    return event
  },

  // Environment
  environment: process.env.NODE_ENV || "development",

  // Release tracking (set by CI/CD in production)
  // release: process.env.VERCEL_GIT_COMMIT_SHA,

  // Ignore specific errors
  ignoreErrors: [
    // Expected user errors
    "NEXT_NOT_FOUND",
    "NEXT_REDIRECT",
    // Database transient errors
    "P1000", // Authentication failed
    "P1001", // Can't reach database
    "P1008", // Operations timed out
    "P1017", // Server has closed the connection
    // Rate limiting
    "Rate limit exceeded",
    "Too many requests",
  ],

  // Integrations
  // TODO: Fix - Sentry v8 doesn't have Integrations.Prisma
  // integrations: [
  //   // Prisma instrumentation
  //   new Sentry.Integrations.Prisma({ client: undefined }), // Will auto-detect
  // ],
})
