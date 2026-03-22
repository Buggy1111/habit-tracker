import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sendNotification } from "@/lib/notifications"
import { apiLogger } from "@/lib/logger"

// POST /api/notifications/test — Odeslat testovaci notifikaci
export async function POST() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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
