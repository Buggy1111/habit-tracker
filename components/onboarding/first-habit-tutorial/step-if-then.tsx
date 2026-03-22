import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

export function StepIfThen() {
  const t = useTranslations("onboarding.tutorial")

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-lg font-semibold">
              {t("ifThenTitle")}
            </h3>
          </div>
          <div className="space-y-3 text-sm">
            <p>
              <strong>{t("badExample")}</strong> {t("badExampleText")}
            </p>
            <p>
              <strong>{t("goodExample")}</strong> {t("goodExampleText")}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
            1
          </div>
          <div>
            <p className="font-medium mb-1">{t("whenTrigger")}</p>
            <p className="text-sm text-muted-foreground">
              {t("whenExamples")}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
            2
          </div>
          <div>
            <p className="font-medium mb-1">{t("whatAction")}</p>
            <p className="text-sm text-muted-foreground">
              {t("whatExamples")}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
            3
          </div>
          <div>
            <p className="font-medium mb-1">{t("whereContext")}</p>
            <p className="text-sm text-muted-foreground">
              {t("whereExamples")}
            </p>
          </div>
        </div>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-4 text-sm">
          <p className="font-medium mb-2">{t("scientificBasis")}</p>
          <p className="text-muted-foreground">
            {t("scientificDesc")}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
