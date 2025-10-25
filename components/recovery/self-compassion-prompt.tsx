"use client"

import { useState } from "react"
import { Heart, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface SelfCompassionPromptProps {
  onComplete: (note: string) => void
}

export function SelfCompassionPrompt({ onComplete }: SelfCompassionPromptProps) {
  const [note, setNote] = useState("")
  const [step, setStep] = useState(0)

  const prompts = [
    {
      title: "Common Humanity",
      question: "Nejsi v tom sám",
      description:
        "24-36% lidí zažívá extinction burst. Tohle je normální část procesu změny. Všichni občas bojujeme.",
      placeholder: "Jak ti to připadá, když víš že to zažívají i ostatní?",
    },
    {
      title: "Self-Kindness",
      question: "Jak bys mluvil s přítelem?",
      description:
        "Kdybys viděl dobrého přítele v téhle situaci, co bys mu řekl? Byl bys kritický nebo soucitný?",
      placeholder: "Napiš si, co bys řekl příteli (a pak to řekni sám sobě)...",
    },
    {
      title: "Mindfulness",
      question: "Co cítíš, bez soudu",
      description:
        "Všimni si svých pocitů, aniž bys je hodnotil jako dobré nebo špatné. Jen je pozoruj.",
      placeholder: "Jaké emoce teď cítíš? (frustrace, zklamání, úzkost...)",
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
          <h3 className="text-lg font-semibold">Self-Compassion Exercise</h3>
          <p className="text-sm text-muted-foreground">
            Based on research by Kristin Neff - Step {step + 1} of {prompts.length}
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
          <strong className="text-foreground">Výzkum:</strong> Self-compassion (soucit k sobě)
          zvyšuje resilience a snižuje riziko vzdání se po neúspěchu. Lidé, kteří praktikují
          self-compassion, mají větší šanci pokračovat v návycích i po překážkách.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Zpět
          </Button>
        )}
        <Button
          onClick={handleNext}
          className="ml-auto gap-2 bg-pink-600 hover:bg-pink-700 text-white"
        >
          {step === prompts.length - 1 ? (
            <>
              Dokončit
              <CheckCircle2 className="h-4 w-4" />
            </>
          ) : (
            "Další prompt"
          )}
        </Button>
      </div>
    </div>
  )
}
