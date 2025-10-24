"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Sparkles, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HabitStrengthBadge } from "@/components/habits/habit-strength-badge"
import { NeuroplasticityTimeline } from "@/components/habits/neuroplasticity-timeline"
import { ExtinctionBurstAlert } from "@/components/habits/extinction-burst-alert"
import { WoopWizard } from "@/components/woop/woop-wizard"
import { WoopCard } from "@/components/woop/woop-card"
import { useHabits, useDeleteHabit } from "@/hooks/use-habits"
import { useWoopPlans } from "@/hooks/use-woop"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export default function HabitDetailPage() {
  const params = useParams()
  const router = useRouter()
  const habitId = params.habitId as string

  const [woopWizardOpen, setWoopWizardOpen] = useState(false)

  const { data: habits, isLoading } = useHabits()
  const { mutate: deleteHabit, isPending: isDeleting } = useDeleteHabit()
  const { data: woopPlans, isLoading: woopLoading } = useWoopPlans(habitId)

  const habit = habits?.find((h) => h.id === habitId)

  const handleDelete = () => {
    if (confirm(`Opravdu chceš smazat návyk "${habit?.name}"?`)) {
      deleteHabit(habitId, {
        onSuccess: () => {
          router.push("/dashboard/habits")
        },
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  if (!habit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Návyk nenalezen</h1>
          <p className="text-muted-foreground mb-4">
            Tento návyk neexistuje nebo byl smazán.
          </p>
          <Button onClick={() => router.push("/dashboard/habits")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zpět na návyky
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push(`/habits/${habitId}/edit`)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Habit Header Card */}
        <motion.div
          className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl p-6 relative overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative flex items-start gap-4">
            <div
              className="p-4 rounded-2xl text-4xl"
              style={{ backgroundColor: `${habit.color}20` }}
            >
              {habit.icon || "🎯"}
            </div>

            <div className="flex-1 space-y-2">
              <h1 className="text-3xl font-bold">{habit.name}</h1>
              {habit.description && (
                <p className="text-muted-foreground">{habit.description}</p>
              )}

              {/* Implementation Intention */}
              {(habit.trigger || habit.action) && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm font-medium mb-1">📋 IF-THEN Plán:</p>
                  <p className="text-sm">
                    {habit.trigger && <span>Když <strong>{habit.trigger}</strong></span>}
                    {habit.action && <span>, budu <strong>{habit.action}</strong></span>}
                    {habit.context && <span> ({habit.context})</span>}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Extinction Burst Alert */}
        {habit.extinctionBurst?.detected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ExtinctionBurstAlert
              result={habit.extinctionBurst}
              habitName={habit.name}
              onLearnMore={() => {
                // TODO: Open modal with more info
                alert("Více informací o extinction burst")
              }}
            />
          </motion.div>
        )}

        {/* Grid with Habit Strength and Neuroplasticity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Habit Strength */}
          <motion.div
            className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl p-6 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="relative space-y-4">
              <h2 className="text-xl font-bold">Síla návyku</h2>

              {habit.habitStrength !== undefined && habit.strengthLevel && (
                <HabitStrengthBadge
                  strength={habit.habitStrength}
                  level={habit.strengthLevel}
                  showDescription
                  size="lg"
                />
              )}

              {/* Streak info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-sm text-muted-foreground">Aktuální série</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {habit.streak} {habit.streak === 1 ? "den" : habit.streak < 5 ? "dny" : "dní"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nejdelší série</p>
                  <p className="text-2xl font-bold text-purple-500">
                    {habit.longestStreak} {habit.longestStreak === 1 ? "den" : habit.longestStreak! < 5 ? "dny" : "dní"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Neuroplasticity Timeline */}
          {habit.neuroplasticityPhase && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <NeuroplasticityTimeline
                phase={habit.neuroplasticityPhase}
                daysUntilNext={habit.daysUntilNextPhase || null}
                habitName={habit.name}
              />
            </motion.div>
          )}
        </div>

        {/* Stats & Logs (TODO: Add calendar view) */}
        <motion.div
          className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4">Historie</h2>
          <p className="text-muted-foreground text-sm">
            Celkem záznamů: {habit.logs.length}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Kalendář s historií bude přidán v další verzi
          </p>
        </motion.div>

        {/* WOOP Plans Section */}
        <motion.div
          className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-bold">WOOP Plány</h2>
            </div>
            <Button onClick={() => setWoopWizardOpen(true)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Vytvořit WOOP
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            WOOP (Wish, Outcome, Obstacle, Plan) - Vědecká metoda pro dosažení cílů.
            Research: 2x vyšší úspěšnost vs. pozitivní vizualizace.
          </p>

          {woopLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
            </div>
          ) : woopPlans && woopPlans.length > 0 ? (
            <div className="space-y-4">
              {woopPlans.map((woop) => (
                <WoopCard key={woop.id} woop={woop} habitId={habitId} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
              <Sparkles className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-4">
                Zatím nemáš žádný WOOP plán pro tento návyk
              </p>
              <Button onClick={() => setWoopWizardOpen(true)} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Vytvořit první WOOP plán
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      {/* WOOP Wizard Dialog */}
      <WoopWizard
        habitId={habitId}
        habitName={habit.name}
        open={woopWizardOpen}
        onOpenChange={setWoopWizardOpen}
      />
    </div>
  )
}
