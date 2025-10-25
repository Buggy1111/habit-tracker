"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Brain, Lightbulb, Target, Award } from "lucide-react"
import { NeuroplasticityPhase } from "@/lib/algorithms/neuroplasticity-phase"
import { motion } from "framer-motion"

interface PhaseInsightDialogProps {
  isOpen: boolean
  onClose: () => void
  phase: NeuroplasticityPhase
  daysSinceStart: number
  habitName: string
}

export function PhaseInsightDialog({
  isOpen,
  onClose,
  phase,
  daysSinceStart,
  habitName,
}: PhaseInsightDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {phase.emoji} {phase.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Návyk: {habitName} • Den {daysSinceStart}/66
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Current Phase Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200/50">
              <div className="flex items-start gap-3 mb-4">
                <Brain className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Co se děje ve tvém mozku</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {phase.scienceInsight}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Motivational Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200/50">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Motivace a povzbuzení</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {phase.motivationalMessage}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Phase Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Target className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-3">Timeline Neuroplasticity</h3>
                  <div className="space-y-3">
                    <PhaseTimelineItem
                      phase={1}
                      title="Dny 1-21: Budování"
                      description="Vytváření nových neuronových spojení"
                      current={phase.phase === 1}
                      completed={phase.phase > 1}
                    />
                    <PhaseTimelineItem
                      phase={2}
                      title="Dny 22-42: Posilování"
                      description="Synapse se stabilizují, myelinizace začíná"
                      current={phase.phase === 2}
                      completed={phase.phase > 2}
                    />
                    <PhaseTimelineItem
                      phase={3}
                      title="Dny 43-66: Automatizace"
                      description="Bazální ganglia přebírají kontrolu"
                      current={phase.phase === 3}
                      completed={phase.phase > 3}
                    />
                    <PhaseTimelineItem
                      phase={4}
                      title="Den 67+: Integrace"
                      description="Návyk je plně automatický a integrovaný"
                      current={phase.phase === 4}
                      completed={false}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Research Citation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="p-6 bg-muted/50">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Výzkum</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Lally et al. (2010)</strong> - European Journal of Social Psychology
                    <br />
                    Studie 96 účastníků ukázala, že trvá průměrně <strong>66 dní</strong> (rozmezí
                    18-254 dní) než se nový návyk stane automatickým. Neuroplastická adaptace
                    pokračuje i po dosažení automaticity.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface PhaseTimelineItemProps {
  phase: number
  title: string
  description: string
  current: boolean
  completed: boolean
}

function PhaseTimelineItem({
  phase,
  title,
  description,
  current,
  completed,
}: PhaseTimelineItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
          current
            ? "bg-purple-500 border-purple-500 text-white"
            : completed
              ? "bg-green-500 border-green-500 text-white"
              : "bg-muted border-muted-foreground/30 text-muted-foreground"
        }`}
      >
        {completed ? "✓" : phase}
      </div>
      <div className="flex-1">
        <h4
          className={`font-medium text-sm ${current ? "text-purple-700 dark:text-purple-300" : ""}`}
        >
          {title}
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  )
}
