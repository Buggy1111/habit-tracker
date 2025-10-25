import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Award, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "WOOP Metoda | Nápověda",
  description: "Zdvojnásobte úspěšnost svých cílů pomocí WOOP metody",
}

export default function WoopHelpPage() {
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
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Award className="h-6 w-6 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              WOOP Metoda
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Wish, Outcome, Obstacle, Plan - 4kroková strategie, která zdvojnásobuje úspěšnost
          </p>
        </div>

        {/* Research Alert */}
        <Alert>
          <Award className="h-4 w-4" />
          <AlertTitle>Vědecky prokázáno</AlertTitle>
          <AlertDescription>
            Výzkum <strong className="text-foreground">Gabriele Oettingen</strong> ukázal, že
            lidé používající WOOP jsou <strong className="text-foreground">2x úspěšnější</strong> v
            dosahování svých cílů než lidé používající pouze pozitivní vizualizaci.
          </AlertDescription>
        </Alert>

        {/* What Is It? */}
        <Card>
          <CardHeader>
            <CardTitle>Co je WOOP?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>WOOP</strong> je vědecky podložená technika mentálního kontrastu vyvinutá
              psycholožkou Gabriele Oettingen. Na rozdíl od čistě pozitivního myšlení, WOOP vás
              připravuje na <strong>reálné překážky</strong>:
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  W
                </div>
                <div>
                  <p className="font-semibold">Wish (Přání)</p>
                  <p className="text-sm text-muted-foreground">
                    Co chcete dosáhnout? Váš cíl nebo návyk.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  O
                </div>
                <div>
                  <p className="font-semibold">Outcome (Výsledek)</p>
                  <p className="text-sm text-muted-foreground">
                    Jak se budete cítit, když to dosáhnete? Vizualizace úspěchu.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  O
                </div>
                <div>
                  <p className="font-semibold">Obstacle (Překážka)</p>
                  <p className="text-sm text-muted-foreground">
                    Co vám může zabránit? Realistické překážky.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  P
                </div>
                <div>
                  <p className="font-semibold">Plan (Plán)</p>
                  <p className="text-sm text-muted-foreground">
                    Co uděláte, když narazíte na překážku? IF-THEN plán.
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
              WOOP kombinuje <strong>pozitivní vizualizaci</strong> (Wish + Outcome) s{" "}
              <strong>realistickou přípravou</strong> (Obstacle + Plan). Tato kombinace je
              mnohem účinnější než samotné pozitivní myšlení:
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Mentální kontrast:</strong> Představení úspěchu PLUS překážek vytváří
                  v mozku silnější motivaci než jen představování úspěchu.
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Proaktivní řešení problémů:</strong> Místo překvapení překážkami jste
                  na ně připraveni s konkrétním plánem.
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>IF-THEN implementace:</strong> Plán ve formátu "Když narazím na X,
                  pak udělám Y" automatizuje reakci na překážky.
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Realistická motivace:</strong> Neignorujete problémy, čímž se vyhýbáte
                  zklamání z nereálných očekávání.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Example */}
        <Card>
          <CardHeader>
            <CardTitle>Příklad: Jak vytvořit WOOP plán</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-4">
              Představme si, že chcete vybudovat návyk pravidelného čtení:
            </p>

            <div className="space-y-4">
              {/* Wish */}
              <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-500/5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    W
                  </div>
                  <h3 className="font-bold">Wish (Přání)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Otázka:</strong> Co chcete dosáhnout?
                </p>
                <p className="text-sm">
                  <strong>Příklad:</strong> "Chci číst každý večer před spaním a rozšířit své vědomosti."
                </p>
              </div>

              {/* Outcome */}
              <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-500/5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                    O
                  </div>
                  <h3 className="font-bold">Outcome (Výsledek)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Otázka:</strong> Jak se budete cítit, když to dosáhnete?
                </p>
                <p className="text-sm">
                  <strong>Příklad:</strong> "Budu se cítit klidně, intelektuálně stimulovaně a hrdě
                  na to, že se neustále vzdělávám. Budu méně stresovaný a lépe usnu."
                </p>
              </div>

              {/* Obstacle */}
              <div className="border-l-4 border-orange-500 pl-4 py-3 bg-orange-500/5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                    O
                  </div>
                  <h3 className="font-bold">Obstacle (Překážka)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Otázka:</strong> Co vám může zabránit? Buďte realisté!
                </p>
                <p className="text-sm">
                  <strong>Příklad:</strong> "Večer jsem často unavený a místo čtení sahám po telefonu
                  a scrolluji sociální sítě nebo sleduji YouTube."
                </p>
              </div>

              {/* Plan */}
              <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-500/5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    P
                  </div>
                  <h3 className="font-bold">Plan (Plán)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Otázka:</strong> Co uděláte, když narazíte na tuto překážku?
                </p>
                <p className="text-sm mb-2">
                  <strong>Příklad:</strong> "Když si večer lehnu do postele a chci sáhnout po telefonu,
                  místo toho položím telefon na noční stolek obrazovkou dolů a vezmu knihu,
                  kterou mám připravenou vedle postele. Přečtu alespoň 5 stran."
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                  💡 <strong>Tip:</strong> Toto je IF-THEN plán! "Když [překážka], pak [alternativní akce]"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* More Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Další příklady WOOP plánů</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-medium">Ranní cvičení</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>W:</strong> Cvičit každé ráno 10 minut<br />
                <strong>O:</strong> Budu energický a zdravý<br />
                <strong>O:</strong> Ráno bude zima a nechce se mi z postele<br />
                <strong>P:</strong> Když zazvoní budík, okamžitě vstanu a obléknu si sportovní oblečení,
                které mám připravené na židli
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-medium">Zdravé stravování</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>W:</strong> Jíst víc zeleniny<br />
                <strong>O:</strong> Budu se cítit zdravěji a lehčeji<br />
                <strong>O:</strong> V práci mají sladkosti a nezdravé svačiny<br />
                <strong>P:</strong> Když budu mít hlad v práci, sním mrkev nebo jablko,
                které si připravím ráno do krabičky
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="font-medium">Meditace</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>W:</strong> Meditovat 5 minut denně<br />
                <strong>O:</strong> Budu klidnější a méně stresovaný<br />
                <strong>O:</strong> Zapomenu nebo budu mít "důležitější" věci<br />
                <strong>P:</strong> Když si uvařím ranní kávu, než si ji dám, sednu si na polštář
                a medituju, dokud se káva trochu neochladí
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Why It Works Better */}
        <Card>
          <CardHeader>
            <CardTitle>Proč WOOP funguje lépe než samotné pozitivní myšlení?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <p className="font-medium mb-2 flex items-center gap-2">
                <span>❌</span> Pouze pozitivní vizualizace
              </p>
              <p className="text-sm text-muted-foreground">
                Představujete si jen úspěch → Mozek si myslí, že už jste dosáhli cíle → Nižší motivace
                → Překážky vás překvapí → Vzdáte to
              </p>
            </div>

            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium mb-2 flex items-center gap-2">
                <span>✅</span> WOOP (Mentální kontrast)
              </p>
              <p className="text-sm text-muted-foreground">
                Představujete si úspěch I překážky → Mozek vnímá rozdíl mezi současností a cílem →
                Vyšší motivace → Připraveni na překážky → Pokračujete dál
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How to Use in App */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Jak vytvořit WOOP plán v aplikaci</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ol className="list-decimal list-inside space-y-2">
              <li>Otevřete detail návyku kliknutím na kartu návyku</li>
              <li>Klikněte na tlačítko "Vytvořit WOOP plán"</li>
              <li>Průvodce (wizard) vás provede všemi 4 kroky:
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-muted-foreground">
                  <li><strong>Krok 1:</strong> Napište své přání (Wish)</li>
                  <li><strong>Krok 2:</strong> Popište očekávaný výsledek (Outcome)</li>
                  <li><strong>Krok 3:</strong> Identifikujte hlavní překážku (Obstacle)</li>
                  <li><strong>Krok 4:</strong> Vytvořte IF-THEN plán (Plan)</li>
                </ul>
              </li>
              <li>WOOP plán se uloží a zobrazí se u vašeho návyku</li>
              <li>Můžete jej kdykoliv upravit nebo vytvořit nový</li>
            </ol>
            <p className="mt-4 text-muted-foreground">
              💡 <strong>Tip:</strong> Vytvořte WOOP plán pro návyky, kde máte potíže s konzistencí!
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
              <strong>Oettingen, G. (2014).</strong> Rethinking Positive Thinking: Inside the New
              Science of Motivation. <em>Current Directions in Psychological Science.</em>
            </p>
            <p className="text-muted-foreground mb-4">
              Studie ukázaly, že účastníci používající WOOP metodu měli 2x vyšší úspěšnost
              v dosahování cílů (fyzická aktivita, zdravé stravování, příprava na zkoušky)
              než kontrolní skupina používající pouze pozitivní vizualizaci.
            </p>
            <hr className="my-4" />
            <p>
              <strong>Oettingen, G., & Gollwitzer, P. M. (2010).</strong> Strategies of setting
              and implementing goals: Mental contrasting and implementation intentions.
            </p>
            <p className="text-muted-foreground">
              Kombinace mentálního kontrastu (WOOP) a implementation intentions (IF-THEN)
              vytváří nejsilnější efekt - effect size až d=0.94!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
