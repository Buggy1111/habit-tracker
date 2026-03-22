import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"
import { z } from "zod"

const unsubscribeSchema = z.object({
  endpoint: z.string().url(),
})

// POST /api/notifications/unsubscribe — Odregistrace push subscription
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { endpoint } = unsubscribeSchema.parse(body)

    // Smazat subscription pouze pokud patri prihlasemu uzivateli
    const deleted = await prisma.pushSubscription.deleteMany({
      where: {
        userId: session.user.id,
        endpoint,
      },
    })

    if (deleted.count === 0) {
      return NextResponse.json(
        { error: "Subscription nenalezena" },
        { status: 404 }
      )
    }

    apiLogger.info(
      `[Unsubscribe] Push subscription odregistrovana pro uzivatele ${session.user.id}`
    )

    return NextResponse.json({ message: "Subscription odregistrovana" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Neplatny vstup", details: error.issues },
        { status: 400 }
      )
    }
    apiLogger.error(
      "[Unsubscribe] Chyba pri odregistraci subscription:",
      error
    )
    return NextResponse.json(
      { error: "Interni chyba serveru" },
      { status: 500 }
    )
  }
}
