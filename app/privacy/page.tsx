import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Lock, Eye, Download, Trash2, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů | Science-Based Habit Tracker",
  description: "GDPR-compliant zásady ochrany osobních údajů pro Science-Based Habit Tracker",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-violet-500/15 via-fuchsia-500/15 to-cyan-500/15 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4 text-slate-300 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zpět na hlavní stránku
              </Button>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-10 h-10 text-indigo-400" />
              <h1 className="text-4xl font-bold text-white">Zásady ochrany osobních údajů</h1>
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
                Vítejte v Science-Based Habit Tracker. Ochrana vašich osobních údajů je pro nás
                prioritou. Tyto zásady vysvětlují, jaké údaje shromažďujeme, proč je zpracováváme a
                jaká máte práva.
              </p>
              <p>
                Tyto zásady jsou v souladu s <strong>Nařízením EU 2016/679 (GDPR)</strong> a{" "}
                <strong>zákonem č. 110/2019 Sb., o zpracování osobních údajů</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Section 1: Who We Are */}
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

          {/* Section 2: What Data We Collect */}
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

          {/* Section 3: Why We Process Data */}
          <Card className="mb-6 bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">
                3. Proč zpracováváme vaše údaje (právní základ)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white">
                    ✅ Plnění smlouvy (čl. 6 odst. 1 písm. b GDPR)
                  </h4>
                  <p className="text-sm pl-4">
                    Poskytování služby habit trackingu, ukládání vašich návyků, výpočet statistik
                    (Habit Strength, Neuroplasticity, Extinction Burst)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    ✅ Oprávněný zájem (čl. 6 odst. 1 písm. f GDPR)
                  </h4>
                  <p className="text-sm pl-4">
                    Zabezpečení služby, prevence podvodů, vylepšování funkcí, technická podpora
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    ✅ Souhlas (čl. 6 odst. 1 písm. a GDPR)
                  </h4>
                  <p className="text-sm pl-4">
                    Marketing (newsletter), analytické cookies (můžete kdykoli odvolat)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Third Parties */}
          <Card className="mb-6 bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">4. Sdílení údajů se třetími stranami</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <p>Vaše osobní údaje sdílíme POUZE s:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Hosting provider:</strong> Vercel (USA) - hosting aplikace, certifikace
                  Privacy Shield
                </li>
                <li>
                  <strong>Database provider:</strong> Supabase/Neon (EU) - ukládání dat v EU
                </li>
                <li>
                  <strong>Error tracking:</strong> Sentry (USA) - monitoring chyb (anonymizované
                  logy)
                </li>
                <li>
                  <strong>Email service:</strong> Resend (EU) - odesílání transakcí emailů
                  (verifikace, reset hesla)
                </li>
              </ul>
              <p className="text-sm text-slate-400 mt-4">
                ⚠️ <strong>NIKDY</strong> neprodáváme vaše data třetím stranám pro marketingové
                účely.
              </p>
            </CardContent>
          </Card>

          {/* Section 5: Data Retention */}
          <Card className="mb-6 bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">5. Jak dlouho uchováváme vaše data</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-3">
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Účet aktivní:</strong> Po dobu trvání účtu + 30 dní po smazání (backup)
                </li>
                <li>
                  <strong>Účet neaktivní:</strong> 2 roky nečinnosti → upozornění → 30 dní → smazání
                </li>
                <li>
                  <strong>Logy a analytics:</strong> 90 dní (automatické mazání)
                </li>
                <li>
                  <strong>Platební záznamy:</strong> 10 let (daňová povinnost dle zákona)
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 6: Your Rights */}
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

          {/* Section 7: Security */}
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

          {/* Section 8: Cookies */}
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

          {/* Section 9: Children */}
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

          {/* Section 10: Changes */}
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

          {/* Contact */}
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

          {/* Footer */}
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
        </div>
      </div>
    </div>
  )
}
