"use client"

import { useState } from "react"
import { Heart, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

interface SelfCompassionPromptProps {
  onComplete: (note: string) => void
}

export function SelfCompassionPrompt({ onComplete }: SelfCompassionPromptProps) {
  const [note, setNote] = useState("")
  const [step, setStep] = useState(0)
  const t = useTranslations("recovery.selfCompassion")

  const prompts = [
    {
      title: t("commonHumanityTitle"),
      question: t("commonHumanityQuestion"),
      description: t("commonHumanityDesc"),
      placeholder: t("commonHumanityPlaceholder"),
    },
    {
      title: t("selfKindnessTitle"),
      question: t("selfKindnessQuestion"),
      description: t("selfKindnessDesc"),
      placeholder: t("selfKindnessPlaceholder"),
    },
    {
      title: t("mindfulnessTitle"),
      question: t("mindfulnessQuestion"),
      description: t("mindfulnessDesc"),
      placeholder: t("mindfulnessPlaceholder"),
    },
  ]

  const currentPrompt = prompts[step]

  const handleNext = () => {
    if (step < prompts.length - 1) {
      setStep(step + 1)
    } else {
      onComplete(note)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20">
          <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("exerciseTitle")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("basedOnResearch", { step: step + 1, total: prompts.length })}
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {prompts.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === step ? "w-8 bg-pink-500" : index < step ? "w-2 bg-pink-300" : "w-2 bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Current prompt */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 space-y-4 bg-gradient-to-br from-pink-50/50 to-rose-50/50 dark:from-pink-950/10 dark:to-rose-950/10 border-pink-200/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="px-2 py-1 rounded-md bg-pink-500/20 border border-pink-500/30">
                <span className="text-xs font-medium text-pink-700 dark:text-pink-300">
                  {currentPrompt.title}
                </span>
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2">{currentPrompt.question}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentPrompt.description}
            </p>
          </div>

          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={currentPrompt.placeholder}
            className="min-h-[120px] resize-none"
          />
        </Card>
      </motion.div>

      {/* Research note */}
      <div className="p-4 rounded-lg bg-muted/50 border text-sm">
        <p className="text-muted-foreground">
          <strong className="text-foreground">{t("researchLabel")}</strong>{" "}
          {t("researchNote")}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            {t("back")}
          </Button>
        )}
        <Button
          onClick={handleNext}
          className="ml-auto gap-2 bg-pink-600 hover:bg-pink-700 text-white"
        >
          {step === prompts.length - 1 ? (
            <>
              {t("complete")}
              <CheckCircle2 className="h-4 w-4" />
            </>
          ) : (
            t("nextPrompt")
          )}
        </Button>
      </div>
    </div>
  )
}
