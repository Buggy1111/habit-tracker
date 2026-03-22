import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useUserStats, type UserStats } from ".."
import { createTestQueryClient, createWrapper, mockStats } from "./test-utils"

describe("useUserStats (Query Hook)", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should fetch user statistics successfully", async () => {
    const mockResponse = mockStats

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.memberSince).toBeInstanceOf(Date)
  })

  it("should fetch all nested statistics correctly", async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    })

    const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useUserStats(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.habits.total).toBe(999)
    expect(result.current.data?.logs.total).toBe(50000)
  })
})
