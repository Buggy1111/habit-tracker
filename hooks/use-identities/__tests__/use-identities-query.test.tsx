import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useIdentities } from ".."
import { createTestQueryClient, createWrapper, mockIdentity } from "./test-utils"

describe("useIdentities (Query Hook)", () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should fetch identities successfully", async () => {
    const mockResponse = [mockIdentity]

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useIdentities(), { wrapper: createWrapper(queryClient) })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(1)
    expect(result.current.data?.[0].title).toBe("Zdrav\u00FD \u010Dlov\u011Bk")
    expect(global.fetch).toHaveBeenCalledWith("/api/identities")
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

    const { result } = renderHook(() => useIdentities(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useIdentities(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
    expect(result.current.data).toBeUndefined()
  })

  it("should parse dates correctly", async () => {
    const identityWithStringDates = {
      ...mockIdentity,
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-15T00:00:00.000Z",
      milestones: [
        {
          id: "milestone-1",
          identityId: "identity-1",
          title: "7 days streak",
          achieved: true,
          achievedAt: "2025-01-07T00:00:00.000Z",
          createdAt: "2025-01-01T00:00:00.000Z",
        },
      ],
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => [identityWithStringDates],
    })

    const { result } = renderHook(() => useIdentities(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const identity = result.current.data?.[0]
    expect(identity?.createdAt).toBeInstanceOf(Date)
    expect(identity?.updatedAt).toBeInstanceOf(Date)
    expect(identity?.milestones[0].createdAt).toBeInstanceOf(Date)
    expect(identity?.milestones[0].achievedAt).toBeInstanceOf(Date)
  })

  it("should handle null achievedAt dates", async () => {
    const identityWithNullDate = {
      ...mockIdentity,
      milestones: [
        {
          id: "milestone-1",
          identityId: "identity-1",
          title: "Not achieved yet",
          achieved: false,
          achievedAt: null,
          createdAt: "2025-01-01T00:00:00.000Z",
        },
      ],
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => [identityWithNullDate],
    })

    const { result } = renderHook(() => useIdentities(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const identity = result.current.data?.[0]
    expect(identity?.milestones[0].achievedAt).toBeNull()
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
        json: async () => [mockIdentity],
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

    const { result } = renderHook(() => useIdentities(), { wrapper: customWrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(global.fetch).toHaveBeenCalledTimes(3)
    expect(result.current.data).toHaveLength(1)
  })
})
