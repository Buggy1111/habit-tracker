import { describe, it, expect, beforeEach, vi } from "vitest"
import { GET } from "@/app/api/habits/route"
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
})
