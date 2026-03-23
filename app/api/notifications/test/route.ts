import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sendNotification } from "@/lib/notifications"
import { apiLogger } from "@/lib/logger"
import { inMemoryRateLimit } from "@/lib/rate-limit"

// POST /api/notifications/test — Odeslat testovaci notifikaci
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Rate limit: 5 requests per 15 minutes per user
    const rateLimitResult = await inMemoryRateLimit(
      `notification-test:${session.user.id}`,
      5,
      15 * 60 * 1000
    )
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many test notifications. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.reset).toISOString(),
          },
        }
      )
    }

    const result = await sendNotification({
      userId: session.user.id,
      title: "Test notifikace",
      body: "Push notifikace fungují správně! 🎉",
      tag: "test",
    })

    apiLogger.info(
      `[TestNotification] Testovaci notifikace pro uzivatele ${session.user.id}: odeslano ${result.sent}, selhano ${result.failed}`
    )

    return NextResponse.json({
      message: "Testovaci notifikace odeslana",
      ...result,
    })
  } catch (error) {
    apiLogger.error("[TestNotification] Chyba pri odesilani:", error)
    return NextResponse.json(
      { error: "Interni chyba serveru" },
      { status: 500 }
    )
  }
}
