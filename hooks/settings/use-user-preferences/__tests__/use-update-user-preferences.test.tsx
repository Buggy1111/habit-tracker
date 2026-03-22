import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useUpdateUserPreferences, type UserPreferences } from ".."
import { createTestQueryClient, createWrapper, mockPreferences } from "./test-utils"

describe("useUpdateUserPreferences (Mutation Hook)", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should update preferences successfully with toast", async () => {
    const updateData = {
      theme: "dark" as const,
      emailNotifications: false,
    }

    const updatedPreferences: UserPreferences = {
      ...mockPreferences,
      theme: "dark",
      emailNotifications: false,
      updatedAt: new Date(),
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...updatedPreferences,
        createdAt: updatedPreferences.createdAt.toISOString(),
        updatedAt: updatedPreferences.updatedAt.toISOString(),
      }),
    })

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(updateData)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(global.fetch).toHaveBeenCalledWith("/api/user/preferences", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })

    expect(toast.success).toHaveBeenCalledWith("Nastaven\u00ED ulo\u017Eeno")
  })

  it("should update preferences silently without toast when showToast is false", async () => {
    const updateData = {
      theme: "dark" as const,
    }

    const updatedPreferences: UserPreferences = {
      ...mockPreferences,
      theme: "dark",
      updatedAt: new Date(),
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...updatedPreferences,
        createdAt: updatedPreferences.createdAt.toISOString(),
        updatedAt: updatedPreferences.updatedAt.toISOString(),
      }),
    })

    const { result } = renderHook(() => useUpdateUserPreferences({ showToast: false }), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(updateData)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(toast.success).not.toHaveBeenCalled()
  })

  it("should optimistically update preferences", async () => {
    const updateData = {
      theme: "dark" as const,
      language: "en" as const,
    }

    // Pre-populate cache
    queryClient.setQueryData(["user", "preferences"], mockPreferences)
    ;(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: async () => ({
                ...mockPreferences,
                ...updateData,
                updatedAt: new Date().toISOString(),
                createdAt: mockPreferences.createdAt.toISOString(),
              }),
            })
          }, 100)
        })
    )

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(updateData)

    // Check optimistic update immediately
    await waitFor(() => {
      const cachedPrefs = queryClient.getQueryData<UserPreferences>(["user", "preferences"])
      expect(cachedPrefs?.theme).toBe("dark")
      expect(cachedPrefs?.language).toBe("en")
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })

  it("should rollback on error", async () => {
    const updateData = {
      theme: "dark" as const,
    }

    // Pre-populate cache
    queryClient.setQueryData(["user", "preferences"], mockPreferences)
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Update failed" }),
    })

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(updateData)

    await waitFor(() => expect(result.current.isError).toBe(true))

    // Check rollback
    const cachedPrefs = queryClient.getQueryData<UserPreferences>(["user", "preferences"])
    expect(cachedPrefs?.theme).toBe("light") // Original value

    expect(toast.error).toHaveBeenCalledWith("Nepoda\u0159ilo se ulo\u017Eit nastaven\u00ED: Update failed")
  })

  it("should update cache with server response on success", async () => {
    const updateData = {
      theme: "dark" as const,
    }

    const serverResponse: UserPreferences = {
      ...mockPreferences,
      theme: "dark",
      updatedAt: new Date("2025-01-20"),
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...serverResponse,
        createdAt: serverResponse.createdAt.toISOString(),
        updatedAt: serverResponse.updatedAt.toISOString(),
      }),
    })

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(updateData)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // Check that cache was updated with server response
    const cachedPrefs = queryClient.getQueryData<UserPreferences>(["user", "preferences"])
    expect(cachedPrefs?.theme).toBe("dark")
    expect(cachedPrefs?.updatedAt).toBeInstanceOf(Date)
  })

  it("should handle multiple preference updates", async () => {
    const updateData = {
      theme: "dark" as const,
      language: "en" as const,
      emailNotifications: false,
      weeklyReviewReminder: false,
      timezone: "America/New_York",
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockPreferences,
        ...updateData,
        updatedAt: new Date().toISOString(),
        createdAt: mockPreferences.createdAt.toISOString(),
      }),
    })

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(updateData)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(global.fetch).toHaveBeenCalledWith("/api/user/preferences", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
  })

  it("should show error toast with default message on failure", async () => {
    const updateData = {
      theme: "dark" as const,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    })

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(updateData)

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining("Nepoda\u0159ilo se ulo\u017Eit nastaven\u00ED")
    )
  })

  describe("Integration: Auto-save functionality", () => {
    it("should simulate auto-save behavior (silent updates)", async () => {
      // Pre-populate cache
      queryClient.setQueryData(["user", "preferences"], mockPreferences)

      const updates = [
        { theme: "dark" as const },
        { language: "en" as const },
        { emailNotifications: false },
      ]

      // Mock multiple successful responses
      updates.forEach(() => {
        ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            ...mockPreferences,
            updatedAt: new Date().toISOString(),
            createdAt: mockPreferences.createdAt.toISOString(),
          }),
        })
      })

      const { result } = renderHook(() => useUpdateUserPreferences({ showToast: false }), {
        wrapper: createWrapper(queryClient),
      })

      // Simulate rapid auto-save updates
      for (const update of updates) {
        result.current.mutate(update)
        await waitFor(() => expect(result.current.isIdle || result.current.isSuccess).toBe(true))
      }

      // Should not show any toasts
      expect(toast.success).not.toHaveBeenCalled()

      // Should have made all requests
      expect(global.fetch).toHaveBeenCalledTimes(3)
    })

    it("should handle toggle switches (boolean preferences)", async () => {
      // Pre-populate cache
      queryClient.setQueryData(["user", "preferences"], mockPreferences)

      // Toggle emailNotifications off
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockPreferences,
          emailNotifications: false,
          updatedAt: new Date().toISOString(),
          createdAt: mockPreferences.createdAt.toISOString(),
        }),
      })

      const { result: hook1 } = renderHook(
        () => useUpdateUserPreferences({ showToast: false }),
        { wrapper: createWrapper(queryClient) }
      )

      hook1.current.mutate({ emailNotifications: false })

      await waitFor(() => expect(hook1.current.isSuccess).toBe(true))

      // Toggle back on
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockPreferences,
          emailNotifications: true,
          updatedAt: new Date().toISOString(),
          createdAt: mockPreferences.createdAt.toISOString(),
        }),
      })

      const { result: hook2 } = renderHook(
        () => useUpdateUserPreferences({ showToast: false }),
        { wrapper: createWrapper(queryClient) }
      )

      hook2.current.mutate({ emailNotifications: true })

      await waitFor(() => expect(hook2.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })

  describe("Edge cases", () => {
    it("should handle empty update data", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockPreferences,
          updatedAt: new Date().toISOString(),
          createdAt: mockPreferences.createdAt.toISOString(),
        }),
      })

      const { result } = renderHook(() => useUpdateUserPreferences(), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate({})

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith("/api/user/preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
    })

    it("should handle network errors gracefully", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("Network error"))

      const { result } = renderHook(() => useUpdateUserPreferences(), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate({ theme: "dark" })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })
})
