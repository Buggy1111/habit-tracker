import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { renderHook, waitFor, act } from "@testing-library/react"
import { useOnboarding } from "../use-onboarding"

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("useOnboarding Hook", () => {
  const ONBOARDING_KEY = "habit-tracker-onboarding-completed"

  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorageMock.clear()
  })

  describe("Initial state", () => {
    it("should show welcome screen when onboarding not completed", async () => {
      const { result } = renderHook(() => useOnboarding())

      // Initially loading
      expect(result.current.isLoading).toBe(true)

      // Wait for effect to complete
      await waitFor(() => expect(result.current.isLoading).toBe(false))

      // Should show welcome screen
      expect(result.current.showWelcome).toBe(true)
    })

    it("should not show welcome screen when onboarding is completed", async () => {
      // Pre-set onboarding as completed
      localStorageMock.setItem(ONBOARDING_KEY, "true")

      const { result } = renderHook(() => useOnboarding())

      // Initially loading
      expect(result.current.isLoading).toBe(true)

      // Wait for effect to complete
      await waitFor(() => expect(result.current.isLoading).toBe(false))

      // Should not show welcome screen
      expect(result.current.showWelcome).toBe(false)
    })

    it("should handle loading state correctly", async () => {
      const { result } = renderHook(() => useOnboarding())

      // Initial state should be loading
      expect(result.current.isLoading).toBe(true)
      expect(result.current.showWelcome).toBe(false)

      // After effect completes, should not be loading
      await waitFor(() => expect(result.current.isLoading).toBe(false))
    })
  })

  describe("completeOnboarding function", () => {
    it("should complete onboarding and hide welcome screen", async () => {
      const { result } = renderHook(() => useOnboarding())

      // Wait for initial load
      await waitFor(() => expect(result.current.isLoading).toBe(false))

      // Initially should show welcome
      expect(result.current.showWelcome).toBe(true)

      // Complete onboarding
      act(() => {
        result.current.completeOnboarding()
      })

      // Should hide welcome screen
      expect(result.current.showWelcome).toBe(false)

      // Should save to localStorage
      expect(localStorageMock.getItem(ONBOARDING_KEY)).toBe("true")
    })

    it("should persist onboarding completion across hook re-renders", async () => {
      // First render
      const { result: result1 } = renderHook(() => useOnboarding())

      await waitFor(() => expect(result1.current.isLoading).toBe(false))

      // Complete onboarding
      act(() => {
        result1.current.completeOnboarding()
      })

      expect(result1.current.showWelcome).toBe(false)

      // Second render (simulating remount)
      const { result: result2 } = renderHook(() => useOnboarding())

      await waitFor(() => expect(result2.current.isLoading).toBe(false))

      // Should still be completed
      expect(result2.current.showWelcome).toBe(false)
    })

    it("should immediately update showWelcome state", async () => {
      const { result } = renderHook(() => useOnboarding())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current.showWelcome).toBe(true)

      act(() => {
        result.current.completeOnboarding()
      })

      // Should update immediately, not async
      expect(result.current.showWelcome).toBe(false)
    })
  })

  describe("resetOnboarding function", () => {
    it("should reset onboarding and show welcome screen", async () => {
      // Pre-set onboarding as completed
      localStorageMock.setItem(ONBOARDING_KEY, "true")

      const { result } = renderHook(() => useOnboarding())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      // Initially should not show welcome
      expect(result.current.showWelcome).toBe(false)

      // Reset onboarding
      act(() => {
        result.current.resetOnboarding()
      })

      // Should show welcome screen again
      expect(result.current.showWelcome).toBe(true)

      // Should remove from localStorage
      expect(localStorageMock.getItem(ONBOARDING_KEY)).toBeNull()
    })

    it("should allow completing onboarding after reset", async () => {
      // Pre-set onboarding as completed
      localStorageMock.setItem(ONBOARDING_KEY, "true")

      const { result } = renderHook(() => useOnboarding())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      // Reset onboarding
      act(() => {
        result.current.resetOnboarding()
      })

      expect(result.current.showWelcome).toBe(true)

      // Complete again
      act(() => {
        result.current.completeOnboarding()
      })

      expect(result.current.showWelcome).toBe(false)
      expect(localStorageMock.getItem(ONBOARDING_KEY)).toBe("true")
    })

    it("should work even if onboarding was not completed", async () => {
      const { result } = renderHook(() => useOnboarding())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current.showWelcome).toBe(true)

      // Reset (should be no-op effectively, but still work)
      act(() => {
        result.current.resetOnboarding()
      })

      expect(result.current.showWelcome).toBe(true)
    })

    it("should immediately update showWelcome state", async () => {
      // Pre-set onboarding as completed
      localStorageMock.setItem(ONBOARDING_KEY, "true")

      const { result } = renderHook(() => useOnboarding())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current.showWelcome).toBe(false)

      act(() => {
        result.current.resetOnboarding()
      })

      // Should update immediately, not async
      expect(result.current.showWelcome).toBe(true)
    })
  })

  describe("Integration: Complete onboarding flow", () => {
    it("should handle complete user onboarding journey", async () => {
      // Step 1: First visit (onboarding not completed)
      const { result: visit1 } = renderHook(() => useOnboarding())

      await waitFor(() => expect(visit1.current.isLoading).toBe(false))

      expect(visit1.current.showWelcome).toBe(true)
      expect(localStorageMock.getItem(ONBOARDING_KEY)).toBeNull()

      // Step 2: Complete onboarding
      act(() => {
        visit1.current.completeOnboarding()
      })

      expect(visit1.current.showWelcome).toBe(false)
      expect(localStorageMock.getItem(ONBOARDING_KEY)).toBe("true")

      // Step 3: Second visit (onboarding already completed)
      const { result: visit2 } = renderHook(() => useOnboarding())

      await waitFor(() => expect(visit2.current.isLoading).toBe(false))

      expect(visit2.current.showWelcome).toBe(false)

      // Step 4: User wants to see onboarding again (e.g., from settings)
      act(() => {
        visit2.current.resetOnboarding()
      })

      expect(visit2.current.showWelcome).toBe(true)
      expect(localStorageMock.getItem(ONBOARDING_KEY)).toBeNull()

      // Step 5: Complete again
      act(() => {
        visit2.current.completeOnboarding()
      })

      expect(visit2.current.showWelcome).toBe(false)
      expect(localStorageMock.getItem(ONBOARDING_KEY)).toBe("true")
    })

    it("should handle rapid complete/reset cycles", async () => {
      const { result } = renderHook(() => useOnboarding())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      // Complete
      act(() => {
        result.current.completeOnboarding()
      })
      expect(result.current.showWelcome).toBe(false)

      // Reset
      act(() => {
        result.current.resetOnboarding()
      })
      expect(result.current.showWelcome).toBe(true)

      // Complete again
      act(() => {
        result.current.completeOnboarding()
      })
      expect(result.current.showWelcome).toBe(false)

      // Reset again
      act(() => {
        result.current.resetOnboarding()
      })
      expect(result.current.showWelcome).toBe(true)

      // Final state check
      expect(localStorageMock.getItem(ONBOARDING_KEY)).toBeNull()
    })
  })

  describe("Edge cases", () => {
    it("should handle corrupted localStorage value", async () => {
      // Set invalid value
      localStorageMock.setItem(ONBOARDING_KEY, "invalid-value")

      const { result } = renderHook(() => useOnboarding())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      // Should treat any truthy value as completed
      expect(result.current.showWelcome).toBe(false)
    })

    it("should handle localStorage being unavailable", async () => {
      // Mock localStorage.getItem to throw error
      const originalGetItem = localStorageMock.getItem
      localStorageMock.getItem = vi.fn(() => {
        throw new Error("localStorage unavailable")
      })

      const { result } = renderHook(() => useOnboarding())

      // Should not crash
      await waitFor(() => expect(result.current.isLoading).toBe(false))

      // Restore
      localStorageMock.getItem = originalGetItem
    })

    it("should handle multiple hook instances", async () => {
      const { result: instance1 } = renderHook(() => useOnboarding())
      const { result: instance2 } = renderHook(() => useOnboarding())

      await waitFor(() => {
        expect(instance1.current.isLoading).toBe(false)
        expect(instance2.current.isLoading).toBe(false)
      })

      // Complete in first instance
      act(() => {
        instance1.current.completeOnboarding()
      })

      expect(instance1.current.showWelcome).toBe(false)

      // Second instance should still show old state (no sync mechanism)
      // This is expected behavior - localStorage changes don't auto-sync
      expect(instance2.current.showWelcome).toBe(true)

      // But new renders will pick up the change
      const { result: instance3 } = renderHook(() => useOnboarding())

      await waitFor(() => expect(instance3.current.isLoading).toBe(false))

      expect(instance3.current.showWelcome).toBe(false)
    })
  })

  describe("Return value structure", () => {
    it("should return correct shape", async () => {
      const { result } = renderHook(() => useOnboarding())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current).toHaveProperty("showWelcome")
      expect(result.current).toHaveProperty("isLoading")
      expect(result.current).toHaveProperty("completeOnboarding")
      expect(result.current).toHaveProperty("resetOnboarding")

      expect(typeof result.current.showWelcome).toBe("boolean")
      expect(typeof result.current.isLoading).toBe("boolean")
      expect(typeof result.current.completeOnboarding).toBe("function")
      expect(typeof result.current.resetOnboarding).toBe("function")
    })
  })
})
