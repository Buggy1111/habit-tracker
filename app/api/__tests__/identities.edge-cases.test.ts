import { describe, it, expect, beforeEach, vi } from "vitest"
import { POST } from "@/app/api/identities/route"
import { NextRequest } from "next/server"
import {
  createMockPrisma,
  mockAuthSession,
  parseResponse,
  mockUser,
  mockSession,
  mockIdentity,
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
