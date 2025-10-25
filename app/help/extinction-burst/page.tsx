import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Extinction Burst Detection | Nápověda",
  description: "Pochopte, proč náhle selháváte po dlouhé sérii úspěchů - je to normální!",
}

export default function ExtinctionBurstHelpPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Back Button */}
        <Link href="/help">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zpět na nápovědu
          </Button>
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Extinction Burst Detection
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Náhlý pokles po dlouhé sérii? TOTO JE NORMÁLNÍ! Váš mozek vás testuje.
          </p>
        </div>

        {/* Research Alert */}
        <Alert className="border-orange-500/50 bg-orange-500/5">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertTitle>Důležité: Toto není selhání!</AlertTitle>
          <AlertDescription>
            Výzkum v behaviorální psychologii ukazuje, že{" "}
            <strong className="text-foreground">24-36% lidí zažívá extinction burst</strong> při
            vytváření nových návyků. Je to biologická reakce, ne nedostatek vůle!
          </AlertDescription>
        </Alert>

        {/* What Is It? */}
        <Card>
          <CardHeader>
            <CardTitle>Co je Extinction Burst?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Extinction Burst</strong> (česky "výbuch vymírání") je{" "}
              <strong>dočasné a náhle zesílení starého chování</strong>, které se objeví těsně předtím,
              než se nový návyk plně zakoření. Vypadá to takto:
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="font-semibold">Fáze 1: Skvělý začátek (Dny 1-21)</p>
                  <p className="text-sm text-muted-foreground">
                    Máte silnou sérii, plníte návyk 70-90% času. Cítíte se skvěle!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold">Fáze 2: Náhlý pokles (Dny 22-35)</p>
                  <p className="text-sm text-muted-foreground">
                    Najednou to přestane fungovat. Úspěšnost klesne pod 50%. Cítíte se jako selhání.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="font-semibold">Fáze 3: Průlom (Den 36+)</p>
                  <p className="text-sm text-muted-foreground">
                    Pokud to nevzdáte, návyk se vrátí silnější než předtím. Překonali jste test!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>Proč to váš mozek dělá?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Váš mozek je <strong>energeticky efektivní stroj</strong>. Po několika týdnech nového
              chování spustí "kontrolní mechanismus":
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <div>
                  <strong>Efektivní test:</strong> "Opravdu potřebujeme tuto novou rutinu?
                  Co když si vystačíme se starým způsobem?"
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div>
                  <strong>Návrat starých vzorců:</strong> Staré neuronální cesty jsou stále silné.
                  Mozek zkusí, jestli nemůžete použít je místo budování nových.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div>
                  <strong>Poslední pokus:</strong> Staré chování se "snaží přežít" - proto je
                  to tak intenzivní. Toto je jeho poslední šance!
                </div>
              </div>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 mt-4">
              <p className="text-sm">
                💡 <strong>Klíčové poznání:</strong> Extinction burst není důkaz, že selháváte.
                Je to důkaz, že <strong>děláte skutečnou změnu</strong>! Váš mozek by netestoval
                něco, co nebere vážně.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Detection Criteria */}
        <Card>
          <CardHeader>
            <CardTitle>Jak aplikace detekuje Extinction Burst?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Náš algoritmus hledá specifický vzorec chování, který indikuje extinction burst:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-500/5 rounded-r-lg">
                <p className="font-medium">Kritérium 1: Silná předchozí série</p>
                <p className="text-sm text-muted-foreground">
                  V předchozích 14 dnech jste měli <strong>≥70% úspěšnost</strong>
                  (alespoň 10/14 dní splněno)
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-500/5 rounded-r-lg">
                <p className="font-medium">Kritérium 2: Náhlý pokles</p>
                <p className="text-sm text-muted-foreground">
                  V posledních 14 dnech klesla úspěšnost <strong>&lt;50%</strong>
                  (méně než 7/14 dní splněno)
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-500/5 rounded-r-lg">
                <p className="font-medium">Kritérium 3: Velikost poklesu</p>
                <p className="text-sm text-muted-foreground">
                  Pokles je <strong>&gt;30 procentních bodů</strong>
                  (např. z 85% na 45%)
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Pokud splníte všechna 3 kritéria, aplikace zobrazí Extinction Burst Alert s
              podporujícími zprávami a strategiemi pro překonání.
            </p>
          </CardContent>
        </Card>

        {/* Risk Levels */}
        <Card>
          <CardHeader>
            <CardTitle>Úrovně rizika Extinction Burst</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-500/5 rounded-r-lg">
              <p className="font-medium">Nízké riziko</p>
              <p className="text-sm text-muted-foreground">
                Pokles z 70-79% na 40-49%. Jste si vědomi poklesu, ale není dramatický.
                Stačí se vrátit k IF-THEN plánům.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-500/5 rounded-r-lg">
              <p className="font-medium">Střední riziko</p>
              <p className="text-sm text-muted-foreground">
                Pokles z 80-89% na 30-39%. Výrazný pokles. Potřebujete WOOP plán a self-compassion.
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-500/5 rounded-r-lg">
              <p className="font-medium">Vysoké riziko</p>
              <p className="text-sm text-muted-foreground">
                Pokles z 90%+ na &lt;30%. Velmi dramatický pokles. Čas na intenzivní podporu,
                přehodnocení cíle a případně úpravu návyku.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What To Do */}
        <Card>
          <CardHeader>
            <CardTitle>Co dělat, když zažijete Extinction Burst?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>1. Pochopte, že to je normální:</strong> Toto není selhání! Je to biologický
                test. 24-36% lidí to zažívá. Jste v dobré společnosti.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>2. NEVZDÁVEJTE TO:</strong> Pokud teď přestanete, mozek si zapamatuje,
                že test fungoval. Příště bude silnější. Pokud vytrvate, příště bude slabší!
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>3. Použijte WOOP metodu:</strong> Vytvořte plán pro konkrétní překážky,
                které teď zažíváte. Mentální kontrast vám pomůže.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>4. Zpřísněte IF-THEN plány:</strong> Vraťte se k implementačním záměrům.
                Buďte ještě konkrétnější o KDY, CO a KDE.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>5. Praktikujte self-compassion:</strong> "Toto je normální biologická reakce.
                Nejsem slabý. Dělám skutečnou změnu a mozek mě testuje. Vytrvám."
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>6. Zjednodušte návyk (dočasně):</strong> Pokud je to moc těžké, zmenšete
                cíl na 2-3 dny. "10 push-ups" → "5 push-ups". Po překonání burstu zvyšte zpět.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Reálné příklady Extinction Burst</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium mb-2">Příklad 1: Ranní cvičení</p>
              <p className="text-sm text-muted-foreground mb-2">
                Jana cvičila každé ráno 3 týdny (85% úspěšnost). Pak najednou 10 dní v řadě vynechala.
                Cítila se jako selhání.
              </p>
              <p className="text-sm">
                <strong>Co se stalo:</strong> Extinction burst. Jana to nevzdala, použila WOOP ("Když
                se mi nechce, obléknu si cvičební oblečení a udělám aspoň 1 klik"). Za týden byla
                zpět na 90%!
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium mb-2">Příklad 2: Zdravé stravování</p>
              <p className="text-sm text-muted-foreground mb-2">
                Petr se 4 týdny vyhýbal sladkostem (78% úspěšnost). Pak najednou týden jedl čokoládu
                každý den. Myslel si, že nemá dostatečnou vůli.
              </p>
              <p className="text-sm">
                <strong>Co se stalo:</strong> Extinction burst. Starý návyk "testoval", jestli je
                opravdu potřeba změnit. Petr pochopil, že to je normální, a pokračoval. Teď je na
                95% úspěšnosti a sladkosti ho ani nelákají.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Kdy čekat Extinction Burst?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground mb-3">
              Extinction burst se nejčastěji objevuje v těchto fázích:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-orange-500">21-35</span>
                </div>
                <div>
                  <p className="font-medium">Dny 21-35 (Nejčastější)</p>
                  <p className="text-sm text-muted-foreground">
                    Přechod mezi Fází 1 a Fází 2 neuroplasticity. Mozek kontroluje, jestli je
                    změna "vážně myšlená".
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-yellow-600">43-56</span>
                </div>
                <div>
                  <p className="font-medium">Dny 43-56 (Méně časté)</p>
                  <p className="text-sm text-muted-foreground">
                    Druhá vlna může přijít před plnou automatizací. Obvykle slabší než první.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use in App */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Jak funguje detekce v aplikaci</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Automatická detekce:</strong> Algoritmus pravidelně kontroluje vaše návyky
                na základě 3 kritérií (silná série → pokles &gt;30%)
              </li>
              <li>
                <strong>Alert banner:</strong> Když je detekován, zobrazí se oranžový banner
                s informací "EXTINCTION BURST DETEKOVÁN - TOTO JE NORMÁLNÍ!"
              </li>
              <li>
                <strong>Podporující zprávy:</strong> Dostanete konkrétní rady, jak překonat tuto fázi
              </li>
              <li>
                <strong>Odkaz na WOOP:</strong> Přímé propojení na vytvoření WOOP plánu pro překážky
              </li>
              <li>
                <strong>Progress tracking:</strong> Vidíte, jak se vracíte zpět (motivation!)
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              💡 <strong>Tip:</strong> Když uvidíte Extinction Burst Alert, nebojte se! Je to
              známka pokroku, ne selhání.
            </p>
          </CardContent>
        </Card>

        {/* Research Citations */}
        <Card>
          <CardHeader>
            <CardTitle>Výzkum a citace</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>Behaviorální psychologie - Operant Conditioning</strong>
            </p>
            <p className="text-muted-foreground mb-4">
              Extinction burst je dobře zdokumentovaný fenomén v behaviorální psychologii. Když je
              eliminováno posilování určitého chování, chování se dočasně zvýší (burst) předtím,
              než ustoupí (extinction). Toto bylo pozorováno u zvířat i lidí.
            </p>
            <hr className="my-4" />
            <p>
              <strong>Lerman, D. C., & Iwata, B. A. (1995).</strong> Prevalence of the extinction
              burst and its attenuation during treatment. <em>Journal of Applied Behavior Analysis.</em>
            </p>
            <p className="text-muted-foreground">
              Studie ukázala, že 24-36% jedinců zažívá extinction burst při změně chování.
              U těch, kteří vytrvali, bylo chování následně silnější a stabilnější.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
