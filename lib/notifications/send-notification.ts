import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"
import { webpush } from "./vapid"

interface SendNotificationOptions {
  userId: string
  title: string
  body: string
  url?: string
  tag?: string
}

interface SendNotificationResult {
  sent: number
  failed: number
}

/**
 * Odeslat push notifikaci uzivateli.
 *
 * - Nacte PushSubscription zaznamy pro daneho uzivatele
 * - Overi, ze ma uzivatel povolene notifikace (emailNotifications v UserPreferences)
 * - Odesle notifikaci pres webpush.sendNotification()
 * - Pri chybe 410 Gone (expirovana subscription) automaticky smaze zaznam z DB
 */
export async function sendNotification(
  options: SendNotificationOptions
): Promise<SendNotificationResult> {
  const { userId, title, body, url, tag } = options
  const result: SendNotificationResult = { sent: 0, failed: 0 }

  // Overit uzivatelske preference — pokud ma notifikace vypnute, neodesila se nic
  const preferences = await prisma.userPreferences.findUnique({
    where: { userId },
  })

  if (preferences && !preferences.emailNotifications) {
    apiLogger.info(
      `[Notifications] Uzivatel ${userId} ma notifikace vypnute, preskakuji.`
    )
    return result
  }

  // TODO: Implementovat limit max 3 notifikaci denne na uzivatele
  // const today = new Date()
  // today.setHours(0, 0, 0, 0)
  // const todayCount = await prisma.someNotificationLog.count({
  //   where: { userId, createdAt: { gte: today } },
  // })
  // if (todayCount >= 3) return result

  // Nacist vsechny push subscriptions uzivatele
  const subscriptions = await prisma.pushSubscription.findMany({
    where: { userId },
  })

  if (subscriptions.length === 0) {
    apiLogger.info(
      `[Notifications] Uzivatel ${userId} nema zadne push subscriptions.`
    )
    return result
  }

  const payload = JSON.stringify({
    title,
    body,
    url: url || "/",
    tag: tag || "default",
  })

  // Odeslat notifikaci na vsechna zarizeni
  const sendPromises = subscriptions.map(async (subscription) => {
    try {
      await webpush.sendNotification(
        {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh,
            auth: subscription.auth,
          },
        },
        payload
      )
      result.sent++
    } catch (error: unknown) {
      const statusCode =
        error && typeof error === "object" && "statusCode" in error
          ? (error as { statusCode: number }).statusCode
          : undefined

      if (statusCode === 410) {
        // Subscription expirovana — smazat z databaze
        apiLogger.info(
          `[Notifications] Subscription ${subscription.id} expirovana (410 Gone), mazu.`
        )
        await prisma.pushSubscription.delete({
          where: { id: subscription.id },
        })
      } else {
        apiLogger.error(
          `[Notifications] Chyba pri odesilani na subscription ${subscription.id}:`,
          error
        )
      }
      result.failed++
    }
  })

  await Promise.all(sendPromises)

  apiLogger.info(
    `[Notifications] Uzivatel ${userId}: odeslano ${result.sent}, selhano ${result.failed}`
  )

  return result
}
