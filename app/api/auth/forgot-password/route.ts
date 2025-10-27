import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createPasswordResetToken } from "@/lib/auth/tokens"
import { sendPasswordResetEmail } from "@/lib/email"
import { z } from "zod"
import { logger } from "@/lib/logger"

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Neplatný email"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate request
    const validation = forgotPasswordSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Neplatné údaje",
          details: validation.error.issues,
        },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Security: Always return success, don't reveal if user exists
    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message: "Pokud účet existuje, email byl odeslán",
        },
        { status: 200 }
      )
    }

    // Create reset token
    const resetToken = await createPasswordResetToken(email)

    // Send reset email
    const emailResult = await sendPasswordResetEmail(email, resetToken.token)

    if (!emailResult.success) {
      return NextResponse.json(
        {
          error: "Chyba při odesílání emailu",
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email s instrukcemi byl odeslán",
      },
      { status: 200 }
    )
  } catch (error) {
    logger.error("Forgot password error:", error)
    return NextResponse.json(
      {
        error: "Chyba při zpracování žádosti",
      },
      { status: 500 }
    )
  }
}
