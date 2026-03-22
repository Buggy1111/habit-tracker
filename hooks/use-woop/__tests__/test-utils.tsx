import { vi } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { WoopPlan } from ".."

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })
}

export function createWrapper(queryClient: QueryClient) {
  function TestWrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
  return TestWrapper
}

export const mockWoopPlan: WoopPlan = {
  id: "woop-1",
  habitId: "habit-1",
  wish: "Chci pravideln\u011B cvi\u010Dit",
  outcome: "Budu se c\u00EDtit energi\u010Dt\u011Bj\u0161\u00ED a zdrav\u011Bj\u0161\u00ED",
  obstacle: "\u00DAnava po pr\u00E1ci",
  plan: "Kdy\u017E se c\u00EDt\u00EDm unaven\u00FD, p\u0159iprav\u00EDm si cvi\u010Debn\u00ED oble\u010Den\u00ED ve\u010Der",
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-01-15"),
}
