import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Download, Lock, Trash2, Mail } from "lucide-react"

export function YourRightsSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">6. Vaše práva (GDPR)</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white">Právo na přístup</h4>
              <p className="text-sm">
                Získat kopii vašich dat (Dashboard → Nastavení → Export)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white">Právo na přenositelnost</h4>
              <p className="text-sm">Exportovat data v JSON/CSV formátu</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white">Právo na opravu</h4>
              <p className="text-sm">Upravit nesprávné údaje (Dashboard → Nastavení)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Trash2 className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white">Právo na výmaz</h4>
              <p className="text-sm">
                Smazat účet a všechna data (Dashboard → Nastavení → Smazat účet)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
          <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-400" />
            Jak uplatnit práva?
          </h4>
          <p className="text-sm">
            Kontaktujte nás na{" "}
            <a
              href="mailto:privacy@habit-tracker.cz"
              className="text-indigo-400 hover:underline"
            >
              privacy@habit-tracker.cz
            </a>
            <br />
            Odpovíme do <strong>30 dnů</strong> (lhůta GDPR).
          </p>
        </div>

        <div className="mt-4 p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
          <h4 className="font-semibold text-white mb-2">Právo podat stížnost</h4>
          <p className="text-sm">
            Pokud se domníváte, že porušujeme GDPR, můžete podat stížnost u{" "}
            <a
              href="https://www.uoou.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              Úřadu pro ochranu osobních údajů (ÚOOU)
            </a>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function SecuritySection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-400" />
          7. Jak chráníme vaše data
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-3">
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            <strong>Šifrování hesel:</strong> bcrypt s 10 salt rounds (industry standard)
          </li>
          <li>
            <strong>HTTPS:</strong> Všechna komunikace šifrována (TLS 1.3)
          </li>
          <li>
            <strong>Rate limiting:</strong> Ochrana proti brute-force útokům (5 pokusů/15
            minut)
          </li>
          <li>
            <strong>CSRF ochrana:</strong> NextAuth.js token validace
          </li>
          <li>
            <strong>SQL injection prevence:</strong> Prisma ORM (prepared statements)
          </li>
          <li>
            <strong>Regular security audits:</strong> Automatické skenování (GitHub
            Dependabot)
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
