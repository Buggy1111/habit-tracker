import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  useIdentities,
  useCreateIdentity,
  useUpdateIdentity,
  useDeleteIdentity,
  type Identity,
  type CreateIdentityInput,
  type UpdateIdentityInput,
} from "../use-identities"

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("useIdentities Hook", () => {
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

  const mockIdentity: Identity = {
    id: "identity-1",
    userId: "user-1",
    title: "Zdravý člověk",
    description: "Jsem člověk, který se stará o své zdraví",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-15"),
    habits: [
      {
        id: "habit-1",
        name: "Drink Water",
        icon: "💧",
        color: "#3B82F6",
      },
    ],
    milestones: [
      {
        id: "milestone-1",
        identityId: "identity-1",
        title: "7 days streak",
        achieved: true,
        achievedAt: new Date("2025-01-07"),
        createdAt: new Date("2025-01-01"),
      },
    ],
  }

  describe("useIdentities (Query Hook)", () => {
    it("should fetch identities successfully", async () => {
      const mockResponse = [mockIdentity]

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const { result } = renderHook(() => useIdentities(), { wrapper })

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data).toHaveLength(1)
      expect(result.current.data?.[0].title).toBe("Zdravý člověk")
      expect(global.fetch).toHaveBeenCalledWith("/api/identities")
    })

    it("should handle loading state", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: async () => [],
              })
            }, 100)
          })
      )

      const { result } = renderHook(() => useIdentities(), { wrapper })

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

      const { result } = renderHook(() => useIdentities(), { wrapper })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(result.current.error).toBeDefined()
      expect(result.current.data).toBeUndefined()
    })

    it("should parse dates correctly", async () => {
      const identityWithStringDates = {
        ...mockIdentity,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-15T00:00:00.000Z",
        milestones: [
          {
            id: "milestone-1",
            identityId: "identity-1",
            title: "7 days streak",
            achieved: true,
            achievedAt: "2025-01-07T00:00:00.000Z",
            createdAt: "2025-01-01T00:00:00.000Z",
          },
        ],
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => [identityWithStringDates],
      })

      const { result } = renderHook(() => useIdentities(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const identity = result.current.data?.[0]
      expect(identity?.createdAt).toBeInstanceOf(Date)
      expect(identity?.updatedAt).toBeInstanceOf(Date)
      expect(identity?.milestones[0].createdAt).toBeInstanceOf(Date)
      expect(identity?.milestones[0].achievedAt).toBeInstanceOf(Date)
    })

    it("should handle null achievedAt dates", async () => {
      const identityWithNullDate = {
        ...mockIdentity,
        milestones: [
          {
            id: "milestone-1",
            identityId: "identity-1",
            title: "Not achieved yet",
            achieved: false,
            achievedAt: null,
            createdAt: "2025-01-01T00:00:00.000Z",
          },
        ],
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => [identityWithNullDate],
      })

      const { result } = renderHook(() => useIdentities(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      const identity = result.current.data?.[0]
      expect(identity?.milestones[0].achievedAt).toBeNull()
    })

    it("should retry failed requests", async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => [mockIdentity],
        })

      queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            retryDelay: 0,
          },
        },
      })

      const customWrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      )

      const { result } = renderHook(() => useIdentities(), { wrapper: customWrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledTimes(3)
      expect(result.current.data).toHaveLength(1)
    })
  })

  describe("useCreateIdentity (Mutation Hook)", () => {
    it("should create identity successfully", async () => {
      const newIdentityInput: CreateIdentityInput = {
        title: "Produktivní člověk",
        description: "Jsem člověk, který dokončuje úkoly",
      }

      const createdIdentity: Identity = {
        ...mockIdentity,
        id: "identity-2",
        title: "Produktivní člověk",
        description: "Jsem člověk, který dokončuje úkoly",
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => createdIdentity,
      })

      const { result } = renderHook(() => useCreateIdentity(), { wrapper })

      result.current.mutate(newIdentityInput)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith("/api/identities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIdentityInput),
      })

      expect(toast.success).toHaveBeenCalledWith("Identita byla úspěšně vytvořena!")
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

      const { result } = renderHook(() => useCreateIdentity(), { wrapper })

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

      const { result } = renderHook(() => useCreateIdentity(), { wrapper })

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

      const { result } = renderHook(() => useUpdateIdentity(), { wrapper })

      result.current.mutate({ identityId, data: updateData })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/identities/${identityId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      expect(toast.success).toHaveBeenCalledWith("Identita byla úspěšně upravena!")
    })

    it("should invalidate queries after successful update", async () => {
      const identityId = "identity-1"
      const updateData: UpdateIdentityInput = { title: "New Title" }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockIdentity,
      })

      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries")

      const { result } = renderHook(() => useUpdateIdentity(), { wrapper })

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

      const { result } = renderHook(() => useUpdateIdentity(), { wrapper })

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

      const { result } = renderHook(() => useDeleteIdentity(), { wrapper })

      result.current.mutate(identityId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(global.fetch).toHaveBeenCalledWith(`/api/identities/${identityId}`, {
        method: "DELETE",
      })

      expect(toast.success).toHaveBeenCalledWith("Identita byla smazána")
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

      const { result } = renderHook(() => useDeleteIdentity(), { wrapper })

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

      const { result } = renderHook(() => useDeleteIdentity(), { wrapper })

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

      const { result } = renderHook(() => useDeleteIdentity(), { wrapper })

      result.current.mutate(identityId)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["identities"] })
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["habits"] })
    })
  })
})
