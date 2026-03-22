import { useTranslations } from "next-intl"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useHelpContent } from "@/hooks/use-help-content"

interface StepPlanProps {
  wish: string
  outcome: string
  obstacle: string
  plan: string
  onPlanChange: (value: string) => void
}

export function StepPlan({ wish, outcome, obstacle, plan, onPlanChange }: StepPlanProps) {
  const HELP_CONTENT = useHelpContent()
  const t = useTranslations("woop.stepPlan")
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          P - Plan
        </Badge>
        <h3 className="font-semibold">{t("title")}</h3>
        <InfoTooltip
          title={HELP_CONTENT.woopPlan.title}
          content={HELP_CONTENT.woopPlan.short}
          side="right"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {t("description")}
      </p>

      <div>
        <Label htmlFor="plan">{t("label")}</Label>
        <Textarea
          id="plan"
          value={plan}
          onChange={(e) => onPlanChange(e.target.value)}
          placeholder={t("placeholder")}
          rows={4}
          className="mt-2"
        />
      </div>

      <Card className="p-4 bg-green-50 border-green-200">
        <p className="text-sm font-medium mb-2">{t("tipTitle")}</p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>{t("tipItem1")}</li>
          <li>{t("tipItem2")}</li>
          <li>{t("tipItem3")}</li>
        </ul>
      </Card>

      {/* Summary Preview */}
      <Card className="p-4 bg-purple-50 border-purple-200">
        <h4 className="font-semibold mb-3">{t("summaryTitle")}</h4>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-purple-700">Wish:</span>
            <p className="text-muted-foreground mt-1">{wish}</p>
          </div>
          <div>
            <span className="font-medium text-blue-700">Outcome:</span>
            <p className="text-muted-foreground mt-1">{outcome}</p>
          </div>
          <div>
            <span className="font-medium text-orange-700">Obstacle:</span>
            <p className="text-muted-foreground mt-1">{obstacle}</p>
          </div>
          <div>
            <span className="font-medium text-green-700">Plan:</span>
            <p className="text-muted-foreground mt-1">{plan}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
