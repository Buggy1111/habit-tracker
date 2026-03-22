import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useHabitLog } from ".."
import { createTestQueryClient, createWrapper } from "./test-utils"

describe("useHabitLog - Integration: Complete log workflow", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should create, update, and delete log", async () => {
    const habitId = "habit-1"
    const date = "2025-01-15"

    // Step 1: Create log
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "log-1", habitId, date, completed: true }),
    })

    const { result: hook1 } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    hook1.current.createOrUpdateLog({
      habitId,
      date,
      completed: true,
      note: "First log",
    })

    await waitFor(() => expect(hook1.current.isCreating).toBe(false))

    // Step 2: Update log (change completion status)
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "log-1", habitId, date, completed: false }),
    })

    const { result: hook2 } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    hook2.current.createOrUpdateLog({
      habitId,
      date,
      completed: false,
      note: "Updated log",
    })

    await waitFor(() => expect(hook2.current.isCreating).toBe(false))

    // Step 3: Delete log
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    const { result: hook3 } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    hook3.current.deleteLog({ habitId, date })

    await waitFor(() => expect(hook3.current.isDeleting).toBe(false))

    // Verify all success toasts were called
    expect(toast.success).toHaveBeenCalledTimes(3)
    expect(toast.success).toHaveBeenCalledWith("Z\u00E1znam ulo\u017Een")
    expect(toast.success).toHaveBeenCalledWith("Z\u00E1znam smaz\u00E1n")
  })

  it("should handle concurrent operations", async () => {
    const habitId = "habit-1"

    // Create multiple logs simultaneously
    ;(global.fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "log-1", habitId, date: "2025-01-15", completed: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "log-2", habitId, date: "2025-01-16", completed: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "log-3", habitId, date: "2025-01-17", completed: true }),
      })

    const { result } = renderHook(() => useHabitLog(), { wrapper: createWrapper(queryClient) })

    // Trigger multiple mutations
    result.current.createOrUpdateLog({ habitId, date: "2025-01-15", completed: true })
    result.current.createOrUpdateLog({ habitId, date: "2025-01-16", completed: true })
    result.current.createOrUpdateLog({ habitId, date: "2025-01-17", completed: true })

    await waitFor(() => expect(result.current.isCreating).toBe(false))

    // All should succeed
    expect(toast.success).toHaveBeenCalledTimes(3)
  })
})
