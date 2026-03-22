import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useCreateMilestone, useToggleMilestone, useDeleteMilestone, type CreateMilestoneInput } from ".."
import type { IdentityMilestone } from "../../use-identities"
import { createTestQueryClient, createWrapper, mockMilestone } from "./test-utils"

describe("useMilestones Mutation Hooks", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("useCreateMilestone (Mutation Hook)", () => {
    it("should create milestone successfully", async () => {
      const identityId = "identity-1"
      const newMilestoneInput: CreateMilestoneInput = {
        title: "30 days streak",
      }

      const createdMilestone: IdentityMilestone = {
        id: "milestone-2",
        identityId,
        title: "30 days streak",
        achieved: false,
        achievedAt: null,
        createdAt: new Date(),
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => createdMilestone,
      })

      const { result } = renderHook(() => useCreateMilestone(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, data: newMilestoneInput })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/identities/${identityId}/milestones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMilestoneInput),
      })

      expect(toast.success).toHaveBeenCalledWith("Milestone byl \u00FAsp\u011B\u0161n\u011B vytvo\u0159en!")
    })

    it("should invalidate identities queries after successful creation", async () => {
      const identityId = "identity-1"
      const newMilestoneInput: CreateMilestoneInput = {
        title: "Test milestone",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockMilestone,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useCreateMilestone(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, data: newMilestoneInput })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["identities"] })
    })

    it("should show error toast on failure", async () => {
      const identityId = "identity-1"
      const newMilestoneInput: CreateMilestoneInput = {
        title: "Test milestone",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 400,
      })

      const { result } = renderHook(() => useCreateMilestone(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, data: newMilestoneInput })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Nepoda\u0159ilo se vytvo\u0159it milestone")
      )
    })
  })

  describe("useToggleMilestone (Mutation Hook)", () => {
    it("should mark milestone as achieved successfully", async () => {
      const identityId = "identity-1"
      const milestoneId = "milestone-1"

      const achievedMilestone: IdentityMilestone = {
        ...mockMilestone,
        achieved: true,
        achievedAt: new Date(),
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => achievedMilestone,
      })

      const { result } = renderHook(() => useToggleMilestone(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, milestoneId, achieved: true })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/identities/${identityId}/milestones/${milestoneId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ achieved: true }),
        }
      )

      expect(toast.success).toHaveBeenCalledWith("Gratulujeme! Milestone spln\u011Bn! \u{1F389}")
    })

    it("should mark milestone as not achieved successfully", async () => {
      const identityId = "identity-1"
      const milestoneId = "milestone-1"

      const unachievedMilestone: IdentityMilestone = {
        ...mockMilestone,
        achieved: false,
        achievedAt: null,
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => unachievedMilestone,
      })

      const { result } = renderHook(() => useToggleMilestone(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, milestoneId, achieved: false })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(toast.success).toHaveBeenCalledWith("Milestone ozna\u010Den jako nespln\u011Bn\u00FD")
    })

    it("should invalidate identities queries after successful toggle", async () => {
      const identityId = "identity-1"
      const milestoneId = "milestone-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockMilestone,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useToggleMilestone(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, milestoneId, achieved: true })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["identities"] })
    })

    it("should show error toast on failure", async () => {
      const identityId = "identity-1"
      const milestoneId = "milestone-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      const { result } = renderHook(() => useToggleMilestone(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, milestoneId, achieved: true })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Nepoda\u0159ilo se upravit milestone")
      )
    })
  })

  describe("useDeleteMilestone (Mutation Hook)", () => {
    it("should delete milestone successfully", async () => {
      const identityId = "identity-1"
      const milestoneId = "milestone-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const { result } = renderHook(() => useDeleteMilestone(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, milestoneId })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/identities/${identityId}/milestones/${milestoneId}`,
        {
          method: "DELETE",
        }
      )

      expect(toast.success).toHaveBeenCalledWith("Milestone byl smaz\u00E1n")
    })

    it("should invalidate identities queries after successful deletion", async () => {
      const identityId = "identity-1"
      const milestoneId = "milestone-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useDeleteMilestone(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, milestoneId })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["identities"] })
    })

    it("should show error toast on failure", async () => {
      const identityId = "identity-1"
      const milestoneId = "milestone-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      const { result } = renderHook(() => useDeleteMilestone(), { wrapper: createWrapper(queryClient) })

      result.current.mutate({ identityId, milestoneId })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Nepoda\u0159ilo se smazat milestone")
      )
    })
  })
})
