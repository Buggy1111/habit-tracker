import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useDeleteHabit, type Habit } from ".."
import { createTestQueryClient, createWrapper, mockHabit } from "./test-utils"

describe("useDeleteHabit (Mutation Hook with Optimistic Updates)", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should delete habit successfully", async () => {
    const habitId = "habit-1"

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
    })

    const { result } = renderHook(() => useDeleteHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(habitId)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}`, {
      method: "DELETE",
    })

    expect(toast.success).toHaveBeenCalledWith("N\u00E1vyk byl smaz\u00E1n")
  })

  it("should optimistically remove habit from list", async () => {
    const habitId = "habit-1"

    // Pre-populate cache with habits
    queryClient.setQueryData(["habits"], [mockHabit])
    ;(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ ok: true })
          }, 100)
        })
    )

    const { result } = renderHook(() => useDeleteHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(habitId)

    // Check optimistic update immediately
    await waitFor(() => {
      const cachedHabits = queryClient.getQueryData<Habit[]>(["habits"])
      expect(cachedHabits).toHaveLength(0)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })

  it("should rollback on error", async () => {
    const habitId = "habit-1"

    // Pre-populate cache
    queryClient.setQueryData(["habits"], [mockHabit])
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    const { result } = renderHook(() => useDeleteHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(habitId)

    await waitFor(() => expect(result.current.isError).toBe(true))

    // Check rollback
    const cachedHabits = queryClient.getQueryData<Habit[]>(["habits"])
    expect(cachedHabits).toHaveLength(1)
    expect(cachedHabits?.[0].id).toBe(habitId)

    expect(toast.error).toHaveBeenCalled()
  })

  it("should invalidate queries after success", async () => {
    const habitId = "habit-1"

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
    })

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

    const { result } = renderHook(() => useDeleteHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(habitId)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["habits"] })
  })
})
