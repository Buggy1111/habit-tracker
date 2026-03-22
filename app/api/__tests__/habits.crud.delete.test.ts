import { describe, it, expect, beforeEach, vi } from "vitest"
import { DELETE } from "@/app/api/habits/[habitId]/route"
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

  describe("DELETE /api/habits/[habitId] - Delete habit", () => {
    it("should soft delete habit (set isActive=false)", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })
      mockPrisma.habit.update.mockResolvedValue({
        ...mockHabit,
        isActive: false,
      })

      const request = new Request("http://localhost:3000/api/habits/habit-123", {
        method: "DELETE",
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await DELETE(request, { params })
      const data = await parseResponse(response!)

      expect(response!.status).toBe(200)
      expect(data.success).toBe(true)

      expect(mockPrisma.habit.update).toHaveBeenCalledWith({
        where: { id: "habit-123" },
        data: { isActive: false },
      })
    })

    it("should return 401 if user doesn't own habit", async () => {
      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: false,
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) as any,
      })

      const request = new Request("http://localhost:3000/api/habits/habit-123", {
        method: "DELETE",
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await DELETE(request, { params })

      expect(response!.status).toBe(401)
    })

    it("should return 404 if habit not found", async () => {
      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: false,
        error: NextResponse.json({ error: "Habit not found" }, { status: 404 }) as any,
      })

      const request = new Request("http://localhost:3000/api/habits/nonexistent", {
        method: "DELETE",
      })

      const params = Promise.resolve({ habitId: "nonexistent" })
      const response = await DELETE(request, { params })

      expect(response!.status).toBe(404)
    })

    it("should return 500 on database error", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })
      mockPrisma.habit.update.mockRejectedValue(new Error("Database error"))

      const request = new Request("http://localhost:3000/api/habits/habit-123", {
        method: "DELETE",
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await DELETE(request, { params })
      const data = await parseResponse(response!)

      expect(response!.status).toBe(500)
      expect(data.error).toBe("Internal server error")
    })
  })
})
