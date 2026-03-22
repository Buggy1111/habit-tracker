import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useUserStats, type UserStats } from ".."
import { createTestQueryClient, createWrapper, mockStats } from "./test-utils"

describe("useUserStats - Data validation, Cache, Use cases and Edge cases", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
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

      const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

      const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

        const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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
      const { result: result1 } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

      await waitFor(() => expect(result1.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledTimes(1)

      // Second render (should use cache)
      const { result: result2 } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

      const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

      const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

      const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

      const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

      const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

      const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

      const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(result.current.error).toBeDefined()
    })

    it("should return correct query result shape", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockStats,
          memberSince: mockStats.memberSince.toISOString(),
        }),
      })

      const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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
