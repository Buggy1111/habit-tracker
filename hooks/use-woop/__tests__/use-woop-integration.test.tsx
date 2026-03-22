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

describe("useWoop - Integration: Complete WOOP workflow", () => {
  let queryClient: ReturnType<typeof createTestQueryClient>
  const habitId = "habit-1"

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should create, update, and delete WOOP plan", async () => {
    // Step 1: Create
    const newWoopInput: CreateWoopInput = {
      wish: "Initial wish",
      outcome: "Initial outcome",
      obstacle: "Initial obstacle",
      plan: "Initial plan",
    }

    const createdWoop: WoopPlan = {
      id: "woop-new",
      habitId,
      ...newWoopInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => createdWoop,
    })

    const { result: createResult } = renderHook(() => useCreateWoop(habitId), {
      wrapper: createWrapper(queryClient),
    })

    createResult.current.mutate(newWoopInput)

    await waitFor(() => expect(createResult.current.isSuccess).toBe(true))

    // Step 2: Update
    const updateData: UpdateWoopInput = {
      wish: "Updated wish",
    }

    const updatedWoop: WoopPlan = {
      ...createdWoop,
      wish: "Updated wish",
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => updatedWoop,
    })

    const { result: updateResult } = renderHook(() => useUpdateWoop(habitId, createdWoop.id), {
      wrapper: createWrapper(queryClient),
    })

    updateResult.current.mutate(updateData)

    await waitFor(() => expect(updateResult.current.isSuccess).toBe(true))

    // Step 3: Delete
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
    })

    const { result: deleteResult } = renderHook(() => useDeleteWoop(habitId), {
      wrapper: createWrapper(queryClient),
    })

    deleteResult.current.mutate(createdWoop.id)

    await waitFor(() => expect(deleteResult.current.isSuccess).toBe(true))

    // Verify all success toasts were called
    expect(toast.success).toHaveBeenCalledTimes(3)
  })
})
