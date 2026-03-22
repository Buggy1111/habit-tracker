import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

interface StepFormProps {
  habitName: string
  onHabitNameChange: (value: string) => void
  trigger: string
  onTriggerChange: (value: string) => void
  action: string
  onActionChange: (value: string) => void
  context: string
  onContextChange: (value: string) => void
  icon: string
  onIconChange: (value: string) => void
}

export function StepForm({
  habitName,
  onHabitNameChange,
  trigger,
  onTriggerChange,
  action,
  onActionChange,
  context,
  onContextChange,
  icon,
  onIconChange,
}: StepFormProps) {
  const t = useTranslations("onboarding.tutorial")

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="habitName">
          {t("habitName")} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="habitName"
          placeholder={t("habitNamePlaceholder")}
          value={habitName}
          onChange={(e) => onHabitNameChange(e.target.value)}
        />
      </div>

      <Card className="bg-yellow-50 dark:bg-yellow-950/10 border-yellow-200 dark:border-yellow-800">
        <CardContent className="p-4">
          <p className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-600" />
            {t("ifThenPlan")}
          </p>
          <div className="space-y-3">
            <div>
              <Label htmlFor="trigger" className="text-xs">
                {t("triggerLabel")}
              </Label>
              <Input
                id="trigger"
                placeholder={t("triggerPlaceholder")}
                value={trigger}
                onChange={(e) => onTriggerChange(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="action" className="text-xs">
                {t("actionLabel")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="action"
                placeholder={t("actionPlaceholder")}
                value={action}
                onChange={(e) => onActionChange(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="context" className="text-xs">
                {t("contextLabel")}
              </Label>
              <Input
                id="context"
                placeholder={t("contextPlaceholder")}
                value={context}
                onChange={(e) => onContextChange(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <Label className="text-xs">{t("iconLabel")}</Label>
        <div className="flex gap-2 mt-2">
          {["\u{1F3AF}", "\u{1F4A7}", "\u{1F4DA}", "\u{1F9D8}", "\u{1F3C3}", "\u{1F957}", "\u{1F4AA}", "\u{2600}\u{FE0F}"].map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => onIconChange(emoji)}
              className={`w-10 h-10 text-2xl rounded-lg border-2 transition-colors ${
                icon === emoji
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
