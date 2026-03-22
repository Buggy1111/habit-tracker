import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useUpdateHabit, type Habit, type UpdateHabitInput } from ".."
import { createTestQueryClient, createWrapper, mockHabit } from "./test-utils"

describe("useUpdateHabit (Mutation Hook)", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should update habit successfully", async () => {
    const habitId = "habit-1"
    const updateData: UpdateHabitInput = {
      name: "Drink More Water",
      description: "10 glasses daily",
    }

    const updatedHabit: Habit = {
      ...mockHabit,
      name: "Drink More Water",
      description: "10 glasses daily",
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => updatedHabit,
    })

    const { result } = renderHook(() => useUpdateHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate({ habitId, data: updateData })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })

    expect(toast.success).toHaveBeenCalledWith("N\u00E1vyk byl \u00FAsp\u011B\u0161n\u011B upraven!")
  })

  it("should invalidate queries after successful update", async () => {
    const habitId = "habit-1"
    const updateData: UpdateHabitInput = { name: "New Name" }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockHabit,
    })

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

    const { result } = renderHook(() => useUpdateHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate({ habitId, data: updateData })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["habits"] })
  })

  it("should show error toast on failure", async () => {
    const habitId = "habit-1"
    const updateData: UpdateHabitInput = { name: "New Name" }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    const { result } = renderHook(() => useUpdateHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate({ habitId, data: updateData })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(toast.error).toHaveBeenCalled()
  })
})
