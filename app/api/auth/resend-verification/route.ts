import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createVerificationToken } from "@/lib/auth/tokens"
import { sendVerificationEmail } from "@/lib/email"
import { z } from "zod"
import { logger } from "@/lib/logger"

// Validation schema
const resendSchema = z.object({
  email: z.string().email("Neplatný email"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate request
    const validation = resendSchema.safeParse(body)
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

    if (!user) {
      // Don't reveal whether user exists (security)
      return NextResponse.json(
        {
          success: true,
          message: "Pokud účet existuje, email byl odeslán",
        },
        { status: 200 }
      )
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        {
          error: "Email je již ověřen",
        },
        { status: 400 }
      )
    }

    // Create verification token
    const verificationToken = await createVerificationToken(email)

    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationToken.token)

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
        message: "Verifikační email byl odeslán",
      },
      { status: 200 }
    )
  } catch (error) {
    logger.error("Resend verification error:", error)
    return NextResponse.json(
      {
        error: "Chyba při odesílání emailu",
      },
      { status: 500 }
    )
  }
}
