import { NextResponse } from "next/server"
import { signIn } from "@/lib/auth"
import { z } from "zod"
import { checkAuthRateLimit, getClientIp } from "@/lib/rate-limit"
import { apiLogger } from "@/lib/logger"
import { AuthError } from "next-auth"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

/**
 * Custom login endpoint with rate limiting
 * POST /api/auth/login
 */
export async function POST(req: Request) {
  try {
    // Apply rate limiting
    const ip = getClientIp(req)
    const rateLimitResult = await checkAuthRateLimit(ip)

    if (!rateLimitResult.success) {
      apiLogger.warn(`Rate limit exceeded for login from IP: ${ip}`)
      return NextResponse.json(
        {
          error: "Too many login attempts. Please try again later.",
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.reset).toISOString(),
          },
        }
      )
    }

    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    // Attempt sign in using NextAuth
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (!result || result.error) {
      apiLogger.warn(`Failed login attempt for email: ${email} from IP: ${ip}`)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: error.issues,
        },
        { status: 400 }
      )
    }

    if (error instanceof AuthError) {
      apiLogger.warn(`Authentication error: ${error.message}`)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    apiLogger.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
