"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function NeuroplasticityGuide() {
  return (
    <Card className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
          <Brain className="h-5 w-5" />
          66denní Neuroplasticita
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="space-y-2">
          <p className="font-semibold text-purple-900 dark:text-purple-100">
            Tvůj mozek se FYZICKY mění každý den
          </p>
          <p className="text-purple-800 dark:text-purple-200">
            21 dní je <strong>mýtus!</strong> Skutečný průměr je 66 dní podle studie Lally et al.
            (2010). Rozsah: 18-254 dní v závislosti na složitosti návyku.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-purple-900 dark:text-purple-100 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />4 fáze neuroplasticity:
          </p>

          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border-l-4 border-red-400">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="outline"
                  className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
                >
                  Fáze 1
                </Badge>
                <span className="font-medium text-purple-900 dark:text-purple-100">Dny 1-21</span>
              </div>
              <p className="text-xs text-purple-800 dark:text-purple-200 font-semibold mb-1">
                Budování nových neuronových drah
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Nejtěžší fáze! Váš mozek vytváří úplně nová spojení. Vyžaduje vědomou pozornost.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border-l-4 border-orange-400">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="outline"
                  className="bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300"
                >
                  Fáze 2
                </Badge>
                <span className="font-medium text-purple-900 dark:text-purple-100">Dny 22-42</span>
              </div>
              <p className="text-xs text-purple-800 dark:text-purple-200 font-semibold mb-1">
                Zesilování spojení
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Synapse sílí. Mělo by to být snazší než na začátku, ale stále vyžaduje úsilí.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="outline"
                  className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                >
                  Fáze 3
                </Badge>
                <span className="font-medium text-purple-900 dark:text-purple-100">Dny 43-66</span>
              </div>
              <p className="text-xs text-purple-800 dark:text-purple-200 font-semibold mb-1">
                Blíží se automatičnost
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Skoro tam! Návyk se stává součástí rutiny. Vyžaduje méně vědomého úsilí.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border-l-4 border-green-400">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="outline"
                  className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                >
                  Fáze 4
                </Badge>
                <span className="font-medium text-purple-900 dark:text-purple-100">Den 67+</span>
              </div>
              <p className="text-xs text-purple-800 dark:text-purple-200 font-semibold mb-1">
                Návyk integrován
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Gratulujeme! Toto je nyní součást toho, kým jste. Minimální úsilí potřeba.
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800">
          <p className="text-xs text-purple-800 dark:text-purple-200 mb-2">
            💡 <strong>Buďte trpěliví sami se sebou</strong> - je to biologický proces!
          </p>
          <p className="text-xs text-purple-700 dark:text-purple-300">
            Pokud to nejde hned, není nic špatně s vámi. Je to normální část přestavby mozku.
          </p>
        </div>

        <div className="pt-3 border-t border-purple-200 dark:border-purple-800">
          <p className="text-xs text-purple-700 dark:text-purple-300">
            📚 Lally et al. (2010), European Journal of Social Psychology
          </p>
          <Link
            href="/help/neuroplasticity"
            className="text-xs text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1 mt-1"
          >
            Kompletní vysvětlení →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
