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

  describe("Edge cases", () => {
    it("should handle very long text fields", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.thoughtRecord.create.mockResolvedValue({
        ...mockThoughtRecord,
        habit: null,
      })

      const longText = "A".repeat(5000)

      const request = new Request("http://localhost:3000/api/thought-records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          adversity: longText,
          belief: longText,
          consequence: longText,
        }),
      })

      const response = await POST(request as NextRequest)

      expect(response.status).toBe(201)
    })

    it("should handle special characters and emojis", async () => {
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
          adversity: "I felt 😞 when I missed my habit",
          belief: "I'm not good enough 💔",
          consequence: "Depression & anxiety 😔",
        }),
      })

      const response = await POST(request as NextRequest)

      expect(response.status).toBe(201)
    })

    it("should handle concurrent thought record creation", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockPrisma.thoughtRecord.create.mockResolvedValue({
        ...mockThoughtRecord,
        habit: null,
      })

      const requests = Array(3)
        .fill(null)
        .map(
          (_, i) =>
            new Request("http://localhost:3000/api/thought-records", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                adversity: `Adversity ${i}`,
                belief: `Belief ${i}`,
                consequence: `Consequence ${i}`,
              }),
            })
        )

      const responses = await Promise.all(requests.map((req) => POST(req as NextRequest)))

      responses.forEach((response) => {
        expect(response.status).toBe(201)
      })

      expect(mockPrisma.thoughtRecord.create).toHaveBeenCalledTimes(3)
    })
  })
})
