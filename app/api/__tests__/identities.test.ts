import { describe, it, expect, beforeEach, vi } from "vitest"
import { GET, POST } from "@/app/api/identities/route"
import { NextRequest } from "next/server"
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

  describe("POST /api/identities - Create identity", () => {
    it("should create identity with valid data", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.identity.create.mockResolvedValue({
        ...mockIdentity,
        habits: [],
        milestones: [],
      })

      const request = new Request("http://localhost:3000/api/identities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: "Healthy Person",
          description: "Someone who prioritizes health",
        }),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(201)
      expect(data).toMatchObject({
        id: mockIdentity.id,
        title: "Healthy Person",
        description: "Someone who prioritizes health",
      })

      expect(mockPrisma.identity.create).toHaveBeenCalledWith({
        data: {
          userId: mockUser.id,
          title: "Healthy Person",
          description: "Someone who prioritizes health",
        },
        include: {
          habits: true,
          milestones: true,
        },
      })
    })

    it("should create identity without description", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.identity.create.mockResolvedValue({
        ...mockIdentity,
        description: null,
        habits: [],
        milestones: [],
      })

      const request = new Request("http://localhost:3000/api/identities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: "Healthy Person",
        }),
      })

      const response = await POST(request as NextRequest)

      expect(response.status).toBe(201)
    })

    it("should trim title and description", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.identity.create.mockResolvedValue({
        ...mockIdentity,
        habits: [],
        milestones: [],
      })

      const request = new Request("http://localhost:3000/api/identities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: "  Healthy Person  ",
          description: "  Someone who prioritizes health  ",
        }),
      })

      await POST(request as NextRequest)

      expect(mockPrisma.identity.create).toHaveBeenCalledWith({
        data: {
          userId: mockUser.id,
          title: "Healthy Person",
          description: "Someone who prioritizes health",
        },
        include: {
          habits: true,
          milestones: true,
        },
      })
    })

    it("should return 400 for missing title", async () => {
      ;(auth as any).mockResolvedValue(mockSession)

      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      const request = new Request("http://localhost:3000/api/identities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          description: "Missing title",
        }),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Title is required")
    })

    it("should return 400 for empty title", async () => {
      ;(auth as any).mockResolvedValue(mockSession)

      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      const request = new Request("http://localhost:3000/api/identities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: "",
        }),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Title is required")
    })

    it("should return 400 for whitespace-only title", async () => {
      ;(auth as any).mockResolvedValue(mockSession)

      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      const request = new Request("http://localhost:3000/api/identities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: "   ",
        }),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Title is required")
    })

    it("should return 401 if not authenticated", async () => {
      ;(auth as any).mockResolvedValue(null)

      const request = new Request("http://localhost:3000/api/identities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: "Healthy Person",
        }),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(401)
      expect(data.error).toBe("Unauthorized")
    })

    it("should return 404 if user not found", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(null)

      const request = new Request("http://localhost:3000/api/identities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: "Healthy Person",
        }),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(404)
      expect(data.error).toBe("User not found")
    })

    it("should return 500 on database error", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.identity.create.mockRejectedValue(new Error("Database error"))

      const request = new Request("http://localhost:3000/api/identities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: "Healthy Person",
        }),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe("Failed to create identity")
    })
  })

  describe("Edge cases", () => {
    it("should handle very long title", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.identity.create.mockResolvedValue({
        ...mockIdentity,
        habits: [],
        milestones: [],
      })

      const longTitle = "A".repeat(500)

      const request = new Request("http://localhost:3000/api/identities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: longTitle,
        }),
      })

      const response = await POST(request as NextRequest)

      expect(response.status).toBe(201)
    })

    it("should handle special characters in title", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.identity.create.mockResolvedValue({
        ...mockIdentity,
        habits: [],
        milestones: [],
      })

      const specialTitle = "健康な人 🏃‍♂️💪"

      const request = new Request("http://localhost:3000/api/identities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: specialTitle,
        }),
      })

      const response = await POST(request as NextRequest)

      expect(response.status).toBe(201)
    })

    it("should handle concurrent identity creation", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.identity.create.mockResolvedValue({
        ...mockIdentity,
        habits: [],
        milestones: [],
      })

      const requests = [
        new Request("http://localhost:3000/api/identities", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ title: "Identity 1" }),
        }),
        new Request("http://localhost:3000/api/identities", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ title: "Identity 2" }),
        }),
        new Request("http://localhost:3000/api/identities", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ title: "Identity 3" }),
        }),
      ]

      const responses = await Promise.all(requests.map((req) => POST(req as NextRequest)))

      responses.forEach((response) => {
        expect(response.status).toBe(201)
      })

      expect(mockPrisma.identity.create).toHaveBeenCalledTimes(3)
    })
  })
})
