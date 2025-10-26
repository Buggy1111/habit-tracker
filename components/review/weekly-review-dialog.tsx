"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
import { WeeklyInsights } from "@/lib/algorithms/weekly-insights"
import { WeeklyInsightsCard } from "./weekly-insights-card"
import { DifficultyRating } from "./difficulty-rating"
import { Habit } from "@prisma/client"
import { toast } from "sonner"
import { logger } from "@/lib/logger"

interface WeeklyReviewDialogProps {
  open: boolean
  onClose: () => void
  insights: WeeklyInsights
  habits: Habit[]
}

interface DifficultyRatingData {
  habitId: string
  rating: number
  note?: string
}

export function WeeklyReviewDialog({ open, onClose, insights, habits }: WeeklyReviewDialogProps) {
  const [currentTab, setCurrentTab] = useState("insights")
  const [difficultyRatings, setDifficultyRatings] = useState<Map<string, DifficultyRatingData>>(
    new Map()
  )
  const [currentHabitIndex, setCurrentHabitIndex] = useState(0)
  const [reflection, setReflection] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentHabit = habits[currentHabitIndex]

  const handleDifficultyRate = (rating: number, note?: string) => {
    const newRatings = new Map(difficultyRatings)
    newRatings.set(currentHabit.id, {
      habitId: currentHabit.id,
      rating,
      note,
    })
    setDifficultyRatings(newRatings)

    // Move to next habit or reflection tab
    if (currentHabitIndex < habits.length - 1) {
      setCurrentHabitIndex(currentHabitIndex + 1)
    } else {
      setCurrentTab("reflection")
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/habits/weekly-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekStart: insights.weekStart,
          weekEnd: insights.weekEnd,
          difficultyRatings: Array.from(difficultyRatings.values()),
          reflection: reflection || null,
          insights: {
            completionRate: insights.completionRate,
            improvement: insights.improvement,
            activeDays: insights.activeDays,
            trends: insights.trends,
            topHabit: insights.topHabit?.habit.id,
            strugglingHabit: insights.strugglingHabit?.habit.id,
            suggestions: insights.suggestions,
            celebration: insights.celebration,
          },
        }),
      })

      if (!response.ok) throw new Error("Failed to save review")

      toast.success("Týdenní reflexe uložena!")
      onClose()

      // Reset state
      setCurrentTab("insights")
      setDifficultyRatings(new Map())
      setCurrentHabitIndex(0)
      setReflection("")
    } catch (error) {
      logger.error("Error saving review:", error)
      toast.error("Chyba při ukládání reflexe")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isInsightsComplete = currentTab !== "insights"
  const isRatingsComplete = difficultyRatings.size === habits.length
  const isReflectionComplete = reflection.trim().length > 0

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Týdenní reflexe</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Přehled tvého pokroku a plánování dalšího týdne
          </p>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights" className="gap-2">
              {isInsightsComplete && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              Přehled
            </TabsTrigger>
            <TabsTrigger value="difficulty" className="gap-2">
              {isRatingsComplete && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              Obtížnost ({difficultyRatings.size}/{habits.length})
            </TabsTrigger>
            <TabsTrigger value="reflection" className="gap-2">
              {isReflectionComplete && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              Reflexe
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Insights */}
          <TabsContent value="insights" className="space-y-6 mt-6">
            <WeeklyInsightsCard insights={insights} />

            <div className="flex justify-end">
              <Button onClick={() => setCurrentTab("difficulty")} className="gap-2">
                Pokračovat
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Tab 2: Difficulty Rating */}
          <TabsContent value="difficulty" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Ohodnoť obtížnost návyků</h3>
                <span className="text-sm text-muted-foreground">
                  {currentHabitIndex + 1} / {habits.length}
                </span>
              </div>

              {currentHabit && (
                <DifficultyRating
                  habitName={currentHabit.name}
                  habitColor={currentHabit.color}
                  onRate={handleDifficultyRate}
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentHabitIndex > 0) {
                      setCurrentHabitIndex(currentHabitIndex - 1)
                    } else {
                      setCurrentTab("insights")
                    }
                  }}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Zpět
                </Button>

                <Button
                  onClick={() => {
                    if (currentHabitIndex < habits.length - 1) {
                      setCurrentHabitIndex(currentHabitIndex + 1)
                    } else {
                      setCurrentTab("reflection")
                    }
                  }}
                  disabled={!difficultyRatings.has(currentHabit.id)}
                  className="gap-2"
                >
                  {currentHabitIndex < habits.length - 1 ? "Další" : "Pokračovat"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Reflection */}
          <TabsContent value="reflection" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Osobní reflexe</h3>
                <p className="text-sm text-muted-foreground">
                  Zamysli se nad uplynulým týdnem a zapiš své myšlenky:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <p className="text-sm font-medium">Můžeš odpovědět na tyto otázky:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Co šlo tento týden dobře?</li>
                    <li>Jaké překážky jsi musel překonat?</li>
                    <li>Co bys změnil příští týden?</li>
                    <li>Jak se cítíš ohledně svého pokroku?</li>
                  </ul>
                </div>

                <Textarea
                  placeholder="Zde zapiš své myšlenky..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  rows={8}
                  className="resize-none"
                />

                <p className="text-xs text-muted-foreground">
                  💡 Výzkum ukazuje, že reflektivní psaní zvyšuje sebevědomí a dlouhodobou motivaci.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentTab("difficulty")
                    setCurrentHabitIndex(habits.length - 1)
                  }}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Zpět
                </Button>

                <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Ukládám..." : "Dokončit reflexi"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
