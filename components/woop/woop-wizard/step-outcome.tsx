import { useTranslations } from "next-intl"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useHelpContent } from "@/hooks/use-help-content"

interface StepOutcomeProps {
  outcome: string
  onOutcomeChange: (value: string) => void
}

export function StepOutcome({ outcome, onOutcomeChange }: StepOutcomeProps) {
  const HELP_CONTENT = useHelpContent()
  const t = useTranslations("woop.stepOutcome")
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          O - Outcome
        </Badge>
        <h3 className="font-semibold">{t("title")}</h3>
        <InfoTooltip
          title={HELP_CONTENT.woopOutcome.title}
          content={HELP_CONTENT.woopOutcome.short}
          side="right"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {t("description")}
      </p>

      <div>
        <Label htmlFor="outcome">{t("label")}</Label>
        <Textarea
          id="outcome"
          value={outcome}
          onChange={(e) => onOutcomeChange(e.target.value)}
          placeholder={t("placeholder")}
          rows={4}
          className="mt-2"
        />
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm font-medium mb-2">{t("tipTitle")}</p>
        <p className="text-sm text-muted-foreground">
          {t("tipDesc")}
        </p>
      </Card>
    </div>
  )
}
