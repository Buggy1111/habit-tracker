/**
 * Error Handler Utility
 * Provides user-friendly error messages for API errors
 * Converts technical errors into Czech, actionable messages
 */

interface ApiError {
  message?: string
  status?: number
  statusText?: string
}

/**
 * Get user-friendly error message from error object
 * Returns Czech translations for common error codes
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
      return "Problém s připojením. Zkontroluj své internetové připojení a zkus to znovu."
    }

    // Check for timeout errors
    if (error.message.includes("timeout")) {
      return "Požadavek trval příliš dlouho. Zkus to prosím znovu."
    }

    // Return the error message if it's user-friendly
    return error.message || "Něco se pokazilo. Zkus to znovu."
  }

  // Handle API errors with status codes
  if (error && typeof error === "object" && "status" in error) {
    const apiError = error as ApiError

    switch (apiError.status) {
      case 400:
        return "Neplatné údaje. Zkontroluj formulář a zkus to znovu."
      case 401:
        return "Nejsi přihlášen. Prosím přihlas se znovu."
      case 403:
        return "Nemáš oprávnění k této akci."
      case 404:
        return "Nenalezeno. Zkontroluj, zda stránka nebo zdroj existuje."
      case 409:
        return "Konflikt. Tento záznam již pravděpodobně existuje."
      case 422:
        return "Neplatná data. Zkontroluj všechna pole a zkus to znovu."
      case 429:
        return "Příliš mnoho požadavků. Počkej chvíli a zkus to znovu."
      case 500:
        return "Chyba serveru. Zkus to prosím později."
      case 502:
        return "Server je nedostupný. Zkus to prosím později."
      case 503:
        return "Služba je dočasně nedostupná. Zkus to prosím později."
      default:
        return apiError.message || "Něco se pokazilo. Zkus to znovu."
    }
  }

  // Default fallback
  return "Něco se pokazilo. Zkus to znovu."
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
