import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendNotification } from "@/lib/notifications"
import { apiLogger } from "@/lib/logger"

// GET /api/cron/daily-reminders — Denni pripominky (Vercel Cron)
export async function GET(req: Request) {
  try {
    // Overit CRON_SECRET — ochrana pred neautorizovanym pristupem
    const authHeader = req.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Najit vsechny uzivatele s aktivnimi navyky a povolenymi notifikacemi
    const users = await prisma.user.findMany({
      where: {
        habits: {
          some: {
            isActive: true,
          },
        },
        preferences: {
          emailNotifications: true,
        },
      },
      select: {
        id: true,
        name: true,
        habits: {
          where: { isActive: true },
          select: { id: true },
        },
      },
    })

    let totalSent = 0
    let totalFailed = 0

    for (const user of users) {
      const habitCount = user.habits.length
      const result = await sendNotification({
        userId: user.id,
        title: "Denni pripominka",
        body: `Mate ${habitCount} ${habitCount === 1 ? "aktivni navyk" : habitCount < 5 ? "aktivni navyky" : "aktivnich navyku"} cekajicich na splneni. Pojdme na to!`,
        url: "/dashboard",
        tag: "daily-reminder",
      })

      totalSent += result.sent
      totalFailed += result.failed
    }

    apiLogger.info(
      `[DailyReminders] Cron dokoncen: ${users.length} uzivatelu, odeslano ${totalSent}, selhano ${totalFailed}`
    )

    return NextResponse.json({
      message: "Denni pripominky odeslany",
      users: users.length,
      sent: totalSent,
      failed: totalFailed,
    })
  } catch (error) {
    apiLogger.error("[DailyReminders] Chyba cronu:", error)
    return NextResponse.json(
      { error: "Interni chyba serveru" },
      { status: 500 }
    )
  }
}
