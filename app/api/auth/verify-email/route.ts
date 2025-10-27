import { NextResponse } from "next/server"
import { verifyEmailToken } from "@/lib/auth/tokens"
import { z } from "zod"
import { logger } from "@/lib/logger"

// Validation schema
const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token je povinný"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate request
    const validation = verifyEmailSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Neplatné údaje",
          details: validation.error.issues,
        },
        { status: 400 }
      )
    }

    const { token } = validation.data

    // Verify token
    const result = await verifyEmailToken(token)

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email byl úspěšně ověřen",
        email: result.email,
      },
      { status: 200 }
    )
  } catch (error) {
    logger.error("Email verification error:", error)
    return NextResponse.json(
      {
        error: "Chyba při ověřování emailu",
      },
      { status: 500 }
    )
  }
}
