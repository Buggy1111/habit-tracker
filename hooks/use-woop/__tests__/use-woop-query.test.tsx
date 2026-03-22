import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useWoopPlans } from ".."
import { createTestQueryClient, createWrapper, mockWoopPlan } from "./test-utils"

describe("useWoopPlans (Query Hook)", () => {
  let queryClient: QueryClient
  const habitId = "habit-1"

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should fetch WOOP plans successfully", async () => {
    const mockResponse = [mockWoopPlan]

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useWoopPlans(habitId), { wrapper: createWrapper(queryClient) })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(1)
    expect(result.current.data?.[0].wish).toBe("Chci pravideln\u011B cvi\u010Dit")
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

    const { result } = renderHook(() => useWoopPlans(habitId), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useWoopPlans(habitId), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useWoopPlans(habitId), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const woop = result.current.data?.[0]
    expect(woop?.createdAt).toBeInstanceOf(Date)
    expect(woop?.updatedAt).toBeInstanceOf(Date)
  })

  it("should not fetch when habitId is empty", async () => {
    const { result } = renderHook(() => useWoopPlans(""), { wrapper: createWrapper(queryClient) })

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
