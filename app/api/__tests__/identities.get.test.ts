import { describe, it, expect, beforeEach, vi } from "vitest"
import { GET } from "@/app/api/identities/route"
import {
  createMockPrisma,
  mockAuthSession,
  parseResponse,
  mockUser,
  mockSession,
  mockIdentity,
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

describe("Identities API", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("GET /api/identities - List identities", () => {
    it("should return all identities for authenticated user", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.identity.findMany.mockResolvedValue([
        {
          ...mockIdentity,
          habits: [
            {
              id: mockHabit.id,
              name: mockHabit.name,
              icon: mockHabit.icon,
              color: mockHabit.color,
            },
          ],
          milestones: [],
        },
      ])

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data).toHaveLength(1)
      expect(data[0]).toMatchObject({
        id: mockIdentity.id,
        title: mockIdentity.title,
        habits: expect.any(Array),
        milestones: expect.any(Array),
      })
    })

    it("should return empty array if no identities exist", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.identity.findMany.mockResolvedValue([])

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(200)
      expect(data).toEqual([])
    })

    it("should include linked habits and milestones", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.identity.findMany.mockResolvedValue([
        {
          ...mockIdentity,
          habits: [
            {
              id: mockHabit.id,
              name: mockHabit.name,
              icon: mockHabit.icon,
              color: mockHabit.color,
            },
          ],
          milestones: [
            {
              id: "milestone-1",
              identityId: mockIdentity.id,
              title: "First milestone",
              description: "Completed first week",
              achieved: true,
              achievedAt: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      ])

      const response = await GET()
      const data = await parseResponse(response)

      expect(data[0].habits).toHaveLength(1)
      expect(data[0].milestones).toHaveLength(1)
      expect(data[0].habits[0]).toMatchObject({
        id: mockHabit.id,
        name: mockHabit.name,
      })
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
      mockPrisma.identity.findMany.mockRejectedValue(new Error("Database error"))

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe("Failed to fetch identities")
    })
  })
})
