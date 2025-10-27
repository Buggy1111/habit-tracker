"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function WoopGuide() {
  return (
    <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
          <Sparkles className="h-5 w-5" />
          WOOP Metoda
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="space-y-2">
          <p className="font-semibold text-blue-900 dark:text-blue-100">
            4-krokový mentální nástroj, který zdvojnásobuje úspěšnost! 🎯
          </p>
          <p className="text-blue-800 dark:text-blue-200">
            WOOP je vědecky podložená technika stanovování cílů od Gabriele Oettingen. Na rozdíl od
            samotného pozitivního myšlení vás WOOP připraví na skutečné překážky.
          </p>
          <Badge
            variant="outline"
            className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
          >
            2× vyšší pravděpodobnost dosažení cílů
          </Badge>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
            <Target className="h-4 w-4" />4 kroky WOOP:
          </p>

          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-yellow-500 text-white">W</Badge>
                <span className="font-semibold text-blue-900 dark:text-blue-100">Wish (Přání)</span>
              </div>
              <p className="text-xs text-blue-800 dark:text-blue-200 mb-1">
                Co chcete tímto návykem dosáhnout?
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 italic">
                Příklad: "Chci se stát pravidelným čtenářem a rozšířit své znalosti."
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border-l-4 border-green-400">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-green-500 text-white">O</Badge>
                <span className="font-semibold text-blue-900 dark:text-blue-100">
                  Outcome (Výsledek)
                </span>
              </div>
              <p className="text-xs text-blue-800 dark:text-blue-200 mb-1">
                Jak se budete cítit, když toho dosáhnete?
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 italic">
                Příklad: "Budu se cítit vzdělaný, klidný a hrdý na učení nových věcí."
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border-l-4 border-orange-400">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-orange-500 text-white">O</Badge>
                <span className="font-semibold text-blue-900 dark:text-blue-100">
                  Obstacle (Překážka)
                </span>
              </div>
              <p className="text-xs text-blue-800 dark:text-blue-200 mb-1">
                Co vám může zabránit v úspěchu? Buďte upřímní.
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 italic">
                Příklad: "Mohl bych být večer příliš unavený nebo rozptýlený telefonem."
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-blue-500 text-white">P</Badge>
                <span className="font-semibold text-blue-900 dark:text-blue-100">Plan (Plán)</span>
              </div>
              <p className="text-xs text-blue-800 dark:text-blue-200 mb-1">
                Co uděláte, když narazíte na překážku? (IF-THEN formát)
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 italic">
                Příklad: "Když se budu cítit unavený, pak si přečtu jen 1 stránku místo
                scrollování."
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-300 dark:border-blue-700">
          <p className="text-xs text-blue-900 dark:text-blue-100 font-semibold mb-1">
            💡 Proč WOOP funguje:
          </p>
          <p className="text-xs text-blue-800 dark:text-blue-200">
            Kombinuje pozitivní vizualizaci (W+O) s realistickým plánováním (O+P). Tato "mentální
            kontrastace" připraví váš mozek na skutečné výzvy.
          </p>
        </div>

        <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            📚 Gabriele Oettingen (2014) - Rethinking Positive Thinking
          </p>
          <Link
            href="/help/woop"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 mt-1"
          >
            Kompletní průvodce WOOP metodou →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
