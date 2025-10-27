// This file configures the initialization of Sentry for edge features (middleware, edge routes, edge API routes).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  // Lower sample rate for edge (middleware runs on every request)
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.05 : 1.0,

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

    // Filter out expected middleware errors
    const error = hint.originalException
    if (error && typeof error === "object" && "message" in error) {
      const message = String(error.message)

      // Ignore auth redirects (expected behavior)
      if (message.includes("NEXT_REDIRECT")) {
        return null
      }

      // Ignore session validation errors (user just not logged in)
      if (message.includes("no session") || message.includes("session expired")) {
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
    // Next.js expected errors
    "NEXT_REDIRECT",
    "NEXT_NOT_FOUND",
    // Auth errors (expected)
    "No session found",
    "Session expired",
    "Unauthorized",
  ],
})
