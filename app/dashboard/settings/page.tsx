"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Settings, Database } from "lucide-react"
import { ProfileSection } from "@/components/settings/sections/profile-section"
import { useTranslations } from "next-intl"
import { PreferencesSection } from "@/components/settings/sections/preferences-section"
import { DataPrivacySection } from "@/components/settings/sections/data-privacy-section"

export default function SettingsPage() {
  const t = useTranslations("settings")
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-2">{t("subtitle")}</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{t("tabs.profile")}</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">{t("tabs.preferences")}</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">{t("tabs.data")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("profile.title")}</CardTitle>
              <CardDescription>{t("profile.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileSection />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("preferences.title")}</CardTitle>
              <CardDescription>{t("preferences.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <PreferencesSection />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <DataPrivacySection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
