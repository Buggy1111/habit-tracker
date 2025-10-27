import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner"
import { useHabitLog } from "../use-habit-log"

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("useHabitLog Hook", () => {
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

  describe("createOrUpdateLog mutation", () => {
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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

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

      expect(toast.success).toHaveBeenCalledWith("Záznam uložen")
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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

      result.current.createOrUpdateLog(logData)

      await waitFor(() => expect(result.current.isCreating).toBe(false))

      expect(toast.success).toHaveBeenCalledWith("Záznam uložen")
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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

      result.current.createOrUpdateLog(logData)

      await waitFor(() => expect(result.current.isCreating).toBe(false))

      expect(toast.success).toHaveBeenCalledWith("Záznam uložen")
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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

      result.current.createOrUpdateLog(logData)

      await waitFor(() => expect(result.current.isCreating).toBe(false))

      expect(toast.error).toHaveBeenCalledWith("Nepodařilo se uložit záznam")
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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

      expect(result.current.isCreating).toBe(false)

      result.current.createOrUpdateLog(logData)

      // Should be creating immediately after mutation
      await waitFor(() => expect(result.current.isCreating).toBe(true))

      // Should finish creating after success
      await waitFor(() => expect(result.current.isCreating).toBe(false))
    })
  })

  describe("deleteLog mutation", () => {
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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

      result.current.deleteLog(logData)

      await waitFor(() => expect(result.current.isDeleting).toBe(false))

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/habits/${habitId}/logs?date=${encodeURIComponent(date)}`,
        {
          method: "DELETE",
        }
      )

      expect(toast.success).toHaveBeenCalledWith("Záznam smazán")
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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

      result.current.deleteLog(logData)

      await waitFor(() => expect(result.current.isDeleting).toBe(false))

      expect(toast.error).toHaveBeenCalledWith("Nepodařilo se smazat záznam")
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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

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

  describe("Integration: Complete log workflow", () => {
    it("should create, update, and delete log", async () => {
      const habitId = "habit-1"
      const date = "2025-01-15"

      // Step 1: Create log
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "log-1", habitId, date, completed: true }),
      })

      const { result: hook1 } = renderHook(() => useHabitLog(), { wrapper })

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

      const { result: hook2 } = renderHook(() => useHabitLog(), { wrapper })

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

      const { result: hook3 } = renderHook(() => useHabitLog(), { wrapper })

      hook3.current.deleteLog({ habitId, date })

      await waitFor(() => expect(hook3.current.isDeleting).toBe(false))

      // Verify all success toasts were called
      expect(toast.success).toHaveBeenCalledTimes(3)
      expect(toast.success).toHaveBeenCalledWith("Záznam uložen")
      expect(toast.success).toHaveBeenCalledWith("Záznam smazán")
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

      const { result } = renderHook(() => useHabitLog(), { wrapper })

      // Trigger multiple mutations
      result.current.createOrUpdateLog({ habitId, date: "2025-01-15", completed: true })
      result.current.createOrUpdateLog({ habitId, date: "2025-01-16", completed: true })
      result.current.createOrUpdateLog({ habitId, date: "2025-01-17", completed: true })

      await waitFor(() => expect(result.current.isCreating).toBe(false))

      // All should succeed
      expect(toast.success).toHaveBeenCalledTimes(3)
    })
  })
})
