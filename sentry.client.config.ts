// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
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

  // Replay configuration
  replaysOnErrorSampleRate: 1.0, // Capture 100% of sessions with errors
  replaysSessionSampleRate: 0.1, // Capture 10% of normal sessions

  // Enable Session Replay
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration
      maskAllText: true, // Mask all text for privacy (GDPR)
      blockAllMedia: true, // Block all media for privacy
    }),
  ],

  // Filter out sensitive data
  beforeSend(event, hint) {
    // Remove query strings from URLs (may contain sensitive data)
    if (event.request?.url) {
      event.request.url = event.request.url.split("?")[0]
    }

    // Filter out known non-critical errors
    const error = hint.originalException
    if (error && typeof error === "object" && "message" in error) {
      const message = String(error.message)

      // Ignore Next.js HMR errors in development
      if (message.includes("Failed to fetch dynamically imported module")) {
        return null
      }

      // Ignore network errors (user's connection issue)
      if (message.includes("NetworkError") || message.includes("Failed to fetch")) {
        return null
      }

      // Ignore Playwright test errors
      if (message.includes("__playwright")) {
        return null
      }
    }

    return event
  },

  // Environment
  environment: process.env.NODE_ENV || "development",

  // Release tracking (set by CI/CD in production)
  // release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Ignore specific errors
  ignoreErrors: [
    // Browser extensions
    "top.GLOBALS",
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    "originalCreateNotification",
    "canvas.contentDocument",
    "MyApp_RemoveAllHighlights",
    "http://tt.epicplay.com",
    "Can't find variable: ZiteReader",
    "jigsaw is not defined",
    "ComboSearch is not defined",
    "http://loading.retry.widdit.com/",
    "atomicFindClose",
    // Facebook borked
    "fb_xd_fragment",
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
    // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
    "bmi_SafeAddOnload",
    "EBCallBackMessageReceived",
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    "conduitPage",
    // Playwright/Puppeteer
    "__playwright",
    "__puppeteer",
    // Chrome extensions
    "chrome-extension://",
    "moz-extension://",
  ],

  // Ignore specific URLs
  denyUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
    // Firefox extensions
    /^moz-extension:\/\//i,
    // Safari extensions
    /^safari-extension:\/\//i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
  ],
})
