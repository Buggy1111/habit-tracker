import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  useWoopPlans,
  useCreateWoop,
  useUpdateWoop,
  useDeleteWoop,
  type WoopPlan,
  type CreateWoopInput,
  type UpdateWoopInput,
} from "../use-woop"

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("useWoop Hooks", () => {
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

  const mockWoopPlan: WoopPlan = {
    id: "woop-1",
    habitId: "habit-1",
    wish: "Chci pravidelně cvičit",
    outcome: "Budu se cítit energičtější a zdravější",
    obstacle: "Únava po práci",
    plan: "Když se cítím unavený, připravím si cvičební oblečení večer",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-15"),
  }

  describe("useWoopPlans (Query Hook)", () => {
    const habitId = "habit-1"

    it("should fetch WOOP plans successfully", async () => {
      const mockResponse = [mockWoopPlan]

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const { result } = renderHook(() => useWoopPlans(habitId), { wrapper })

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data).toHaveLength(1)
      expect(result.current.data?.[0].wish).toBe("Chci pravidelně cvičit")
      expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}/woop`)
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

      const { result } = renderHook(() => useWoopPlans(habitId), { wrapper })

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

      const { result } = renderHook(() => useWoopPlans(habitId), { wrapper })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(result.current.error).toBeDefined()
      expect(result.current.data).toBeUndefined()
    })

    it("should parse dates correctly", async () => {
      const woopWithStringDates = {
        ...mockWoopPlan,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-15T00:00:00.000Z",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => [woopWithStringDates],
      })

      const { result } = renderHook(() => useWoopPlans(habitId), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const woop = result.current.data?.[0]
      expect(woop?.createdAt).toBeInstanceOf(Date)
      expect(woop?.updatedAt).toBeInstanceOf(Date)
    })

    it("should not fetch when habitId is empty", async () => {
      const { result } = renderHook(() => useWoopPlans(""), { wrapper })

      // Query should be disabled
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toBeUndefined()
      expect(global.fetch).not.toHaveBeenCalled()
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
          json: async () => [mockWoopPlan],
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

      const { result } = renderHook(() => useWoopPlans(habitId), { wrapper: customWrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledTimes(3)
      expect(result.current.data).toHaveLength(1)
    })
  })

  describe("useCreateWoop (Mutation Hook)", () => {
    const habitId = "habit-1"

    it("should create WOOP plan successfully", async () => {
      const newWoopInput: CreateWoopInput = {
        wish: "Chci meditovat každý den",
        outcome: "Budu klidnější a soustředěnější",
        obstacle: "Zapomenu na to",
        plan: "Když se ráno probudím, použiji budík jako připomínku",
      }

      const createdWoop: WoopPlan = {
        ...mockWoopPlan,
        id: "woop-2",
        ...newWoopInput,
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => createdWoop,
      })

      const { result } = renderHook(() => useCreateWoop(habitId), { wrapper })

      result.current.mutate(newWoopInput)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}/woop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWoopInput),
      })

      expect(toast.success).toHaveBeenCalledWith("WOOP plán byl úspěšně vytvořen!")
    })

    it("should invalidate queries after successful creation", async () => {
      const newWoopInput: CreateWoopInput = {
        wish: "Test",
        outcome: "Test",
        obstacle: "Test",
        plan: "Test",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWoopPlan,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useCreateWoop(habitId), { wrapper })

      result.current.mutate(newWoopInput)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["woop", habitId] })
    })

    it("should show error toast on failure", async () => {
      const newWoopInput: CreateWoopInput = {
        wish: "Test",
        outcome: "Test",
        obstacle: "Test",
        plan: "Test",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 400,
      })

      const { result } = renderHook(() => useCreateWoop(habitId), { wrapper })

      result.current.mutate(newWoopInput)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("useUpdateWoop (Mutation Hook)", () => {
    const habitId = "habit-1"
    const woopId = "woop-1"

    it("should update WOOP plan successfully", async () => {
      const updateData: UpdateWoopInput = {
        wish: "Updated wish",
        outcome: "Updated outcome",
      }

      const updatedWoop: WoopPlan = {
        ...mockWoopPlan,
        wish: "Updated wish",
        outcome: "Updated outcome",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => updatedWoop,
      })

      const { result } = renderHook(() => useUpdateWoop(habitId, woopId), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}/woop/${woopId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      expect(toast.success).toHaveBeenCalledWith("WOOP plán byl úspěšně upraven!")
    })

    it("should invalidate queries after successful update", async () => {
      const updateData: UpdateWoopInput = { wish: "Updated" }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWoopPlan,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useUpdateWoop(habitId, woopId), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["woop", habitId] })
    })

    it("should show error toast on failure", async () => {
      const updateData: UpdateWoopInput = { wish: "Updated" }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      const { result } = renderHook(() => useUpdateWoop(habitId, woopId), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("useDeleteWoop (Mutation Hook)", () => {
    const habitId = "habit-1"

    it("should delete WOOP plan successfully", async () => {
      const woopId = "woop-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const { result } = renderHook(() => useDeleteWoop(habitId), { wrapper })

      result.current.mutate(woopId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}/woop/${woopId}`, {
        method: "DELETE",
      })

      expect(toast.success).toHaveBeenCalledWith("WOOP plán byl smazán!")
    })

    it("should invalidate queries after successful deletion", async () => {
      const woopId = "woop-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useDeleteWoop(habitId), { wrapper })

      result.current.mutate(woopId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["woop", habitId] })
    })

    it("should show error toast on failure", async () => {
      const woopId = "woop-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      const { result } = renderHook(() => useDeleteWoop(habitId), { wrapper })

      result.current.mutate(woopId)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("Integration: Complete WOOP workflow", () => {
    const habitId = "habit-1"

    it("should create, update, and delete WOOP plan", async () => {
      // Step 1: Create
      const newWoopInput: CreateWoopInput = {
        wish: "Initial wish",
        outcome: "Initial outcome",
        obstacle: "Initial obstacle",
        plan: "Initial plan",
      }

      const createdWoop: WoopPlan = {
        id: "woop-new",
        habitId,
        ...newWoopInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => createdWoop,
      })

      const { result: createResult } = renderHook(() => useCreateWoop(habitId), { wrapper })

      createResult.current.mutate(newWoopInput)

      await waitFor(() => expect(createResult.current.isSuccess).toBe(true))

      // Step 2: Update
      const updateData: UpdateWoopInput = {
        wish: "Updated wish",
      }

      const updatedWoop: WoopPlan = {
        ...createdWoop,
        wish: "Updated wish",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => updatedWoop,
      })

      const { result: updateResult } = renderHook(() => useUpdateWoop(habitId, createdWoop.id), {
        wrapper,
      })

      updateResult.current.mutate(updateData)

      await waitFor(() => expect(updateResult.current.isSuccess).toBe(true))

      // Step 3: Delete
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const { result: deleteResult } = renderHook(() => useDeleteWoop(habitId), { wrapper })

      deleteResult.current.mutate(createdWoop.id)

      await waitFor(() => expect(deleteResult.current.isSuccess).toBe(true))

      // Verify all success toasts were called
      expect(toast.success).toHaveBeenCalledTimes(3)
    })
  })
})
