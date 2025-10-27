import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useUserStats, type UserStats } from "../use-user-stats"

describe("useUserStats Hook", () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
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

  const mockStats: UserStats = {
    habits: {
      total: 15,
      active: 12,
      archived: 3,
    },
    logs: {
      total: 450,
      thisMonth: 85,
    },
    identities: {
      total: 3,
    },
    woopPlans: {
      total: 8,
    },
    thoughtRecords: {
      total: 12,
    },
    dataSize: "2.3 MB",
    memberSince: new Date("2025-01-01"),
  }

  describe("useUserStats (Query Hook)", () => {
    it("should fetch user statistics successfully", async () => {
      const mockResponse = mockStats

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data?.habits.total).toBe(15)
      expect(result.current.data?.habits.active).toBe(12)
      expect(result.current.data?.habits.archived).toBe(3)
      expect(global.fetch).toHaveBeenCalledWith("/api/user/stats")
    })

    it("should handle loading state", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: async () => mockStats,
              })
            }, 100)
          })
      )

      const { result } = renderHook(() => useUserStats(), { wrapper })

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

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(result.current.error).toBeDefined()
      expect(result.current.data).toBeUndefined()
    })

    it("should parse memberSince date correctly", async () => {
      const statsWithStringDate = {
        ...mockStats,
        memberSince: "2025-01-01T00:00:00.000Z",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => statsWithStringDate,
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data?.memberSince).toBeInstanceOf(Date)
    })

    it("should fetch all nested statistics correctly", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const data = result.current.data!

      // Habits
      expect(data.habits).toHaveProperty("total")
      expect(data.habits).toHaveProperty("active")
      expect(data.habits).toHaveProperty("archived")

      // Logs
      expect(data.logs).toHaveProperty("total")
      expect(data.logs).toHaveProperty("thisMonth")

      // Identities
      expect(data.identities).toHaveProperty("total")

      // WOOP Plans
      expect(data.woopPlans).toHaveProperty("total")

      // Thought Records
      expect(data.thoughtRecords).toHaveProperty("total")

      // Other fields
      expect(data).toHaveProperty("dataSize")
      expect(data).toHaveProperty("memberSince")
    })

    it("should handle zero statistics", async () => {
      const emptyStats: UserStats = {
        habits: {
          total: 0,
          active: 0,
          archived: 0,
        },
        logs: {
          total: 0,
          thisMonth: 0,
        },
        identities: {
          total: 0,
        },
        woopPlans: {
          total: 0,
        },
        thoughtRecords: {
          total: 0,
        },
        dataSize: "0 B",
        memberSince: new Date(),
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...emptyStats,
          memberSince: emptyStats.memberSince.toISOString(),
        }),
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data?.habits.total).toBe(0)
      expect(result.current.data?.logs.total).toBe(0)
    })

    it("should handle large numbers", async () => {
      const largeStats: UserStats = {
        habits: {
          total: 999,
          active: 500,
          archived: 499,
        },
        logs: {
          total: 50000,
          thisMonth: 1200,
        },
        identities: {
          total: 50,
        },
        woopPlans: {
          total: 300,
        },
        thoughtRecords: {
          total: 500,
        },
        dataSize: "150.7 MB",
        memberSince: new Date("2020-01-01"),
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...largeStats,
          memberSince: largeStats.memberSince.toISOString(),
        }),
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data?.habits.total).toBe(999)
      expect(result.current.data?.logs.total).toBe(50000)
    })
  })

  describe("Data validation", () => {
    it("should handle habits breakdown correctly", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockStats,
          memberSince: mockStats.memberSince.toISOString(),
        }),
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const habits = result.current.data!.habits

      // Total should equal active + archived
      expect(habits.total).toBe(habits.active + habits.archived)
      expect(habits.total).toBe(15)
      expect(habits.active).toBe(12)
      expect(habits.archived).toBe(3)
    })

    it("should handle logs breakdown correctly", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockStats,
          memberSince: mockStats.memberSince.toISOString(),
        }),
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const logs = result.current.data!.logs

      // This month should not exceed total
      expect(logs.thisMonth).toBeLessThanOrEqual(logs.total)
      expect(logs.total).toBe(450)
      expect(logs.thisMonth).toBe(85)
    })

    it("should validate dataSize format", async () => {
      const dataSizeVariations = ["0 B", "1.5 KB", "2.3 MB", "150.7 MB", "1.2 GB"]

      for (const dataSize of dataSizeVariations) {
        ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            ...mockStats,
            dataSize,
            memberSince: mockStats.memberSince.toISOString(),
          }),
        })

        const { result } = renderHook(() => useUserStats(), { wrapper })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data?.dataSize).toBe(dataSize)
        expect(typeof result.current.data?.dataSize).toBe("string")
      }
    })
  })

  describe("Cache behavior", () => {
    it("should cache statistics and not refetch immediately", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockStats,
          memberSince: mockStats.memberSince.toISOString(),
        }),
      })

      // First render
      const { result: result1 } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result1.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledTimes(1)

      // Second render (should use cache)
      const { result: result2 } = renderHook(() => useUserStats(), { wrapper })

      expect(result2.current.data).toBeDefined()
      expect(result2.current.isLoading).toBe(false)

      // Should not fetch again
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    it("should allow manual refetch", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            ...mockStats,
            memberSince: mockStats.memberSince.toISOString(),
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            ...mockStats,
            habits: { total: 20, active: 18, archived: 2 },
            memberSince: mockStats.memberSince.toISOString(),
          }),
        })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data?.habits.total).toBe(15)

      // Refetch
      result.current.refetch()

      await waitFor(() => expect(result.current.data?.habits.total).toBe(20))

      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })

  describe("Use cases", () => {
    it("should be useful for displaying user dashboard", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockStats,
          memberSince: mockStats.memberSince.toISOString(),
        }),
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const stats = result.current.data!

      // Dashboard could display these
      expect(stats.habits.active).toBeGreaterThan(0)
      expect(stats.logs.thisMonth).toBeGreaterThan(0)
      expect(stats.memberSince).toBeInstanceOf(Date)
    })

    it("should be useful for data export / settings page", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockStats,
          memberSince: mockStats.memberSince.toISOString(),
        }),
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const stats = result.current.data!

      // Settings page could show:
      expect(stats.dataSize).toBeDefined()
      expect(stats.habits.total).toBeGreaterThan(0)
      expect(stats.logs.total).toBeGreaterThan(0)
    })

    it("should show member duration", async () => {
      const oldMemberDate = new Date("2020-01-01")

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockStats,
          memberSince: oldMemberDate.toISOString(),
        }),
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const memberSince = result.current.data!.memberSince
      const now = new Date()

      // Should be an old date
      expect(memberSince).toBeInstanceOf(Date)
      expect(memberSince.getTime()).toBeLessThan(now.getTime())
      expect(now.getFullYear() - memberSince.getFullYear()).toBeGreaterThanOrEqual(5)
    })
  })

  describe("Edge cases", () => {
    it("should handle network errors gracefully", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("Network error"))

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(result.current.data).toBeUndefined()
    })

    it("should handle malformed response", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          // Missing required fields
          habits: { total: 5 },
        }),
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      // Should not crash, might have error or partial data
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })
    })

    it("should handle unauthorized access", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 401,
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(result.current.error).toBeDefined()
    })
  })

  describe("Return value structure", () => {
    it("should return correct query result shape", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockStats,
          memberSince: mockStats.memberSince.toISOString(),
        }),
      })

      const { result } = renderHook(() => useUserStats(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      // React Query properties
      expect(result.current).toHaveProperty("data")
      expect(result.current).toHaveProperty("isLoading")
      expect(result.current).toHaveProperty("isError")
      expect(result.current).toHaveProperty("isSuccess")
      expect(result.current).toHaveProperty("error")
      expect(result.current).toHaveProperty("refetch")
    })
  })
})
