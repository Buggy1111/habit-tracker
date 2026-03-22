import { vi } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { IdentityMilestone } from "../../use-identities"

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

export const mockMilestone: IdentityMilestone = {
  id: "milestone-1",
  identityId: "identity-1",
  title: "7 days streak",
  achieved: false,
  achievedAt: null,
  createdAt: new Date("2025-01-01"),
}
