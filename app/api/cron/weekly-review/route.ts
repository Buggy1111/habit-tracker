import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { triggerWeeklyReviewReminder } from "@/lib/notifications"
import { apiLogger } from "@/lib/logger"

// GET /api/cron/weekly-review — Tydenni revize pripominky (Vercel Cron)
export async function GET(req: Request) {
  try {
    // Overit CRON_SECRET — ochrana pred neautorizovanym pristupem
    const authHeader = req.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Najit vsechny uzivatele s povolenymi tydennimi pripominkami
    const users = await prisma.user.findMany({
      where: {
        preferences: {
          weeklyReviewReminder: true,
        },
      },
      select: {
        id: true,
      },
    })

    let totalSent = 0
    let totalFailed = 0

    for (const user of users) {
      const result = await triggerWeeklyReviewReminder(user.id)
      totalSent += result.sent
      totalFailed += result.failed
    }

    apiLogger.info(
      `[WeeklyReviewCron] Cron dokoncen: ${users.length} uzivatelu, odeslano ${totalSent}, selhano ${totalFailed}`
    )

    return NextResponse.json({
      message: "Tydenni pripominky odeslany",
      users: users.length,
      sent: totalSent,
      failed: totalFailed,
    })
  } catch (error) {
    apiLogger.error("[WeeklyReviewCron] Chyba cronu:", error)
    return NextResponse.json(
      { error: "Interni chyba serveru" },
      { status: 500 }
    )
  }
}
