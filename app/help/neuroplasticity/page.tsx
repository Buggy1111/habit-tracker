import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Brain, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "66denní Neuroplastická Timeline | Nápověda",
  description: "Jak váš mozek vytváří nové návyky - vědecky podložené 4 fáze",
}

export default function NeuroplasticityHelpPage() {
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
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Brain className="h-6 w-6 text-purple-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              66denní Neuroplastická Timeline
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Pochopte, jak váš mozek vytváří nové neuronální cesty a návyky
          </p>
        </div>

        {/* Research Alert */}
        <Alert>
          <Brain className="h-4 w-4" />
          <AlertTitle>Vědecky prokázáno</AlertTitle>
          <AlertDescription>
            Výzkum <strong className="text-foreground">Phillippa Lally et al. (2010)</strong> ukázal,
            že vytvoření automatického návyku trvá v průměru{" "}
            <strong className="text-foreground">66 dní</strong> (rozsah: 18-254 dní).
            Toto je biologický proces, ne nedostatek vůle!
          </AlertDescription>
        </Alert>

        {/* What Is It? */}
        <Card>
          <CardHeader>
            <CardTitle>Co je neuroplasticita?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Neuroplasticita</strong> je schopnost mozku vytvářet nové neuronální spojení
              a přeprogramovat se. Když opakujete určité chování:
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Vytváří se nové neuronální cesty</p>
                  <p className="text-sm text-muted-foreground">
                    Neurony, které se společně aktivují, se propojují (Hebb's law)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Synapse se posilují</p>
                  <p className="text-sm text-muted-foreground">
                    Opakováním se spojení stávají silnějšími a rychlejšími
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Chování se automatizuje</p>
                  <p className="text-sm text-muted-foreground">
                    Po ~66 dnech se návyk přesune z vědomé části mozku (prefrontální kůra)
                    do podvědomé (bazální ganglia)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>Jak to funguje? 4 fáze neuroplasticity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="mb-4">
              Vytváření návyku není lineární proces, ale probíhá ve <strong>4 fázích</strong>.
              Každá fáze má své charakteristiky a výzvy:
            </p>

            {/* Phase 1 */}
            <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-500/5 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌱</span>
                <h3 className="font-bold text-lg">Fáze 1: Budování neuronálních cest (Dny 1-21)</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Co se děje:</strong> Váš mozek vytváří úplně nové neuronální spojení.
                Jako když razíte cestu džunglí - je to těžké a vyčerpávající.
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Charakteristika:</strong></p>
                <ul className="list-disc list-inside ml-2 text-muted-foreground space-y-1">
                  <li>Vyžaduje nejvíce vědomého úsilí</li>
                  <li>Snadné zapomenout</li>
                  <li>Cítíte odpor ("Nechce se mi")</li>
                  <li>Vysoká spotřeba willpower</li>
                </ul>
                <p className="mt-2 text-purple-600 dark:text-purple-400">
                  💡 <strong>Tip:</strong> Použijte IF-THEN plány! Pomohou překonat největší bariéru.
                </p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="border-l-4 border-orange-500 pl-4 py-3 bg-orange-500/5 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌿</span>
                <h3 className="font-bold text-lg">Fáze 2: Posilování spojení (Dny 22-42)</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Co se děje:</strong> Synapse (spojení mezi neurony) se zpevňují.
                Cesta džunglí se stává zřetelnější a prošlapanější.
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Charakteristika:</strong></p>
                <ul className="list-disc list-inside ml-2 text-muted-foreground space-y-1">
                  <li>Začíná být snazší</li>
                  <li>Stále vyžaduje úsilí, ale méně</li>
                  <li>Příležitostná selhání jsou normální</li>
                  <li>Budujete momentum</li>
                </ul>
                <p className="mt-2 text-purple-600 dark:text-purple-400">
                  💡 <strong>Tip:</strong> Gratulujte si! Překonali jste nejtěžší část.
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="border-l-4 border-yellow-500 pl-4 py-3 bg-yellow-500/5 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌳</span>
                <h3 className="font-bold text-lg">Fáze 3: Blížící se automatizace (Dny 43-66)</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Co se děje:</strong> Návyk se přesouvá z prefrontální kůry (vědomé myšlení)
                do bazálních ganglií (automatické chování). Cesta je už pevná.
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Charakteristika:</strong></p>
                <ul className="list-disc list-inside ml-2 text-muted-foreground space-y-1">
                  <li>Výrazně přirozenější pocit</li>
                  <li>Minimální vědomé úsilí</li>
                  <li>Zapomínání je vzácné</li>
                  <li>Téměř automatické chování</li>
                </ul>
                <p className="mt-2 text-purple-600 dark:text-purple-400">
                  💡 <strong>Tip:</strong> Ještě pár týdnů konzistence - jste na dosah!
                </p>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-500/5 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌲</span>
                <h3 className="font-bold text-lg">Fáze 4: Návyk integrovaný (Den 67+)</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Co se děje:</strong> Návyk je plně automatizovaný a integrovaný do vaší
                identity. Cesta je široká dálnice - projdete jí bez přemýšlení.
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Charakteristika:</strong></p>
                <ul className="list-disc list-inside ml-2 text-muted-foreground space-y-1">
                  <li>Minimální úsilí potřebné</li>
                  <li>Zcela automatické a přirozené</li>
                  <li>Součást vaší rutiny a identity</li>
                  <li>Zpevněné neuronální cesty</li>
                </ul>
                <p className="mt-2 text-green-600 dark:text-green-400">
                  🎉 <strong>Gratuluji!</strong> Úspěšně jste přeprogramovali svůj mozek!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Milestones */}
        <Card>
          <CardHeader>
            <CardTitle>Důležité milníky na cestě</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <span className="text-2xl">7️⃣</span>
                <div>
                  <p className="font-medium">Den 7 - První týden!</p>
                  <p className="text-sm text-muted-foreground">
                    Překonali jste počáteční nadšení. První neuronální spojení se tvoří.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <span className="text-2xl">2️⃣1️⃣</span>
                <div>
                  <p className="font-medium">Den 21 - Konec Fáze 1!</p>
                  <p className="text-sm text-muted-foreground">
                    Hlavní neuronální cesty jsou vytvořeny. Od teď bude snazší!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <span className="text-2xl">3️⃣0️⃣</span>
                <div>
                  <p className="font-medium">Den 30 - Měsíc konzistence</p>
                  <p className="text-sm text-muted-foreground">
                    Návyk začína být součástí vaší rutiny. Synapse jsou silnější.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <span className="text-2xl">4️⃣3️⃣</span>
                <div>
                  <p className="font-medium">Den 43 - Přechod do Fáze 3</p>
                  <p className="text-sm text-muted-foreground">
                    Automatizace začíná! Přesun z vědomé části do podvědomé.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <span className="text-2xl">6️⃣6️⃣</span>
                <div>
                  <p className="font-medium">Den 66 - Průměrná automatizace!</p>
                  <p className="text-sm text-muted-foreground">
                    Pro většinu lidí je návyk nyní automatický. Úspěch!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <span className="text-2xl">💯</span>
                <div>
                  <p className="font-medium">Den 100 - Plná integrace</p>
                  <p className="text-sm text-muted-foreground">
                    Návyk je nerozlučně spojen s vaší identitou. Pevně zakořeněný!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Mistakes */}
        <Card>
          <CardHeader>
            <CardTitle>Časté mýty a chyby</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Mýtus: "Vytvoření návyku trvá 21 dní"</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Tento mýtus vznikl špatnou interpretací výzkumu. Průměr je 66 dní, ale může to
                být 18-254 dní podle složitosti návyku!
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Chyba: Vzdát to ve Fázi 1</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Dny 1-21 jsou NEJTĚŽŠÍ. Pokud to vzdáte zde, je to normální biologická reakce,
                ne nedostatek vůle. Zkuste znovu s IF-THEN plánem!
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Mýtus: "Jeden vynechaný den vše zničí"</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Neuronální cesty se nezničí jedním vynecháním. Důležité je vrátit se zpět
                následující den!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How to Use in App */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Jak používat Neuroplastickou Timeline v aplikaci</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Na kartě návyku:</strong> Uvidíte aktuální fázi a počet dní do další fáze
              </li>
              <li>
                <strong>Neuroplasticity Timeline component:</strong> Vizualizace všech 4 fází
                s vaším aktuálním pokrokem
              </li>
              <li>
                <strong>Milníky:</strong> Dostanete notifikaci při dosažení klíčových milníků
                (7, 21, 30, 43, 66, 100 dní)
              </li>
              <li>
                <strong>Motivační zprávy:</strong> Každá fáze má specifické povzbuzení
                a rady podle aktuální biologické fáze
              </li>
            </ol>
            <p className="mt-4 text-muted-foreground">
              💡 <strong>Tip:</strong> Sledujte fáze, ne jen "streak"! Pochopíte, proč je to těžké
              a budete mít trpělivost.
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
            <p className="text-muted-foreground mb-4">
              Studie sledovala 96 lidí po dobu 12 týdnů. Průměrný čas k automatizaci návyku byl
              66 dní (medián), ale rozsah byl široký: 18-254 dní. Složitější návyky
              (např. cvičení) trvaly déle než jednoduché (pití vody).
            </p>
            <hr className="my-4" />
            <p>
              <strong>Hebb, D. O. (1949).</strong> The Organization of Behavior.
            </p>
            <p className="text-muted-foreground">
              "Neurony, které se společně aktivují, se propojují" (Neurons that fire together,
              wire together) - základ neuroplasticity.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
