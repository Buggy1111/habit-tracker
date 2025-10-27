import { describe, it, expect, beforeEach, vi } from "vitest"
import { POST } from "@/app/api/auth/verify-email/route"
import { createMockRequest, parseResponse } from "./setup"

// Mock the token verification function
vi.mock("@/lib/auth/tokens", () => ({
  verifyEmailToken: vi.fn(),
}))

const { verifyEmailToken } = await import("@/lib/auth/tokens")

describe("POST /api/auth/verify-email", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("Success cases", () => {
    it("should verify email with valid token", async () => {
      vi.mocked(verifyEmailToken).mockResolvedValue({
        success: true,
        email: "test@example.com",
      })

      const request = createMockRequest("POST", {
        token: "valid-token-123",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain("úspěšně ověřen")
      expect(data.email).toBe("test@example.com")

      expect(verifyEmailToken).toHaveBeenCalledWith("valid-token-123")
    })
  })

  describe("Validation errors", () => {
    it("should return 400 for missing token", async () => {
      const request = createMockRequest("POST", {})

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Neplatné údaje")
      expect(data.details).toBeDefined()
    })

    it("should return 400 for empty token", async () => {
      const request = createMockRequest("POST", {
        token: "",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Neplatné údaje")
    })

    it("should return 400 for invalid token type", async () => {
      const request = createMockRequest("POST", {
        token: 123, // Number instead of string
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Neplatné údaje")
    })
  })

  describe("Token verification failures", () => {
    it("should return 400 for expired token", async () => {
      vi.mocked(verifyEmailToken).mockResolvedValue({
        success: false,
        error: "Token vypršel",
      })

      const request = createMockRequest("POST", {
        token: "expired-token",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Token vypršel")
    })

    it("should return 400 for invalid token", async () => {
      vi.mocked(verifyEmailToken).mockResolvedValue({
        success: false,
        error: "Neplatný token",
      })

      const request = createMockRequest("POST", {
        token: "invalid-token",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Neplatný token")
    })

    it("should return 400 for already verified email", async () => {
      vi.mocked(verifyEmailToken).mockResolvedValue({
        success: false,
        error: "Email již byl ověřen",
      })

      const request = createMockRequest("POST", {
        token: "valid-token-123",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe("Email již byl ověřen")
    })
  })

  describe("Server errors", () => {
    it("should return 500 on unexpected error", async () => {
      vi.mocked(verifyEmailToken).mockRejectedValue(new Error("Database error"))

      const request = createMockRequest("POST", {
        token: "valid-token-123",
      })

      const response = await POST(request)
      const data = await parseResponse(response)

      expect(response.status).toBe(500)
      expect(data.error).toContain("Chyba při ověřování emailu")
    })

    it("should handle malformed JSON gracefully", async () => {
      const url = "http://localhost:3000/api/auth/verify-email"
      const request = new Request(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: "not valid json {",
      })

      const response = await POST(request)
      await parseResponse(response)

      expect(response.status).toBe(500)
    })
  })

  describe("Edge cases", () => {
    it("should handle very long token string", async () => {
      const longToken = "a".repeat(1000)

      vi.mocked(verifyEmailToken).mockResolvedValue({
        success: true,
        email: "test@example.com",
      })

      const request = createMockRequest("POST", {
        token: longToken,
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(verifyEmailToken).toHaveBeenCalledWith(longToken)
    })

    it("should handle token with special characters", async () => {
      const specialToken = "abc-123_xyz.456"

      vi.mocked(verifyEmailToken).mockResolvedValue({
        success: true,
        email: "test@example.com",
      })

      const request = createMockRequest("POST", {
        token: specialToken,
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
    })

    it("should handle token with spaces (trimmed)", async () => {
      const tokenWithSpaces = "  token-with-spaces  "

      vi.mocked(verifyEmailToken).mockResolvedValue({
        success: true,
        email: "test@example.com",
      })

      const request = createMockRequest("POST", {
        token: tokenWithSpaces,
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
    })
  })
})
