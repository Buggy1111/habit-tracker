"use client"

import { useState } from "react"
import { Sparkles, Plus, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useHabits } from "@/hooks/use-habits"
import { WoopWizard } from "@/components/woop/woop-wizard"
import { motion } from "framer-motion"
import Link from "next/link"

export default function WoopPage() {
  const { data: habits, isLoading: habitsLoading } = useHabits()
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null)
  const [woopWizardOpen, setWoopWizardOpen] = useState(false)

  const selectedHabit = habits?.find(h => h.id === selectedHabitId)

  // Note: This page shows info about WOOP method
  // Individual WOOP plans are viewed on habit detail pages
  // We just show how many habits have WOOP plans here

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

      {/* Your Habits - Create WOOP Plans */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold">Vytvořte WOOP plán pro svůj návyk</h2>

        {habitsLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        ) : habits && habits.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {habits.map((habit, index) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/habits/${habit.id}`}>
                  <Card className="p-6 hover:border-purple-300 dark:hover:border-purple-700 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="p-3 rounded-xl text-2xl transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${habit.color}20` }}
                      >
                        {habit.icon || "🎯"}
                      </div>
                      <Sparkles className="w-5 h-5 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{habit.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {habit.description || "Klikněte pro vytvoření WOOP plánu"}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Vytvořit WOOP
                    </Button>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-2 border-dashed">
            <Target className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nejdříve vytvořte návyk</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              WOOP plány se vytvářejí pro konkrétní návyky.
              Začněte tím, že si vytvoříte první návyk.
            </p>
            <Link href="/dashboard/habits">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Vytvořit první návyk
              </Button>
            </Link>
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
