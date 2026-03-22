import { describe, it, expect, beforeEach, vi } from "vitest"
import { PATCH } from "@/app/api/habits/[habitId]/route"
import { NextResponse } from "next/server"
import {
  createMockPrisma,
  mockAuthSession,
  parseResponse,
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
const { verifyHabitOwnership } = await import("@/lib/auth-helpers")

describe("Habits API - CRUD Operations", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("PATCH /api/habits/[habitId] - Update habit", () => {
    it("should update habit with valid data", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })
      mockPrisma.habit.update.mockResolvedValue({
        ...mockHabit,
        name: "Updated Name",
      })

      const request = new Request("http://localhost:3000/api/habits/habit-123", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Updated Name" }),
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await PATCH(request, { params })
      const data = await parseResponse(response!)

      expect(response!.status).toBe(200)
      expect(data.name).toBe("Updated Name")

      expect(mockPrisma.habit.update).toHaveBeenCalledWith({
        where: { id: "habit-123" },
        data: { name: "Updated Name" },
      })
    })

    it("should allow partial updates", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })
      mockPrisma.habit.update.mockResolvedValue(mockHabit)

      const request = new Request("http://localhost:3000/api/habits/habit-123", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ color: "#FF0000" }),
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await PATCH(request, { params })

      expect(response!.status).toBe(200)
    })

    it("should return 401 if user doesn't own habit", async () => {
      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: false,
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) as any,
      })

      const request = new Request("http://localhost:3000/api/habits/habit-123", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Updated" }),
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await PATCH(request, { params })

      expect(response!.status).toBe(401)
    })

    it("should return 400 for invalid data", async () => {
      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })

      const request = new Request("http://localhost:3000/api/habits/habit-123", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "" }), // Empty name not allowed
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await PATCH(request, { params })
      const data = await parseResponse(response!)

      expect(response!.status).toBe(400)
      expect(data.error).toBe("Invalid input")
    })
  })
})
