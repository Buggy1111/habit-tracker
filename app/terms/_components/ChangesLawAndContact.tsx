import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"

export function ChangesToTerms() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">9. Změny VOP</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-3">
        <p>
          Můžeme tyto VOP aktualizovat. O významných změnách vás budeme informovat e-mailem
          minimálně <strong>30 dní předem</strong>.
        </p>
        <p>
          Pokud se změnou nesouhlasíte, můžete účet smazat. Pokračováním v používání služby
          souhlasíte s novými VOP.
        </p>
        <p className="text-sm text-slate-400">
          Datum poslední aktualizace je vždy uvedeno nahoře této stránky.
        </p>
      </CardContent>
    </Card>
  )
}

export function GoverningLaw() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">10. Rozhodné právo a řešení sporů</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <div>
          <h3 className="font-semibold text-white mb-2">10.1 Rozhodné právo:</h3>
          <p>
            Tyto VOP se řídí <strong>právem České republiky</strong>. Spotřebitelé mají práva
            podle zákona č. 89/2012 Sb., občanský zákoník.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">10.2 Řešení sporů:</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              Nejprve se pokusíme vyřešit spor mimosoudně (kontaktujte{" "}
              <a
                href="mailto:support@habit-tracker.cz"
                className="text-indigo-400 hover:underline"
              >
                support@habit-tracker.cz
              </a>
              )
            </li>
            <li>
              Spotřebitelé mohou podat stížnost u{" "}
              <a
                href="https://www.coi.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                České obchodní inspekce (ČOI)
              </a>
            </li>
            <li>
              Platforma pro řešení sporů online (ODR):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
            </li>
            <li>Soudní spory: Příslušný soud dle sídla provozovatele</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export function TermsContact() {
  return (
    <Card className="mb-6 bg-indigo-500/10 border-indigo-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-400" />
          Kontakt
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300">
        <p className="mb-4">Máte otázku ohledně těchto podmínek? Kontaktujte nás:</p>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@habit-tracker.cz"
              className="text-indigo-400 hover:underline"
            >
              support@habit-tracker.cz
            </a>
          </p>
          <p>
            <strong>Právní dotazy:</strong>{" "}
            <a
              href="mailto:legal@habit-tracker.cz"
              className="text-indigo-400 hover:underline"
            >
              legal@habit-tracker.cz
            </a>
          </p>
          <p>
            <strong>Odpověď do:</strong> 7 pracovních dnů
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function TermsFooter() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
      <Link href="/">
        <Button variant="outline" className="min-w-[200px]">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zpět na hlavní stránku
        </Button>
      </Link>
      <Link href="/privacy">
        <Button variant="ghost" className="min-w-[200px] text-slate-300">
          Zásady ochrany údajů
        </Button>
      </Link>
    </div>
  )
}
