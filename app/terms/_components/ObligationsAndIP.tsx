import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export function UserObligations() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">5. Povinnosti uživatele</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <div>
          <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            Povolené použití:
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Sledování vlastních návyků a osobního rozvoje</li>
            <li>Využívání vědeckých metod pro změnu chování</li>
            <li>Export vlastních dat pro osobní účely</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            Zakázané použití:
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4 text-red-200">
            <li>Vytváření falešných účtů nebo identit</li>
            <li>Automatizované scrapování dat (web scraping)</li>
            <li>Reverse engineering, dekompilace aplikace</li>
            <li>Zneužívání služby pro phishing, spam, malware</li>
            <li>Přetěžování serverů (DoS/DDoS útoky)</li>
            <li>Prodej nebo sdílení účtu třetím stranám</li>
            <li>Obcházení limitů Free tier (např. mazání/vytváření návyků)</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-1">Následky porušení</h4>
              <p className="text-sm">
                Porušení těchto pravidel vede k okamžitému zablokování účtu bez nároku na
                refund. Vážná porušení můžeme oznámit policii.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function IntellectualProperty() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">6. Duševní vlastnictví</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <div>
          <h3 className="font-semibold text-white mb-2">6.1 Naše práva:</h3>
          <p>
            Veškerý obsah služby (kód, design, texty, loga, grafika) je naše duševní
            vlastnictví. Nesmíte je kopírovat, distribuovat nebo upravovat bez našeho
            písemného souhlasu.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">6.2 Vaše práva:</h3>
          <p>
            Vaše data (návyky, logy, poznámky) zůstávají vaše. Můžete je kdykoliv exportovat
            nebo smazat. Udělujete nám pouze licenci k jejich ukládání a zpracování pro
            poskytování služby.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">6.3 Open-source komponenty:</h3>
          <p className="text-sm">
            Služba využívá open-source knihovny (Next.js, React, Prisma aj.), které mají své
            vlastní licence. Seznam najdete v{" "}
            <a
              href="https://github.com/your-repo/habit-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
