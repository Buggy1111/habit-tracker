import { vi } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { Identity } from ".."

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

export const mockIdentity: Identity = {
  id: "identity-1",
  userId: "user-1",
  title: "Zdrav\u00FD \u010Dlov\u011Bk",
  description: "Jsem \u010Dlov\u011Bk, kter\u00FD se star\u00E1 o sv\u00E9 zdrav\u00ED",
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-01-15"),
  habits: [
    {
      id: "habit-1",
      name: "Drink Water",
      icon: "\u{1F4A7}",
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
