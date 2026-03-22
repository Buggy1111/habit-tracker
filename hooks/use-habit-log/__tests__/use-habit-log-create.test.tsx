import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useHabitLog } from ".."
import { createTestQueryClient, createWrapper } from "./test-utils"

describe("useHabitLog - createOrUpdateLog mutation", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should create log successfully", async () => {
    const habitId = "habit-1"
    const logData = {
      habitId,
      date: "2025-01-15",
      completed: true,
      note: "Felt great!",
    }

    const mockResponse = {
      id: "log-1",
      ...logData,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    result.current.createOrUpdateLog(logData)

    await waitFor(() => expect(result.current.isCreating).toBe(false))

    expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: logData.date,
        completed: logData.completed,
        note: logData.note,
      }),
    })

    expect(toast.success).toHaveBeenCalledWith("Z\u00E1znam ulo\u017Een")
  })

  it("should create log without optional fields", async () => {
    const habitId = "habit-1"
    const logData = {
      habitId,
      completed: true,
    }

    const mockResponse = {
      id: "log-1",
      ...logData,
      date: new Date().toISOString(),
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    result.current.createOrUpdateLog(logData)

    await waitFor(() => expect(result.current.isCreating).toBe(false))

    expect(toast.success).toHaveBeenCalledWith("Z\u00E1znam ulo\u017Een")
  })

  it("should update existing log", async () => {
    const habitId = "habit-1"
    const logData = {
      habitId,
      date: "2025-01-15",
      completed: false,
      note: "Updated note",
    }

    const mockResponse = {
      id: "log-1",
      ...logData,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    result.current.createOrUpdateLog(logData)

    await waitFor(() => expect(result.current.isCreating).toBe(false))

    expect(toast.success).toHaveBeenCalledWith("Z\u00E1znam ulo\u017Een")
  })

  it("should invalidate habits query after success", async () => {
    const habitId = "habit-1"
    const logData = {
      habitId,
      completed: true,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    result.current.createOrUpdateLog(logData)

    await waitFor(() => expect(result.current.isCreating).toBe(false))

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["habits"] })
  })

  it("should show error toast on failure", async () => {
    const habitId = "habit-1"
    const logData = {
      habitId,
      completed: true,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Failed to save log" }),
    })

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    result.current.createOrUpdateLog(logData)

    await waitFor(() => expect(result.current.isCreating).toBe(false))

    expect(toast.error).toHaveBeenCalledWith("Failed to save log")
  })

  it("should show default error message if error field is missing", async () => {
    const habitId = "habit-1"
    const logData = {
      habitId,
      completed: true,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    })

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    result.current.createOrUpdateLog(logData)

    await waitFor(() => expect(result.current.isCreating).toBe(false))

    expect(toast.error).toHaveBeenCalledWith("Nepoda\u0159ilo se ulo\u017Eit z\u00E1znam")
  })

  it("should handle isCreating state correctly", async () => {
    const habitId = "habit-1"
    const logData = {
      habitId,
      completed: true,
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

    expect(result.current.isCreating).toBe(false)

    result.current.createOrUpdateLog(logData)

    // Should be creating immediately after mutation
    await waitFor(() => expect(result.current.isCreating).toBe(true))

    // Should finish creating after success
    await waitFor(() => expect(result.current.isCreating).toBe(false))
  })
})
