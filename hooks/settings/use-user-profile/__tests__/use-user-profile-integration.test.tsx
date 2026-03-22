import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useUserProfile, useUpdateUserProfile, type UserProfile } from ".."
import { createTestQueryClient, createWrapper, mockProfile } from "./test-utils"

describe("useUserProfile - Integration and Edge cases", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("Profile editing workflow", () => {
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

      const { result: fetchResult } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(queryClient),
      })

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

        const { result: updateResult } = renderHook(() => useUpdateUserProfile(), {
          wrapper: createWrapper(queryClient),
        })

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

      const { result } = renderHook(() => useUpdateUserProfile(), {
        wrapper: createWrapper(queryClient),
      })

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

      const { result } = renderHook(() => useUpdateUserProfile(), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const cachedProfile = queryClient.getQueryData<UserProfile>(["user", "profile"])
      expect(cachedProfile?.bio).toBe(longBio)
    })

    it("should handle special characters in name and bio", async () => {
      const updateData = {
        name: "Petr \u010Cern\u00FD \u{1F389}",
        bio: "Miluji n\u00E1vyky! & <script>alert('xss')</script>",
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

      const { result } = renderHook(() => useUpdateUserProfile(), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))
    })
  })
})
