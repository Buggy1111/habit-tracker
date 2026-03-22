import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"
import { EXAMPLE_HABIT_KEYS, type ExampleHabit } from "./constants"
import { useTranslations } from "next-intl"

interface StepWelcomeProps {
  onUseExample: (example: ExampleHabit) => void
}

export function StepWelcome({ onUseExample }: StepWelcomeProps) {
  const t = useTranslations("onboarding.tutorial")
  const te = useTranslations("onboarding.exampleHabits")

  return (
    <div className="space-y-4">
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-sm">{t("whyStartWithOne")}</p>
              <p className="text-sm text-muted-foreground">
                {t("researchOneFocus")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <p className="font-medium mb-3">{t("chooseOrCreate")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXAMPLE_HABIT_KEYS.map((example, index) => {
            const resolved: ExampleHabit = {
              name: te(example.nameKey),
              trigger: te(example.triggerKey),
              action: te(example.actionKey),
              context: te(example.contextKey),
              icon: example.icon,
            }
            return (
              <Card
                key={index}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => onUseExample(resolved)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{example.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{resolved.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {resolved.trigger} &rarr; {resolved.action}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
