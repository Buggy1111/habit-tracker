import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"

export function CookiesSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">8. Cookies</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <div>
          <h3 className="font-semibold text-white mb-2">
            8.1 Nezbytné cookies (nelze odmítnout):
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li>
              <code className="bg-slate-800 px-2 py-1 rounded">authjs.session-token</code> -
              Uchování přihlášení (30 dní)
            </li>
            <li>
              <code className="bg-slate-800 px-2 py-1 rounded">authjs.csrf-token</code> - CSRF
              ochrana (session)
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">
            8.2 Analytické cookies (vyžadují souhlas):
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li>
              <code className="bg-slate-800 px-2 py-1 rounded">_ga</code> - Google Analytics
              (pokud povolíte)
            </li>
            <li>Můžete kdykoliv odvolat v Nastavení → Cookies</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export function ChildrenSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">9. Děti</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300">
        <p>
          Služba je určena osobám starším <strong>16 let</strong>. Pokud je uživatel mladší 16
          let, je vyžadován souhlas zákonného zástupce. Pokud zjistíme účet dítěte bez
          souhlasu, účet smažeme.
        </p>
      </CardContent>
    </Card>
  )
}

export function PolicyChangesSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">10. Změny zásad</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300">
        <p>
          Tyto zásady můžeme aktualizovat. O významných změnách vás budeme informovat e-mailem
          minimálně <strong>30 dní</strong> předem. Datum poslední aktualizace je vždy uvedeno
          nahoře.
        </p>
      </CardContent>
    </Card>
  )
}

export function PrivacyContact() {
  return (
    <Card className="mb-6 bg-indigo-500/10 border-indigo-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-400" />
          Kontakt
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300">
        <p className="mb-4">Máte otázku ohledně ochrany osobních údajů? Kontaktujte nás:</p>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:privacy@habit-tracker.cz"
              className="text-indigo-400 hover:underline"
            >
              privacy@habit-tracker.cz
            </a>
          </p>
          <p>
            <strong>Odpověď do:</strong> 30 dnů (lhůta dle GDPR)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function PrivacyFooter() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
      <Link href="/">
        <Button variant="outline" className="min-w-[200px]">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zpět na hlavní stránku
        </Button>
      </Link>
      <Link href="/terms">
        <Button variant="ghost" className="min-w-[200px] text-slate-300">
          Smluvní podmínky
        </Button>
      </Link>
    </div>
  )
}
