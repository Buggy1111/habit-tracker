"use client"

import { useUserPreferences, useUpdateUserPreferences } from "@/hooks/settings/use-user-preferences"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function PreferencesSection() {
  const { data: preferences, isLoading } = useUserPreferences()
  const updatePreferences = useUpdateUserPreferences({ showToast: false })
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

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
          <h3 className="text-lg font-medium">Vzhled</h3>
          <p className="text-sm text-muted-foreground">Vyberte si barevné schéma aplikace</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => handleThemeChange("light")}
          >
            <Sun className="h-6 w-6" />
            <span>Světlý</span>
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => handleThemeChange("dark")}
          >
            <Moon className="h-6 w-6" />
            <span>Tmavý</span>
          </Button>
          <Button
            variant={theme === "system" ? "default" : "outline"}
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => handleThemeChange("system")}
          >
            <Monitor className="h-6 w-6" />
            <span>Systém</span>
          </Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Upozornění</h3>
          <p className="text-sm text-muted-foreground">Spravujte, jak vás chceme informovat</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications">Emailová upozornění</Label>
              <p className="text-sm text-muted-foreground">
                Dostávejte důležité aktualizace emailem
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
              <Label htmlFor="weeklyReviewReminder">Týdenní přehled</Label>
              <p className="text-sm text-muted-foreground">
                Připomenutí k týdennímu přehledu každou neděli
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
              <Label htmlFor="extinctionBurstAlerts">Extinction Burst upozornění</Label>
              <p className="text-sm text-muted-foreground">
                Upozornění při detekci poklesu výkonu (normální jev!)
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
              <Label htmlFor="milestoneNotifications">Milníky</Label>
              <p className="text-sm text-muted-foreground">
                Oslavte své úspěchy (7, 21, 66 dní atd.)
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

      {/* Privacy */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Soukromí</h3>
          <p className="text-sm text-muted-foreground">Kontrola nad vašimi daty</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analyticsEnabled">Analytika</Label>
              <p className="text-sm text-muted-foreground">
                Pomůže nám zlepšovat aplikaci (anonymní data)
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
              <Label htmlFor="dataCollectionConsent">Sběr dat</Label>
              <p className="text-sm text-muted-foreground">
                Souhlas se sběrem dat pro zlepšení služeb
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
        <p className="text-xs text-muted-foreground">Všechna nastavení se ukládají automaticky</p>
      </div>
    </div>
  )
}
