"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useCreateWoop } from "@/hooks/use-woop"
import { type WoopTemplate } from "@/lib/constants/woop-templates"
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useHelpContent } from "@/hooks/use-help-content"
import { StepWish } from "./step-wish"
import { StepOutcome } from "./step-outcome"
import { StepObstacle } from "./step-obstacle"
import { StepPlan } from "./step-plan"
import { useTranslations } from "next-intl"

interface WoopWizardProps {
  habitId: string
  habitName: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WoopWizard({ habitId, open, onOpenChange }: WoopWizardProps) {
  const HELP_CONTENT = useHelpContent()
  const t = useTranslations("woop.wizard")
  const tc = useTranslations("common")
  const [step, setStep] = useState(1)
  const [useTemplate, setUseTemplate] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Všechny")
  const [selectedTemplate, setSelectedTemplate] = useState<WoopTemplate | null>(null)

  const [wish, setWish] = useState("")
  const [outcome, setOutcome] = useState("")
  const [obstacle, setObstacle] = useState("")
  const [plan, setPlan] = useState("")

  const { mutate: createWoop, isPending } = useCreateWoop(habitId)

  const resetForm = () => {
    setStep(1)
    setUseTemplate(true)
    setSelectedCategory("Všechny")
    setSelectedTemplate(null)
    setWish("")
    setOutcome("")
    setObstacle("")
    setPlan("")
  }

  const handleTemplateSelect = (template: WoopTemplate) => {
    setSelectedTemplate(template)
    setWish(template.wish)
    setOutcome(template.outcome)
    setObstacle(template.obstacle)
    setPlan(template.plan)
  }

  const handleSubmit = () => {
    if (!wish.trim() || !outcome.trim() || !obstacle.trim() || !plan.trim()) {
      return
    }

    createWoop(
      {
        wish: wish.trim(),
        outcome: outcome.trim(),
        obstacle: obstacle.trim(),
        plan: plan.trim(),
      },
      {
        onSuccess: () => {
          onOpenChange(false)
          resetForm()
        },
      }
    )
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const progress = (step / 4) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <DialogTitle>{t("title")}</DialogTitle>
            <InfoTooltip
              title={HELP_CONTENT.woop.title}
              content={HELP_CONTENT.woop.short}
              learnMoreLink={HELP_CONTENT.woop.learnMoreLink}
              side="right"
            />
          </div>
          <DialogDescription>
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{t("step", { step })}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          {step === 1 && (
            <StepWish
              useTemplate={useTemplate}
              onUseTemplateChange={setUseTemplate}
              selectedCategory={selectedCategory}
              onSelectedCategoryChange={setSelectedCategory}
              selectedTemplate={selectedTemplate}
              onTemplateSelect={handleTemplateSelect}
              wish={wish}
              onWishChange={setWish}
            />
          )}

          {step === 2 && (
            <StepOutcome outcome={outcome} onOutcomeChange={setOutcome} />
          )}

          {step === 3 && (
            <StepObstacle obstacle={obstacle} onObstacleChange={setObstacle} />
          )}

          {step === 4 && (
            <StepPlan
              wish={wish}
              outcome={outcome}
              obstacle={obstacle}
              plan={plan}
              onPlanChange={setPlan}
            />
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {tc("back")}
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {step < 4 ? (
              <Button onClick={nextStep} disabled={step === 1 && !wish.trim()}>
                {tc("next")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={
                  !wish.trim() || !outcome.trim() || !obstacle.trim() || !plan.trim() || isPending
                }
              >
                {isPending ? t("saving") : t("createPlan")}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
