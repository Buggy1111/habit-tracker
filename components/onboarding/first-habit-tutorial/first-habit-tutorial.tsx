"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, ArrowRight, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCreateHabit } from "@/hooks/use-habits"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { TUTORIAL_COMPLETED_KEY, type ExampleHabit } from "./constants"
import { StepWelcome } from "./step-welcome"
import { StepIfThen } from "./step-if-then"
import { StepForm } from "./step-form"
import { StepReview } from "./step-review"

interface FirstHabitTutorialProps {
  open: boolean
  onClose: () => void
}

export function FirstHabitTutorial({ open, onClose }: FirstHabitTutorialProps) {
  const [step, setStep] = useState(1)
  const [habitName, setHabitName] = useState("")
  const [trigger, setTrigger] = useState("")
  const [action, setAction] = useState("")
  const [context, setContext] = useState("")
  const [icon, setIcon] = useState("\u{1F3AF}")
  const router = useRouter()
  const t = useTranslations("onboarding.tutorial")
  const tc = useTranslations("common")

  const createHabit = useCreateHabit()
  const totalSteps = 5

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleUseExample = (example: ExampleHabit) => {
    setHabitName(example.name)
    setTrigger(example.trigger)
    setAction(example.action)
    setContext(example.context)
    setIcon(example.icon)
    setStep(4) // Skip to review step
  }

  const handleCreateHabit = async () => {
    if (!habitName || !action) {
      toast.error(t("fillNameAndAction"))
      return
    }

    try {
      await createHabit.mutateAsync({
        name: habitName,
        action,
        trigger: trigger || undefined,
        context: context || undefined,
        icon,
        color: "#6366F1", // Default indigo color
        frequency: "DAILY",
        goal: 1,
      })

      localStorage.setItem(TUTORIAL_COMPLETED_KEY, "true")
      toast.success(t("habitCreated"))
      onClose()
      router.push("/dashboard")
    } catch {
      toast.error(t("createFailed"))
    }
  }

  const progress = (step / totalSteps) * 100

  const stepTitles: Record<number, string> = {
    1: t("createFirstHabit"),
    2: t("ifThenPower"),
    3: t("fillDetails"),
    4: t("reviewAndCreate"),
    5: t("congratulations"),
  }

  const stepDescs: Record<number, string> = {
    1: t("startWithOne"),
    2: t("learnTechnique"),
    3: t("beSpecific"),
    4: t("lastCheck"),
    5: t("firstHabitReady"),
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {stepTitles[step]}
          </DialogTitle>
          <DialogDescription>
            {stepDescs[step]}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {t("stepOf", { step, total: totalSteps })}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 py-4"
          >
            {step === 1 && <StepWelcome onUseExample={handleUseExample} />}

            {step === 2 && <StepIfThen />}

            {step === 3 && (
              <StepForm
                habitName={habitName}
                onHabitNameChange={setHabitName}
                trigger={trigger}
                onTriggerChange={setTrigger}
                action={action}
                onActionChange={setAction}
                context={context}
                onContextChange={setContext}
                icon={icon}
                onIconChange={setIcon}
              />
            )}

            {step === 4 && (
              <StepReview
                icon={icon}
                habitName={habitName}
                trigger={trigger}
                action={action}
                context={context}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between pt-4 border-t">
          {step > 1 && step < 4 && (
            <Button variant="outline" onClick={handlePrevious} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {tc("back")}
            </Button>
          )}
          {step < 4 && <div />}

          {step < 3 && (
            <Button onClick={handleNext}>
              {tc("next")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}

          {step === 3 && (
            <Button onClick={handleNext} disabled={!habitName || !action}>
              {t("continue")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}

          {step === 4 && (
            <Button
              onClick={handleCreateHabit}
              disabled={!habitName || !action || createHabit.isPending}
              className="w-full"
            >
              {createHabit.isPending ? (
                t("creating")
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  {t("createFirstHabitBtn")}
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
