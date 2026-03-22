import { describe, it, expect, beforeEach, vi } from "vitest"
import { GET } from "@/app/api/thought-records/route"
import {
  createMockPrisma,
  mockAuthSession,
  parseResponse,
  mockUser,
  mockSession,
  mockThoughtRecord,
  mockHabit,
} from "./setup"

// Mock dependencies
vi.mock("@/lib/prisma", () => ({
  prisma: createMockPrisma(),
}))

vi.mock("@/lib/auth", () => ({
  auth: mockAuthSession(),
}))

const { prisma } = await import("@/lib/prisma")
const { auth } = await import("@/lib/auth")

describe("Thought Records API", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("GET /api/thought-records - List thought records", () => {
    it("should return all thought records for authenticated user", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.thoughtRecord.findMany.mockResolvedValue([
        {
          ...mockThoughtRecord,
          habit: {
            id: mockHabit.id,
            name: mockHabit.name,
            icon: mockHabit.icon,
            color: mockHabit.color,
          },
        },
      ])

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data).toHaveLength(1)
      expect(data[0]).toMatchObject({
        id: mockThoughtRecord.id,
        adversity: mockThoughtRecord.adversity,
        belief: mockThoughtRecord.belief,
        consequence: mockThoughtRecord.consequence,
      })
    })

    it("should include linked habit information", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.thoughtRecord.findMany.mockResolvedValue([
        {
          ...mockThoughtRecord,
          habit: {
            id: mockHabit.id,
            name: mockHabit.name,
            icon: mockHabit.icon,
            color: mockHabit.color,
          },
        },
      ])

      const response = await GET()
      const data = await parseResponse(response)

      expect(data[0].habit).toMatchObject({
        id: mockHabit.id,
        name: mockHabit.name,
        icon: mockHabit.icon,
        color: mockHabit.color,
      })
    })

    it("should return empty array if no thought records exist", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.thoughtRecord.findMany.mockResolvedValue([])

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(200)
      expect(data).toEqual([])
    })

    it("should return records ordered by createdAt desc", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.thoughtRecord.findMany.mockResolvedValue([])

      await GET()

      expect(mockPrisma.thoughtRecord.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: "desc" },
        })
      )
    })

    it("should return 401 if not authenticated", async () => {
      ;(auth as any).mockResolvedValue(null)

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(401)
      expect(data.error).toBe("Unauthorized")
    })

    it("should return 404 if user not found", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(null)

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(404)
      expect(data.error).toBe("User not found")
    })

    it("should return 500 on database error", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.thoughtRecord.findMany.mockRejectedValue(new Error("Database error"))

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe("Failed to fetch thought records")
    })
  })
})
