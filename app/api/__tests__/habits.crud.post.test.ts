import { describe, it, expect, beforeEach, vi } from "vitest"
import { POST } from "@/app/api/habits/route"
import {
  createMockPrisma,
  mockAuthSession,
  parseResponse,
  mockSession,
  mockHabit,
} from "./setup"

// Mock dependencies
vi.mock("@/lib/prisma", () => ({
  prisma: createMockPrisma(),
}))

vi.mock("@/lib/auth", () => ({
  auth: mockAuthSession(),
}))

vi.mock("@/lib/auth-helpers", () => ({
  verifyHabitOwnership: vi.fn(),
}))

const { prisma } = await import("@/lib/prisma")
const { auth } = await import("@/lib/auth")

describe("Habits API - CRUD Operations", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("POST /api/habits - Create habit", () => {
    it("should create habit with valid data", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.habit.create.mockResolvedValue(mockHabit)

      const habitData = {
        name: "Drink Water",
        description: "Stay hydrated",
        color: "#3B82F6",
        icon: "droplet",
        trigger: "When I wake up",
        action: "I will drink a glass of water",
        context: "In the kitchen",
      }

      const request = new Request("http://localhost:3000/api/habits", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(habitData),
      })

      const response = await POST(request)
      const data = await parseResponse(response!)

      expect(response!.status).toBe(201)
      expect(data).toMatchObject({
        id: mockHabit.id,
        name: habitData.name,
      })

      expect(mockPrisma.habit.create).toHaveBeenCalledWith({
        data: {
          ...habitData,
          frequency: "daily", // Default
          goal: 1, // Default
          userId: mockSession.user!.id,
        },
      })
    })

    it("should create habit with minimal data", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.habit.create.mockResolvedValue(mockHabit)

      const request = new Request("http://localhost:3000/api/habits", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Minimal Habit" }),
      })

      const response = await POST(request)

      expect(response!.status).toBe(201)
    })

    it("should return 400 for missing name", async () => {
      ;(auth as any).mockResolvedValue(mockSession)

      const request = new Request("http://localhost:3000/api/habits", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ description: "Missing name" }),
      })

      const response = await POST(request)
      const data = await parseResponse(response!)

      expect(response!.status).toBe(400)
      expect(data.error).toBe("Invalid input")
    })

    it("should return 400 for empty name", async () => {
      ;(auth as any).mockResolvedValue(mockSession)

      const request = new Request("http://localhost:3000/api/habits", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "" }),
      })

      const response = await POST(request)
      await parseResponse(response)

      expect(response!.status).toBe(400)
    })

    it("should return 401 if not authenticated", async () => {
      ;(auth as any).mockResolvedValue(null)

      const request = new Request("http://localhost:3000/api/habits", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Test Habit" }),
      })

      const response = await POST(request)
      const data = await parseResponse(response!)

      expect(response!.status).toBe(401)
      expect(data.error).toBe("Unauthorized")
    })

    it("should handle very long habit name", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.habit.create.mockResolvedValue(mockHabit)

      const longName = "A".repeat(500)

      const request = new Request("http://localhost:3000/api/habits", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: longName }),
      })

      const response = await POST(request)

      expect(response!.status).toBe(201)
    })
  })
})
