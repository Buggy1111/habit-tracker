import { describe, it, expect, beforeEach, vi } from "vitest"
import { POST } from "@/app/api/habits/[habitId]/complete/route"
import { NextResponse } from "next/server"
import { createMockPrisma, parseResponse, mockHabitLog } from "./setup"

// Mock dependencies
vi.mock("@/lib/prisma", () => ({
  prisma: createMockPrisma(),
}))

vi.mock("@/lib/auth-helpers", () => ({
  verifyHabitOwnership: vi.fn(),
}))

const { prisma } = await import("@/lib/prisma")
const { verifyHabitOwnership } = await import("@/lib/auth-helpers")

describe("POST /api/habits/[habitId]/complete", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("Success cases", () => {
    it("should create new log when completing for first time today", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      mockPrisma.habitLog.upsert.mockResolvedValue({
        ...mockHabitLog,
        date: today,
        completed: true,
      })

      const request = new Request("http://localhost:3000/api/habits/habit-123/complete", {
        method: "POST",
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await POST(request, { params })
      const data = await parseResponse(response!)

      expect(response!.status).toBe(200)
      expect(data).toMatchObject({
        habitId: mockHabitLog.habitId,
        completed: true,
      })

      expect(mockPrisma.habitLog.upsert).toHaveBeenCalledWith({
        where: {
          habitId_userId_date: {
            habitId: "habit-123",
            userId: "test-user-123",
            date: expect.any(Date),
          },
        },
        update: {
          completed: true,
        },
        create: {
          habitId: "habit-123",
          userId: "test-user-123",
          date: expect.any(Date),
          completed: true,
        },
      })
    })

    it("should update existing log when already logged today", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })

      // Existing log that was incomplete
      const existingLog = { ...mockHabitLog, completed: false }
      mockPrisma.habitLog.upsert.mockResolvedValue({
        ...existingLog,
        completed: true,
      })

      const request = new Request("http://localhost:3000/api/habits/habit-123/complete", {
        method: "POST",
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await POST(request, { params })
      const data = await parseResponse(response!)

      expect(response!.status).toBe(200)
      expect(data.completed).toBe(true)
    })

    it("should use start of day for date (ignore time)", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })

      mockPrisma.habitLog.upsert.mockResolvedValue(mockHabitLog)

      const request = new Request("http://localhost:3000/api/habits/habit-123/complete", {
        method: "POST",
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      await POST(request, { params })

      // Verify date is set to start of day
      const callArgs = vi.mocked(mockPrisma.habitLog.upsert).mock.calls[0][0]
      const date = callArgs.where.habitId_userId_date.date

      expect(date.getHours()).toBe(0)
      expect(date.getMinutes()).toBe(0)
      expect(date.getSeconds()).toBe(0)
      expect(date.getMilliseconds()).toBe(0)
    })

    it("should handle multiple completions in same day (idempotent)", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })

      mockPrisma.habitLog.upsert.mockResolvedValue(mockHabitLog)

      const request1 = new Request("http://localhost:3000/api/habits/habit-123/complete", {
        method: "POST",
      })
      const request2 = new Request("http://localhost:3000/api/habits/habit-123/complete", {
        method: "POST",
      })

      const params = Promise.resolve({ habitId: "habit-123" })

      // Complete twice in the same day
      const response1 = await POST(request1, { params })
      const response2 = await POST(request2, { params })

      expect(response1!.status).toBe(200)
      expect(response2!.status).toBe(200)

      // Both should succeed (upsert handles this)
      expect(mockPrisma.habitLog.upsert).toHaveBeenCalledTimes(2)
    })
  })

  describe("Authentication errors", () => {
    it("should return 401 if user doesn't own habit", async () => {
      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: false,
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) as any,
      })

      const request = new Request("http://localhost:3000/api/habits/habit-123/complete", {
        method: "POST",
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await POST(request, { params })

      expect(response!.status).toBe(401)
    })

    it("should return 404 if habit not found", async () => {
      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: false,
        error: NextResponse.json({ error: "Habit not found" }, { status: 404 }) as any,
      })

      const request = new Request("http://localhost:3000/api/habits/nonexistent/complete", {
        method: "POST",
      })

      const params = Promise.resolve({ habitId: "nonexistent" })
      const response = await POST(request, { params })

      expect(response!.status).toBe(404)
    })
  })

  describe("Server errors", () => {
    it("should return 500 on database error", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })

      mockPrisma.habitLog.upsert.mockRejectedValue(new Error("Database error"))

      const request = new Request("http://localhost:3000/api/habits/habit-123/complete", {
        method: "POST",
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await POST(request, { params })
      await parseResponse(response!)

      expect(response!.status).toBe(500)
    })

    it("should return 500 on auth verification error", async () => {
      vi.mocked(verifyHabitOwnership).mockRejectedValue(new Error("Auth service unavailable"))

      const request = new Request("http://localhost:3000/api/habits/habit-123/complete", {
        method: "POST",
      })

      const params = Promise.resolve({ habitId: "habit-123" })
      const response = await POST(request, { params })
      await parseResponse(response!)

      expect(response!.status).toBe(500)
    })
  })

  describe("Edge cases", () => {
    it("should handle very long habitId", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })

      mockPrisma.habitLog.upsert.mockResolvedValue(mockHabitLog)

      const longId = "a".repeat(255)

      const request = new Request(`http://localhost:3000/api/habits/${longId}/complete`, {
        method: "POST",
      })

      const params = Promise.resolve({ habitId: longId })
      const response = await POST(request, { params })

      expect(response!.status).toBe(200)
    })

    it("should handle concurrent completion requests", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })

      mockPrisma.habitLog.upsert.mockResolvedValue(mockHabitLog)

      const requests = Array(5)
        .fill(null)
        .map(
          () =>
            new Request("http://localhost:3000/api/habits/habit-123/complete", {
              method: "POST",
            })
        )

      const params = Promise.resolve({ habitId: "habit-123" })

      // Send 5 concurrent requests
      const responses = await Promise.all(requests.map((req) => POST(req, { params })))

      // All should succeed (upsert is atomic)
      responses.forEach((response) => {
        expect(response!.status).toBe(200)
      })

      expect(mockPrisma.habitLog.upsert).toHaveBeenCalledTimes(5)
    })

    it("should maintain data integrity with timezone differences", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      vi.mocked(verifyHabitOwnership).mockResolvedValue({
        success: true,
        userId: "test-user-123",
      })

      mockPrisma.habitLog.upsert.mockResolvedValue(mockHabitLog)

      // Test at different times of day
      const times = [
        new Date("2024-01-15T00:00:00Z"), // Midnight
        new Date("2024-01-15T12:00:00Z"), // Noon
        new Date("2024-01-15T23:59:59Z"), // End of day
      ]

      for (const time of times) {
        vi.setSystemTime(time)

        const request = new Request("http://localhost:3000/api/habits/habit-123/complete", {
          method: "POST",
        })

        const params = Promise.resolve({ habitId: "habit-123" })
        const response = await POST(request, { params })

        expect(response!.status).toBe(200)

        // All should use same date (start of day)
        const callArgs = vi.mocked(mockPrisma.habitLog.upsert).mock.calls[0][0]
        const date = callArgs.where.habitId_userId_date.date

        expect(date.getHours()).toBe(0)
      }

      vi.useRealTimers()
    })
  })
})
