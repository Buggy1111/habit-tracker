"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Sparkles,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

const WELCOME_SEEN_KEY = "habit-tracker-welcome-seen"

interface WelcomeDialogProps {
  open?: boolean
  onComplete?: () => void
}

export function WelcomeDialog({ open: controlledOpen, onComplete }: WelcomeDialogProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const t = useTranslations("onboarding.welcome")
  const tc = useTranslations("common")

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen

  useEffect(() => {
    if (controlledOpen === undefined) {
      const hasSeenWelcome = localStorage.getItem(WELCOME_SEEN_KEY)
      if (!hasSeenWelcome) {
        setTimeout(() => setInternalOpen(true), 1000)
      }
    }
  }, [controlledOpen])

  const handleClose = () => {
    localStorage.setItem(WELCOME_SEEN_KEY, "true")
    if (controlledOpen !== undefined && onComplete) {
      onComplete()
    } else {
      setInternalOpen(false)
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleClose()
      // Tutorial will be triggered by parent component
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSkip = () => {
    handleClose()
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      handleClose()
    } else if (controlledOpen === undefined) {
      setInternalOpen(newOpen)
    }
  }

  const progress = (step / totalSteps) * 100

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl md:text-3xl">
            {step === 1 && t("step1Title")}
            {step === 2 && t("step2Title")}
            {step === 3 && t("step3Title")}
            {step === 4 && t("step4Title")}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {step === 1 && t("step1Desc")}
            {step === 2 && t("step2Desc")}
            {step === 3 && t("step3Desc")}
            {step === 4 && t("step4Desc")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
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
            className="space-y-3 sm:space-y-4 py-3 sm:py-4"
          >
            {step === 1 && (
              <div className="space-y-3 sm:space-y-4">
                <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/20">
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    <div className="text-center">
                      <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎯</div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">
                        {t("notMotivationalApp")}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {t("scientificallyProven")}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-4">
                      <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-card">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-xs sm:text-sm">{t("ifThenPlans")}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">
                            {t("ifThenSuccess")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-card">
                        <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-xs sm:text-sm">{t("neuro66")}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">
                            {t("neuroScience")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-card">
                        <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-xs sm:text-sm">{t("woopMethod")}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">
                            {t("woopSuccess")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-card">
                        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-xs sm:text-sm">{t("habitStrengthScore")}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">
                            {t("notJustStreak")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="text-4xl sm:text-6xl mb-2">🔬</div>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {t("everyFeatureResearch")}
                  </p>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base mb-1">
                            {t("iiTitle")}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                            {t("iiDesc")}
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground italic">
                            {t("iiResearch")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                          <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base mb-1">
                            {t("neuroTitle")}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                            {t("neuroDesc")}
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground italic">
                            {t("neuroResearch")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="text-4xl sm:text-6xl mb-2">🚀</div>
                  <p className="text-base sm:text-lg font-semibold">{t("stepsToSuccess")}</p>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex gap-2 sm:gap-3">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm sm:text-base mb-1">
                            {t("createFirstHabit")}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {t("createFirstHabitDesc")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex gap-2 sm:gap-3">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-sm">
                          2
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm sm:text-base mb-1">
                            {t("setIfThenPlan")}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {t("setIfThenPlanDesc")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex gap-2 sm:gap-3">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                          3
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm sm:text-base mb-1">{t("bePatient")}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {t("bePatientDesc")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="text-4xl sm:text-6xl mb-2">💪</div>
                  <p className="text-lg sm:text-xl font-semibold mb-2">{t("readyToStart")}</p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {t("readyDesc")}
                  </p>
                </div>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                        <p className="font-medium text-sm sm:text-base">{t("whatAwaits")}</p>
                      </div>
                      <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground ml-6 sm:ml-7">
                        <li>✅ {t("awaits1")}</li>
                        <li>✅ {t("awaits2")}</li>
                        <li>✅ {t("awaits3")}</li>
                        <li>✅ {t("awaits4")}</li>
                        <li>✅ {t("awaits5")}</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="p-3 sm:p-4 text-xs sm:text-sm">
                    <p className="font-medium mb-2">{t("tipStart")}</p>
                    <p className="text-muted-foreground">
                      {t("tipStartDesc")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t gap-3">
          <div className="flex gap-2 w-full sm:w-auto">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {tc("back")}
              </Button>
            )}
            <Button variant="ghost" onClick={handleSkip} size="sm" className="flex-1 sm:flex-none">
              {tc("skip")}
            </Button>
          </div>
          <Button onClick={handleNext} size="default" className="w-full sm:w-auto">
            {step === totalSteps ? (
              <>
                {t("createFirstHabitBtn")}
                <Target className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                {tc("next")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
