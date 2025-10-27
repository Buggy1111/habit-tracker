// This file is used to register instrumentation for the Next.js app.
// It will be called ONCE when the Next.js server starts.
// https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

export async function register() {
  // Only initialize Sentry in Node.js runtime (not Edge)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config")
  }

  // Initialize Sentry for Edge runtime (middleware)
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config")
  }
}
