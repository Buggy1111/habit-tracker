"use client"

import { Brain, BookOpen, ArrowRight, CheckCircle2, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from "next-intl"

interface ThoughtRecordEmptyStateProps {
  onCreateRecord: () => void
}

export function ThoughtRecordEmptyState({ onCreateRecord }: ThoughtRecordEmptyStateProps) {
  const t = useTranslations("cbt.emptyState")
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-3xl w-full border-2 border-dashed">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">{t("title")}</CardTitle>
          <CardDescription className="text-base mt-2">
            {t("subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* What is CBT */}
          <Card className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-500" />
                {t("whatIsABC")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                {t("whatIsABCDesc")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div className="p-3 rounded-lg bg-white dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                  <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                    <strong>A</strong> - {t("adversityLabel")}
                  </div>
                  <p className="text-xs text-muted-foreground">{t("adversityQuestion")}</p>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                  <div className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">
                    <strong>B</strong> - {t("beliefLabel")}
                  </div>
                  <p className="text-xs text-muted-foreground">{t("beliefQuestion")}</p>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                    <strong>C</strong> - {t("consequenceLabel")}
                  </div>
                  <p className="text-xs text-muted-foreground">{t("consequenceQuestion")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why it works */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              {t("whyCBT")}
            </h3>
            <div className="space-y-3">
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{t("step1Title")}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("step1Desc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{t("step2Title")}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("step2Desc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{t("step3Title")}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("step3Desc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              size="lg"
              className="flex-1 text-base bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              onClick={onCreateRecord}
            >
              <Brain className="mr-2 h-5 w-5" />
              {t("createRecord")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/help/cbt" className="flex-1">
              <Button size="lg" variant="outline" className="w-full text-base">
                <BookOpen className="mr-2 h-5 w-5" />
                {t("learnMore")}
              </Button>
            </Link>
          </div>

          {/* Research */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-sm">
              <p className="font-medium mb-2">{t("researchTitle")}</p>
              <p className="text-muted-foreground">
                {t("researchDesc")}
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
