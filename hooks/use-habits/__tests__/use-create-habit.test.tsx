import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useCreateHabit, type Habit, type CreateHabitInput } from ".."
import { createTestQueryClient, createWrapper, mockHabit } from "./test-utils"

describe("useCreateHabit (Mutation Hook)", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should create habit successfully", async () => {
    const newHabitInput: CreateHabitInput = {
      name: "Exercise",
      description: "30 minutes daily",
      color: "#10B981",
      icon: "\u{1F3C3}",
      frequency: "daily",
      goal: 1,
    }

    const createdHabit: Habit = {
      ...mockHabit,
      id: "habit-2",
      name: "Exercise",
      description: "30 minutes daily",
      color: "#10B981",
      icon: "\u{1F3C3}",
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => createdHabit,
    })

    const { result } = renderHook(() => useCreateHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(newHabitInput)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(global.fetch).toHaveBeenCalledWith("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHabitInput),
    })

    expect(toast.success).toHaveBeenCalledWith("N\u00E1vyk byl \u00FAsp\u011B\u0161n\u011B vytvo\u0159en!")
  })

  it("should invalidate queries after successful creation", async () => {
    const newHabitInput: CreateHabitInput = {
      name: "Read",
      color: "#F59E0B",
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockHabit,
    })

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

    const { result } = renderHook(() => useCreateHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(newHabitInput)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["habits"] })
  })

  it("should show error toast on failure", async () => {
    const newHabitInput: CreateHabitInput = {
      name: "Exercise",
      color: "#10B981",
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 400,
    })

    const { result } = renderHook(() => useCreateHabit(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(newHabitInput)

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(toast.error).toHaveBeenCalled()
  })
})
