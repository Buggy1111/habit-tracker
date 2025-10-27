import { describe, it, expect, beforeEach, vi } from "vitest"
import { GET } from "@/app/api/user/me/route"
import { createMockPrisma, mockAuthSession, parseResponse, mockUser, mockSession } from "./setup"

// Mock dependencies
vi.mock("@/lib/prisma", () => ({
  prisma: createMockPrisma(),
}))

vi.mock("@/lib/auth", () => ({
  auth: mockAuthSession(),
}))

const { prisma } = await import("@/lib/prisma")
const { auth } = await import("@/lib/auth")

describe("GET /api/user/me", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("Success cases", () => {
    it("should return current user data when authenticated", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(200)
      expect(data.user).toMatchObject({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        emailVerified: mockUser.emailVerified.toISOString(),
        createdAt: mockUser.createdAt.toISOString(),
      })

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockSession.user!.email },
        select: {
          id: true,
          email: true,
          name: true,
          emailVerified: true,
          image: true,
          createdAt: true,
        },
      })
    })

    it("should include image if user has one", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue({
        ...mockUser,
        image: "https://example.com/avatar.jpg",
      })

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(200)
      expect(data.user.image).toBe("https://example.com/avatar.jpg")
    })

    it("should include null emailVerified if not verified", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue({
        ...mockUser,
        emailVerified: null,
      })

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(200)
      expect(data.user.emailVerified).toBeNull()
    })
  })

  describe("Authentication errors", () => {
    it("should return 401 if not authenticated", async () => {
      ;(auth as any).mockResolvedValue(null)

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(401)
      expect(data.error).toBe("Not authenticated")
    })

    it("should return 401 if session has no email", async () => {
      ;(auth as any).mockResolvedValue({
        ...mockSession,
        user: { ...mockSession.user!, email: undefined },
      })

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(401)
      expect(data.error).toBe("Not authenticated")
    })

    it("should return 401 for expired session", async () => {
      ;(auth as any).mockResolvedValue(null)

      const response = await GET()

      expect(response.status).toBe(401)
    })
  })

  describe("Not found errors", () => {
    it("should return 404 if user not found in database", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(null)

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(404)
      expect(data.error).toBe("User not found")
    })
  })

  describe("Server errors", () => {
    it("should return 500 on database error", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockRejectedValue(new Error("Database connection failed"))

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe("Internal server error")
    })

    it("should return 500 on auth service failure", async () => {
      vi.mocked(auth).mockRejectedValue(new Error("Auth service unavailable"))

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe("Internal server error")
    })
  })

  describe("Data integrity", () => {
    it("should not expose password field", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      const response = await GET()
      const data = await parseResponse(response)

      expect(data.user).not.toHaveProperty("password")
    })

    it("should only return selected fields", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      const response = await GET()
      const data = await parseResponse(response)

      const allowedFields = ["id", "email", "name", "emailVerified", "image", "createdAt"]
      const userKeys = Object.keys(data.user)

      userKeys.forEach((key) => {
        expect(allowedFields).toContain(key)
      })
    })
  })

  describe("Edge cases", () => {
    it("should handle user with very long name", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      const longName = "A".repeat(500)
      mockPrisma.user.findUnique.mockResolvedValue({
        ...mockUser,
        name: longName,
      })

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(200)
      expect(data.user.name).toBe(longName)
    })

    it("should handle user with special characters in name", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      const specialName = "Józef Świątek-Müller"
      mockPrisma.user.findUnique.mockResolvedValue({
        ...mockUser,
        name: specialName,
      })

      const response = await GET()
      const data = await parseResponse(response)

      expect(response.status).toBe(200)
      expect(data.user.name).toBe(specialName)
    })

    it("should handle concurrent requests", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      ;(auth as any).mockResolvedValue(mockSession)
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      // Make 3 concurrent requests
      const responses = await Promise.all([GET(), GET(), GET()])

      responses.forEach((response) => {
        expect(response.status).toBe(200)
      })

      expect(mockPrisma.user.findUnique).toHaveBeenCalledTimes(3)
    })
  })
})
