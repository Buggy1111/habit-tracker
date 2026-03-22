import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"
import { sendNotification } from "../send-notification"

/**
 * Odeslat notifikaci o detekci extinction burst.
 *
 * Extinction burst = docasne zhorseni navyku pred zlepsenim.
 * Tato notifikace uzivatele informuje a motivuje ho pokracovat.
 */
export async function triggerExtinctionBurstAlert(
  userId: string,
  habitName: string
) {
  // Overit, ze ma uzivatel povolene extinction burst alerty
  const preferences = await prisma.userPreferences.findUnique({
    where: { userId },
  })

  if (preferences && !preferences.extinctionBurstAlerts) {
    apiLogger.info(
      `[ExtinctionBurst] Uzivatel ${userId} ma extinction burst alerty vypnute.`
    )
    return { sent: 0, failed: 0 }
  }

  return sendNotification({
    userId,
    title: "Pozor na extinction burst!",
    body: `U navyku "${habitName}" jsme zaznamenali pokles. To je normalni! Vydrzte, zlepseni prichazi.`,
    url: "/dashboard",
    tag: "extinction-burst",
  })
}
