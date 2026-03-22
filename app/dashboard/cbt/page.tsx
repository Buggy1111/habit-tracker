"use client"

import { useState } from "react"
import { Brain, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useThoughtRecords } from "@/hooks/use-thought-records"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { ThoughtRecordCard } from "@/components/cbt/thought-record-card"
import { ThoughtRecordEmptyState } from "@/components/cbt/thought-record-empty-state"
import { ThoughtRecordListSkeleton } from "@/components/cbt/thought-record-list-skeleton"

const ThoughtRecordWizard = dynamic(
  () => import("@/components/cbt/thought-record-wizard").then((mod) => ({ default: mod.ThoughtRecordWizard })),
  { ssr: false }
)

export default function CbtPage() {
  const { data: records, isLoading, error } = useThoughtRecords()
  const [wizardOpen, setWizardOpen] = useState(false)
  const t = useTranslations("cbt")

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center max-w-md">
          <Brain className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">{t("loadError")}</h2>
          <p className="text-muted-foreground">{t("loadErrorDesc")}</p>
        </Card>
      </div>
    )
  }

  if (!isLoading && (!records || records.length === 0)) {
    return (
      <>
        <ThoughtRecordEmptyState onCreateRecord={() => setWizardOpen(true)} />
        <ThoughtRecordWizard open={wizardOpen} onOpenChange={setWizardOpen} />
      </>
    )
  }

  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl sm:text-4xl font-bold">{t("title")}</h1>
          </div>
          <p className="text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
        <Button
          onClick={() => setWizardOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("newRecord")}
        </Button>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900">
              <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{t("howItWorks")}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t("howItWorksDesc")}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                >
                  2000+ clinical studies
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300"
                >
                  ABC Model
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                >
                  3P Analysis
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Records Grid */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t("yourRecords")}</h2>
          <span className="text-sm text-muted-foreground">{t("recordCount", { count: records?.length || 0 })}</span>
        </div>

        {isLoading ? (
          <ThoughtRecordListSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {records?.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ThoughtRecordCard record={record} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Wizard Dialog */}
      <ThoughtRecordWizard open={wizardOpen} onOpenChange={setWizardOpen} />
    </div>
  )
}
