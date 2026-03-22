"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { NeuroplasticityPhase } from "@/lib/algorithms/neuroplasticity-phase"
import { getPhaseColor } from "@/lib/algorithms/neuroplasticity-phase"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useHelpContent } from "@/hooks/use-help-content"

interface NeuroplasticityTimelineProps {
  phase: NeuroplasticityPhase
  daysUntilNext: number | null
  habitName: string
}

export function NeuroplasticityTimeline({ phase, daysUntilNext }: NeuroplasticityTimelineProps) {
  const HELP_CONTENT = useHelpContent()
  const phaseColor = getPhaseColor(phase.phase)

  const getIcon = () => {
    switch (phase.phase) {
      case 1:
        return Zap
      case 2:
        return Brain
      case 3:
        return Sparkles
      case 4:
        return Sparkles
      default:
        return Brain
    }
  }

  const Icon = getIcon()

  return (
    <Card className="border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl overflow-hidden relative group">
      {/* Animated gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: phaseColor }}
        animate={{
          boxShadow: [`0 0 10px ${phaseColor}`, `0 0 20px ${phaseColor}`, `0 0 10px ${phaseColor}`],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      <CardHeader className="relative pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <motion.div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${phaseColor}20` }}
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className="h-5 w-5" style={{ color: phaseColor }} />
            </motion.div>
            <span>66-Day Neuroplasticity</span>
            <InfoTooltip
              title={HELP_CONTENT.neuroplasticity.title}
              content={HELP_CONTENT.neuroplasticity.short}
              learnMoreLink={HELP_CONTENT.neuroplasticity.learnMoreLink}
              side="right"
            />
          </CardTitle>
          <Badge
            variant="secondary"
            className="text-xs"
            style={{
              backgroundColor: `${phaseColor}20`,
              color: phaseColor,
            }}
          >
            Fáze {phase.phase}/4
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Phase title and emoji */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">{phase.emoji}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-sm sm:text-base">{phase.title}</h4>
            <p className="text-xs text-muted-foreground">{phase.description}</p>
          </div>
        </div>

        {/* Timeline progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress v této fázi</span>
            <span>{phase.progress}%</span>
          </div>
          <div className="relative h-3 bg-secondary/50 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: phaseColor }}
              initial={{ width: 0 }}
              animate={{ width: `${phase.progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Animated shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>
          {daysUntilNext !== null && (
            <p className="text-xs text-muted-foreground text-center">
              {daysUntilNext} {daysUntilNext === 1 ? "den" : daysUntilNext < 5 ? "dny" : "dní"} do
              další fáze
            </p>
          )}
        </div>

        {/* 4-phase timeline */}
        <div className="flex justify-between items-center pt-2">
          {[1, 2, 3, 4].map((p) => {
            const isActive = p === phase.phase
            const isPast = p < phase.phase
            const phColor = getPhaseColor(p)

            return (
              <div key={p} className="flex flex-col items-center gap-1">
                <motion.div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all",
                    isActive && "ring-2 ring-offset-2"
                  )}
                  style={
                    {
                      backgroundColor: isPast || isActive ? phColor : `${phColor}20`,
                      color: isPast || isActive ? "white" : phColor,
                      "--tw-ring-color": isActive ? phColor : "transparent",
                    } as React.CSSProperties
                  }
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {p}
                </motion.div>
                <span className="text-[10px] text-muted-foreground">
                  {p === 1 && "Build"}
                  {p === 2 && "Strengthen"}
                  {p === 3 && "Approach"}
                  {p === 4 && "Integrated"}
                </span>
              </div>
            )
          })}
        </div>

        {/* Motivational message */}
        <motion.div
          className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm font-medium mb-1">💪 Motivace:</p>
          <p className="text-xs text-muted-foreground">{phase.motivationalMessage}</p>
        </motion.div>

        {/* Science insight */}
        <motion.div
          className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm font-medium mb-1">🧠 Věda:</p>
          <p className="text-xs text-muted-foreground">{phase.scienceInsight}</p>
        </motion.div>
      </CardContent>
    </Card>
  )
}
