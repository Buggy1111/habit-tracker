import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"
import { z } from "zod"

const subscribeSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string().min(1),
    auth: z.string().min(1),
  }),
})

// POST /api/notifications/subscribe — Registrace push subscription
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { endpoint, keys } = subscribeSchema.parse(body)

    // Upsert — pokud uz endpoint existuje, aktualizovat klice
    await prisma.pushSubscription.upsert({
      where: { endpoint },
      create: {
        userId: session.user.id,
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
        userAgent: req.headers.get("user-agent") || undefined,
      },
      update: {
        userId: session.user.id,
        p256dh: keys.p256dh,
        auth: keys.auth,
        userAgent: req.headers.get("user-agent") || undefined,
      },
    })

    apiLogger.info(
      `[Subscribe] Push subscription registrovana pro uzivatele ${session.user.id}`
    )

    return NextResponse.json(
      { message: "Subscription registrovana" },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Neplatny vstup", details: error.issues },
        { status: 400 }
      )
    }
    apiLogger.error("[Subscribe] Chyba pri registraci subscription:", error)
    return NextResponse.json(
      { error: "Interni chyba serveru" },
      { status: 500 }
    )
  }
}
