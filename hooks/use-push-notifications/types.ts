export interface PushNotificationState {
  isSupported: boolean
  isSubscribed: boolean
  isPending: boolean
  permission: NotificationPermission | 'default'
}
