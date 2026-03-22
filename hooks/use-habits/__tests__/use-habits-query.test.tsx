import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useHabits } from ".."
import { createTestQueryClient, createWrapper, mockHabit } from "./test-utils"

describe("useHabits (Query Hook)", () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should fetch habits successfully", async () => {
    const mockResponse = [mockHabit]

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useHabits(), { wrapper: createWrapper(queryClient) })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(1)
    expect(result.current.data?.[0].name).toBe("Drink Water")
    expect(global.fetch).toHaveBeenCalledWith("/api/habits")
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

    const { result } = renderHook(() => useHabits(), { wrapper: createWrapper(queryClient) })

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

    const { result } = renderHook(() => useHabits(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
    expect(result.current.data).toBeUndefined()
  })

  it("should parse dates correctly", async () => {
    const habitWithStringDates = {
      ...mockHabit,
      startDate: "2025-01-01T00:00:00.000Z",
      logs: [
        {
          id: "log-1",
          habitId: "habit-1",
          userId: "user-1",
          date: "2025-01-15T00:00:00.000Z",
          completed: true,
          note: null,
          createdAt: "2025-01-15T00:00:00.000Z",
        },
      ],
    }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => [habitWithStringDates],
    })

    const { result } = renderHook(() => useHabits(), { wrapper: createWrapper(queryClient) })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const habit = result.current.data?.[0]
    expect(habit?.startDate).toBeInstanceOf(Date)
    expect(habit?.logs[0].date).toBeInstanceOf(Date)
    expect(habit?.logs[0].createdAt).toBeInstanceOf(Date)
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
        json: async () => [mockHabit],
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

    const { result } = renderHook(() => useHabits(), { wrapper: customWrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(global.fetch).toHaveBeenCalledTimes(3)
    expect(result.current.data).toHaveLength(1)
  })
})
