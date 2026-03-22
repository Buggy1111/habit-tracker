import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  useThoughtRecords,
  useCreateThoughtRecord,
  useDeleteThoughtRecord,
  type ThoughtRecord,
  type CreateThoughtRecordInput,
} from ".."

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("useThoughtRecords Hooks", () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
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

  const mockRecord: ThoughtRecord = {
    id: "record-1",
    userId: "user-1",
    habitId: "habit-1",
    habit: { id: "habit-1", name: "Cvičení", icon: "dumbbell", color: "blue" },
    adversity: "Kolega mě zkritizoval před ostatními",
    belief: "Jsem neschopný, nikdo mě nerespektuje",
    consequence: "Vztek, úzkost, chuť se izolovat",
    evidence: "Minulý týden mě pochválil šéf. Mám dobré výsledky.",
    alternative: "Kolega měl špatný den, kritika nebyla osobní",
    permanence: "Dočasné — byl to jeden incident",
    pervasiveness: "Specifické — jen tento kolega, ne všichni",
    personalization: "Externí — kolega řeší svůj stres",
    createdAt: new Date("2025-10-15"),
  }

  describe("useThoughtRecords (Query Hook)", () => {
    it("should fetch thought records successfully", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => [mockRecord],
      })

      const { result } = renderHook(() => useThoughtRecords(), { wrapper })

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data).toHaveLength(1)
      expect(result.current.data?.[0].adversity).toBe("Kolega mě zkritizoval před ostatními")
      expect(global.fetch).toHaveBeenCalledWith("/api/thought-records")
    })

    it("should handle loading state", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({ ok: true, json: async () => [] })
            }, 100)
          })
      )

      const { result } = renderHook(() => useThoughtRecords(), { wrapper })

      expect(result.current.isLoading).toBe(true)
      expect(result.current.data).toBeUndefined()

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.isLoading).toBe(false)
    })

    it("should handle error state", async () => {
      // Hook has retry: 2 internally, so mock all 3 attempts to fail
      ;(global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({ ok: false, status: 500 })
        .mockResolvedValueOnce({ ok: false, status: 500 })
        .mockResolvedValueOnce({ ok: false, status: 500 })

      // Override retryDelay to 0 for fast test
      const fastClient = new QueryClient({
        defaultOptions: {
          queries: { retryDelay: 0 },
        },
      })
      const fastWrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={fastClient}>{children}</QueryClientProvider>
      )

      const { result } = renderHook(() => useThoughtRecords(), { wrapper: fastWrapper })

      await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 5000 })

      expect(result.current.error).toBeDefined()
      expect(result.current.data).toBeUndefined()
    })

    it("should parse dates correctly", async () => {
      const recordWithStringDates = {
        ...mockRecord,
        createdAt: "2025-10-15T00:00:00.000Z",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => [recordWithStringDates],
      })

      const { result } = renderHook(() => useThoughtRecords(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data?.[0].createdAt).toBeInstanceOf(Date)
    })

    it("should handle empty records list", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })

      const { result } = renderHook(() => useThoughtRecords(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data).toHaveLength(0)
    })
  })

  describe("useCreateThoughtRecord (Mutation Hook)", () => {
    it("should create thought record successfully", async () => {
      const newInput: CreateThoughtRecordInput = {
        adversity: "Nový záznam",
        belief: "Automatická myšlenka",
        consequence: "Pocity",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockRecord, ...newInput, id: "record-2" }),
      })

      const { result } = renderHook(() => useCreateThoughtRecord(), { wrapper })

      result.current.mutate(newInput)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith("/api/thought-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInput),
      })

      expect(toast.success).toHaveBeenCalledWith("Záznam myšlenek byl úspěšně vytvořen!")
    })

    it("should create record with optional fields", async () => {
      const fullInput: CreateThoughtRecordInput = {
        habitId: "habit-1",
        adversity: "Situace",
        belief: "Myšlenka",
        consequence: "Pocit",
        evidence: "Důkazy pro a proti",
        alternative: "Alternativní pohled",
        permanence: "Dočasné",
        pervasiveness: "Specifické",
        personalization: "Externí",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockRecord, ...fullInput }),
      })

      const { result } = renderHook(() => useCreateThoughtRecord(), { wrapper })

      result.current.mutate(fullInput)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith("/api/thought-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullInput),
      })
    })

    it("should invalidate queries after successful creation", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecord,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useCreateThoughtRecord(), { wrapper })

      result.current.mutate({
        adversity: "Test",
        belief: "Test",
        consequence: "Test",
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["thought-records"] })
    })

    it("should show error toast on failure", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 400,
      })

      const { result } = renderHook(() => useCreateThoughtRecord(), { wrapper })

      result.current.mutate({
        adversity: "Test",
        belief: "Test",
        consequence: "Test",
      })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("useDeleteThoughtRecord (Mutation Hook)", () => {
    it("should delete thought record successfully", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      const { result } = renderHook(() => useDeleteThoughtRecord(), { wrapper })

      result.current.mutate("record-1")

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith("/api/thought-records/record-1", {
        method: "DELETE",
      })

      expect(toast.success).toHaveBeenCalledWith("Záznam myšlenek byl smazán!")
    })

    it("should invalidate queries after successful deletion", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useDeleteThoughtRecord(), { wrapper })

      result.current.mutate("record-1")

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["thought-records"] })
    })

    it("should show error toast on failure", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      const { result } = renderHook(() => useDeleteThoughtRecord(), { wrapper })

      result.current.mutate("record-1")

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe("Integration: Complete thought record workflow", () => {
    it("should create and delete thought record", async () => {
      // Step 1: Create
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecord,
      })

      const { result: createResult } = renderHook(() => useCreateThoughtRecord(), { wrapper })

      createResult.current.mutate({
        adversity: "Test situace",
        belief: "Test myšlenka",
        consequence: "Test pocit",
      })

      await waitFor(() => expect(createResult.current.isSuccess).toBe(true))

      // Step 2: Delete
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      const { result: deleteResult } = renderHook(() => useDeleteThoughtRecord(), { wrapper })

      deleteResult.current.mutate("record-1")

      await waitFor(() => expect(deleteResult.current.isSuccess).toBe(true))

      expect(toast.success).toHaveBeenCalledTimes(2)
    })
  })
})
