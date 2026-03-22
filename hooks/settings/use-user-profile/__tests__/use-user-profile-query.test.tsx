import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useUserProfile, type UserProfile } from ".."
import { createTestQueryClient, createWrapper, mockProfile } from "./test-utils"

describe("useUserProfile (Query Hook)", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should fetch user profile successfully", async () => {
    const mockResponse = mockProfile

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useUserProfile(), { wrapper: createWrapper(queryClient) })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.name).toBe("Jan Nov\u00E1k")
    expect(result.current.data?.email).toBe("jan.novak@example.com")
    expect(global.fetch).toHaveBeenCalledWith("/api/user/profile")
  })

  it("should handle loading state", async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: async () => mockProfile,
            })
          }, 100)
        })
    )

    const { result } = renderHook(() => useUserProfile(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useUserProfile(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
    expect(result.current.data).toBeUndefined()
  })

  it("should parse dates correctly", async () => {
    const profileWithStringDates = {
      ...mockProfile,
      emailVerified: "2025-01-01T00:00:00.000Z",
      createdAt: "2025-01-01T00:00:00.000Z",
      lastLoginAt: "2025-01-15T00:00:00.000Z",
      lastActivityAt: "2025-01-16T00:00:00.000Z",
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => profileWithStringDates,
    })

    const { result } = renderHook(() => useUserProfile(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.emailVerified).toBeInstanceOf(Date)
    expect(result.current.data?.createdAt).toBeInstanceOf(Date)
    expect(result.current.data?.lastLoginAt).toBeInstanceOf(Date)
    expect(result.current.data?.lastActivityAt).toBeInstanceOf(Date)
  })

  it("should handle null dates correctly", async () => {
    const profileWithNullDates = {
      ...mockProfile,
      emailVerified: null,
      lastLoginAt: null,
      lastActivityAt: null,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => profileWithNullDates,
    })

    const { result } = renderHook(() => useUserProfile(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.emailVerified).toBeNull()
    expect(result.current.data?.lastLoginAt).toBeNull()
    expect(result.current.data?.lastActivityAt).toBeNull()
  })

  it("should handle profile with minimal data", async () => {
    const minimalProfile: UserProfile = {
      id: "user-1",
      name: null,
      email: "user@example.com",
      bio: null,
      avatarUrl: null,
      timezone: "UTC",
      emailVerified: null,
      createdAt: new Date(),
      lastLoginAt: null,
      lastActivityAt: null,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...minimalProfile,
        createdAt: minimalProfile.createdAt.toISOString(),
      }),
    })

    const { result } = renderHook(() => useUserProfile(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.name).toBeNull()
    expect(result.current.data?.bio).toBeNull()
    expect(result.current.data?.avatarUrl).toBeNull()
  })
})
