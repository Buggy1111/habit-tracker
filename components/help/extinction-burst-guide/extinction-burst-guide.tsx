"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, AlertTriangle, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function ExtinctionBurstGuide() {
  return (
    <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
          <Zap className="h-5 w-5" />
          Extinction Burst
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-start gap-2 p-3 rounded-lg bg-white dark:bg-slate-900 border-2 border-orange-400">
          <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-bold text-lg text-orange-900 dark:text-orange-100">
              TO JE NORMÁLNÍ! 🙌
            </p>
            <p className="text-orange-800 dark:text-orange-200">
              Skvělá série, pak náhle těžkosti? <strong>Neznamená to neúspěch!</strong>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-orange-900 dark:text-orange-100">
            Co je to extinction burst?
          </p>
          <p className="text-orange-800 dark:text-orange-200">
            Když váš mozek "testuje", jestli je nový návyk opravdu nutný. Objevuje se typicky po 3-4
            týdnech silné série.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-800">
          <p className="font-medium text-orange-900 dark:text-orange-100 mb-2">
            Jak poznám extinction burst?
          </p>
          <div className="space-y-2 text-xs text-orange-800 dark:text-orange-200">
            <div className="flex items-start gap-2">
              <span className="text-orange-600">1.</span>
              <span>Měli jste silnou sérii (70%+ úspěšnost posledních 14 dní)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600">2.</span>
              <span>Náhle klesla úspěšnost (pod 50% v posledních 14 dnech)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600">3.</span>
              <span>Pokles větší než 30 procentních bodů</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-orange-900 dark:text-orange-100">Proč se to děje?</p>
          <p className="text-orange-800 dark:text-orange-200">
            Váš mozek je efektivní. Po ~3-4 týdnech kontroluje: "Opravdu potřebujeme toto nové
            chování?" Tento dočasný odpor je <strong>znamením</strong>, že děláte skutečnou změnu!
          </p>
          <Badge
            variant="outline"
            className="bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300"
          >
            24-36% lidí to zažívá
          </Badge>
        </div>

        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-orange-600" />
            <p className="font-medium text-orange-900 dark:text-orange-100">Co dělat:</p>
          </div>
          <ul className="space-y-1 text-xs text-orange-800 dark:text-orange-200 ml-4 list-disc">
            <li>
              <strong>Nevzdávejte se!</strong> Toto je očekávané
            </li>
            <li>Použijte WOOP k plánování překážek</li>
            <li>Praktikujte sebeúctu - jste člověk</li>
            <li>Připomeňte si, proč jste začali</li>
            <li>Snižte náročnost dočasně (místo 30 minut → 5 minut)</li>
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-950/50 dark:to-yellow-950/50 border border-orange-300 dark:border-orange-700">
          <p className="text-xs text-orange-900 dark:text-orange-100 font-semibold mb-1">
            ⭐ Důležité:
          </p>
          <p className="text-xs text-orange-800 dark:text-orange-200">
            Překonejte extinction burst a budete <strong>silnější než kdy předtím</strong>! Toto je
            poslední test před plnou automatizací.
          </p>
        </div>

        <div className="pt-3 border-t border-orange-200 dark:border-orange-800">
          <p className="text-xs text-orange-700 dark:text-orange-300">
            📚 Behavioral Psychology, Habit Formation Research
          </p>
          <Link
            href="/help/extinction-burst"
            className="text-xs text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1 mt-1"
          >
            Kompletní vysvětlení a strategie →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
