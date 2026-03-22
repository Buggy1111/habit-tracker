import { vi } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { UserProfile } from ".."

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

export const mockProfile: UserProfile = {
  id: "user-1",
  name: "Jan Nov\u00E1k",
  email: "jan.novak@example.com",
  bio: "Miluji budov\u00E1n\u00ED n\u00E1vyk\u016F!",
  avatarUrl: "https://example.com/avatar.jpg",
  timezone: "Europe/Prague",
  emailVerified: new Date("2025-01-01"),
  createdAt: new Date("2025-01-01"),
  lastLoginAt: new Date("2025-01-15"),
  lastActivityAt: new Date("2025-01-16"),
}
