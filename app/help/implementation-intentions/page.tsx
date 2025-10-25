import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Zap, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "IF-THEN Implementační záměry | Nápověda",
  description: "Jak používat Implementation Intentions pro 65% vyšší úspěšnost",
}

export default function ImplementationIntentionsHelpPage() {
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
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              IF-THEN Implementační záměry
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Zvyšte úspěšnost svých návyků o 65% pomocí specifických "Když-Pak" plánů
          </p>
        </div>

        {/* Research Alert */}
        <Alert>
          <Zap className="h-4 w-4" />
          <AlertTitle>Vědecky prokázáno</AlertTitle>
          <AlertDescription>
            Výzkum Petera Gollwitzera (1999) ukázal, že lidé s implementation intentions mají
            <strong className="text-foreground"> o 65% vyšší úspěšnost</strong> (effect size d=0.65)
            v plnění svých cílů než lidé bez specifického plánu.
          </AlertDescription>
        </Alert>

        {/* What Are They? */}
        <Card>
          <CardHeader>
            <CardTitle>Co jsou Implementation Intentions?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Implementation intentions jsou <strong>konkrétní plány</strong>, které propojují
              situaci (trigger) s akcí. Místo vágního "Budu cvičit" vytvoříte přesný plán:
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-semibold">Formát: "Když [situace], pak [akce] v [místě]"</p>
              <p className="text-sm text-muted-foreground">
                Příklad: "Když se vzbudím v 7:00, pak vypiju sklenici vody v kuchyni"
              </p>
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
              Když vytvoříte IF-THEN plán, váš mozek si vytvoří{" "}
              <strong>automatické spojení</strong> mezi situací a akcí:
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Snižuje potřebu willpower:</strong> Nemusíte se rozhodovat "Mám to
                  teď udělat?" - mozek to udělá automaticky.
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Vytváří mentální trigger:</strong> Když nastane situace, mozek si
                  okamžitě vybaví akci.
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Eliminuje výmluvy:</strong> "Neměl jsem čas" přestává fungovat,
                  protože máte přesně definované KDYŽ.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Příklady dobrých IF-THEN plánů</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-medium">Cvičení</p>
                <p className="text-sm text-muted-foreground">
                  Když se vrátím z práce v 17:00, udělám 10 kliků v obýváku
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium">Zdravá strava</p>
                <p className="text-sm text-muted-foreground">
                  Když si dám oběd, pak sním jedno ovoce jako dezert v kuchyni
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <p className="font-medium">Meditace</p>
                <p className="text-sm text-muted-foreground">
                  Když vstanu z postele v 7:00, medituju 2 minuty v ložnici
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <p className="font-medium">Čtení</p>
                <p className="text-sm text-muted-foreground">
                  Když si lehnu do postele večer, přečtu 10 stran knihy v ložnici
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Mistakes */}
        <Card>
          <CardHeader>
            <CardTitle>Časté chyby (a jak se jim vyhnout)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-red-500">❌</span>
                  <strong>Příliš vágní trigger</strong>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  "Když budu mít čas..." → Přesně KDY? Specifikujte čas nebo situaci!
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-red-500">❌</span>
                  <strong>Neurčitá akce</strong>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  "...pak budu zdravě jíst" → CO konkrétně? "Sním jablko" je lepší!
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-red-500">❌</span>
                  <strong>Chybějící kontext</strong>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Neurčíte KDE → Přidání místa posílí mentální spojení!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Create in App */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Jak vytvořit IF-THEN plán v aplikaci</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ol className="list-decimal list-inside space-y-2">
              <li>Klikněte na "Přidat návyk" v dashboardu</li>
              <li>
                Najděte sekci "IF-THEN Implementační záměr" (s (i) ikonou pro více info)
              </li>
              <li>Vyplňte tři pole:
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-muted-foreground">
                  <li><strong>Kdy:</strong> Konkrétní čas nebo situace</li>
                  <li><strong>Co udělám:</strong> Přesná akce</li>
                  <li><strong>Kde:</strong> Místo (volitelné, ale doporučené)</li>
                </ul>
              </li>
              <li>Nebo použijte připravené šablony kliknutím na "Šablony"</li>
            </ol>
          </CardContent>
        </Card>

        {/* Research Citations */}
        <Card>
          <CardHeader>
            <CardTitle>Výzkum a citace</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>Gollwitzer, P. M. (1999).</strong> Implementation intentions: Strong effects
              of simple plans. <em>American Psychologist, 54</em>(7), 493–503.
            </p>
            <p className="text-muted-foreground">
              Meta-analýza 94 studií s více než 8000 účastníky ukázala konzistentní effect size
              d=0.65 (medium-large effect).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
