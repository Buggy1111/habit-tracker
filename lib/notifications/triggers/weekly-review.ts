import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"
import { sendNotification } from "../send-notification"

/**
 * Odeslat pripominku tydenni revize.
 */
export async function triggerWeeklyReviewReminder(userId: string) {
  // Overit, ze ma uzivatel povolene tydenni pripominky
  const preferences = await prisma.userPreferences.findUnique({
    where: { userId },
  })

  if (preferences && !preferences.weeklyReviewReminder) {
    apiLogger.info(
      `[WeeklyReview] Uzivatel ${userId} ma tydenni pripominky vypnute.`
    )
    return { sent: 0, failed: 0 }
  }

  return sendNotification({
    userId,
    title: "Cas na tydenni revizi!",
    body: "Podivejte se, jak se vam darilo tento tyden. Tydenni revize vam pomuze zustat na spravne ceste.",
    url: "/weekly-review",
    tag: "weekly-review",
  })
}
