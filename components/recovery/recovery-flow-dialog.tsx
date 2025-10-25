"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Brain, Target, MessageSquare, Heart, CheckCircle2, ArrowRight } from "lucide-react"
import { SelfCompassionPrompt } from "./self-compassion-prompt"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface RecoveryFlowDialogProps {
  isOpen: boolean
  onClose: () => void
  habitId: string
  habitName: string
}

export function RecoveryFlowDialog({
  isOpen,
  onClose,
  habitId,
  habitName,
}: RecoveryFlowDialogProps) {
  const [activeTab, setActiveTab] = useState("education")
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [selfCompassionNote, setSelfCompassionNote] = useState("")

  const handleComplete = async () => {
    try {
      // Save recovery completion to API
      await fetch(`/api/habits/${habitId}/recovery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selfCompassionNote,
        }),
      })

      toast.success("Recovery flow dokončen! Jsi zpět na správné cestě. 💪")
      onClose()
    } catch {
      toast.error("Chyba při ukládání")
    }
  }

  const markStepComplete = (step: string) => {
    setCompletedSteps((prev) => new Set(prev).add(step))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Recovery Flow: {habitName}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Guided recovery pro extinction burst - založeno na výzkumu
          </p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="education" className="gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Proč</span>
              {completedSteps.has("education") && (
                <CheckCircle2 className="h-3 w-3 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="woop" className="gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">WOOP</span>
              {completedSteps.has("woop") && <CheckCircle2 className="h-3 w-3 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="thoughts" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Myšlenky</span>
              {completedSteps.has("thoughts") && (
                <CheckCircle2 className="h-3 w-3 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="compassion" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Soucit</span>
              {completedSteps.has("compassion") && (
                <CheckCircle2 className="h-3 w-3 text-green-500" />
              )}
            </TabsTrigger>
          </TabsList>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-4 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Co se děje ve tvém mozku</h3>
              </div>

              <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200/50">
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Proč to dělá 24-36% lidí?</h4>
                  <p className="text-sm leading-relaxed">
                    Tvůj mozek prochází fází <strong>&ldquo;extinction burst&rdquo;</strong> -
                    behaviorální fenomén známý z výzkumu. Funguje to takhle:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                    <li>
                      Budoval jsi nové <strong>neuronové spojení</strong> (nový návyk)
                    </li>
                    <li>
                      Po ~3-4 týdnech se mozek <strong>&ldquo;ptá&rdquo;</strong>: &ldquo;Opravdu to
                      potřebujeme?&rdquo;
                    </li>
                    <li>
                      Testuje tě - zvyšuje odpor, dělá to <strong>těžší než bylo</strong>
                    </li>
                    <li>
                      Pokud vytrvíš, mozek přijme: &ldquo;OK, tohle je{" "}
                      <strong>nová normalita</strong>&rdquo;
                    </li>
                  </ol>
                </div>
              </Card>

              <Card className="p-6 bg-green-50/50 dark:bg-green-950/20 border-green-200/50">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-900 dark:text-green-100">
                      Tohle je vlastně DOBRÝ SIGNÁL!
                    </h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Výzkum ukazuje že extinction burst se často děje <strong>TĚSNĚ PŘED</strong>{" "}
                      tím, než se návyk stane automatickým. Jsi blízko! Tohle je finální test.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="p-4 rounded-lg bg-muted/50 border text-sm">
                <p className="text-muted-foreground">
                  <strong>Research:</strong> Behavioral psychology studies show extinction bursts
                  occur in 24-36% of behavior change attempts, typically around week 4-8. Those who
                  persist through this phase have 70%+ success rate for long-term habit adoption.
                </p>
              </div>

              <Button
                onClick={() => {
                  markStepComplete("education")
                  setActiveTab("woop")
                }}
                className="w-full gap-2"
                size="lg"
              >
                Rozumím - Další krok: Plánování překážek
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </TabsContent>

          {/* WOOP Tab */}
          <TabsContent value="woop" className="space-y-4 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">WOOP: Naplánuj překážky</h3>
                <p className="text-sm text-muted-foreground">
                  Gabriele Oettingen - 2x vyšší úspěšnost
                </p>
              </div>
            </div>

            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                WOOP metoda pomáhá anticipovat překážky a naplánovat IF-THEN reakce. To
                zdvojnásobuje šanci na úspěch podle výzkumu.
              </p>
              <div className="text-center text-muted-foreground py-8">
                <p className="text-sm mb-2">WOOP formulář zde bude implementován</p>
                <p className="text-xs">(Použije existující WOOP komponentu)</p>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setActiveTab("education")}>
                Zpět
              </Button>
              <Button
                onClick={() => {
                  markStepComplete("woop")
                  setActiveTab("thoughts")
                }}
                className="flex-1 gap-2"
              >
                Další: Challenge myšlenky
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Thoughts Tab */}
          <TabsContent value="thoughts" className="space-y-4 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Challenge negativní myšlenky</h3>
                <p className="text-sm text-muted-foreground">CBT Technique - Aaron Beck</p>
              </div>
            </div>

            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Identifikuj a vyvrať automatické negativní myšlenky pomocí ABC modelu z CBT.
              </p>
              <div className="text-center text-muted-foreground py-8">
                <p className="text-sm mb-2">Thought Challenge formulář zde bude implementován</p>
                <p className="text-xs">(Integruje s ThoughtRecord modelem)</p>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setActiveTab("woop")}>
                Zpět
              </Button>
              <Button
                onClick={() => {
                  markStepComplete("thoughts")
                  setActiveTab("compassion")
                }}
                className="flex-1 gap-2"
              >
                Další: Self-Compassion
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Compassion Tab */}
          <TabsContent value="compassion" className="space-y-4 mt-6">
            <SelfCompassionPrompt
              onComplete={(note) => {
                setSelfCompassionNote(note)
                markStepComplete("compassion")
                handleComplete()
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
