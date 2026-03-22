import { vi } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { Habit } from ".."

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

export const mockHabit: Habit = {
  id: "habit-1",
  userId: "user-1",
  name: "Drink Water",
  description: "Drink 8 glasses of water daily",
  color: "#3B82F6",
  icon: "\u{1F4A7}",
  frequency: "daily",
  goal: 1,
  trigger: "When I wake up",
  action: "I will drink water",
  context: "In the kitchen",
  startDate: new Date("2025-01-01"),
  isActive: true,
  streak: 7,
  completed: false,
  habitStrength: 75,
  strengthLevel: {
    level: "Siln\u00FD",
    description: "Skv\u011Bl\u00E1 pr\u00E1ce!",
    color: "#3B82F6",
  },
  neuroplasticityPhase: {
    phase: 1,
    title: "Building Neural Pathways",
    description: "Your brain is creating new connections",
    progress: 33,
    emoji: "\u{1F9E0}",
    motivationalMessage: "Great start!",
    scienceInsight: "New neural pathways are forming",
  },
  daysUntilNextPhase: 14,
  extinctionBurst: {
    detected: false,
    severity: null,
    previousRate: 0,
    recentRate: 0,
    drop: 0,
    message: "",
    supportMessage: "",
  },
  longestStreak: 10,
  logs: [
    {
      id: "log-1",
      habitId: "habit-1",
      userId: "user-1",
      date: new Date("2025-01-15"),
      completed: true,
      note: null,
      createdAt: new Date("2025-01-15"),
    },
  ],
}
