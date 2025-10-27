import { describe, it, expect, beforeEach, vi } from "vitest"
import { GET, POST } from "@/app/api/habits/route"
import { DELETE, PATCH } from "@/app/api/habits/[habitId]/route"
import { NextResponse } from "next/server"
import {
  createMockPrisma,
  mockAuthSession,
  parseResponse,
  mockSession,
  mockHabit,
  createMockLogs,
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
const { verifyHabitOwnership } = await import("@/lib/auth-helpers")

describe("Habits API - CRUD Operations", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("GET /api/habits - List all habits", () => {
    it("should return all habits for authenticated user", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)

      const logs = createMockLogs(mockHabit.id, 7, [true, true, true, true, true, true, true])
      mockPrisma.habit.findMany.mockResolvedValue([
        {
          ...mockHabit,
          logs,
        },
      ])
      mockPrisma.habitDifficultyLog.findMany.mockResolvedValue([])

      const response = await GET()
      const data = await parseResponse(response!)

      expect(response!.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data).toHaveLength(1)
      expect(data[0]).toMatchObject({
        id: mockHabit.id,
        name: mockHabit.name,
        habitStrength: expect.any(Number),
        neuroplasticityPhase: expect.any(Object),
        extinctionBurst: expect.any(Object),
      })
    })

    it("should return empty array if user has no habits", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.habit.findMany.mockResolvedValue([])
      mockPrisma.habitDifficultyLog.findMany.mockResolvedValue([])

      const response = await GET()
      const data = await parseResponse(response!)

      expect(response!.status).toBe(200)
      expect(data).toEqual([])
    })

    it("should calculate science metrics correctly", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)

      const logs = createMockLogs(mockHabit.id, 30)
      mockPrisma.habit.findMany.mockResolvedValue([
        {
          ...mockHabit,
          logs,
        },
      ])
      mockPrisma.habitDifficultyLog.findMany.mockResolvedValue([])

      const response = await GET()
      const data = await parseResponse(response!)

      expect(data[0]).toMatchObject({
        habitStrength: expect.any(Number),
        strengthLevel: expect.objectContaining({
          level: expect.any(String),
          description: expect.any(String),
          color: expect.any(String),
        }),
        neuroplasticityPhase: expect.objectContaining({
          phase: expect.any(Number),
          title: expect.any(String),
        }),
        extinctionBurst: expect.objectContaining({
          detected: expect.any(Boolean),
        }),
      })
    })

    it("should return 401 if not authenticated", async () => {
      ;(auth as any).mockResolvedValue(null)

      const response = await GET()
      const data = await parseResponse(response!)

      expect(response!.status).toBe(401)
      expect(data.error).toBe("Unauthorized")
    })

    it("should only return active habits", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.habit.findMany.mockResolvedValue([
        { ...mockHabit, logs: [] },
        { ...mockHabit, id: "habit-2", isActive: false, logs: [] },
      ])
      mockPrisma.habitDifficultyLog.findMany.mockResolvedValue([])

      const response = await GET()
      await parseResponse(response)

      // Verify query filter
      expect(mockPrisma.habit.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            isActive: true,
          }),
        })
      )
    })

    it("should return 500 on database error", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.habit.findMany.mockRejectedValue(new Error("Database error"))

      const response = await GET()
      const data = await parseResponse(response!)

      expect(response!.status).toBe(500)
      expect(data.error).toBe("Internal server error")
    })
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
