import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText } from "lucide-react"

export function TermsHeader() {
  return (
    <>
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4 text-slate-300 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zpět na hlavní stránku
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-10 h-10 text-indigo-400" />
          <h1 className="text-4xl font-bold text-white">Všeobecné obchodní podmínky</h1>
        </div>
        <p className="text-slate-300 text-lg">
          Poslední aktualizace: {new Date().toLocaleDateString("cs-CZ")}
        </p>
        <p className="text-slate-400 mt-2">
          Platnost: od {new Date().toLocaleDateString("cs-CZ")}
        </p>
      </div>

      {/* Introduction */}
      <Card className="mb-6 bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Úvod</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-4">
          <p>
            Vítejte v Science-Based Habit Tracker. Tyto všeobecné obchodní podmínky (dále jen
            &quot;VOP&quot;) upravují vztah mezi provozovatelem služby a uživateli.
          </p>
          <p>
            <strong>Používáním služby souhlasíte s těmito podmínkami.</strong> Pokud
            nesouhlasíte, službu nepoužívejte.
          </p>
        </CardContent>
      </Card>
    </>
  )
}
