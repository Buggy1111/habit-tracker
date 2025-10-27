import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  useCreateMilestone,
  useToggleMilestone,
  useDeleteMilestone,
  type CreateMilestoneInput,
} from "../use-milestones"
import type { IdentityMilestone } from "../use-identities"

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("useMilestones Hooks", () => {
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

  const mockMilestone: IdentityMilestone = {
    id: "milestone-1",
    identityId: "identity-1",
    title: "7 days streak",
    achieved: false,
    achievedAt: null,
    createdAt: new Date("2025-01-01"),
  }

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

      const { result } = renderHook(() => useCreateMilestone(), { wrapper })

      result.current.mutate({ identityId, data: newMilestoneInput })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/identities/${identityId}/milestones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMilestoneInput),
      })

      expect(toast.success).toHaveBeenCalledWith("Milestone byl úspěšně vytvořen!")
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

      const { result } = renderHook(() => useCreateMilestone(), { wrapper })

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

      const { result } = renderHook(() => useCreateMilestone(), { wrapper })

      result.current.mutate({ identityId, data: newMilestoneInput })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Nepodařilo se vytvořit milestone")
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

      const { result } = renderHook(() => useToggleMilestone(), { wrapper })

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

      expect(toast.success).toHaveBeenCalledWith("Gratulujeme! Milestone splněn! 🎉")
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

      const { result } = renderHook(() => useToggleMilestone(), { wrapper })

      result.current.mutate({ identityId, milestoneId, achieved: false })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(toast.success).toHaveBeenCalledWith("Milestone označen jako nesplněný")
    })

    it("should invalidate identities queries after successful toggle", async () => {
      const identityId = "identity-1"
      const milestoneId = "milestone-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockMilestone,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useToggleMilestone(), { wrapper })

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

      const { result } = renderHook(() => useToggleMilestone(), { wrapper })

      result.current.mutate({ identityId, milestoneId, achieved: true })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Nepodařilo se upravit milestone")
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

      const { result } = renderHook(() => useDeleteMilestone(), { wrapper })

      result.current.mutate({ identityId, milestoneId })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/identities/${identityId}/milestones/${milestoneId}`,
        {
          method: "DELETE",
        }
      )

      expect(toast.success).toHaveBeenCalledWith("Milestone byl smazán")
    })

    it("should invalidate identities queries after successful deletion", async () => {
      const identityId = "identity-1"
      const milestoneId = "milestone-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useDeleteMilestone(), { wrapper })

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

      const { result } = renderHook(() => useDeleteMilestone(), { wrapper })

      result.current.mutate({ identityId, milestoneId })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Nepodařilo se smazat milestone")
      )
    })
  })

  describe("Integration: Complete milestone workflow", () => {
    const identityId = "identity-1"

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

      const { result: createResult } = renderHook(() => useCreateMilestone(), { wrapper })

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

      const { result: toggleResult } = renderHook(() => useToggleMilestone(), { wrapper })

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

      const { result: deleteResult } = renderHook(() => useDeleteMilestone(), { wrapper })

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

      const { result: toggleOn } = renderHook(() => useToggleMilestone(), { wrapper })

      toggleOn.current.mutate({ identityId, milestoneId, achieved: true })

      await waitFor(() => expect(toggleOn.current.isSuccess).toBe(true))

      expect(toast.success).toHaveBeenCalledWith("Gratulujeme! Milestone splněn! 🎉")

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

      const { result: toggleOff } = renderHook(() => useToggleMilestone(), { wrapper })

      toggleOff.current.mutate({ identityId, milestoneId, achieved: false })

      await waitFor(() => expect(toggleOff.current.isSuccess).toBe(true))

      expect(toast.success).toHaveBeenCalledWith("Milestone označen jako nesplněný")
    })
  })
})
