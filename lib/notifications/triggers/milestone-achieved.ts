import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"
import { sendNotification } from "../send-notification"

/**
 * Odeslat notifikaci o dosazenem milniku.
 */
export async function triggerMilestoneAchieved(
  userId: string,
  milestoneTitle: string
) {
  // Overit, ze ma uzivatel povolene milestone notifikace
  const preferences = await prisma.userPreferences.findUnique({
    where: { userId },
  })

  if (preferences && !preferences.milestoneNotifications) {
    apiLogger.info(
      `[Milestone] Uzivatel ${userId} ma milestone notifikace vypnute.`
    )
    return { sent: 0, failed: 0 }
  }

  return sendNotification({
    userId,
    title: "Milnik dosazeny!",
    body: `Gratulujeme! Dosahli jste milniku: "${milestoneTitle}". Skvela prace!`,
    url: "/dashboard",
    tag: "milestone",
  })
}
