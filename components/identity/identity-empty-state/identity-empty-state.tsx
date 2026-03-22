"use client"

import { Sparkles, Users, ArrowRight, CheckCircle2, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from "next-intl"

interface IdentityEmptyStateProps {
  onCreateIdentity: () => void
}

export function IdentityEmptyState({ onCreateIdentity }: IdentityEmptyStateProps) {
  const t = useTranslations("identity.emptyState")
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-3xl w-full border-2 border-dashed">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-500" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {t("subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* What is identity */}
          <Card className="bg-purple-500/5 border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                {t("whatIsIdentity")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                {t("whatIsIdentityDesc")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                  <div className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">❌ {t("wrongLabel")}</div>
                  <p className="text-xs">{t("wrongExample")}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                  <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">✅ {t("rightLabel")}</div>
                  <p className="text-xs">{t("rightExample")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why it works */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              {t("whyBetterTitle")}
            </h3>
            <div className="space-y-3">
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{t("intrinsicMotivation")}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("intrinsicMotivationDesc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{t("consistentDecisions")}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("consistentDecisionsDesc")}
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
                      <p className="font-medium">{t("longTermChange")}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("longTermChangeDesc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Examples */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                {t("examplesTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="text-purple-500">🏃</div>
                <div>
                  <strong>{t("exampleRunner")}</strong> → {t("exampleRunnerDesc")}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-blue-500">📚</div>
                <div>
                  <strong>{t("exampleReader")}</strong> → {t("exampleReaderDesc")}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500">🧘</div>
                <div>
                  <strong>{t("exampleCalm")}</strong> → {t("exampleCalmDesc")}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              size="lg"
              className="flex-1 text-base bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={onCreateIdentity}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {t("createFirst")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/help/identity" className="flex-1">
              <Button size="lg" variant="outline" className="w-full text-base">
                {t("learnMoreLink")}
              </Button>
            </Link>
          </div>

          {/* Research */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-sm">
              <p className="font-medium mb-2">{t("researchTitle")}</p>
              <p className="text-muted-foreground">
                <strong>{t("researchClear")}</strong> {t("researchClearQuote")}
                <br />
                <strong>{t("researchOyserman")}</strong> {t("researchOysermanDesc")}
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
