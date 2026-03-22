"use client"

import { useState } from "react"
import { useUserStats } from "@/hooks/settings/use-user-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Loader2,
  Database,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Target,
  Brain,
  FileText,
} from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import { useTranslations } from "next-intl"
import { DeleteAccountModal } from "@/components/settings/modals/delete-account-modal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function DataPrivacySection() {
  const t = useTranslations("settings.dataPrivacy")
  const { data: stats, isLoading } = useUserStats()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Data Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            {t("statsTitle")}
          </CardTitle>
          <CardDescription>{t("statsDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Habits */}
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("habits")}</p>
                <p className="text-2xl font-bold">{stats?.habits.total || 0}</p>
                <p className="text-xs text-muted-foreground">
                  {stats?.habits.active || 0} {t("active")}
                </p>
              </div>
            </div>

            {/* Logs */}
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("logs")}</p>
                <p className="text-2xl font-bold">{stats?.logs.total || 0}</p>
                <p className="text-xs text-muted-foreground">
                  {stats?.logs.thisMonth || 0} {t("thisMonth")}
                </p>
              </div>
            </div>

            {/* Identities */}
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("identities")}</p>
                <p className="text-2xl font-bold">{stats?.identities.total || 0}</p>
              </div>
            </div>

            {/* Thought Records */}
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("thoughtRecords")}</p>
                <p className="text-2xl font-bold">{stats?.thoughtRecords.total || 0}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t("memberSince")}{" "}
                  {stats?.memberSince
                    ? format(stats.memberSince, "d. MMMM yyyy", { locale: cs })
                    : "—"}
                </span>
              </div>
              <div className="text-sm font-medium">{t("dataSize")} {stats?.dataSize || "0 B"}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Data (Placeholder - Phase 4) */}
      <Card>
        <CardHeader>
          <CardTitle>{t("exportTitle")}</CardTitle>
          <CardDescription>{t("exportDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {t("exportMessage")}
          </p>
          <Button variant="outline" disabled>
            {t("exportButton")}
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Accordion type="single" collapsible className="border border-destructive/50 rounded-lg">
        <AccordionItem value="danger-zone" className="border-none">
          <AccordionTrigger className="px-6 hover:no-underline hover:bg-destructive/5">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">{t("dangerZone")}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">{t("deleteAccount")}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("deleteAccountDesc")}
                </p>
                <Button variant="destructive" onClick={() => setDeleteModalOpen(true)}>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  {t("deleteAccountButton")}
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Delete Account Modal */}
      <DeleteAccountModal open={deleteModalOpen} onOpenChange={setDeleteModalOpen} />
    </div>
  )
}
