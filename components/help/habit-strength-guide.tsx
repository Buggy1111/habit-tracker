"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function HabitStrengthGuide() {
  return (
    <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
          <TrendingUp className="h-5 w-5" />
          Habit Strength Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-green-900 dark:text-green-100">
              To NENÍ prostý počet dnů v sérii!
            </p>
            <p className="text-green-800 dark:text-green-200">
              Používáme exponenciální váhy - nedávné dny počítají víc než staré. Občasné selhání tě
              nezničí!
            </p>
          </div>
        </div>

        <div className="space-y-2 p-3 rounded-lg bg-white dark:bg-slate-900 border border-green-200 dark:border-green-800">
          <p className="font-medium text-green-900 dark:text-green-100">Jak to funguje:</p>
          <ul className="space-y-1 text-green-800 dark:text-green-200 ml-4 list-disc">
            <li>Každý den dostává váhu podle toho, jak je nedávný</li>
            <li>Včerejší den = nejvyšší váha</li>
            <li>Před měsícem = poloviční váha</li>
            <li>Odpuštění je zabudované do algoritmu</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-green-900 dark:text-green-100">Úrovně síly:</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700"
              >
                0-20
              </Badge>
              <span className="text-xs text-green-800 dark:text-green-200">Velmi slabý</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700"
              >
                21-40
              </Badge>
              <span className="text-xs text-green-800 dark:text-green-200">Slabý</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700"
              >
                41-60
              </Badge>
              <span className="text-xs text-green-800 dark:text-green-200">Střední</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700"
              >
                61-80
              </Badge>
              <span className="text-xs text-green-800 dark:text-green-200">Silný</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700"
              >
                81-90
              </Badge>
              <span className="text-xs text-green-800 dark:text-green-200">Velmi silný</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700"
              >
                91-100
              </Badge>
              <span className="text-xs text-green-800 dark:text-green-200">Extrémně silný</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-green-200 dark:border-green-800">
          <p className="text-xs text-green-700 dark:text-green-300">
            📚 Algoritmus z Loop Habit Tracker (open-source, vědecký)
          </p>
          <Link
            href="/help/habit-strength"
            className="text-xs text-green-600 dark:text-green-400 hover:underline inline-flex items-center gap-1 mt-1"
          >
            Kompletní vysvětlení →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
