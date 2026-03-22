import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function DefinitionsSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">1. Základní pojmy</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-3">
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            <strong>Služba:</strong> Webová aplikace Science-Based Habit Tracker dostupná na
            doméně habit-tracker.cz
          </li>
          <li>
            <strong>Provozovatel:</strong> Science-Based Habit Tracker (IČO: [doplnit před
            spuštěním])
          </li>
          <li>
            <strong>Uživatel:</strong> Fyzická nebo právnická osoba, která se zaregistrovala a
            používá službu
          </li>
          <li>
            <strong>Účet:</strong> Přístupový profil uživatele chráněný heslem
          </li>
          <li>
            <strong>Free tier:</strong> Bezplatná verze služby s omezenými funkcemi
          </li>
          <li>
            <strong>Premium:</strong> Placená verze služby s plným přístupem ke všem funkcím
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export function ServiceDescription() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">2. Popis služby</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <p>
          Science-Based Habit Tracker je webová aplikace pro sledování návyků, která využívá
          vědecky podložené metody:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Implementation Intentions (IF-THEN pravidla) - Gollwitzer (1999)</li>
          <li>66-denní neuroplastický timeline - Lally et al. (2010)</li>
          <li>Detekce extinction burst - behaviorální psychologie</li>
          <li>WOOP metoda - Gabriele Oettingen</li>
          <li>Integrace CBT (kognitivně-behaviorální terapie) - Aaron Beck</li>
          <li>Identity-based habits - James Clear</li>
        </ul>

        <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
          <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            Free tier (zdarma)
          </h4>
          <ul className="text-sm space-y-1 pl-4">
            <li>• 5 aktivních návyků</li>
            <li>• Základní implementation intentions</li>
            <li>• Kalendářový view</li>
            <li>• Denní check-in</li>
            <li>• Habit Strength Score</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            Premium (120 Kč/měsíc)
          </h4>
          <ul className="text-sm space-y-1 pl-4">
            <li>• Neomezený počet návyků</li>
            <li>• Plný implementation intentions builder (šablony)</li>
            <li>• Identity designer + milníky</li>
            <li>• WOOP metoda (průvodce)</li>
            <li>• 66-denní neuroplastický tracking</li>
            <li>• CBT thought challenging</li>
            <li>• Habit stacking</li>
            <li>• Detekce extinction burst + podpora</li>
            <li>• Pokročilá analytika</li>
            <li>• Export dat (CSV, JSON, PDF)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
