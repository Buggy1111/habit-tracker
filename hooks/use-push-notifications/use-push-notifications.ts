"use client"

import { useState, useEffect, useCallback } from "react"
import type { PushNotificationState } from "./types"

/**
 * Převede VAPID public key z base64 URL formátu na Uint8Array
 * potřebný pro pushManager.subscribe()
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function usePushNotifications() {
  const [state, setState] = useState<PushNotificationState>({
    isSupported: false,
    isSubscribed: false,
    isPending: true,
    permission: "default",
  })

  // Zkontroluj podporu a aktuální stav při mount
  useEffect(() => {
    const checkSupport = async () => {
      const isSupported =
        typeof window !== "undefined" &&
        "serviceWorker" in navigator &&
        "PushManager" in window

      if (!isSupported) {
        setState({
          isSupported: false,
          isSubscribed: false,
          isPending: false,
          permission: "default",
        })
        return
      }

      try {
        const registration = await navigator.serviceWorker.ready
        const subscription = await registration.pushManager.getSubscription()

        setState({
          isSupported: true,
          isSubscribed: !!subscription,
          isPending: false,
          permission: Notification.permission,
        })
      } catch {
        setState({
          isSupported: true,
          isSubscribed: false,
          isPending: false,
          permission: Notification.permission,
        })
      }
    }

    checkSupport()
  }, [])

  /**
   * Požádá o povolení notifikací, přihlásí se k push notifikacím
   * a odešle subscription na server
   */
  const subscribe = useCallback(async () => {
    if (!state.isSupported) return

    setState((prev) => ({ ...prev, isPending: true }))

    try {
      const permission = await Notification.requestPermission()

      if (permission !== "granted") {
        setState((prev) => ({
          ...prev,
          isPending: false,
          permission,
        }))
        return
      }

      const registration = await navigator.serviceWorker.ready

      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidPublicKey) {
        throw new Error("VAPID public key není nastavený")
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
      })

      // Odešli subscription na server
      const response = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      })

      if (!response.ok) {
        throw new Error("Nepodařilo se uložit subscription na server")
      }

      setState({
        isSupported: true,
        isSubscribed: true,
        isPending: false,
        permission: "granted",
      })
    } catch (error) {
      console.error("Chyba při přihlášení k push notifikacím:", error)
      setState((prev) => ({
        ...prev,
        isPending: false,
        permission: Notification.permission,
      }))
    }
  }, [state.isSupported])

  /**
   * Odhlásí se od push notifikací a informuje server
   */
  const unsubscribe = useCallback(async () => {
    if (!state.isSupported) return

    setState((prev) => ({ ...prev, isPending: true }))

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (subscription) {
        // Informuj server o odhlášení
        await fetch("/api/notifications/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        })

        await subscription.unsubscribe()
      }

      setState((prev) => ({
        ...prev,
        isSubscribed: false,
        isPending: false,
      }))
    } catch (error) {
      console.error("Chyba při odhlášení z push notifikací:", error)
      setState((prev) => ({ ...prev, isPending: false }))
    }
  }, [state.isSupported])

  /**
   * Odešle testovací notifikaci přes server
   */
  const sendTestNotification = useCallback(async () => {
    try {
      const response = await fetch("/api/notifications/test", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Nepodařilo se odeslat testovací notifikaci")
      }
    } catch (error) {
      console.error("Chyba při odesílání testovací notifikace:", error)
    }
  }, [])

  return {
    ...state,
    subscribe,
    unsubscribe,
    sendTestNotification,
  }
}
