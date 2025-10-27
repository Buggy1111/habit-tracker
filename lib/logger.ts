/**
 * Centralized logging utility
 *
 * In development: All logs are shown
 * In production: Only errors and warnings are shown
 *
 * TODO: Integrate with Sentry or other error tracking service for production
 */

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"

  /**
   * Log general information (development only)
   */
  log(...args: unknown[]) {
    if (this.isDevelopment) {
      console.log(...args)
    }
  }

  /**
   * Log informational messages (development only)
   */
  info(...args: unknown[]) {
    if (this.isDevelopment) {
      console.info(...args)
    }
  }

  /**
   * Log warnings (always shown)
   */
  warn(...args: unknown[]) {
    console.warn(...args)
  }

  /**
   * Log errors (always shown)
   */
  error(...args: unknown[]) {
    console.error(...args)
    // TODO: Send to Sentry in production
  }

  /**
   * Log debug information (development only)
   */
  debug(...args: unknown[]) {
    if (this.isDevelopment) {
      console.debug(...args)
    }
  }

  /**
   * Create a scoped logger with a prefix
   */
  scope(prefix: string) {
    return {
      log: (...args: unknown[]) => this.log(`[${prefix}]`, ...args),
      info: (...args: unknown[]) => this.info(`[${prefix}]`, ...args),
      warn: (...args: unknown[]) => this.warn(`[${prefix}]`, ...args),
      error: (...args: unknown[]) => this.error(`[${prefix}]`, ...args),
      debug: (...args: unknown[]) => this.debug(`[${prefix}]`, ...args),
    }
  }
}

export const logger = new Logger()

// Convenience exports for common scopes
export const apiLogger = logger.scope("API")
export const authLogger = logger.scope("AUTH")
export const dbLogger = logger.scope("DB")
