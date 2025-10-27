import { vi } from "vitest"
import type { Session } from "next-auth"

/**
 * Test Setup Utilities for API Integration Tests
 *
 * This file provides mock utilities and helpers for testing Next.js API routes
 */

// ==================== MOCK DATA ====================

export const mockUser = {
  id: "test-user-123",
  email: "test@example.com",
  name: "Test User",
  password: "$2a$10$abcdefghijklmnopqrstuvwxy", // Mock hashed password
  emailVerified: new Date("2024-01-01"),
  image: null,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
}

export const mockSession: Session = {
  user: {
    id: mockUser.id,
    email: mockUser.email,
    name: mockUser.name,
  },
  expires: "2099-01-01T00:00:00.000Z",
}

export const mockHabit = {
  id: "habit-123",
  userId: mockUser.id,
  name: "Drink Water",
  description: "Stay hydrated",
  color: "#3B82F6",
  icon: "droplet",
  frequency: "daily",
  goal: 1,
  trigger: "When I wake up",
  action: "I will drink a glass of water",
  context: "In the kitchen",
  identityId: null,
  startDate: new Date("2024-01-01"),
  isActive: true,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
}

export const mockHabitLog = {
  id: "log-123",
  habitId: mockHabit.id,
  userId: mockUser.id,
  date: new Date("2024-01-15"),
  completed: true,
  note: null,
  mood: null,
  createdAt: new Date("2024-01-15"),
}

export const mockIdentity = {
  id: "identity-123",
  userId: mockUser.id,
  title: "Healthy Person",
  description: "Someone who prioritizes health",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
}

export const mockWoopPlan = {
  id: "woop-123",
  habitId: mockHabit.id,
  userId: mockUser.id,
  wish: "I want to drink more water",
  outcome: "I'll feel more energized",
  obstacle: "I forget to drink water",
  plan: "If I forget, I'll set a reminder on my phone",
  createdAt: new Date("2024-01-01"),
}

export const mockThoughtRecord = {
  id: "thought-123",
  userId: mockUser.id,
  habitId: mockHabit.id,
  adversity: "I missed my habit today",
  belief: "I'm terrible at building habits",
  consequence: "I feel like giving up",
  evidence: "I've succeeded for 14 days straight before missing",
  alternative: "One miss doesn't define my journey. I can start again tomorrow.",
  permanence: "temporary",
  pervasiveness: "specific",
  personalization: "external",
  createdAt: new Date("2024-01-01"),
}

// ==================== MOCK FUNCTIONS ====================

/**
 * Create a mock Prisma client with common operations
 */
export function createMockPrisma() {
  return {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    habit: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    habitLog: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
    habitDifficultyLog: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
    identity: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    identityMilestone: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    woopPlan: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    thoughtRecord: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    verificationToken: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
    passwordResetToken: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  }
}

/**
 * Create a mock authenticated session
 */
export function mockAuthSession(session: Session | null = mockSession) {
  return vi.fn().mockResolvedValue(session)
}

/**
 * Create a mock unauthenticated session
 */
export function mockUnauthenticatedSession() {
  return vi.fn().mockResolvedValue(null)
}

/**
 * Create a mock Request object
 */
export function createMockRequest(
  method: string = "GET",
  body?: Record<string, unknown>,
  headers?: Record<string, string>
): Request {
  const url = "http://localhost:3000/api/test"
  const options: RequestInit = {
    method,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  return new Request(url, options)
}

/**
 * Parse NextResponse to get JSON data
 */
export async function parseResponse(response: Response) {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

/**
 * Mock bcrypt for password hashing tests
 */
export function mockBcrypt() {
  return {
    hash: vi.fn().mockResolvedValue("$2a$10$hashedpassword"),
    compare: vi.fn().mockResolvedValue(true),
  }
}

/**
 * Mock rate limiting (always successful)
 */
export function mockRateLimitSuccess() {
  return {
    checkAuthRateLimit: vi.fn().mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 60000,
    }),
    getClientIp: vi.fn().mockReturnValue("127.0.0.1"),
  }
}

/**
 * Mock rate limiting (failed - exceeded)
 */
export function mockRateLimitExceeded() {
  return {
    checkAuthRateLimit: vi.fn().mockResolvedValue({
      success: false,
      limit: 5,
      remaining: 0,
      reset: Date.now() + 60000,
    }),
    getClientIp: vi.fn().mockReturnValue("127.0.0.1"),
  }
}

/**
 * Mock email service
 */
export function mockEmailService() {
  return {
    sendVerificationEmail: vi.fn().mockResolvedValue({
      success: true,
      message: "Email sent successfully",
    }),
    sendPasswordResetEmail: vi.fn().mockResolvedValue({
      success: true,
      message: "Email sent successfully",
    }),
  }
}

/**
 * Mock email service (failed)
 */
export function mockEmailServiceFailed() {
  return {
    sendVerificationEmail: vi.fn().mockResolvedValue({
      success: false,
      error: "Failed to send email",
    }),
    sendPasswordResetEmail: vi.fn().mockResolvedValue({
      success: false,
      error: "Failed to send email",
    }),
  }
}

/**
 * Mock token creation
 */
export function mockTokenCreation() {
  return {
    createVerificationToken: vi.fn().mockResolvedValue({
      token: "verification-token-123",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }),
    createPasswordResetToken: vi.fn().mockResolvedValue({
      token: "reset-token-123",
      expires: new Date(Date.now() + 60 * 60 * 1000),
    }),
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Create a date offset from today
 */
export function daysAgo(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() - days)
  date.setHours(0, 0, 0, 0)
  return date
}

/**
 * Create a date offset into the future
 */
export function daysFromNow(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(0, 0, 0, 0)
  return date
}

/**
 * Create multiple habit logs for testing
 */
export function createMockLogs(habitId: string, days: number, completedPattern: boolean[] = []) {
  const logs = []
  for (let i = 0; i < days; i++) {
    const completed =
      completedPattern.length > 0 ? completedPattern[i % completedPattern.length] : true
    logs.push({
      id: `log-${i}`,
      habitId,
      userId: mockUser.id,
      date: daysAgo(i),
      completed,
      note: null,
      mood: null,
      createdAt: daysAgo(i),
    })
  }
  return logs
}
