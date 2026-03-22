import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useUserPreferences } from ".."
import { createTestQueryClient, createWrapper, mockPreferences } from "./test-utils"

describe("useUserPreferences (Query Hook)", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should fetch user preferences successfully", async () => {
    const mockResponse = mockPreferences

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useUserPreferences(), { wrapper: createWrapper(queryClient) })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.theme).toBe("light")
    expect(result.current.data?.language).toBe("cs")
    expect(global.fetch).toHaveBeenCalledWith("/api/user/preferences")
  })

  it("should handle loading state", async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: async () => mockPreferences,
            })
          }, 100)
        })
    )

    const { result } = renderHook(() => useUserPreferences(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useUserPreferences(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
    expect(result.current.data).toBeUndefined()
  })

  it("should parse dates correctly", async () => {
    const preferencesWithStringDates = {
      ...mockPreferences,
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-15T00:00:00.000Z",
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => preferencesWithStringDates,
    })

    const { result } = renderHook(() => useUserPreferences(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.createdAt).toBeInstanceOf(Date)
    expect(result.current.data?.updatedAt).toBeInstanceOf(Date)
  })
})
