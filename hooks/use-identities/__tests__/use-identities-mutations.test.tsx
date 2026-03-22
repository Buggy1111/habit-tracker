import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import {
  useCreateIdentity,
  useUpdateIdentity,
  useDeleteIdentity,
  type Identity,
  type CreateIdentityInput,
  type UpdateIdentityInput,
} from ".."
import { createTestQueryClient, createWrapper, mockIdentity } from "./test-utils"

describe("useIdentities Mutation Hooks", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("useCreateIdentity (Mutation Hook)", () => {
    it("should create identity successfully", async () => {
      const newIdentityInput: CreateIdentityInput = {
        title: "Produktivn\u00ED \u010Dlov\u011Bk",
        description: "Jsem \u010Dlov\u011Bk, kter\u00FD dokon\u010Duje \u00FAkoly",
      }

      const createdIdentity: Identity = {
        ...mockIdentity,
        id: "identity-2",
        title: "Produktivn\u00ED \u010Dlov\u011Bk",
        description: "Jsem \u010Dlov\u011Bk, kter\u00FD dokon\u010Duje \u00FAkoly",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => createdIdentity,
      })

      const { result } = renderHook(() => useCreateIdentity(), { wrapper: createWrapper(queryClient) })

      result.current.mutate(newIdentityInput)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith("/api/identities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIdentityInput),
      })

      expect(toast.success).toHaveBeenCalledWith("Identita byla \u00FAsp\u011B\u0161n\u011B vytvo\u0159ena!")
    })

    it("should invalidate queries after successful creation", async () => {
      const newIdentityInput: CreateIdentityInput = {
        title: "New Identity",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockIdentity,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useCreateIdentity(), { wrapper: createWrapper(queryClient) })

      result.current.mutate(newIdentityInput)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["identities"] })
    })

    it("should show error toast on failure", async () => {
      const newIdentityInput: CreateIdentityInput = {
        title: "New Identity",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 400,
      })

      const { result } = renderHook(() => useCreateIdentity(), { wrapper: createWrapper(queryClient) })

      result.current.mutate(newIdentityInput)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("useUpdateIdentity (Mutation Hook)", () => {
    it("should update identity successfully", async () => {
      const identityId = "identity-1"
      const updateData: UpdateIdentityInput = {
        title: "Updated Title",
        description: "Updated Description",
      }

      const updatedIdentity: Identity = {
        ...mockIdentity,
        title: "Updated Title",
        description: "Updated Description",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => updatedIdentity,
      })

      const { result } = renderHook(() => useUpdateIdentity(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, data: updateData })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/identities/${identityId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      expect(toast.success).toHaveBeenCalledWith("Identita byla \u00FAsp\u011B\u0161n\u011B upravena!")
    })

    it("should invalidate queries after successful update", async () => {
      const identityId = "identity-1"
      const updateData: UpdateIdentityInput = { title: "New Title" }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockIdentity,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useUpdateIdentity(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, data: updateData })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["identities"] })
    })

    it("should show error toast on failure", async () => {
      const identityId = "identity-1"
      const updateData: UpdateIdentityInput = { title: "New Title" }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      const { result } = renderHook(() => useUpdateIdentity(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, data: updateData })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("useDeleteIdentity (Mutation Hook with Optimistic Updates)", () => {
    it("should delete identity successfully", async () => {
      const identityId = "identity-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const { result } = renderHook(() => useDeleteIdentity(), { wrapper: createWrapper(queryClient) })

      result.current.mutate(identityId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/identities/${identityId}`, {
        method: "DELETE",
      })

      expect(toast.success).toHaveBeenCalledWith("Identita byla smaz\u00E1na")
    })

    it("should optimistically remove identity from list", async () => {
      const identityId = "identity-1"

      // Pre-populate cache with identities
      queryClient.setQueryData(["identities"], [mockIdentity])
      ;(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({ ok: true })
            }, 100)
          })
      )

      const { result } = renderHook(() => useDeleteIdentity(), { wrapper: createWrapper(queryClient) })

      result.current.mutate(identityId)

      // Check optimistic update immediately
      await waitFor(() => {
        const cachedIdentities = queryClient.getQueryData<Identity[]>(["identities"])
        expect(cachedIdentities).toHaveLength(0)
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))
    })

    it("should rollback on error", async () => {
      const identityId = "identity-1"

      // Pre-populate cache
      queryClient.setQueryData(["identities"], [mockIdentity])
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      const { result } = renderHook(() => useDeleteIdentity(), { wrapper: createWrapper(queryClient) })

      result.current.mutate(identityId)

      await waitFor(() => expect(result.current.isError).toBe(true))

      // Check rollback
      const cachedIdentities = queryClient.getQueryData<Identity[]>(["identities"])
      expect(cachedIdentities).toHaveLength(1)
      expect(cachedIdentities?.[0].id).toBe(identityId)

      expect(toast.error).toHaveBeenCalled()
    })

    it("should invalidate both identities and habits queries after success", async () => {
      const identityId = "identity-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useDeleteIdentity(), { wrapper: createWrapper(queryClient) })

      result.current.mutate(identityId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["identities"] })
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["habits"] })
    })
  })
})
