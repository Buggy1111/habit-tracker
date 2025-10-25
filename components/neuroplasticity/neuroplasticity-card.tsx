"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Zap, Sparkles, CheckCircle, Info } from "lucide-react"
import {
  getNeuroplasticityPhase,
  getPhaseColor,
  daysUntilNextPhase,
} from "@/lib/algorithms/neuroplasticity-phase"
import { PhaseInsightDialog } from "./phase-insight-dialog"
import { motion } from "framer-motion"

interface NeuroplasticityCardProps {
  daysSinceStart: number
  habitName: string
}

export function NeuroplasticityCard({ daysSinceStart, habitName }: NeuroplasticityCardProps) {
  const [showInsights, setShowInsights] = useState(false)
  const phase = getNeuroplasticityPhase(daysSinceStart)
  const phaseColor = getPhaseColor(phase.phase)
  const daysLeft = daysUntilNextPhase(daysSinceStart)

  const PhaseIcon =
    {
      1: Brain,
      2: Zap,
      3: Sparkles,
      4: CheckCircle,
    }[phase.phase] || Brain

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200/50">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-xl border-2"
                  style={{
                    backgroundColor: `${phaseColor}20`,
                    borderColor: `${phaseColor}40`,
                  }}
                >
                  <PhaseIcon className="h-6 w-6" style={{ color: phaseColor }} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Neuroplasticita: Den {daysSinceStart}</h3>
                  <p className="text-sm text-muted-foreground">N�vyk: {habitName}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInsights(true)}
                className="gap-2"
              >
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Zjistit v�ce</span>
              </Button>
            </div>

            {/* Phase Info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{phase.emoji}</span>
                    <h4 className="font-semibold">{phase.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">F�ze {phase.phase}/4 Progress</span>
                  <span className="font-medium">{phase.progress}%</span>
                </div>
                <Progress
                  value={phase.progress}
                  className="h-2"
                  style={
                    {
                      "--progress-color": phaseColor,
                    } as React.CSSProperties
                  }
                />
                {daysLeft !== null && (
                  <p className="text-xs text-muted-foreground">
                    {daysLeft} {daysLeft === 1 ? "den" : "dny"} do dala� f�ze
                  </p>
                )}
              </div>
            </div>

            {/* Motivational Message */}
            <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 border border-indigo-200/30">
              <p className="text-sm leading-relaxed">
                <strong>Motivace:</strong> {phase.motivationalMessage}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <PhaseInsightDialog
        isOpen={showInsights}
        onClose={() => setShowInsights(false)}
        phase={phase}
        daysSinceStart={daysSinceStart}
        habitName={habitName}
      />
    </>
  )
}
