import { describe, it, expect, beforeEach, vi } from "vitest"
import { POST } from "@/app/api/thought-records/route"
import { NextRequest } from "next/server"
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

  describe("POST /api/thought-records - Create thought record", () => {
    it("should create thought record with all fields", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.thoughtRecord.create.mockResolvedValue({
        ...mockThoughtRecord,
        habit: {
          id: mockHabit.id,
          name: mockHabit.name,
          icon: mockHabit.icon,
          color: mockHabit.color,
        },
      })

      const thoughtData = {
        habitId: mockHabit.id,
        adversity: "I missed my habit today",
        belief: "I'm terrible at building habits",
        consequence: "I feel like giving up",
        evidence: "I've succeeded for 14 days straight before missing",
        alternative: "One miss doesn't define my journey",
        permanence: "temporary",
        pervasiveness: "specific",
        personalization: "external",
      }

      const request = new Request("http://localhost:3000/api/thought-records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(thoughtData),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(201)
      expect(data).toMatchObject({
        adversity: thoughtData.adversity,
        belief: thoughtData.belief,
        consequence: thoughtData.consequence,
      })

      expect(mockPrisma.thoughtRecord.create).toHaveBeenCalledWith({
        data: {
          userId: mockUser.id,
          habitId: mockHabit.id,
          adversity: thoughtData.adversity,
          belief: thoughtData.belief,
          consequence: thoughtData.consequence,
          evidence: thoughtData.evidence,
          alternative: thoughtData.alternative,
          permanence: thoughtData.permanence,
          pervasiveness: thoughtData.pervasiveness,
          personalization: thoughtData.personalization,
        },
        include: {
          habit: {
            select: {
              id: true,
              name: true,
              icon: true,
              color: true,
            },
          },
        },
      })
    })

    it("should create thought record with only required fields", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.thoughtRecord.create.mockResolvedValue({
        ...mockThoughtRecord,
        habitId: null,
        evidence: null,
        alternative: null,
        permanence: null,
        pervasiveness: null,
        personalization: null,
        habit: null,
      })

      const request = new Request("http://localhost:3000/api/thought-records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          adversity: "I missed my habit",
          belief: "I'm bad at this",
          consequence: "I feel bad",
        }),
      })

      const response = await POST(request as NextRequest)

      expect(response.status).toBe(201)
    })

    it("should create thought record without habitId", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.thoughtRecord.create.mockResolvedValue({
        ...mockThoughtRecord,
        habitId: null,
        habit: null,
      })

      const request = new Request("http://localhost:3000/api/thought-records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          adversity: "General anxiety",
          belief: "Things won't work out",
          consequence: "Feel stressed",
        }),
      })

      const response = await POST(request as NextRequest)

      expect(response.status).toBe(201)
    })

    it("should trim all text fields", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.thoughtRecord.create.mockResolvedValue({
        ...mockThoughtRecord,
        habit: null,
      })

      const request = new Request("http://localhost:3000/api/thought-records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          adversity: "  I missed my habit  ",
          belief: "  I'm bad at this  ",
          consequence: "  I feel bad  ",
          evidence: "  Some evidence  ",
        }),
      })

      await POST(request as NextRequest)

      expect(mockPrisma.thoughtRecord.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            adversity: "I missed my habit",
            belief: "I'm bad at this",
            consequence: "I feel bad",
            evidence: "Some evidence",
          }),
        })
      )
    })

    it("should return 400 for missing adversity", async () => {
      ;(auth as any).mockResolvedValue(mockSession)

      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      const request = new Request("http://localhost:3000/api/thought-records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          belief: "I'm bad at this",
          consequence: "I feel bad",
        }),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toContain("required")
    })

    it("should return 400 for missing belief", async () => {
      ;(auth as any).mockResolvedValue(mockSession)

      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      const request = new Request("http://localhost:3000/api/thought-records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          adversity: "I missed my habit",
          consequence: "I feel bad",
        }),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toContain("required")
    })

    it("should return 400 for missing consequence", async () => {
      ;(auth as any).mockResolvedValue(mockSession)

      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      const request = new Request("http://localhost:3000/api/thought-records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          adversity: "I missed my habit",
          belief: "I'm bad at this",
        }),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toContain("required")
    })

    it("should return 401 if not authenticated", async () => {
      ;(auth as any).mockResolvedValue(null)

      const request = new Request("http://localhost:3000/api/thought-records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          adversity: "Test",
          belief: "Test",
          consequence: "Test",
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

      const request = new Request("http://localhost:3000/api/thought-records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          adversity: "Test",
          belief: "Test",
          consequence: "Test",
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
      mockPrisma.thoughtRecord.create.mockRejectedValue(new Error("Database error"))

      const request = new Request("http://localhost:3000/api/thought-records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          adversity: "Test",
          belief: "Test",
          consequence: "Test",
        }),
      })

      const response = await POST(request as NextRequest)
      const data = await parseResponse(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe("Failed to create thought record")
    })
  })
})
