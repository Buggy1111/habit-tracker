/**
 * Error Handler Utility
 * Provides user-friendly error messages for API errors
 * Returns translation keys that should be resolved by the calling component
 * using useTranslations('errors') from next-intl
 */

interface ApiError {
  message?: string
  status?: number
  statusText?: string
}

/**
 * Get user-friendly error message from error object
 * Returns English error messages (default locale)
 */
export function getErrorMessage(error: unknown): string {
  // Handle string errors
  if (typeof error === "string") {
    return error
  }

  // Handle Error objects
  if (error instanceof Error) {
    // Check for network errors
    if (error.message.includes("fetch") || error.message.includes("network")) {
      return "Connection problem. Check your internet connection and try again."
    }

    // Check for timeout errors
    if (error.message.includes("timeout")) {
      return "Request took too long. Please try again."
    }

    // Return the error message if it's user-friendly
    return error.message || "Something went wrong. Please try again."
  }

  // Handle API errors with status codes
  if (error && typeof error === "object" && "status" in error) {
    const apiError = error as ApiError

    switch (apiError.status) {
      case 400:
        return "Invalid data. Check the form and try again."
      case 401:
        return "You're not signed in. Please sign in again."
      case 403:
        return "You don't have permission for this action."
      case 404:
        return "Not found. Check if the page or resource exists."
      case 409:
        return "Conflict. This record probably already exists."
      case 422:
        return "Invalid data. Check all fields and try again."
      case 429:
        return "Too many requests. Wait a moment and try again."
      case 500:
        return "Server error. Please try again later."
      case 502:
        return "Server is unavailable. Please try again later."
      case 503:
        return "Service is temporarily unavailable. Please try again later."
      default:
        return apiError.message || "Something went wrong. Please try again."
    }
  }

  // Default fallback
  return "Something went wrong. Please try again."
}

/**
 * Get error translation key from error object
 * Use this when you have access to useTranslations('errors')
 */
export function getErrorKey(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes("fetch") || error.message.includes("network")) {
      return "network"
    }
    if (error.message.includes("timeout")) {
      return "timeout"
    }
    return "default"
  }

  if (error && typeof error === "object" && "status" in error) {
    const apiError = error as ApiError
    switch (apiError.status) {
      case 400: return "badRequest"
      case 401: return "unauthorized"
      case 403: return "forbidden"
      case 404: return "notFound"
      case 409: return "conflict"
      case 422: return "unprocessable"
      case 429: return "tooManyRequests"
      case 500: return "serverError"
      case 502: return "badGateway"
      case 503: return "serviceUnavailable"
      default: return "default"
    }
  }

  return "default"
}

/**
 * Get error message from fetch Response
 */
export async function getErrorMessageFromResponse(response: Response): Promise<string> {
  try {
    const data = await response.json()
    if (data.error) {
      return getErrorMessage({ status: response.status, message: data.error })
    }
    return getErrorMessage({ status: response.status })
  } catch {
    return getErrorMessage({ status: response.status })
  }
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes("fetch") ||
      error.message.includes("network") ||
      error.message.includes("Failed to fetch")
    )
  }
  return false
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (error && typeof error === "object" && "status" in error) {
    const apiError = error as ApiError
    return apiError.status === 401 || apiError.status === 403
  }
  return false
}

/**
 * Check if error should trigger a retry
 */
export function shouldRetry(error: unknown, retryCount: number, maxRetries: number = 3): boolean {
  // Don't retry if max retries reached
  if (retryCount >= maxRetries) {
    return false
  }

  // Don't retry auth errors
  if (isAuthError(error)) {
    return false
  }

  // Retry network errors
  if (isNetworkError(error)) {
    return true
  }

  // Retry 5xx errors (server errors)
  if (error && typeof error === "object" && "status" in error) {
    const apiError = error as ApiError
    return apiError.status !== undefined && apiError.status >= 500
  }

  return false
}

/**
 * Get retry delay in milliseconds
 * Uses exponential backoff: 1s, 2s, 4s, 8s...
 */
export function getRetryDelay(attemptIndex: number): number {
  const baseDelay = 1000 // 1 second
  const maxDelay = 30000 // 30 seconds
  const delay = baseDelay * Math.pow(2, attemptIndex)
  return Math.min(delay, maxDelay)
}
