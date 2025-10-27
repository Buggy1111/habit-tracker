import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner"
import { useUserProfile, useUpdateUserProfile, type UserProfile } from "../use-user-profile"

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("useUserProfile Hooks", () => {
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

  const mockProfile: UserProfile = {
    id: "user-1",
    name: "Jan Novák",
    email: "jan.novak@example.com",
    bio: "Miluji budování návyků!",
    avatarUrl: "https://example.com/avatar.jpg",
    timezone: "Europe/Prague",
    emailVerified: new Date("2025-01-01"),
    createdAt: new Date("2025-01-01"),
    lastLoginAt: new Date("2025-01-15"),
    lastActivityAt: new Date("2025-01-16"),
  }

  describe("useUserProfile (Query Hook)", () => {
    it("should fetch user profile successfully", async () => {
      const mockResponse = mockProfile

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const { result } = renderHook(() => useUserProfile(), { wrapper })

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data?.name).toBe("Jan Novák")
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

      const { result } = renderHook(() => useUserProfile(), { wrapper })

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

      const { result } = renderHook(() => useUserProfile(), { wrapper })

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

      const { result } = renderHook(() => useUserProfile(), { wrapper })

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

      const { result } = renderHook(() => useUserProfile(), { wrapper })

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

      const { result } = renderHook(() => useUserProfile(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data?.name).toBeNull()
      expect(result.current.data?.bio).toBeNull()
      expect(result.current.data?.avatarUrl).toBeNull()
    })
  })

  describe("useUpdateUserProfile (Mutation Hook)", () => {
    it("should update profile successfully", async () => {
      const updateData = {
        name: "Petr Svoboda",
        bio: "Nový životní popis",
        timezone: "America/New_York",
      }

      const updatedProfile: UserProfile = {
        ...mockProfile,
        name: "Petr Svoboda",
        bio: "Nový životní popis",
        timezone: "America/New_York",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...updatedProfile,
          emailVerified: updatedProfile.emailVerified?.toISOString() || null,
          createdAt: updatedProfile.createdAt.toISOString(),
          lastLoginAt: updatedProfile.lastLoginAt?.toISOString() || null,
          lastActivityAt: updatedProfile.lastActivityAt?.toISOString() || null,
        }),
      })

      const { result } = renderHook(() => useUpdateUserProfile(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      expect(toast.success).toHaveBeenCalledWith("Profil byl úspěšně uložen!")
    })

    it("should update cache with server response on success", async () => {
      const updateData = {
        name: "Updated Name",
      }

      const serverResponse: UserProfile = {
        ...mockProfile,
        name: "Updated Name",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...serverResponse,
          emailVerified: serverResponse.emailVerified?.toISOString() || null,
          createdAt: serverResponse.createdAt.toISOString(),
          lastLoginAt: serverResponse.lastLoginAt?.toISOString() || null,
          lastActivityAt: serverResponse.lastActivityAt?.toISOString() || null,
        }),
      })

      const { result } = renderHook(() => useUpdateUserProfile(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      // Check that cache was updated
      const cachedProfile = queryClient.getQueryData<UserProfile>(["user", "profile"])
      expect(cachedProfile?.name).toBe("Updated Name")
    })

    it("should show error toast on failure", async () => {
      const updateData = {
        name: "New Name",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Update failed" }),
      })

      const { result } = renderHook(() => useUpdateUserProfile(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalledWith("Nepodařilo se uložit profil: Update failed")
    })

    it("should show default error message if error field is missing", async () => {
      const updateData = {
        name: "New Name",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      })

      const { result } = renderHook(() => useUpdateUserProfile(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Nepodařilo se uložit profil")
      )
    })

    it("should update only provided fields", async () => {
      const updateData = {
        bio: "Just updating bio",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockProfile,
          bio: "Just updating bio",
          emailVerified: mockProfile.emailVerified?.toISOString() || null,
          createdAt: mockProfile.createdAt.toISOString(),
          lastLoginAt: mockProfile.lastLoginAt?.toISOString() || null,
          lastActivityAt: mockProfile.lastActivityAt?.toISOString() || null,
        }),
      })

      const { result } = renderHook(() => useUpdateUserProfile(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })
    })

    it("should handle clearing optional fields", async () => {
      const updateData = {
        bio: null,
        avatarUrl: null,
      }

      const updatedProfile: UserProfile = {
        ...mockProfile,
        bio: null,
        avatarUrl: null,
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...updatedProfile,
          emailVerified: updatedProfile.emailVerified?.toISOString() || null,
          createdAt: updatedProfile.createdAt.toISOString(),
          lastLoginAt: updatedProfile.lastLoginAt?.toISOString() || null,
          lastActivityAt: updatedProfile.lastActivityAt?.toISOString() || null,
        }),
      })

      const { result } = renderHook(() => useUpdateUserProfile(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const cachedProfile = queryClient.getQueryData<UserProfile>(["user", "profile"])
      expect(cachedProfile?.bio).toBeNull()
      expect(cachedProfile?.avatarUrl).toBeNull()
    })

    it("should handle network errors gracefully", async () => {
      const updateData = {
        name: "New Name",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("Network error"))

      const { result } = renderHook(() => useUpdateUserProfile(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("Integration: Profile editing workflow", () => {
    it("should complete full profile edit workflow", async () => {
      // Step 1: Fetch current profile
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockProfile,
          emailVerified: mockProfile.emailVerified?.toISOString() || null,
          createdAt: mockProfile.createdAt.toISOString(),
          lastLoginAt: mockProfile.lastLoginAt?.toISOString() || null,
          lastActivityAt: mockProfile.lastActivityAt?.toISOString() || null,
        }),
      })

      const { result: fetchResult } = renderHook(() => useUserProfile(), { wrapper })

      await waitFor(() => expect(fetchResult.current.isSuccess).toBe(true))

      const originalProfile = fetchResult.current.data

      // Step 2: Update profile
      const updates = [
        { name: "Updated Name" },
        { bio: "Updated Bio" },
        { timezone: "America/New_York" },
      ]

      for (const update of updates) {
        ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            ...originalProfile,
            ...update,
            emailVerified: originalProfile?.emailVerified?.toISOString() || null,
            createdAt: originalProfile?.createdAt.toISOString() || new Date().toISOString(),
            lastLoginAt: originalProfile?.lastLoginAt?.toISOString() || null,
            lastActivityAt: originalProfile?.lastActivityAt?.toISOString() || null,
          }),
        })

        const { result: updateResult } = renderHook(() => useUpdateUserProfile(), { wrapper })

        updateResult.current.mutate(update)

        await waitFor(() => expect(updateResult.current.isSuccess).toBe(true))
      }

      // All updates should succeed
      expect(toast.success).toHaveBeenCalledTimes(3)
    })

    it("should handle rapid successive updates", async () => {
      const updates = [{ name: "Name 1" }, { name: "Name 2" }, { name: "Name 3" }]

      updates.forEach(() => {
        ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            ...mockProfile,
            emailVerified: mockProfile.emailVerified?.toISOString() || null,
            createdAt: mockProfile.createdAt.toISOString(),
            lastLoginAt: mockProfile.lastLoginAt?.toISOString() || null,
            lastActivityAt: mockProfile.lastActivityAt?.toISOString() || null,
          }),
        })
      })

      const { result } = renderHook(() => useUpdateUserProfile(), { wrapper })

      // Fire all updates
      for (const update of updates) {
        result.current.mutate(update)
        await waitFor(() => expect(result.current.isIdle || result.current.isSuccess).toBe(true))
      }

      expect(global.fetch).toHaveBeenCalledTimes(3)
      expect(toast.success).toHaveBeenCalledTimes(3)
    })
  })

  describe("Edge cases", () => {
    it("should handle very long bio text", async () => {
      const longBio = "A".repeat(5000)
      const updateData = {
        bio: longBio,
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockProfile,
          bio: longBio,
          emailVerified: mockProfile.emailVerified?.toISOString() || null,
          createdAt: mockProfile.createdAt.toISOString(),
          lastLoginAt: mockProfile.lastLoginAt?.toISOString() || null,
          lastActivityAt: mockProfile.lastActivityAt?.toISOString() || null,
        }),
      })

      const { result } = renderHook(() => useUpdateUserProfile(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const cachedProfile = queryClient.getQueryData<UserProfile>(["user", "profile"])
      expect(cachedProfile?.bio).toBe(longBio)
    })

    it("should handle special characters in name and bio", async () => {
      const updateData = {
        name: "Petr Černý 🎉",
        bio: "Miluji návyky! & <script>alert('xss')</script>",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockProfile,
          ...updateData,
          emailVerified: mockProfile.emailVerified?.toISOString() || null,
          createdAt: mockProfile.createdAt.toISOString(),
          lastLoginAt: mockProfile.lastLoginAt?.toISOString() || null,
          lastActivityAt: mockProfile.lastActivityAt?.toISOString() || null,
        }),
      })

      const { result } = renderHook(() => useUpdateUserProfile(), { wrapper })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))
    })
  })
})
