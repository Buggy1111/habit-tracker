// Push notification service worker
// Tento soubor je importován do hlavního SW přes next-pwa importScripts

// Push event handler
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}

  const options = {
    body: data.body || 'Nova notifikace',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: data.tag || 'default',
    data: {
      url: data.url || '/dashboard',
    },
    vibrate: [100, 50, 100],
    actions: data.actions || [],
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Habit Tracker', options)
  )
})

// Notification click handler — otevře aplikaci
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const url = event.notification.data?.url || '/dashboard'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus()
        }
      }
      return clients.openWindow(url)
    })
  )
})
