import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useCompleteHabit, type Habit } from ".."
import { createTestQueryClient, createWrapper, mockHabit } from "./test-utils"

describe("useCompleteHabit (Mutation Hook with Optimistic Updates)", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should complete habit successfully", async () => {
    const habitId = "habit-1"

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
    })

    const { result } = renderHook(() => useCompleteHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(habitId)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}/complete`, {
      method: "POST",
    })

    expect(toast.success).toHaveBeenCalledWith("N\u00E1vyk spln\u011Bn! \u{1F389}")
  })

  it("should optimistically update habit as completed", async () => {
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

    const { result } = renderHook(() => useCompleteHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(habitId)

    // Check optimistic update immediately
    await waitFor(() => {
      const cachedHabits = queryClient.getQueryData<Habit[]>(["habits"])
      expect(cachedHabits?.[0].completed).toBe(true)
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

    const { result } = renderHook(() => useCompleteHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(habitId)

    await waitFor(() => expect(result.current.isError).toBe(true))

    // Check rollback
    const cachedHabits = queryClient.getQueryData<Habit[]>(["habits"])
    expect(cachedHabits?.[0].completed).toBe(false)

    expect(toast.error).toHaveBeenCalled()
  })

  it("should invalidate queries after success", async () => {
    const habitId = "habit-1"

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
    })

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

    const { result } = renderHook(() => useCompleteHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(habitId)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["habits"] })
  })
})
