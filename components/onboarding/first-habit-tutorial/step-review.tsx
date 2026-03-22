import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"

interface StepReviewProps {
  icon: string
  habitName: string
  trigger: string
  action: string
  context: string
}

export function StepReview({ icon, habitName, trigger, action, context }: StepReviewProps) {
  const t = useTranslations("onboarding.tutorial")

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{icon}</div>
            <div>
              <h3 className="text-xl font-semibold">{habitName || t("habitNameDefault")}</h3>
              <p className="text-sm text-muted-foreground">{t("yourFirstHabit")}</p>
            </div>
          </div>

          {(trigger || action || context) && (
            <div className="space-y-2 p-4 rounded-lg bg-muted">
              <p className="font-medium text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-600" />
                {t("ifThenPlanLabel")}
              </p>
              <div className="text-sm space-y-1">
                {trigger && (
                  <p>
                    <span className="text-muted-foreground">{t("whenLabel")}</span>{" "}
                    <span className="font-medium">{trigger}</span>
                  </p>
                )}
                {action && (
                  <p>
                    <span className="text-muted-foreground">{t("thenLabel")}</span>{" "}
                    <span className="font-medium">{action}</span>
                  </p>
                )}
                {context && (
                  <p>
                    <span className="text-muted-foreground">{t("whereLabel")}</span>{" "}
                    <span className="font-medium">{context}</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div className="space-y-2 text-sm">
              <p className="font-medium">{t("whatHappensNext")}</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>{t("dashboardAppear")}</li>
                <li>{t("trackProgress")}</li>
                <li>{t("scienceMetrics")}</li>
                <li>{t("extinctionSupport")}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
