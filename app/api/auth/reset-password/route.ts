import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPasswordResetToken } from "@/lib/auth/tokens"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { logger } from "@/lib/logger"
import { checkAuthRateLimit, getClientIp } from "@/lib/rate-limit"

// Validation schema
const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token je povinný"),
  password: z.string().min(8, "Heslo musí mít alespoň 8 znaků"),
})

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = getClientIp(req)
    const rateLimitResult = await checkAuthRateLimit(ip)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Příliš mnoho požadavků. Zkuste to později." },
        {
          status: 429,
          headers: {

            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          },
        }
      )
    }

    const body = await req.json()

    // Validate request
    const validation = resetPasswordSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Neplatné údaje",
          details: validation.error.issues,
        },
        { status: 400 }
      )
    }

    const { token, password } = validation.data

    // Verify token
    const result = await verifyPasswordResetToken(token)

    if (!result.success || !result.email) {
      return NextResponse.json(
        {
          error: result.error || "Neplatný nebo vypršelý token",
        },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: result.email },
    })

    if (!user) {
      return NextResponse.json(
        {
          error: "Uživatel nenalezen",
        },
        { status: 404 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    // Delete used token
    await prisma.verificationToken.delete({
      where: { token },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Heslo bylo úspěšně obnoveno",
      },
      { status: 200 }
    )
  } catch (error) {
    logger.error("Reset password error:", error)
    return NextResponse.json(
      {
        error: "Chyba při obnovování hesla",
      },
      { status: 500 }
    )
  }
}
