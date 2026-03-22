import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"

export function ControllerSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">1. Správce osobních údajů</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <p>
          <strong>Správce:</strong> Science-Based Habit Tracker
          <br />
          <strong>Kontakt:</strong>{" "}
          <a
            href="mailto:privacy@habit-tracker.cz"
            className="text-indigo-400 hover:underline"
          >
            privacy@habit-tracker.cz
          </a>
        </p>
        <p className="text-sm text-slate-400">
          Poznámka: Před uvedením do provozu doplňte IČO, adresu sídla a případně pověřence
          pro ochranu osobních údajů (DPO), pokud je vyžadován.
        </p>
      </CardContent>
    </Card>
  )
}

export function DataCollectionSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-400" />
          2. Jaké osobní údaje shromažďujeme
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <div>
          <h3 className="font-semibold text-white mb-2">2.1 Údaje poskytnuté přímo vámi:</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>Registrační údaje:</strong> E-mailová adresa, jméno (volitelné), heslo
              (hashované pomocí bcrypt)
            </li>
            <li>
              <strong>Návyky a logy:</strong> Názvy návyků, popisy, ikony, barvy, data
              dokončení, streaky, poznámky
            </li>
            <li>
              <strong>Identity:</strong> Názvy identit, milníky, propojení s návyky
            </li>
            <li>
              <strong>WOOP plány:</strong> Přání, výsledky, překážky, plány (dobrovolné)
            </li>
            <li>
              <strong>CBT záznamy:</strong> Myšlenky, přesvědčení, důkazy (dobrovolné)
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">
            2.2 Údaje shromažďované automaticky:
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>Technické údaje:</strong> IP adresa, typ prohlížeče, operační systém
            </li>
            <li>
              <strong>Cookies:</strong> Session cookies (NextAuth.js), analytics cookies
              (pokud povolíte)
            </li>
            <li>
              <strong>Log data:</strong> Datum a čas přístupu, URL stránky, chybové logy
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
