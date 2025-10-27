"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Target, ArrowRight, ArrowLeft, Lightbulb, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCreateHabit } from "@/hooks/use-habits"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const TUTORIAL_COMPLETED_KEY = "habit-tracker-first-habit-tutorial"

interface FirstHabitTutorialProps {
  open: boolean
  onClose: () => void
}

const EXAMPLE_HABITS = [
  {
    name: "Pít vodu ráno",
    trigger: "Když vstanu",
    action: "Vypiju sklenici vody",
    context: "V kuchyni",
    icon: "💧",
  },
  {
    name: "Ranní meditace",
    trigger: "Když si sednu k snídani",
    action: "Udělám 5 minut dechového cvičení",
    context: "Na židli v obývacím pokoji",
    icon: "🧘",
  },
  {
    name: "Večerní čtení",
    trigger: "Když si lehnu do postele",
    action: "Přečtu 5 stran knihy",
    context: "V posteli před spaním",
    icon: "📚",
  },
  {
    name: "Protažení",
    trigger: "Když se vrátím z práce",
    action: "Udělám 3 protahovací cviky",
    context: "V obývacím pokoji",
    icon: "🤸",
  },
]

export function FirstHabitTutorial({ open, onClose }: FirstHabitTutorialProps) {
  const [step, setStep] = useState(1)
  const [habitName, setHabitName] = useState("")
  const [trigger, setTrigger] = useState("")
  const [action, setAction] = useState("")
  const [context, setContext] = useState("")
  const [icon, setIcon] = useState("🎯")
  const router = useRouter()

  const createHabit = useCreateHabit()
  const totalSteps = 5

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleUseExample = (example: (typeof EXAMPLE_HABITS)[0]) => {
    setHabitName(example.name)
    setTrigger(example.trigger)
    setAction(example.action)
    setContext(example.context)
    setIcon(example.icon)
    setStep(4) // Skip to review step
  }

  const handleCreateHabit = async () => {
    if (!habitName || !action) {
      toast.error("Vyplň alespoň název a akci")
      return
    }

    try {
      await createHabit.mutateAsync({
        name: habitName,
        action,
        trigger: trigger || undefined,
        context: context || undefined,
        icon,
        color: "#6366F1", // Default indigo color
        frequency: "DAILY",
        goal: 1,
      })

      localStorage.setItem(TUTORIAL_COMPLETED_KEY, "true")
      toast.success("🎉 Tvůj první návyk je vytvořen!")
      onClose()
      router.push("/dashboard")
    } catch {
      toast.error("Nepodařilo se vytvořit návyk")
    }
  }

  const progress = (step / totalSteps) * 100

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 1 && "🎯 Vytvoř svůj první návyk"}
            {step === 2 && "💡 Síla IF-THEN plánů"}
            {step === 3 && "✏️ Vyplň detaily"}
            {step === 4 && "📋 Zkontroluj a vytvoř"}
            {step === 5 && "🎉 Gratulace!"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Začneme s JEDNOU věcí. Malé kroky = velké změny"}
            {step === 2 && "Naučíme tě techniku, která zvyšuje úspěšnost o 65%"}
            {step === 3 && "Buď konkrétní - pomůže ti to uspět"}
            {step === 4 && "Poslední kontrola před vytvořením"}
            {step === 5 && "Tvůj první návyk je připraven!"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Krok {step} z {totalSteps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 py-4"
          >
            {step === 1 && (
              <div className="space-y-4">
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <p className="font-medium text-sm">Proč začít s jedním návykem?</p>
                        <p className="text-sm text-muted-foreground">
                          Výzkum ukazuje, že lidé kteří se zaměří na JEDEN návyk mají 80% úspěšnost.
                          Ti co začnou s 3+ návyky? Pouze 35%.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <p className="font-medium mb-3">Vyber inspiraci nebo vytvoř vlastní:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {EXAMPLE_HABITS.map((example, index) => (
                      <Card
                        key={index}
                        className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleUseExample(example)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="text-3xl">{example.icon}</div>
                            <div className="flex-1">
                              <p className="font-medium text-sm mb-1">{example.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {example.trigger} → {example.action}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                      <h3 className="text-lg font-semibold">
                        IF-THEN plány (Implementation Intentions)
                      </h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p>
                        <strong>Špatně:</strong> "Budu cvičit každý den" (vágní, 35% úspěšnost)
                      </p>
                      <p>
                        <strong>Dobře:</strong> "Když se vrátím z práce, udělám 10 kliků v obývacím
                        pokoji" (konkrétní, 65% úspěšnost)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium mb-1">Kdy? (Trigger/Spouštěč)</p>
                      <p className="text-sm text-muted-foreground">
                        "Když vstanu", "Když si sednu k večeři", "Když zavřu notebook"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium mb-1">Co? (Akce)</p>
                      <p className="text-sm text-muted-foreground">
                        "Vypiju sklenici vody", "Udělám 5 dřepů", "Přečtu 1 stránku"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium mb-1">Kde? (Kontext - volitelné)</p>
                      <p className="text-sm text-muted-foreground">
                        "V kuchyni", "Na balkóně", "U stolu"
                      </p>
                    </div>
                  </div>
                </div>

                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-sm">
                    <p className="font-medium mb-2">📚 Vědecký základ:</p>
                    <p className="text-muted-foreground">
                      Gollwitzer (1999): IF-THEN plány zvyšují úspěšnost o 65% (effect size d=0.65).
                      Tvůj mozek lépe ví KDY a JAK má jednat.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="habitName">
                    Název návyku <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="habitName"
                    placeholder="např. Pít vodu ráno"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                  />
                </div>

                <Card className="bg-yellow-50 dark:bg-yellow-950/10 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-600" />
                      IF-THEN Plán (+65% úspěšnost)
                    </p>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="trigger" className="text-xs">
                          1. Kdy? (Trigger)
                        </Label>
                        <Input
                          id="trigger"
                          placeholder="Když vstanu..."
                          value={trigger}
                          onChange={(e) => setTrigger(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="action" className="text-xs">
                          2. Co? (Akce) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="action"
                          placeholder="Vypiju sklenici vody..."
                          value={action}
                          onChange={(e) => setAction(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="context" className="text-xs">
                          3. Kde? (Kontext - volitelné)
                        </Label>
                        <Input
                          id="context"
                          placeholder="V kuchyni..."
                          value={context}
                          onChange={(e) => setContext(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <Label className="text-xs">Ikona (volitelné)</Label>
                  <div className="flex gap-2 mt-2">
                    {["🎯", "💧", "📚", "🧘", "🏃", "🥗", "💪", "☀️"].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setIcon(emoji)}
                        className={`w-10 h-10 text-2xl rounded-lg border-2 transition-colors ${
                          icon === emoji
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold">{habitName || "Název návyku"}</h3>
                        <p className="text-sm text-muted-foreground">Tvůj první návyk</p>
                      </div>
                    </div>

                    {(trigger || action || context) && (
                      <div className="space-y-2 p-4 rounded-lg bg-muted">
                        <p className="font-medium text-sm flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-yellow-600" />
                          IF-THEN Plán:
                        </p>
                        <div className="text-sm space-y-1">
                          {trigger && (
                            <p>
                              <span className="text-muted-foreground">Když:</span>{" "}
                              <span className="font-medium">{trigger}</span>
                            </p>
                          )}
                          {action && (
                            <p>
                              <span className="text-muted-foreground">Pak:</span>{" "}
                              <span className="font-medium">{action}</span>
                            </p>
                          )}
                          {context && (
                            <p>
                              <span className="text-muted-foreground">Kde:</span>{" "}
                              <span className="font-medium">{context}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">Co se stane po vytvoření:</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>✅ Návyk se objeví v dashboardu</li>
                          <li>✅ Začne se sledovat tvůj pokrok</li>
                          <li>✅ Uvidíš vědecké metriky (66-day timeline, Habit Strength)</li>
                          <li>✅ Dostaneš podporu při Extinction Burst</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between pt-4 border-t">
          {step > 1 && step < 4 && (
            <Button variant="outline" onClick={handlePrevious} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zpět
            </Button>
          )}
          {step < 4 && <div />}

          {step < 3 && (
            <Button onClick={handleNext}>
              Další
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}

          {step === 3 && (
            <Button onClick={handleNext} disabled={!habitName || !action}>
              Pokračovat
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}

          {step === 4 && (
            <Button
              onClick={handleCreateHabit}
              disabled={!habitName || !action || createHabit.isPending}
              className="w-full"
            >
              {createHabit.isPending ? (
                "Vytvářím..."
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Vytvořit první návyk
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
