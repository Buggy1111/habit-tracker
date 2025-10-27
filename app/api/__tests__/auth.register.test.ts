import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { POST } from "@/app/api/register/route"
import {
  createMockPrisma,
  createMockRequest,
  parseResponse,
  mockUser,
  mockRateLimitSuccess,
  mockRateLimitExceeded,
  mockEmailService,
  mockTokenCreation,
} from "./setup"

// Mock dependencies
vi.mock("@/lib/prisma", () => ({
  prisma: createMockPrisma(),
}))

vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn().mockResolvedValue("$2a$10$hashedpassword"),
    compare: vi.fn(),
  },
}))

vi.mock("@/lib/rate-limit", () => mockRateLimitSuccess())
vi.mock("@/lib/email", () => mockEmailService())
vi.mock("@/lib/auth/tokens", () => mockTokenCreation())

// Import after mocking
const { prisma } = await import("@/lib/prisma")
const bcrypt = await import("bcryptjs")

describe("POST /api/register", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("Success cases", () => {
    it("should create a new user with valid data", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      // Mock: user doesn't exist
      mockPrisma.user.findUnique.mockResolvedValue(null)

      // Mock: user creation succeeds
      mockPrisma.user.create.mockResolvedValue({
        ...mockUser,
        id: "new-user-123",
        password: "$2a$10$hashedpassword",
      })

      const request = createMockRequest("POST", {
        email: "newuser@example.com",
        password: "password123",
        name: "New User",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(201)
      expect(data).toMatchObject({
        message: expect.stringContaining("User created successfully"),
        userId: "new-user-123",
        emailSent: true,
      })

      // Verify bcrypt was called
      expect(bcrypt.default.hash).toHaveBeenCalledWith("password123", 10)

      // Verify user was created
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: "newuser@example.com",
          password: "$2a$10$hashedpassword",
          name: "New User",
        },
      })
    })

    it("should create user without name (use email prefix)", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      mockPrisma.user.findUnique.mockResolvedValue(null)
      mockPrisma.user.create.mockResolvedValue({
        ...mockUser,
        email: "test@example.com",
        name: "test",
      })

      const request = createMockRequest("POST", {
        email: "test@example.com",
        password: "password123",
      })

      const response = await POST(request)
      await parseResponse(response)

      expect(response.status).toBe(201)
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: "test@example.com",
          password: "$2a$10$hashedpassword",
          name: "test", // Email prefix
        },
      })
    })

    it("should succeed even if email sending fails", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>
      const { sendVerificationEmail } = await import("@/lib/email")

      mockPrisma.user.findUnique.mockResolvedValue(null)
      mockPrisma.user.create.mockResolvedValue(mockUser)

      // Email fails but registration should succeed
      vi.mocked(sendVerificationEmail).mockResolvedValue({
        success: false,
        error: "Failed to send email",
      })

      const request = createMockRequest("POST", {
        email: "test@example.com",
        password: "password123",
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
    })
  })

  describe("Validation errors", () => {
    it("should return 400 for invalid email", async () => {
      const request = createMockRequest("POST", {
        email: "not-an-email",
        password: "password123",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Invalid input")
      expect(data.details).toBeDefined()
    })

    it("should return 400 for short password (less than 6 chars)", async () => {
      const request = createMockRequest("POST", {
        email: "test@example.com",
        password: "12345", // Only 5 chars
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Invalid input")
    })

    it("should return 400 for missing email", async () => {
      const request = createMockRequest("POST", {
        password: "password123",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Invalid input")
    })

    it("should return 400 for missing password", async () => {
      const request = createMockRequest("POST", {
        email: "test@example.com",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Invalid input")
    })
  })

  describe("Conflict errors", () => {
    it("should return 400 if user already exists", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      // User already exists
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      const request = createMockRequest("POST", {
        email: mockUser.email,
        password: "password123",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("User already exists")
    })
  })

  describe("Rate limiting", () => {
    it("should return 429 when rate limit exceeded", async () => {
      // Re-mock rate limit to fail
      vi.mock("@/lib/rate-limit", () => mockRateLimitExceeded())

      const request = createMockRequest("POST", {
        email: "test@example.com",
        password: "password123",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(429)
      expect(data.error).toContain("Too many registration attempts")
      expect(data.retryAfter).toBeDefined()
      expect(response.headers.get("X-RateLimit-Limit")).toBe("5")
    })
  })

  describe("Server errors", () => {
    it("should return 500 on database error", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      mockPrisma.user.findUnique.mockRejectedValue(new Error("Database connection failed"))

      const request = createMockRequest("POST", {
        email: "test@example.com",
        password: "password123",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe("Internal server error")
    })

    it("should return 500 on bcrypt error", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      mockPrisma.user.findUnique.mockResolvedValue(null)
      vi.mocked(bcrypt.default.hash).mockRejectedValue(new Error("Bcrypt failed"))

      const request = createMockRequest("POST", {
        email: "test@example.com",
        password: "password123",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe("Internal server error")
    })
  })

  describe("Edge cases", () => {
    it("should handle email with uppercase letters", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      mockPrisma.user.findUnique.mockResolvedValue(null)
      mockPrisma.user.create.mockResolvedValue(mockUser)

      const request = createMockRequest("POST", {
        email: "TEST@EXAMPLE.COM",
        password: "password123",
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
    })

    it("should handle very long name", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      mockPrisma.user.findUnique.mockResolvedValue(null)
      mockPrisma.user.create.mockResolvedValue(mockUser)

      const longName = "A".repeat(255)
      const request = createMockRequest("POST", {
        email: "test@example.com",
        password: "password123",
        name: longName,
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: "test@example.com",
          password: "$2a$10$hashedpassword",
          name: longName,
        },
      })
    })

    it("should handle special characters in password", async () => {
      const mockPrisma = prisma as any as ReturnType<typeof createMockPrisma>

      mockPrisma.user.findUnique.mockResolvedValue(null)
      mockPrisma.user.create.mockResolvedValue(mockUser)

      const specialPassword = "P@ssw0rd!#$%"
      const request = createMockRequest("POST", {
        email: "test@example.com",
        password: specialPassword,
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
      expect(bcrypt.default.hash).toHaveBeenCalledWith(specialPassword, 10)
    })
  })
})
