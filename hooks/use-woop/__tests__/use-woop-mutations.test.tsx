import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import {
  useCreateWoop,
  useUpdateWoop,
  useDeleteWoop,
  type WoopPlan,
  type CreateWoopInput,
  type UpdateWoopInput,
} from ".."
import { createTestQueryClient, createWrapper, mockWoopPlan } from "./test-utils"

describe("useWoop Mutation Hooks", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("useCreateWoop", () => {
    const habitId = "habit-1"

    it("should create WOOP plan successfully", async () => {
      const newWoopInput: CreateWoopInput = {
        wish: "Chci meditovat ka\u017Ed\u00FD den",
        outcome: "Budu klidn\u011Bj\u0161\u00ED a soust\u0159ed\u011Bn\u011Bj\u0161\u00ED",
        obstacle: "Zapomenu na to",
        plan: "Kdy\u017E se r\u00E1no probud\u00EDm, pou\u017Eiji bud\u00EDk jako p\u0159ipom\u00EDnku",
      }

      const createdWoop: WoopPlan = {
        ...mockWoopPlan,
        id: "woop-2",
        ...newWoopInput,
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => createdWoop,
      })

      const { result } = renderHook(() => useCreateWoop(habitId), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate(newWoopInput)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}/woop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWoopInput),
      })

      expect(toast.success).toHaveBeenCalledWith("WOOP pl\u00E1n byl \u00FAsp\u011B\u0161n\u011B vytvo\u0159en!")
    })

    it("should invalidate queries after successful creation", async () => {
      const newWoopInput: CreateWoopInput = {
        wish: "Test",
        outcome: "Test",
        obstacle: "Test",
        plan: "Test",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWoopPlan,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useCreateWoop(habitId), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate(newWoopInput)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["woop", habitId] })
    })

    it("should show error toast on failure", async () => {
      const newWoopInput: CreateWoopInput = {
        wish: "Test",
        outcome: "Test",
        obstacle: "Test",
        plan: "Test",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 400,
      })

      const { result } = renderHook(() => useCreateWoop(habitId), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate(newWoopInput)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("useUpdateWoop", () => {
    const habitId = "habit-1"
    const woopId = "woop-1"

    it("should update WOOP plan successfully", async () => {
      const updateData: UpdateWoopInput = {
        wish: "Updated wish",
        outcome: "Updated outcome",
      }

      const updatedWoop: WoopPlan = {
        ...mockWoopPlan,
        wish: "Updated wish",
        outcome: "Updated outcome",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => updatedWoop,
      })

      const { result } = renderHook(() => useUpdateWoop(habitId, woopId), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}/woop/${woopId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      expect(toast.success).toHaveBeenCalledWith("WOOP pl\u00E1n byl \u00FAsp\u011B\u0161n\u011B upraven!")
    })

    it("should invalidate queries after successful update", async () => {
      const updateData: UpdateWoopInput = { wish: "Updated" }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWoopPlan,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useUpdateWoop(habitId, woopId), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["woop", habitId] })
    })

    it("should show error toast on failure", async () => {
      const updateData: UpdateWoopInput = { wish: "Updated" }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      const { result } = renderHook(() => useUpdateWoop(habitId, woopId), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate(updateData)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("useDeleteWoop", () => {
    const habitId = "habit-1"

    it("should delete WOOP plan successfully", async () => {
      const woopId = "woop-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const { result } = renderHook(() => useDeleteWoop(habitId), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate(woopId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/habits/${habitId}/woop/${woopId}`, {
        method: "DELETE",
      })

      expect(toast.success).toHaveBeenCalledWith("WOOP pl\u00E1n byl smaz\u00E1n!")
    })

    it("should invalidate queries after successful deletion", async () => {
      const woopId = "woop-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useDeleteWoop(habitId), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate(woopId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["woop", habitId] })
    })

    it("should show error toast on failure", async () => {
      const woopId = "woop-1"

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      const { result } = renderHook(() => useDeleteWoop(habitId), {
        wrapper: createWrapper(queryClient),
      })

      result.current.mutate(woopId)

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })
})
