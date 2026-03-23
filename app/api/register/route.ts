import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { checkAuthRateLimit, getClientIp } from "@/lib/rate-limit"
import { apiLogger } from "@/lib/logger"
import { createVerificationToken } from "@/lib/auth/tokens"
import { sendVerificationEmail } from "@/lib/email"

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    // Apply rate limiting
    const ip = getClientIp(req)
    const rateLimitResult = await checkAuthRateLimit(ip)

    if (!rateLimitResult.success) {
      apiLogger.warn(`Rate limit exceeded for registration from IP: ${ip}`)
      return NextResponse.json(
        {
          error: "Too many registration attempts. Please try again later.",
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
    const { email, password, name } = registerSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split("@")[0],
      },
    })

    // Create verification token and send email
    try {
      const verificationToken = await createVerificationToken(email)
      const emailResult = await sendVerificationEmail(email, verificationToken.token)

      if (!emailResult.success) {
        apiLogger.error(`Failed to send verification email to ${email}`)
        // Don't fail registration if email fails - user can request resend
      } else {
        apiLogger.info(`Verification email sent to ${email}`)
      }
    } catch (emailError) {
      apiLogger.error(`Error sending verification email: ${emailError}`)
      // Don't fail registration if email fails
    }

    return NextResponse.json(
      {
        message: "User created successfully. Please check your email to verify your account.",
        userId: user.id,
        emailSent: true,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
