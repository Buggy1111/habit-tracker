import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, XCircle, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Smluvní podmínky | Science-Based Habit Tracker",
  description: "Všeobecné obchodní podmínky pro Science-Based Habit Tracker",
}

export default function TermsOfServicePage() {
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

          {/* Section 1: Definitions */}
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

          {/* Section 2: Service Description */}
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

          {/* Section 3: Registration */}
          <Card className="mb-6 bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">3. Registrace a účet</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">3.1 Podmínky registrace:</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Musíte být starší 16 let (nebo mít souhlas zákonného zástupce)</li>
                  <li>Musíte poskytnout pravdivé údaje (e-mail, jméno)</li>
                  <li>Můžete mít pouze jeden účet</li>
                  <li>Heslo musí mít minimálně 8 znaků</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">3.2 Zodpovědnost za účet:</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Jste zodpovědní za utajení hesla</li>
                  <li>Jste zodpovědní za veškerou aktivitu na vašem účtu</li>
                  <li>Podezření na narušení zabezpečení hlaste okamžitě</li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Varování</h4>
                    <p className="text-sm">
                      Sdílení účtu s třetími osobami je zakázáno. Při podezření na zneužití můžeme
                      účet zablokovat.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Payment & Subscription */}
          <Card className="mb-6 bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">4. Platby a předplatné</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">4.1 Cenové plány:</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    <strong>Free tier:</strong> Zdarma navždy
                  </li>
                  <li>
                    <strong>Premium měsíční:</strong> 120 Kč/měsíc (automaticky obnovováno)
                  </li>
                  <li>
                    <strong>Premium roční:</strong> 1 000 Kč/rok (~83 Kč/měsíc, ušetříte 30%)
                  </li>
                  <li>
                    <strong>Lifetime:</strong> 2 500 Kč jednorázově (limitované sloty)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">4.2 Platební podmínky:</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Platby přes Stripe (VISA, Mastercard, Apple Pay, Google Pay)</li>
                  <li>Měsíční plán se automaticky obnovuje každý měsíc</li>
                  <li>Roční plán se automaticky obnovuje každý rok</li>
                  <li>Ceny jsou uvedeny včetně 21% DPH</li>
                  <li>Faktura je zaslána e-mailem</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">4.3 Zrušení předplatného:</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Můžete zrušit kdykoli v Nastavení → Předplatné</li>
                  <li>Po zrušení máte přístup do konce zaplacené periody</li>
                  <li>Po skončení periody účet přejde na Free tier</li>
                  <li>Data zůstávají zachována (ale omezena na 5 návyků)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">4.4 Refundační politika:</h3>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <p className="text-sm">
                    <strong>14-denní záruka vrácení peněz</strong> - pokud nejste spokojeni, vrátíme
                    100% ceny do 14 dnů od zakoupení. Stačí napsat na{" "}
                    <a
                      href="mailto:refund@habit-tracker.cz"
                      className="text-indigo-400 hover:underline"
                    >
                      refund@habit-tracker.cz
                    </a>
                  </p>
                </div>
                <p className="text-sm text-slate-400 mt-2">
                  Po 14 dnech refund není možný (kromě závažných technických problémů na naší
                  straně).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: User Obligations */}
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

          {/* Section 6: Intellectual Property */}
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

          {/* Section 7: Disclaimers */}
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

          {/* Section 8: Termination */}
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

          {/* Section 9: Changes to Terms */}
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

          {/* Section 10: Governing Law */}
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

          {/* Contact */}
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

          {/* Footer */}
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
        </div>
      </div>
    </div>
  )
}
