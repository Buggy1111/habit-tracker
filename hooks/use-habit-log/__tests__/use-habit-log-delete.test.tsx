import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useHabitLog } from ".."
import { createTestQueryClient, createWrapper } from "./test-utils"

describe("useHabitLog - deleteLog mutation", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should delete log successfully", async () => {
    const habitId = "habit-1"
    const date = "2025-01-15"
    const logData = {
      habitId,
      date,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    result.current.deleteLog(logData)

    await waitFor(() => expect(result.current.isDeleting).toBe(false))

    expect(global.fetch).toHaveBeenCalledWith(
      `/api/habits/${habitId}/logs?date=${encodeURIComponent(date)}`,
      {
        method: "DELETE",
      }
    )

    expect(toast.success).toHaveBeenCalledWith("Z\u00E1znam smaz\u00E1n")
  })

  it("should invalidate habits query after successful deletion", async () => {
    const habitId = "habit-1"
    const date = "2025-01-15"
    const logData = {
      habitId,
      date,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    result.current.deleteLog(logData)

    await waitFor(() => expect(result.current.isDeleting).toBe(false))

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["habits"] })
  })

  it("should show error toast on deletion failure", async () => {
    const habitId = "habit-1"
    const date = "2025-01-15"
    const logData = {
      habitId,
      date,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Failed to delete log" }),
    })

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    result.current.deleteLog(logData)

    await waitFor(() => expect(result.current.isDeleting).toBe(false))

    expect(toast.error).toHaveBeenCalledWith("Failed to delete log")
  })

  it("should show default error message if error field is missing", async () => {
    const habitId = "habit-1"
    const date = "2025-01-15"
    const logData = {
      habitId,
      date,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    })

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    result.current.deleteLog(logData)

    await waitFor(() => expect(result.current.isDeleting).toBe(false))

    expect(toast.error).toHaveBeenCalledWith("Nepoda\u0159ilo se smazat z\u00E1znam")
  })

  it("should handle isDeleting state correctly", async () => {
    const habitId = "habit-1"
    const date = "2025-01-15"
    const logData = {
      habitId,
      date,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: async () => ({}),
            })
          }, 100)
        })
    )

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    expect(result.current.isDeleting).toBe(false)

    result.current.deleteLog(logData)

    // Should be deleting immediately after mutation
    await waitFor(() => expect(result.current.isDeleting).toBe(true))

    // Should finish deleting after success
    await waitFor(() => expect(result.current.isDeleting).toBe(false))
  })

  it("should properly encode date in URL", async () => {
    const habitId = "habit-1"
    const date = "2025-01-15T10:30:00.000Z"
    const logData = {
      habitId,
      date,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    result.current.deleteLog(logData)

    await waitFor(() => expect(result.current.isDeleting).toBe(false))

    expect(global.fetch).toHaveBeenCalledWith(
      `/api/habits/${habitId}/logs?date=${encodeURIComponent(date)}`,
      {
        method: "DELETE",
      }
    )
  })
})
