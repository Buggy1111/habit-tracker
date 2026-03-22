import { vi } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { UserStats } from ".."

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
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

export const mockStats: UserStats = {
  habits: {
    total: 15,
    active: 12,
    archived: 3,
  },
  logs: {
    total: 450,
    thisMonth: 85,
  },
  identities: {
    total: 3,
  },
  woopPlans: {
    total: 8,
  },
  thoughtRecords: {
    total: 12,
  },
  dataSize: "2.3 MB",
  memberSince: new Date("2025-01-01"),
}
