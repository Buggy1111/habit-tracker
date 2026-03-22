import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export function Disclaimers() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">7. Odmítnutí odpovědnosti</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-2">Důležité upozornění</h4>
              <p className="text-sm mb-3">
                Science-Based Habit Tracker je nástroj pro osobní rozvoj, NENÍ lékařskou
                službou ani terapií.
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Nenahrazuje profesionální psychologickou nebo psychiatrickou pomoc</li>
                <li>
                  Pokud trpíte depresí, úzkostmi nebo jiným duševním onemocněním, vyhledejte
                  odborníka
                </li>
                <li>Algoritmy jsou založeny na výzkumu, ale nejsou medicínským zařízením</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">7.1 Záruka a dostupnost:</h3>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li>
              Služba je poskytována &quot;jak stojí a leží&quot; (AS IS) bez záruky 100%
              dostupnosti
            </li>
            <li>Cílíme na 99.9% uptime, ale garantovat nemůžeme</li>
            <li>Můžeme službu dočasně vypnout kvůli údržbě (oznamujeme 24h předem)</li>
            <li>
              Nejsme odpovědní za ztrátu dat způsobenou vis maior (přírodní katastrofy, válka,
              kyberútok)
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">7.2 Omezení odpovědnosti:</h3>
          <p className="text-sm">
            V maximální míře povolené zákonem nejsme odpovědní za žádné nepřímé škody (ztráta
            zisku, dat, důvěry). Naše celková odpovědnost je omezena na částku zaplacenou za
            službu v posledních 12 měsících.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function TerminationSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">8. Ukončení služby</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <div>
          <h3 className="font-semibold text-white mb-2">8.1 Vámi:</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Můžete kdykoli smazat účet v Nastavení → Smazat účet</li>
            <li>Data jsou trvale smazána do 30 dnů (GDPR backup)</li>
            <li>Pokud máte aktivní Premium, můžete požádat o poměrný refund</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">8.2 Námi:</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>S upozorněním:</strong> 2 roky nečinnosti → upozornění → 30 dní →
              smazání
            </li>
            <li>
              <strong>Okamžitě:</strong> Porušení VOP, podvod, zneužití služby
            </li>
            <li>
              <strong>Ukončení služby:</strong> Pokud se rozhodneme službu ukončit, dáme vědět
              90 dní předem + umožníme export dat
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
