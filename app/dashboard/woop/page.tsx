"use client"

import { useState } from "react"
import { Sparkles, Plus, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useHabits } from "@/hooks/use-habits"
import { WoopCard } from "@/components/woop/woop-card"
import { WoopWizard } from "@/components/woop/woop-wizard"
import { useWoopPlans } from "@/hooks/use-woop"
import { motion } from "framer-motion"
import Link from "next/link"

export default function WoopPage() {
  const { data: habits, isLoading: habitsLoading } = useHabits()
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null)
  const [woopWizardOpen, setWoopWizardOpen] = useState(false)

  // Get all WOOP plans for all habits
  const allWoopPlans = habits?.flatMap(habit => {
    const { data: woopPlans } = useWoopPlans(habit.id)
    return (woopPlans || []).map(woop => ({
      ...woop,
      habit: {
        id: habit.id,
        name: habit.name,
        color: habit.color,
        icon: habit.icon,
      },
    }))
  }) || []

  const selectedHabit = habits?.find(h => h.id === selectedHabitId)

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl sm:text-4xl font-bold">WOOP Metoda</h1>
          </div>
          <p className="text-muted-foreground">
            Wish · Outcome · Obstacle · Plan - Gabriele Oettingen
          </p>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Co je WOOP?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                WOOP je vědecky podložená metoda pro dosažení cílů vyvinutá psycholožkou Gabriele Oettingen.
                Kombinuje pozitivní myšlení s realistickým plánováním překážek.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                  2x vyšší úspěšnost
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  Vědecky ověřeno
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* WOOP Plans */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Vaše WOOP plány</h2>
          <p className="text-sm text-muted-foreground">
            {allWoopPlans.length} {allWoopPlans.length === 1 ? 'plán' : allWoopPlans.length < 5 ? 'plány' : 'plánů'}
          </p>
        </div>

        {habitsLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : allWoopPlans.length > 0 ? (
          <div className="space-y-6">
            {allWoopPlans.map((woopWithHabit) => (
              <motion.div
                key={woopWithHabit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Habit Info */}
                <Link href={`/habits/${woopWithHabit.habit.id}`}>
                  <div className="flex items-center gap-3 mb-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div
                      className="p-2 rounded-lg text-xl"
                      style={{ backgroundColor: `${woopWithHabit.habit.color}20` }}
                    >
                      {woopWithHabit.habit.icon || "🎯"}
                    </div>
                    <div>
                      <p className="font-medium">{woopWithHabit.habit.name}</p>
                      <p className="text-xs text-muted-foreground">Klikni pro detail návyku</p>
                    </div>
                  </div>
                </Link>

                {/* WOOP Card */}
                <WoopCard woop={woopWithHabit} habitId={woopWithHabit.habit.id} />
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-2 border-dashed">
            <Sparkles className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Zatím nemáte žádný WOOP plán</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              WOOP plány se vytvářejí pro konkrétní návyky.
              Přejděte na detail návyku a vytvořte si první WOOP plán.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard/habits">
                <Button>
                  <Target className="w-4 h-4 mr-2" />
                  Zobrazit návyky
                </Button>
              </Link>
              {habits && habits.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedHabitId(habits[0].id)
                    setWoopWizardOpen(true)
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Vytvořit WOOP pro {habits[0].name}
                </Button>
              )}
            </div>
          </Card>
        )}
      </motion.div>

      {/* WOOP Wizard Dialog */}
      {selectedHabitId && selectedHabit && (
        <WoopWizard
          habitId={selectedHabitId}
          habitName={selectedHabit.name}
          open={woopWizardOpen}
          onOpenChange={setWoopWizardOpen}
        />
      )}
    </div>
  )
}
