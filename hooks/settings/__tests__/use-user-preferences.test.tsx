import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  useUserPreferences,
  useUpdateUserPreferences,
  type UserPreferences,
} from "../use-user-preferences"

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("useUserPreferences Hooks", () => {
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

  const mockPreferences: UserPreferences = {
    id: "pref-1",
    userId: "user-1",
    theme: "light",
    language: "cs",
    emailNotifications: true,
    weeklyReviewReminder: true,
    extinctionBurstAlerts: true,
    milestoneNotifications: true,
    analyticsEnabled: true,
    dataCollectionConsent: true,
    timezone: "Europe/Prague",
    dateFormat: "dd.MM.yyyy",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-15"),
  }

  describe("useUserPreferences (Query Hook)", () => {
    it("should fetch user preferences successfully", async () => {
      const mockResponse = mockPreferences

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const { result } = renderHook(() => useUserPreferences(), { wrapper })

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

      const { result } = renderHook(() => useUserPreferences(), { wrapper })

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

      const { result } = renderHook(() => useUserPreferences(), { wrapper })

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

      const { result } = renderHook(() => useUserPreferences(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data?.createdAt).toBeInstanceOf(Date)
      expect(result.current.data?.updatedAt).toBeInstanceOf(Date)
    })
  })

  describe("useUpdateUserPreferences (Mutation Hook)", () => {
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

      const { result } = renderHook(() => useUpdateUserPreferences(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith("/api/user/preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      expect(toast.success).toHaveBeenCalledWith("Nastavení uloženo")
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
        wrapper,
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

      const { result } = renderHook(() => useUpdateUserPreferences(), { wrapper })

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

      const { result } = renderHook(() => useUpdateUserPreferences(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isError).toBe(true))

      // Check rollback
      const cachedPrefs = queryClient.getQueryData<UserPreferences>(["user", "preferences"])
      expect(cachedPrefs?.theme).toBe("light") // Original value

      expect(toast.error).toHaveBeenCalledWith("Nepodařilo se uložit nastavení: Update failed")
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

      const { result } = renderHook(() => useUpdateUserPreferences(), { wrapper })

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

      const { result } = renderHook(() => useUpdateUserPreferences(), { wrapper })

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

      const { result } = renderHook(() => useUpdateUserPreferences(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Nepodařilo se uložit nastavení")
      )
    })
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
        wrapper,
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

      const { result: hook1 } = renderHook(() => useUpdateUserPreferences({ showToast: false }), {
        wrapper,
      })

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

      const { result: hook2 } = renderHook(() => useUpdateUserPreferences({ showToast: false }), {
        wrapper,
      })

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

      const { result } = renderHook(() => useUpdateUserPreferences(), { wrapper })

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

      const { result } = renderHook(() => useUpdateUserPreferences(), { wrapper })

      result.current.mutate({ theme: "dark" })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })
})
