"use client"

import { Sparkles, Target, Brain, ArrowRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface WoopEmptyStateProps {
  onCreateWoop: () => void
}

export function WoopEmptyState({ onCreateWoop }: WoopEmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-3xl w-full border-2 border-dashed">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Zatím žádné WOOP plány! ✨</CardTitle>
          <CardDescription className="text-base mt-2">
            WOOP metoda zdvojnásobí tvou šanci na úspěch tím, že tě předem připraví na překážky.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* What is WOOP */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                Co je WOOP?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                <strong>WOOP</strong> je vědecky ověřená metoda od psycholožky Gabriele Oettingen.
                Pomáhá ti dosáhnout cílů pomocí 4 kroků:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="p-3 rounded-lg bg-white dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
                  <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                    <strong>W</strong> - Wish (Přání)
                  </div>
                  <p className="text-xs text-muted-foreground">Co chceš dosáhnout?</p>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
                  <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                    <strong>O</strong> - Outcome (Výsledek)
                  </div>
                  <p className="text-xs text-muted-foreground">Jak se budeš cítit?</p>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
                  <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                    <strong>O</strong> - Obstacle (Překážka)
                  </div>
                  <p className="text-xs text-muted-foreground">Co ti může zabránit?</p>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
                  <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                    <strong>P</strong> - Plan (Plán)
                  </div>
                  <p className="text-xs text-muted-foreground">Jak překážku překonáš?</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why it works */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Proč WOOP funguje tak dobře?
            </h3>
            <div className="space-y-3">
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Realistické plánování</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Místo jen pozitivního myšlení (které často selhává) tě WOOP připraví na
                        reálné překážky.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Mental Contrasting</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Kombinace pozitivního výsledku + reálné překážky vytvoří v mozku silnější
                        motivaci.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">IF-THEN plánování</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "Když narazím na [překážku], pak [udělám plán]" - automatická reakce při
                        problémech!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              size="lg"
              className="flex-1 text-base bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={onCreateWoop}
            >
              <Target className="mr-2 h-5 w-5" />
              Vytvořit WOOP plán
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/help/woop" className="flex-1">
              <Button size="lg" variant="outline" className="w-full text-base">
                📚 Více o WOOP metodě
              </Button>
            </Link>
          </div>

          {/* Research */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-sm">
              <p className="font-medium mb-2">🔬 Vědecký základ:</p>
              <p className="text-muted-foreground">
                <strong>Dr. Gabriele Oettingen (NYU):</strong> Výzkumy ukázaly, že WOOP metoda
                zdvojnásobila úspěšnost dosahování cílů (2x více aktivity) oproti pouhému
                pozitivnímu myšlení.
                <br />
                <strong>93+ recenzovaných studií</strong> potvrzuje účinnost mental contrasting +
                implementation intentions.
              </p>
            </CardContent>
          </Card>

          {/* Example */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">💡 Příklad WOOP plánu</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                <strong>Wish:</strong> Chci běhat 3x týdně
              </p>
              <p>
                <strong>Outcome:</strong> Budu se cítit energičtější a zdravější
              </p>
              <p>
                <strong>Obstacle:</strong> Po práci jsem unavený a nechce se mi
              </p>
              <p>
                <strong>Plan:</strong> Když budu unavený po práci, obléknu si běžecké oblečení hned
                jak přijdu domů (před tím, než si sednu)
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
