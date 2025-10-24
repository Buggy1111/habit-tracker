"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddHabitDialog } from "@/components/habits/add-habit-dialog"
import { TodaysFocus } from "@/components/dashboard/todays-focus"
import { useState } from "react"
import { useHabits } from "@/hooks/use-habits"
import { motion } from "framer-motion"

export default function TodayPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { data: habits, isLoading } = useHabits()

  // Prepare habits for today
  const habitsForToday = habits?.map((habit) => ({
    id: habit.id,
    name: habit.name,
    color: habit.color,
    completed: habit.completed,
    trigger: habit.trigger,
    action: habit.action,
    context: habit.context,
  })) || []

  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      {/* Page Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Dnešní úkoly
        </h1>
        <p className="text-muted-foreground mt-2">
          Soustřeď se na to, co je důležité dnes
        </p>
      </motion.div>

      {/* Today's Focus Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
          {/* Today's Focus - takes 2/3 on large, 3/4 on xl */}
          <div className="lg:col-span-2 xl:col-span-3">
            {!isLoading && habitsForToday.length > 0 ? (
              <TodaysFocus habits={habitsForToday} />
            ) : (
              <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl">
                <div className="flex flex-col items-center justify-center p-12">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-lg font-medium text-center mb-2">
                    Žádné návyky pro dnešek
                  </p>
                  <p className="text-muted-foreground text-center mb-6">
                    Vytvoř svůj první návyk a začni budovat lepší verzi sebe!
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)} size="lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Přidat návyk
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions - takes 1/3 on large, 1/4 on xl */}
          <div className="lg:col-span-1 xl:col-span-1">
            <div className="lg:sticky lg:top-6 rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative flex flex-col gap-4 p-6">
                <div>
                  <h3 className="font-semibold mb-1">Rychlé akce</h3>
                  <p className="text-sm text-muted-foreground">
                    Spravuj své návyky
                  </p>
                </div>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  size="lg"
                  className="w-full relative overflow-hidden group/btn"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Plus className="mr-2 h-5 w-5" />
                    Nový návyk
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                </Button>

                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Celkem návyků</span>
                    <span className="text-lg font-bold">{habits?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Splněno dnes</span>
                    <span className="text-lg font-bold text-green-600">
                      {habits?.filter((h) => h.completed).length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Zbývá</span>
                    <span className="text-lg font-bold text-orange-600">
                      {habits?.filter((h) => !h.completed).length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <AddHabitDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  )
}
