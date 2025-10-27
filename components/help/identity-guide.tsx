"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function IdentityGuide() {
  return (
    <Card className="border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-pink-900 dark:text-pink-100">
          <Users className="h-5 w-5" />
          Identity-Based Habits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="space-y-2">
          <p className="font-semibold text-pink-900 dark:text-pink-100">
            Nejlepší způsob, jak změnit návyky, je změnit, kým jste. 🎯
          </p>
          <p className="text-pink-800 dark:text-pink-200">
            James Clear: "Nejvyšší forma vnitřní motivace je, když se návyk stane součástí vaší
            identity."
          </p>
        </div>

        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-800">
          <p className="font-medium text-pink-900 dark:text-pink-100 mb-3">Změňte perspektivu:</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge
                variant="outline"
                className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700 flex-shrink-0"
              >
                ❌
              </Badge>
              <div>
                <p className="text-xs font-medium text-pink-900 dark:text-pink-100">
                  Založeno na cílech
                </p>
                <p className="text-xs text-pink-700 dark:text-pink-300">"Chci běhat každý den"</p>
                <p className="text-xs text-pink-600 dark:text-pink-400 italic">
                  → Extrinsic motivace, krátkodobá
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge
                variant="outline"
                className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 flex-shrink-0"
              >
                ✅
              </Badge>
              <div>
                <p className="text-xs font-medium text-pink-900 dark:text-pink-100">
                  Založeno na identitě
                </p>
                <p className="text-xs text-pink-700 dark:text-pink-300">"Jsem běžec"</p>
                <p className="text-xs text-pink-600 dark:text-pink-400 italic">
                  → Intrinsic motivace, dlouhodobá
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-pink-900 dark:text-pink-100 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Proč identity fungují:
          </p>
          <ul className="space-y-1 text-xs text-pink-800 dark:text-pink-200 ml-4 list-disc">
            <li>
              <strong>Vyšší motivace</strong> - jde o to, kým jste, ne co děláte
            </li>
            <li>
              <strong>Lepší konzistence</strong> - "běžci běhají" i když se jim nechce
            </li>
            <li>
              <strong>Dlouhodobější úspěch</strong> - stává se to součástí vás
            </li>
            <li>
              <strong>Sebe-posilující</strong> - každý návyk je hlas pro novou identitu
            </li>
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-800">
          <p className="font-medium text-pink-900 dark:text-pink-100 mb-2">Příklady identit:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-pink-100 dark:bg-pink-950/50">
              <p className="font-semibold text-pink-900 dark:text-pink-100">Jsem běžec</p>
              <p className="text-pink-700 dark:text-pink-300">→ Běhám každé ráno</p>
            </div>
            <div className="p-2 rounded bg-pink-100 dark:bg-pink-950/50">
              <p className="font-semibold text-pink-900 dark:text-pink-100">Jsem čtenář</p>
              <p className="text-pink-700 dark:text-pink-300">→ Čtu před spaním</p>
            </div>
            <div className="p-2 rounded bg-pink-100 dark:bg-pink-950/50">
              <p className="font-semibold text-pink-900 dark:text-pink-100">Jsem zdravý člověk</p>
              <p className="text-pink-700 dark:text-pink-300">→ Jím zeleninu denně</p>
            </div>
            <div className="p-2 rounded bg-pink-100 dark:bg-pink-950/50">
              <p className="font-semibold text-pink-900 dark:text-pink-100">Jsem writer</p>
              <p className="text-pink-700 dark:text-pink-300">→ Píšu každé ráno</p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/50 dark:to-purple-950/50 border border-pink-300 dark:border-pink-700">
          <p className="text-xs text-pink-900 dark:text-pink-100 font-semibold mb-1">
            💭 Klíčová otázka:
          </p>
          <p className="text-xs text-pink-800 dark:text-pink-200">
            "Kým chci být?" je silnější než "Co chci udělat?"
          </p>
        </div>

        <div className="pt-3 border-t border-pink-200 dark:border-pink-800">
          <p className="text-xs text-pink-700 dark:text-pink-300">
            📚 James Clear (2018) - Atomic Habits
          </p>
          <Link
            href="/help/identity"
            className="text-xs text-pink-600 dark:text-pink-400 hover:underline inline-flex items-center gap-1 mt-1"
          >
            Kompletní průvodce identity-based návyky →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
