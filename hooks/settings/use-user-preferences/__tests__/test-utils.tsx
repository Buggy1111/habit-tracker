import { vi } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { UserPreferences } from ".."

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

export const mockPreferences: UserPreferences = {
  id: "pref-1",
  userId: "user-1",
  theme: "light",
  language: "cs",
  emailNotifications: true,
  weeklyReviewReminder: true,
  extinctionBurstAlerts: true,
  milestoneNotifications: true,
  analyticsEnabled: true,
  dataCollectionConsent: true,
  timezone: "Europe/Prague",
  dateFormat: "dd.MM.yyyy",
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-01-15"),
}
