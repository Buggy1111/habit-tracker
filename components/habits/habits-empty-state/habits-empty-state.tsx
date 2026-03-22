"use client"

import { Target, Sparkles, CheckCircle2, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HabitsEmptyStateProps {
  onCreateHabit: () => void
}

export function HabitsEmptyState({ onCreateHabit }: HabitsEmptyStateProps) {
  const t = useTranslations("habits.emptyState")
  const tCommon = useTranslations("common")

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-3xl w-full border-2 border-dashed">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {t("subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* What is a habit */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {t("whatIsHabit")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                {t("whatIsHabitDesc")}
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>{t("example1")}</li>
                <li>{t("example2")}</li>
                <li>{t("example3")}</li>
                <li>{t("example4")}</li>
              </ul>
            </CardContent>
          </Card>

          {/* How to get started */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              {t("howToStart")}
            </h3>
            <div className="space-y-3">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
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

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
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

              <Card className="border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-sm">
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
              className="flex-1 text-base"
              onClick={onCreateHabit}
            >
              <Target className="mr-2 h-5 w-5" />
              {t("createFirst")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/help/getting-started" className="flex-1">
              <Button size="lg" variant="outline" className="w-full text-base">
                {t("readGuide")}
              </Button>
            </Link>
          </div>

          {/* Quick Tips */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-sm">
              <p className="font-medium mb-2">{tCommon("proTip")}</p>
              <p className="text-muted-foreground">
                {t("proTipText")}
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
