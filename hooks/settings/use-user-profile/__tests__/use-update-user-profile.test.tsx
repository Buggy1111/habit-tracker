import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useUpdateUserProfile, type UserProfile } from ".."
import { createTestQueryClient, createWrapper, mockProfile } from "./test-utils"

describe("useUpdateUserProfile (Mutation Hook)", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should update profile successfully", async () => {
    const updateData = {
      name: "Petr Svoboda",
      bio: "Nov\u00FD \u017Eivotn\u00ED popis",
      timezone: "America/New_York",
    }

    const updatedProfile: UserProfile = {
      ...mockProfile,
      name: "Petr Svoboda",
      bio: "Nov\u00FD \u017Eivotn\u00ED popis",
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

    const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(updateData)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(global.fetch).toHaveBeenCalledWith("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })

    expect(toast.success).toHaveBeenCalledWith("Profil byl \u00FAsp\u011B\u0161n\u011B ulo\u017Een!")
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

    const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(updateData)

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(toast.error).toHaveBeenCalledWith("Nepoda\u0159ilo se ulo\u017Eit profil: Update failed")
  })

  it("should show default error message if error field is missing", async () => {
    const updateData = {
      name: "New Name",
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    })

    const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(updateData)

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining("Nepoda\u0159ilo se ulo\u017Eit profil")
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

    const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: createWrapper(queryClient) })

    result.current.mutate(updateData)

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(toast.error).toHaveBeenCalled()
  })
})
