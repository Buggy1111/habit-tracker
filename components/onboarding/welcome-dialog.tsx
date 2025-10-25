"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Brain, Target, Sparkles, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface WelcomeDialogProps {
  open: boolean
  onComplete: () => void
}

export function WelcomeDialog({ open, onComplete }: WelcomeDialogProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      icon: Sparkles,
      title: "Vítej v Habit Trackeru!",
      description: "Aplikace pro budování návyků založená na vědě a neuroplasticitě mozku.",
      highlight: "Žádné pseudovědecké kejkle - jen ověřené metody!",
    },
    {
      icon: Brain,
      title: "Proč věda?",
      description: "Každá funkce v této aplikaci je podložená výzkumem. Používáme:",
      bullets: [
        "Implementation Intentions (Gollwitzer, 1999)",
        "66-denní neuroplasticitu (Lally et al., 2010)",
        "WOOP metodu (Gabriele Oettingen)",
        "Habit Strength algoritmus (Loop)",
        "CBT techniky (Aaron Beck)",
      ],
    },
    {
      icon: Target,
      title: "Jak začít?",
      description: "Vytvoř svůj první návyk a začni budovat lepší verzi sebe!",
      bullets: [
        "Zvol si návyk, který chceš budovat",
        "Přidej IF-THEN pravidlo (kdy a kde to budeš dělat)",
        "Každý den si jej odškrtni",
        "Sleduj svůj pokrok a neuroplastické fáze",
      ],
    },
  ]

  const currentStep = steps[step]
  const Icon = currentStep.icon

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            {currentStep.title}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 py-6"
          >
            <p className="text-base text-muted-foreground leading-relaxed">
              {currentStep.description}
            </p>

            {currentStep.highlight && (
              <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20">
                <p className="text-sm font-medium text-foreground">
                  {currentStep.highlight}
                </p>
              </div>
            )}

            {currentStep.bullets && (
              <ul className="space-y-3">
                {currentStep.bullets.map((bullet, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 py-4">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setStep(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === step
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted hover:bg-muted-foreground/50"
              }`}
              aria-label={`Krok ${index + 1}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="ghost" onClick={handleSkip}>
            Přeskočit
          </Button>

          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Zpět
              </Button>
            )}
            <Button onClick={handleNext} className="gap-2">
              {step === steps.length - 1 ? "Začít!" : "Další"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
