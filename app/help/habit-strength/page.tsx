import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, TrendingUp, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Habit Strength Score | Nápověda",
  description: "Jak funguje algoritmus síly návyku - lepší než obyčejný počítač série",
}

export default function HabitStrengthHelpPage() {
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
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Habit Strength Score
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Chytrý algoritmus hodnocení síly návyku - odpouští příležitostná selhání
          </p>
        </div>

        {/* Research Alert */}
        <Alert>
          <TrendingUp className="h-4 w-4" />
          <AlertTitle>Inspirováno výzkumem</AlertTitle>
          <AlertDescription>
            Na základě algoritmu z aplikace Loop Habit Tracker a výzkumu
            <strong className="text-foreground"> Phillippa Lally (2010)</strong> o formování návyků.
            Jeden vynechaný den nezničí váš pokrok!
          </AlertDescription>
        </Alert>

        {/* What Is It? */}
        <Card>
          <CardHeader>
            <CardTitle>Co je Habit Strength Score?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Habit Strength je <strong>chytrý algoritmus</strong>, který hodnotí sílu vašeho návyku
              na stupnici 0-100. Na rozdíl od obyčejného počítadla série (streak), které se vynuluje
              po prvním vynechání:
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Váží nedávné splnění více</p>
                  <p className="text-sm text-muted-foreground">
                    Poslední týden má větší váhu než události před měsícem
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Odpouští příležitostná selhání</p>
                  <p className="text-sm text-muted-foreground">
                    Jeden vynechaný den neznižuje skóre drasticky
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Realistický obraz pokroku</p>
                  <p className="text-sm text-muted-foreground">
                    Ukazuje skutečnou automatizaci návyku, ne jen perfekcionismus
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>Jak to funguje?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Algoritmus analyzuje <strong>posledních 30 dní</strong> a použije exponenciální rozpad
              (exponential decay) s 30denním poločasem rozpadu:
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <div>
                  <strong>Váhování podle času:</strong> Včerejší splnění má větší váhu než splnění
                  před 3 týdny. Používá se exponenciální funkce.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div>
                  <strong>Výpočet skóre:</strong> Sečtou se všechna vážená splnění a vydělí celkovou
                  možnou váhou → skóre 0-100.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div>
                  <strong>Kategorizace:</strong> Skóre se přeloží do lidsky čitelné úrovně
                  (Very Weak → Extremely Strong).
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strength Levels */}
        <Card>
          <CardHeader>
            <CardTitle>Úrovně síly návyku</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="border-l-4 border-gray-400 pl-4 py-2">
                <p className="font-medium">Very Weak (0-19)</p>
                <p className="text-sm text-muted-foreground">
                  Právě začínáte. Potřebujete velké vědomé úsilí. Neztrácejte motivaci!
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <p className="font-medium">Weak (20-39)</p>
                <p className="text-sm text-muted-foreground">
                  Ještě potřebujete hodně willpower. Držte se svého IF-THEN plánu!
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <p className="font-medium">Moderate (40-59)</p>
                <p className="text-sm text-muted-foreground">
                  Začíná to být snazší. Návyk se stává součástí rutiny.
                </p>
              </div>
              <div className="border-l-4 border-lime-500 pl-4 py-2">
                <p className="font-medium">Strong (60-79)</p>
                <p className="text-sm text-muted-foreground">
                  Skvělá práce! Návyk už je poměrně automatický.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-medium">Very Strong (80-94)</p>
                <p className="text-sm text-muted-foreground">
                  Výborně! Návyk je silně zakořeněný v neuronálních cestách.
                </p>
              </div>
              <div className="border-l-4 border-emerald-600 pl-4 py-2">
                <p className="font-medium">Extremely Strong (95-100)</p>
                <p className="text-sm text-muted-foreground">
                  Perfektní! Návyk je automatický a téměř bez úsilí. Gratuluji!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Příklady výpočtu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                <p className="font-medium mb-2">Scénář 1: Konzistentní návyk (90% úspěšnost)</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Posledních 30 dní: 27/30 splněno, včetně posledních 7 dní
                </p>
                <p className="text-sm">
                  <strong>Skóre: ~88</strong> (Very Strong) - Skvělá konzistence, návyk je silný!
                </p>
              </div>

              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                <p className="font-medium mb-2">Scénář 2: Jeden vynechaný den (86% úspěšnost)</p>
                <p className="text-sm text-muted-foreground mb-2">
                  28 dní splněno, včera vynecháno, předtím 14 dní v sérii
                </p>
                <p className="text-sm">
                  <strong>Skóre: ~72</strong> (Strong) - Jeden den téměř nic neubral!
                </p>
              </div>

              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <p className="font-medium mb-2">Scénář 3: Nedávný pokles (50% úspěšnost)</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Před 2 týdny dobrá série, ale posledních 7 dní jen 2/7
                </p>
                <p className="text-sm">
                  <strong>Skóre: ~42</strong> (Moderate) - Nedávný pokles má větší dopad
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Tipy pro zlepšení Habit Strength</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Zaměřte se na konzistenci:</strong> Lepší je 6/7 dní každý týden než
                perfektních 14 dní a pak 7 dní nic.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Neodsuzujte se za vynechání:</strong> Algoritmus je odpouštějící -
                vraťte se zpět hned následující den!
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Sledujte trend:</strong> Důležité je, aby skóre dlouhodobě rostlo,
                ne krátkodobé výkyvy.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Použijte IF-THEN plány:</strong> Implementační záměry pomáhají udržet
                konzistenci i v náročných dnech.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use in App */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Kde najít Habit Strength v aplikaci</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Na kartě návyku:</strong> Barevný badge s úrovní síly (např. "Strong 78")
              </li>
              <li>
                <strong>Dashboard:</strong> Celkový přehled síly všech návyků
              </li>
              <li>
                <strong>Detail návyku:</strong> Graf vývoje síly návyku v čase
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              💡 Tip: Místo sledování "streak" sledujte Habit Strength - je přesnější a motivující!
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
              <strong>Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010).</strong>{" "}
              How are habits formed: Modelling habit formation in the real world.{" "}
              <em>European Journal of Social Psychology, 40</em>(6), 998–1009.
            </p>
            <p className="text-muted-foreground">
              Studie ukázala, že automatizace návyku je postupný proces (průměr 66 dní, rozsah 18-254),
              nikoliv "vše nebo nic" jev. Algoritmus Habit Strength odráží tuto realitu.
            </p>
            <hr className="my-4" />
            <p>
              <strong>Loop Habit Tracker</strong> - Open-source algoritmus pro výpočet síly návyku
              s exponenciálním rozpadem.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
