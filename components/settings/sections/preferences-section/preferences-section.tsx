"use client"

import { useUserPreferences, useUpdateUserPreferences } from "@/hooks/settings/use-user-preferences"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, Moon, Sun, Monitor, BellOff, Send, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { usePushNotifications } from "@/hooks/use-push-notifications"

export default function PreferencesSection() {
  const t = useTranslations("settings.preferences")
  const { data: preferences, isLoading } = useUserPreferences()
  const updatePreferences = useUpdateUserPreferences({ showToast: false })
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const push = usePushNotifications()
  const currentLocale = useLocale()

  const handleLanguageChange = (newLocale: "en" | "cs") => {
    document.cookie = `locale=${newLocale};path=/;max-age=${365 * 24 * 60 * 60}`
    updatePreferences.mutate({ language: newLocale })
    window.location.reload()
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync theme with preferences on load
  useEffect(() => {
    if (preferences && mounted) {
      setTheme(preferences.theme)
    }
  }, [preferences, setTheme, mounted])

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    updatePreferences.mutate({ theme: newTheme })
  }

  const handleToggle = (
    key:
      | "emailNotifications"
      | "weeklyReviewReminder"
      | "extinctionBurstAlerts"
      | "milestoneNotifications"
      | "analyticsEnabled"
      | "dataCollectionConsent",
    value: boolean
  ) => {
    updatePreferences.mutate({ [key]: value })
  }

  if (isLoading || !mounted) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">{t("appearance")}</h3>
          <p className="text-sm text-muted-foreground">{t("appearanceDesc")}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => handleThemeChange("light")}
          >
            <Sun className="h-6 w-6" />
            <span>{t("light")}</span>
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => handleThemeChange("dark")}
          >
            <Moon className="h-6 w-6" />
            <span>{t("dark")}</span>
          </Button>
          <Button
            variant={theme === "system" ? "default" : "outline"}
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => handleThemeChange("system")}
          >
            <Monitor className="h-6 w-6" />
            <span>{t("system")}</span>
          </Button>
        </div>
      </div>

      {/* Language Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">{t("language")}</h3>
          <p className="text-sm text-muted-foreground">{t("languageDesc")}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={currentLocale === "en" ? "default" : "outline"}
            className="flex items-center gap-2 h-auto py-3"
            onClick={() => handleLanguageChange("en")}
          >
            <Globe className="h-5 w-5" />
            <span>English</span>
          </Button>
          <Button
            variant={currentLocale === "cs" ? "default" : "outline"}
            className="flex items-center gap-2 h-auto py-3"
            onClick={() => handleLanguageChange("cs")}
          >
            <Globe className="h-5 w-5" />
            <span>Čeština</span>
          </Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">{t("notifications")}</h3>
          <p className="text-sm text-muted-foreground">{t("notificationsDesc")}</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications">{t("emailNotifications")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("emailNotificationsDesc")}
              </p>
            </div>
            <Switch
              id="emailNotifications"
              checked={preferences?.emailNotifications ?? true}
              onCheckedChange={(checked) => handleToggle("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weeklyReviewReminder">{t("weeklyReview")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("weeklyReviewDesc")}
              </p>
            </div>
            <Switch
              id="weeklyReviewReminder"
              checked={preferences?.weeklyReviewReminder ?? true}
              onCheckedChange={(checked) => handleToggle("weeklyReviewReminder", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="extinctionBurstAlerts">{t("extinctionBurstAlerts")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("extinctionBurstAlertsDesc")}
              </p>
            </div>
            <Switch
              id="extinctionBurstAlerts"
              checked={preferences?.extinctionBurstAlerts ?? true}
              onCheckedChange={(checked) => handleToggle("extinctionBurstAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="milestoneNotifications">{t("milestones")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("milestonesDesc")}
              </p>
            </div>
            <Switch
              id="milestoneNotifications"
              checked={preferences?.milestoneNotifications ?? true}
              onCheckedChange={(checked) => handleToggle("milestoneNotifications", checked)}
            />
          </div>
        </div>
      </div>

      {/* Push Notifikace */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">{t("pushNotifications")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("pushNotificationsDesc")}
          </p>
        </div>

        {!push.isSupported ? (
          <div className="rounded-lg border border-dashed p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BellOff className="h-4 w-4" />
              <span>{t("pushNotSupported")}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushNotifications">{t("enablePush")}</Label>
                <p className="text-sm text-muted-foreground">
                  {push.permission === "denied"
                    ? t("pushDenied")
                    : push.isSubscribed
                      ? t("pushActive")
                      : t("pushEnable")}
                </p>
              </div>
              <Switch
                id="pushNotifications"
                checked={push.isSubscribed}
                disabled={push.isPending || push.permission === "denied"}
                onCheckedChange={(checked) => {
                  if (checked) {
                    push.subscribe()
                  } else {
                    push.unsubscribe()
                  }
                }}
              />
            </div>

            {push.permission === "denied" && (
              <p className="text-sm text-destructive">
                {t("pushDeniedAction")}
              </p>
            )}

            {push.isSubscribed && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => push.sendTestNotification()}
                  disabled={push.isPending}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {t("sendTest")}
                </Button>
              </div>
            )}

            {push.isPending && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{t("processing")}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Privacy */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">{t("privacy")}</h3>
          <p className="text-sm text-muted-foreground">{t("privacyDesc")}</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analyticsEnabled">{t("analytics")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("analyticsDesc")}
              </p>
            </div>
            <Switch
              id="analyticsEnabled"
              checked={preferences?.analyticsEnabled ?? true}
              onCheckedChange={(checked) => handleToggle("analyticsEnabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dataCollectionConsent">{t("dataCollection")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("dataCollectionDesc")}
              </p>
            </div>
            <Switch
              id="dataCollectionConsent"
              checked={preferences?.dataCollectionConsent ?? true}
              onCheckedChange={(checked) => handleToggle("dataCollectionConsent", checked)}
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground">{t("autoSaveNote")}</p>
      </div>
    </div>
  )
}
