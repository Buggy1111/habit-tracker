import { useTranslations } from "next-intl"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useHelpContent } from "@/hooks/use-help-content"

interface StepObstacleProps {
  obstacle: string
  onObstacleChange: (value: string) => void
}

export function StepObstacle({ obstacle, onObstacleChange }: StepObstacleProps) {
  const HELP_CONTENT = useHelpContent()
  const t = useTranslations("woop.stepObstacle")
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
          O - Obstacle
        </Badge>
        <h3 className="font-semibold">{t("title")}</h3>
        <InfoTooltip
          title={HELP_CONTENT.woopObstacle.title}
          content={HELP_CONTENT.woopObstacle.short}
          side="right"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {t("description")}
      </p>

      <div>
        <Label htmlFor="obstacle">{t("label")}</Label>
        <Textarea
          id="obstacle"
          value={obstacle}
          onChange={(e) => onObstacleChange(e.target.value)}
          placeholder={t("placeholder")}
          rows={4}
          className="mt-2"
        />
      </div>

      <Card className="p-4 bg-orange-50 border-orange-200">
        <p className="text-sm font-medium mb-2">{t("importantTitle")}</p>
        <p className="text-sm text-muted-foreground">
          {t("importantDesc")}
        </p>
      </Card>
    </div>
  )
}
