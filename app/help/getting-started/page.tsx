import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Lightbulb, CheckCircle2, Zap, Brain, Award, TrendingUp, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Začínáme | Nápověda",
  description: "Kompletní průvodce jak efektivně používat Science-Based Habit Tracker",
}

export default function GettingStartedHelpPage() {
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
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-cyan-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Začínáme
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Kompletní průvodce jak efektivně používat vědecky podložený tracker návyků
          </p>
        </div>

        {/* Welcome Alert */}
        <Alert className="border-cyan-500/50 bg-cyan-500/5">
          <Lightbulb className="h-4 w-4 text-cyan-500" />
          <AlertTitle>Vítejte v Science-Based Habit Tracker!</AlertTitle>
          <AlertDescription>
            Tato aplikace není jako ostatní trackery. Používáme{" "}
            <strong className="text-foreground">vědecky prokázané metody</strong> z výzkumu
            behaviorální psychologie, neuroplasticity a kognitivní vědy. Žádné pseudovědy,
            jen skutečné metody, které fungují!
          </AlertDescription>
        </Alert>

        {/* Why Science-Based? */}
        <Card>
          <CardHeader>
            <CardTitle>Proč "vědecky podložený" (science-based)?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Většina habit trackerů vám pouze <strong>počítá série (streaks)</strong> a motivuje
              gamifikací. My děláme něco jiného:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-lg">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>❌</span> Běžné trackery
                </h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Jednoduché počítání série</li>
                  <li>• "Motivace" gamifikací (coins, levels)</li>
                  <li>• Jeden vynechaný den = KONEC</li>
                  <li>• Žádné vysvětlení PROČ</li>
                  <li>• Selhání = vaše vina</li>
                </ul>
              </div>
              <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-lg">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>✅</span> Science-Based Tracker
                </h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Habit Strength Score (odpouštějící)</li>
                  <li>• IF-THEN plány (65% vyšší úspěšnost)</li>
                  <li>• 66denní neuroplastická timeline</li>
                  <li>• Vysvětlení PROČ to funguje</li>
                  <li>• Selhání = normální biologická reakce</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Features */}
        <Card>
          <CardHeader>
            <CardTitle>6 klíčových funkcí, které byste měli znát</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Feature 1 */}
            <div className="border-l-4 border-yellow-500 pl-4 py-3 bg-yellow-500/5 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <h3 className="font-bold">1. IF-THEN Implementační záměry</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Co to je:</strong> Specifické plány ve formátu "Když [situace], pak [akce] v [místě]"
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Proč to funguje:</strong> Výzkum Gollwitzera ukázal 65% vyšší úspěšnost!
                Mozek si vytvoří automatické spojení mezi situací a akcí.
              </p>
              <Link href="/help/implementation-intentions">
                <Button variant="link" size="sm" className="p-0 h-auto text-yellow-600 dark:text-yellow-400">
                  Zjistit více →
                </Button>
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-500/5 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <h3 className="font-bold">2. Habit Strength Score</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Co to je:</strong> Chytrý algoritmus hodnocení síly návyku (0-100), ne jen streak
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Proč to funguje:</strong> Váží nedávné splnění více a odpouští příležitostná selhání.
                Jeden vynechaný den neničí pokrok!
              </p>
              <Link href="/help/habit-strength">
                <Button variant="link" size="sm" className="p-0 h-auto text-green-600 dark:text-green-400">
                  Zjistit více →
                </Button>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-500/5 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-purple-500" />
                <h3 className="font-bold">3. 66denní Neuroplastická Timeline</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Co to je:</strong> Sledování 4 fází vytváření návyku v mozku (dny 1-21, 22-42, 43-66, 67+)
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Proč to funguje:</strong> Pochopíte, PROČ je to těžké na začátku a PROČ se to zlepšuje.
                Výzkum Lally: průměr 66 dní k automatizaci.
              </p>
              <Link href="/help/neuroplasticity">
                <Button variant="link" size="sm" className="p-0 h-auto text-purple-600 dark:text-purple-400">
                  Zjistit více →
                </Button>
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-500/5 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold">4. WOOP Metoda</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Co to je:</strong> 4kroková strategie (Wish, Outcome, Obstacle, Plan) pro překonání překážek
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Proč to funguje:</strong> Výzkum Oettingen: 2x vyšší úspěšnost než samotné pozitivní myšlení!
                Mentální kontrast připravuje na reálné překážky.
              </p>
              <Link href="/help/woop">
                <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 dark:text-blue-400">
                  Zjistit více →
                </Button>
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="border-l-4 border-orange-500 pl-4 py-3 bg-orange-500/5 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h3 className="font-bold">5. Extinction Burst Detection</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Co to je:</strong> Automatická detekce náhlého poklesu po silné sérii
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Proč to funguje:</strong> 24-36% lidí zažívá extinction burst. Aplikace vás upozorní:
                "TOTO JE NORMÁLNÍ!" a pomůže překonat.
              </p>
              <Link href="/help/extinction-burst">
                <Button variant="link" size="sm" className="p-0 h-auto text-orange-600 dark:text-orange-400">
                  Zjistit více →
                </Button>
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="border-l-4 border-pink-500 pl-4 py-3 bg-pink-500/5 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-pink-500" />
                <h3 className="font-bold">6. Identity-Based Habits</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Co to je:</strong> Propojení návyků s tím, kým JSTE, ne jen co DĚLÁTE
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Proč to funguje:</strong> James Clear: "Nejvyšší forma intrinsické motivace."
                "Jsem běžec" → běžci prostě běhají!
              </p>
              <Link href="/help/identity">
                <Button variant="link" size="sm" className="p-0 h-auto text-pink-600 dark:text-pink-400">
                  Zjistit více →
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Guide */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Rychlý start: Vytvořte svůj první návyk za 5 minut</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <strong>Klikněte na "Přidat návyk" v dashboardu</strong>
                  <p className="text-sm text-muted-foreground">
                    Najdete tlačítko nahoře nebo v seznamu návyků
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <strong>Vyplňte základní informace</strong>
                  <p className="text-sm text-muted-foreground">
                    Název, popis, ikona, barva. Začněte jednoduše!
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <strong>Vytvořte IF-THEN plán (nejdůležitější!)</strong>
                  <p className="text-sm text-muted-foreground mb-2">
                    Toto je klíč k úspěchu! Vyplňte tři pole:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside ml-2">
                    <li><strong>Kdy:</strong> "Když se vzbudím v 7:00"</li>
                    <li><strong>Co udělám:</strong> "Vypiju sklenici vody"</li>
                    <li><strong>Kde:</strong> "V kuchyni"</li>
                  </ul>
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-2">
                    💡 Nebo použijte připravené šablony kliknutím na "Šablony"
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <strong>Uložte a začněte!</strong>
                  <p className="text-sm text-muted-foreground">
                    Návyk se objeví na dashboardu. Můžete jej hned splnit kliknutím na ✓
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <strong>Sledujte pokrok</strong>
                  <p className="text-sm text-muted-foreground">
                    Habit Strength Score, Neuroplastická fáze, série - vše se aktualizuje automaticky!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle>Best Practices - Jak být úspěšní</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Začněte s 1-3 návyky max:</strong> Více je méně! Soustřeďte se na kvalitu,
                ne kvantitu. Po 66 dnech přidejte další.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>VŽDY vytvořte IF-THEN plán:</strong> Toto je nejdůležitější! Návyky s
                IF-THEN mají 65% vyšší úspěšnost.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Začněte SMĚŠNĚ malým cílem:</strong> "2 minuty cvičení" je lepší než
                "hodina v posilovně". Později zvýšíte.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Sledujte Habit Strength, ne jen streak:</strong> Habit Strength je
                přesnější a odpouštějící. Jeden vynechaný den není konec!
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Pochopte neuroplasticitu:</strong> Dny 1-21 jsou NEJTĚŽŠÍ. To je normální!
                Neznamená to, že nemáte vůli. Váš mozek buduje nové cesty.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Použijte WOOP když zápasíte:</strong> Pokud máte potíže s konzistencí,
                vytvořte WOOP plán. Pomůže vám identifikovat a překonat překážky.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Propojte návyky s identitou:</strong> "Jsem běžec" funguje lépe než
                "Chci běhat". Identity-based habits mají vyšší dlouhodobou úspěšnost.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Buďte trpěliví:</strong> Průměr je 66 dní, ale může to být 18-254 dní!
                Složitější návyky trvají déle. To je v pořádku.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Mistakes */}
        <Card>
          <CardHeader>
            <CardTitle>Časté chyby začátečníků (a jak se jim vyhnout)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Chyba 1: Příliš mnoho návyků najednou</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                <strong>Řešení:</strong> Začněte s 1-3 max. Willpower je omezený! Po 66 dnech přidejte další.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Chyba 2: Vágní návyk bez IF-THEN</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                <strong>Řešení:</strong> "Budu cvičit" → "Když se vrátím z práce v 17:00, udělám 10 kliků v obýváku"
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Chyba 3: Příliš ambiciózní cíl</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                <strong>Řešení:</strong> Začněte SMĚŠNĚ malým! "2 minuty" je lepší než "hodina".
                Úspěch motivuje!
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Chyba 4: Vzdát to po prvním vynechání</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                <strong>Řešení:</strong> Jeden vynechaný den není konec! Habit Strength je odpouštějící.
                Vraťte se zpět hned následující den.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Chyba 5: Ignorovat Extinction Burst</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                <strong>Řešení:</strong> Pokud po 3-4 týdnech najednou selhávate, je to normální!
                Aplikace vás upozorní. Nevzdávejte to!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* First Week Checklist */}
        <Card className="bg-green-500/5 border-green-500/20">
          <CardHeader>
            <CardTitle>Checklist pro první týden</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>
                  <strong>Den 1:</strong> Vytvořit první návyk s IF-THEN plánem
                </label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>
                  <strong>Den 1:</strong> Prozkoumat Habit Strength Score - co znamená
                </label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>
                  <strong>Den 1:</strong> Přečíst o 66denní neuroplastické timeline
                </label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>
                  <strong>Den 2-7:</strong> Splnit návyk každý den (budování momentum!)
                </label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>
                  <strong>Den 3:</strong> Vytvořit identitu a propojit s návykem
                </label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>
                  <strong>Den 5:</strong> Pokud je to těžké, vytvořit WOOP plán
                </label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>
                  <strong>Den 7:</strong> Oslavit první týden! První milník! 🎉
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Další kroky</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground mb-3">
              Po vytvoření prvního návyku a pochopení základů, prozkoumejte tyto pokročilé funkce:
            </p>
            <div className="space-y-2">
              <Link href="/help/woop" className="block">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <Award className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">WOOP Metoda</p>
                    <p className="text-sm text-muted-foreground">
                      Pro návyky, kde zápasíte s překážkami
                    </p>
                  </div>
                </div>
              </Link>

              <Link href="/help/identity" className="block">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <Users className="h-5 w-5 text-pink-500" />
                  <div>
                    <p className="font-medium">Identity Designer</p>
                    <p className="text-sm text-muted-foreground">
                      Propojte návyky s tím, kým chcete být
                    </p>
                  </div>
                </div>
              </Link>

              <Link href="/help/extinction-burst" className="block">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">Extinction Burst Detection</p>
                    <p className="text-sm text-muted-foreground">
                      Připravte se na náhlé poklesy (jsou normální!)
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle>Potřebujete pomoc?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Pokud máte dotazy nebo potřebujete pomoc:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>
                <strong>Nápověda:</strong> Každá funkce má (i) ikonu pro rychlou nápovědu
              </li>
              <li>
                <strong>Help centrum:</strong> Návrat na <Link href="/help" className="text-primary hover:underline">stránku nápovědy</Link>
              </li>
              <li>
                <strong>Výzkum:</strong> Každá funkce má citace na vědecké studie
              </li>
            </ul>
            <p className="text-sm mt-4">
              💡 <strong>Tip:</strong> Tato aplikace je postavená na skutečné vědě. Pokud něco nefunguje,
              je to často proto, že jsme nenašli dostatečný výzkum pro danou funkci. Žádné pseudovědy!
            </p>
          </CardContent>
        </Card>

        {/* Philosophy */}
        <Card className="bg-cyan-500/5 border-cyan-500/20">
          <CardHeader>
            <CardTitle>Naše filozofie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Upřímnost nad hype:</strong> Žádné pseudovědy, žádné manifestace.
                Jen transparentní mechanismy a výzkumné citace.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Soucit nad hanbu:</strong> Žádná vina za vynechané dny. Self-compassion,
                extinction burst podpora, neodsuzující jazyk.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Věda nad zázračné pilulky:</strong> Každá funkce je podložená výzkumem.
                Jasné vysvětlení JAK to funguje. Respekt k vaší inteligenci.
              </div>
            </div>
            <p className="text-cyan-700 dark:text-cyan-300 italic mt-4">
              "Změňte své chování, změňte svůj mozek, změňte svůj život - podložené vědou."
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
