"use client"

import { Target, Sparkles, CheckCircle2, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HabitsEmptyStateProps {
  onCreateHabit: () => void
}

export function HabitsEmptyState({ onCreateHabit }: HabitsEmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-3xl w-full border-2 border-dashed">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">
            Ještě nemáš žádné návyky! 🎯
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Návyky jsou malé akce, které děláš pravidelně, a které časem změní tvůj život. Pojďme vytvořit tvůj první!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* What is a habit */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Co je to návyk?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                <strong>Návyk</strong> je akce, kterou opakuješ tak často, až se stane automatickou. Příklady:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Vypít sklenici vody každé ráno</li>
                <li>Udělat 10 kliků po práci</li>
                <li>Číst 10 stran knihy před spaním</li>
                <li>Meditovat 5 minut po probuzení</li>
              </ul>
            </CardContent>
          </Card>

          {/* How to get started */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Jak začít (3 jednoduché kroky):
            </h3>
            <div className="space-y-3">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Vyber si JEDNU věc</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Začni s 1 návykem, ne s 10! Až bude automatický (66 dní), přidej další.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Udělej to MALÉ</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Místo "Budu cvičit hodinu" zkus "Udělám 10 kliků". Malé kroky = větší úspěch!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Vytvoř IF-THEN plán</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "Když [situace], pak [akce] v [místo]" - toto zvýší úspěšnost o 65%!
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
              className="flex-1 text-base"
              onClick={onCreateHabit}
            >
              <Target className="mr-2 h-5 w-5" />
              Vytvořit první návyk
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/help/getting-started" className="flex-1">
              <Button size="lg" variant="outline" className="w-full text-base">
                📚 Přečíst kompletní průvodce
              </Button>
            </Link>
          </div>

          {/* Quick Tips */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-sm">
              <p className="font-medium mb-2">💡 Pro tip:</p>
              <p className="text-muted-foreground">
                Aplikace automaticky sleduje <strong>Sílu návyku</strong> (ne jen streak), <strong>66denní neuroplastickou fázi</strong> tvého mozku, a varuje tě před <strong>Extinction Burstem</strong> (normální pokles kolem 3. týdne). To vše založeno na vědeckém výzkumu! 🧠
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
