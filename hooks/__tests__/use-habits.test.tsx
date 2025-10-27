import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  useHabits,
  useCreateHabit,
  useCompleteHabit,
  useUpdateHabit,
  useDeleteHabit,
  type Habit,
  type CreateHabitInput,
  type UpdateHabitInput,
} from "../use-habits"

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("useHabits Hook", () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    })
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  const mockHabit: Habit = {
    id: "habit-1",
    userId: "user-1",
    name: "Drink Water",
    description: "Drink 8 glasses of water daily",
    color: "#3B82F6",
    icon: "💧",
    frequency: "daily",
    goal: 1,
    trigger: "When I wake up",
    action: "I will drink water",
    context: "In the kitchen",
    startDate: new Date("2025-01-01"),
    isActive: true,
    streak: 7,
    completed: false,
    habitStrength: 75,
    strengthLevel: {
      level: "Silný",
      description: "Skvělá práce!",
      color: "#3B82F6",
    },
    neuroplasticityPhase: {
      phase: 1,
      title: "Building Neural Pathways",
      description: "Your brain is creating new connections",
      progress: 33,
      emoji: "🧠",
      motivationalMessage: "Great start!",
      scienceInsight: "New neural pathways are forming",
    },
    daysUntilNextPhase: 14,
    extinctionBurst: {
      detected: false,
      severity: null,
      previousRate: 0,
      recentRate: 0,
      drop: 0,
      message: "",
      supportMessage: "",
    },
    longestStreak: 10,
    logs: [
      {
        id: "log-1",
        habitId: "habit-1",
        userId: "user-1",
        date: new Date("2025-01-15"),
        completed: true,
        note: null,
        createdAt: new Date("2025-01-15"),
      },
    ],
  }

  describe("useHabits (Query Hook)", () => {
    it("should fetch habits successfully", async () => {
      const mockResponse = [mockHabit]

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const { result } = renderHook(() => useHabits(), { wrapper })

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data).toHaveLength(1)
      expect(result.current.data?.[0].name).toBe("Drink Water")
      expect(global.fetch).toHaveBeenCalledWith("/api/habits")
    })

    it("should handle loading state", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: async () => [],
              })
            }, 100)
          })
      )

      const { result } = renderHook(() => useHabits(), { wrapper })

      expect(result.current.isLoading).toBe(true)
      expect(result.current.data).toBeUndefined()

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.isLoading).toBe(false)
    })

    it("should handle error state", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      const { result } = renderHook(() => useHabits(), { wrapper })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(result.current.error).toBeDefined()
      expect(result.current.data).toBeUndefined()
    })

    it("should parse dates correctly", async () => {
      const habitWithStringDates = {
        ...mockHabit,
        startDate: "2025-01-01T00:00:00.000Z",
        logs: [
          {
            id: "log-1",
            habitId: "habit-1",
            userId: "user-1",
            date: "2025-01-15T00:00:00.000Z",
            completed: true,
            note: null,
            createdAt: "2025-01-15T00:00:00.000Z",
          },
        ],
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => [habitWithStringDates],
      })

      const { result } = renderHook(() => useHabits(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const habit = result.current.data?.[0]
      expect(habit?.startDate).toBeInstanceOf(Date)
      expect(habit?.logs[0].date).toBeInstanceOf(Date)
      expect(habit?.logs[0].createdAt).toBeInstanceOf(Date)
    })

    it("should retry failed requests", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => [mockHabit],
        })

      queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            retryDelay: 0,
          },
        },
      })

      const customWrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      )

      const { result } = renderHook(() => useHabits(), { wrapper: customWrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledTimes(3)
      expect(result.current.data).toHaveLength(1)
    })
  })

  describe("useCreateHabit (Mutation Hook)", () => {
    it("should create habit successfully", async () => {
      const newHabitInput: CreateHabitInput = {
        name: "Exercise",
        description: "30 minutes daily",
        color: "#10B981",
        icon: "🏃",
        frequency: "daily",
        goal: 1,
      }

      const createdHabit: Habit = {
        ...mockHabit,
        id: "habit-2",
        name: "Exercise",
        description: "30 minutes daily",
        color: "#10B981",
        icon: "🏃",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => createdHabit,
      })

      const { result } = renderHook(() => useCreateHabit(), { wrapper })

      result.current.mutate(newHabitInput)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHabitInput),
      })

      expect(toast.success).toHaveBeenCalledWith("Návyk byl úspěšně vytvořen!")
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

      const { result } = renderHook(() => useCreateHabit(), { wrapper })

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

      const { result } = renderHook(() => useCreateHabit(), { wrapper })

      result.current.mutate(newHabitInput)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("useCompleteHabit (Mutation Hook with Optimistic Updates)", () => {
    it("should complete habit successfully", async () => {
      const habitId = "habit-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const { result } = renderHook(() => useCompleteHabit(), { wrapper })

      result.current.mutate(habitId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}/complete`, {
        method: "POST",
      })

      expect(toast.success).toHaveBeenCalledWith("Návyk splněn! 🎉")
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

      const { result } = renderHook(() => useCompleteHabit(), { wrapper })

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

      const { result } = renderHook(() => useCompleteHabit(), { wrapper })

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

      const { result } = renderHook(() => useCompleteHabit(), { wrapper })

      result.current.mutate(habitId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["habits"] })
    })
  })

  describe("useUpdateHabit (Mutation Hook)", () => {
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

      const { result } = renderHook(() => useUpdateHabit(), { wrapper })

      result.current.mutate({ habitId, data: updateData })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      expect(toast.success).toHaveBeenCalledWith("Návyk byl úspěšně upraven!")
    })

    it("should invalidate queries after successful update", async () => {
      const habitId = "habit-1"
      const updateData: UpdateHabitInput = { name: "New Name" }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockHabit,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useUpdateHabit(), { wrapper })

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

      const { result } = renderHook(() => useUpdateHabit(), { wrapper })

      result.current.mutate({ habitId, data: updateData })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("useDeleteHabit (Mutation Hook with Optimistic Updates)", () => {
    it("should delete habit successfully", async () => {
      const habitId = "habit-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const { result } = renderHook(() => useDeleteHabit(), { wrapper })

      result.current.mutate(habitId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}`, {
        method: "DELETE",
      })

      expect(toast.success).toHaveBeenCalledWith("Návyk byl smazán")
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

      const { result } = renderHook(() => useDeleteHabit(), { wrapper })

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

      const { result } = renderHook(() => useDeleteHabit(), { wrapper })

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

      const { result } = renderHook(() => useDeleteHabit(), { wrapper })

      result.current.mutate(habitId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["habits"] })
    })
  })
})
