import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useCreateMilestone, useToggleMilestone, useDeleteMilestone, type CreateMilestoneInput } from ".."
import type { IdentityMilestone } from "../../use-identities"
import { createTestQueryClient, createWrapper, mockMilestone } from "./test-utils"

describe("useMilestones - Integration: Complete milestone workflow", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>
  const identityId = "identity-1"

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should create, toggle, and delete milestone", async () => {
    // Step 1: Create milestone
    const newMilestoneInput: CreateMilestoneInput = {
      title: "Complete 100 days",
    }

    const createdMilestone: IdentityMilestone = {
      id: "milestone-new",
      identityId,
      title: "Complete 100 days",
      achieved: false,
      achievedAt: null,
      createdAt: new Date(),
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => createdMilestone,
    })

    const { result: createResult } = renderHook(() => useCreateMilestone(), {
      wrapper: createWrapper(queryClient),
    })

    createResult.current.mutate({ identityId, data: newMilestoneInput })

    await waitFor(() => expect(createResult.current.isSuccess).toBe(true))

    // Step 2: Toggle milestone to achieved
    const achievedMilestone: IdentityMilestone = {
      ...createdMilestone,
      achieved: true,
      achievedAt: new Date(),
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => achievedMilestone,
    })

    const { result: toggleResult } = renderHook(() => useToggleMilestone(), {
      wrapper: createWrapper(queryClient),
    })

    toggleResult.current.mutate({
      identityId,
      milestoneId: createdMilestone.id,
      achieved: true,
    })

    await waitFor(() => expect(toggleResult.current.isSuccess).toBe(true))

    // Step 3: Delete milestone
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
    })

    const { result: deleteResult } = renderHook(() => useDeleteMilestone(), {
      wrapper: createWrapper(queryClient),
    })

    deleteResult.current.mutate({ identityId, milestoneId: createdMilestone.id })

    await waitFor(() => expect(deleteResult.current.isSuccess).toBe(true))

    // Verify all success toasts were called
    expect(toast.success).toHaveBeenCalledTimes(3)
  })

  it("should handle toggle on/off correctly", async () => {
    const milestoneId = "milestone-toggle-test"

    // Toggle ON
    const achievedMilestone: IdentityMilestone = {
      ...mockMilestone,
      id: milestoneId,
      achieved: true,
      achievedAt: new Date(),
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => achievedMilestone,
    })

    const { result: toggleOn } = renderHook(() => useToggleMilestone(), {
      wrapper: createWrapper(queryClient),
    })

    toggleOn.current.mutate({ identityId, milestoneId, achieved: true })

    await waitFor(() => expect(toggleOn.current.isSuccess).toBe(true))

    expect(toast.success).toHaveBeenCalledWith("Gratulujeme! Milestone spln\u011Bn! \u{1F389}")

    // Toggle OFF
    const unachievedMilestone: IdentityMilestone = {
      ...mockMilestone,
      id: milestoneId,
      achieved: false,
      achievedAt: null,
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => unachievedMilestone,
    })

    const { result: toggleOff } = renderHook(() => useToggleMilestone(), {
      wrapper: createWrapper(queryClient),
    })

    toggleOff.current.mutate({ identityId, milestoneId, achieved: false })

    await waitFor(() => expect(toggleOff.current.isSuccess).toBe(true))

    expect(toast.success).toHaveBeenCalledWith("Milestone ozna\u010Den jako nespln\u011Bn\u00FD")
  })
})
