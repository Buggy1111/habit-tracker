import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Users, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Identity-Based Habits | Nápověda",
  description: "Nejlepší způsob změny návyků je změnit, kým jste",
}

export default function IdentityHelpPage() {
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
            <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-pink-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Identity-Based Habits
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Změňte své chování změnou toho, kým jste - nejsilnější forma intrinsické motivace
          </p>
        </div>

        {/* Research Alert */}
        <Alert>
          <Users className="h-4 w-4" />
          <AlertTitle>Klíčový princip úspěchu</AlertTitle>
          <AlertDescription>
            <strong className="text-foreground">James Clear (Atomic Habits):</strong>{" "}
            "Nejvyšší forma intrinsické motivace je, když se návyk stane součástí vaší identity."
            Lidé orientovaní na identitu mají výrazně vyšší dlouhodobou úspěšnost než lidé
            orientovaní pouze na cíle.
          </AlertDescription>
        </Alert>

        {/* What Is It? */}
        <Card>
          <CardHeader>
            <CardTitle>Co jsou Identity-Based Habits?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Identity-based habits znamenají <strong>propojení návyků s tím, kým JSTE</strong>,
              ne jen s tím, co DĚLÁTE. Je to posun od cílů k identitě:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-500/5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">❌</span>
                  <h3 className="font-bold">Cílově orientované</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>"Chci přečíst 12 knih letos"</p>
                  <p>"Chci zhubnout 10 kg"</p>
                  <p>"Chci se naučit španělsky"</p>
                </div>
                <p className="text-sm mt-3">
                  <strong>Problém:</strong> Po dosažení cíle motivace mizí. Co pak?
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-500/5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">✅</span>
                  <h3 className="font-bold">Identity orientované</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>"Jsem čtenář"</p>
                  <p>"Jsem zdravý člověk"</p>
                  <p>"Jsem někdo, kdo se učí jazyky"</p>
                </div>
                <p className="text-sm mt-3">
                  <strong>Výhoda:</strong> Identita je trvalá. Čtenáři prostě čtou!
                </p>
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
              Když se návyk stane součástí vaší identity, vytváří se{" "}
              <strong>samoposilující cyklus</strong>:
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <div>
                  <strong>Rozhodnete se, kým chcete být:</strong> "Chci být člověk, který se
                  stará o své zdraví" (identita)
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div>
                  <strong>Uděláte malou akci podporující tuto identitu:</strong> Půjdete běhat,
                  sníte salát, odmítnete cigaretu
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div>
                  <strong>Tato akce posiluje identitu:</strong> "Jsem člověk, který běhá.
                  To je důkaz!" (self-evidence)
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">4</span>
                </div>
                <div>
                  <strong>Identita motivuje další akce:</strong> "Jsem běžec, takže dnes půjdu
                  běhat i když prší"
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">5</span>
                </div>
                <div>
                  <strong>Cyklus se opakuje a posiluje:</strong> Každá akce je další důkaz identity,
                  identita motivuje další akce. Snowball efekt!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why It Works Better */}
        <Card>
          <CardHeader>
            <CardTitle>Proč Identity-Based Habits fungují lépe?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Intrinsická motivace:</strong> Nečiníte to pro cíl, ale protože "to jste VY".
                Nejsilnější forma motivace!
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Konzistence bez úsilí:</strong> "Běžci běhají" - není to rozhodování,
                je to automatické. Eliminuje decision fatigue.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Dlouhodobá udržitelnost:</strong> Cíle končí, identita ne. "Jsem zdravý člověk"
                platí celý život.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Self-reinforcing:</strong> Každé splnění návyku je důkaz identity, což
                motivuje další splnění. Pozitivní spirála!
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Sociální tlak (pozitivní):</strong> "Jsem sportovec" → ostatní vás tak vnímají
                → to posiluje identitu → jednáte podle toho
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Příklady transformace z cílů na identitu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📚</span>
                  <h3 className="font-bold">Čtení</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-600 dark:text-red-400">
                    ❌ <strong>Cíl:</strong> "Přečtu 12 knih letos"
                  </p>
                  <p className="text-green-600 dark:text-green-400">
                    ✅ <strong>Identita:</strong> "Jsem čtenář. Čtenáři čtou každý den."
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Rozdíl:</strong> Po přečtení 12. knihy cílově orientovaná osoba přestane.
                    "Čtenář" pokračuje, protože to je součást toho, kým je.
                  </p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🏃</span>
                  <h3 className="font-bold">Běhání</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-600 dark:text-red-400">
                    ❌ <strong>Cíl:</strong> "Uběhnu maraton"
                  </p>
                  <p className="text-green-600 dark:text-green-400">
                    ✅ <strong>Identita:</strong> "Jsem běžec. Běžci běhají i když prší."
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Rozdíl:</strong> Po maratonu: cíl skončil. "Běžec" pokračuje v běhání,
                    protože to je část jeho/její identity.
                  </p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🚭</span>
                  <h3 className="font-bold">Nekuřák</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-600 dark:text-red-400">
                    ❌ <strong>Cíl:</strong> "Přestanu kouřit"
                  </p>
                  <p className="text-green-600 dark:text-green-400">
                    ✅ <strong>Identita:</strong> "Jsem nekuřák. Nekuřáci nekouří."
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Rozdíl:</strong> "Přestal jsem kouřit" = pořád jste kuřák, který to teď nedělá.
                    "Jsem nekuřák" = jiná identita, není co řešit.
                  </p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🧘</span>
                  <h3 className="font-bold">Meditace</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-600 dark:text-red-400">
                    ❌ <strong>Cíl:</strong> "Zmedituju 30 dní v řadě"
                  </p>
                  <p className="text-green-600 dark:text-green-400">
                    ✅ <strong>Identita:</strong> "Jsem člověk, který medituje. Je to moje rutina."
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Rozdíl:</strong> Po 30 dnech motivace zmizí u cíle. U identity pokračujete,
                    protože "to děláte".
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Build Identity */}
        <Card>
          <CardHeader>
            <CardTitle>Jak vybudovat Identity-Based Habit? (3 kroky)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-pink-500 pl-4 py-3 bg-pink-500/5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">1️⃣</span>
                  <h3 className="font-bold">Rozhodněte se, kým chcete být</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Zeptejte se: "Jaký typ člověka by dosáhl výsledků, které chci?"
                </p>
                <div className="space-y-1 text-sm">
                  <p>• Chcete dobrý fyzický stav? → "Chci být sportovec/zdravý člověk"</p>
                  <p>• Chcete být vzdělaný? → "Chci být člověk, který se neustále učí"</p>
                  <p>• Chcete mít peníze? → "Chci být finančně disciplinovaný člověk"</p>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-500/5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">2️⃣</span>
                  <h3 className="font-bold">Dokazujte si to malými akcemi</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Každé splnění návyku je "hlas" pro novou identitu. James Clear: "Každá akce je hlasování
                  pro typ člověka, kterým se chcete stát."
                </p>
                <div className="space-y-1 text-sm">
                  <p>• Vyběhli jste dnes? → Hlas pro "Jsem běžec"</p>
                  <p>• Přečetli jste 10 stran? → Hlas pro "Jsem čtenář"</p>
                  <p>• Zmeditovali jste? → Hlas pro "Jsem mindful osoba"</p>
                </div>
                <p className="text-sm mt-2 text-pink-600 dark:text-pink-400">
                  💡 <strong>Klíč:</strong> Nepotřebujete perfektnost! 51% hlasů stačí k výhře. Stačí
                  být "většinou" ten typ člověka.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-500/5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">3️⃣</span>
                  <h3 className="font-bold">Nechte identitu motivovat další akce</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Když se rozhodujete, ptejte se: "Co by udělal [má identita]?"
                </p>
                <div className="space-y-1 text-sm">
                  <p>• "Co by udělal zdravý člověk?" → Sním salát místo burgeru</p>
                  <p>• "Co by udělal sportovec?" → Půjdu běhat i když prší</p>
                  <p>• "Co by udělal čtenář?" → Vypnu Netflix a vezmu knihu</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identity Milestones */}
        <Card>
          <CardHeader>
            <CardTitle>Identity Milestones - Důkazy vaší transformace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Milestones</strong> (milníky) jsou klíčové achievementy, které posilují vaši
              novou identitu. Jsou to "důkazy", že opravdu jste tím, kým chcete být:
            </p>
            <div className="space-y-3">
              <div className="bg-muted p-3 rounded-lg">
                <p className="font-medium">Příklady milníků pro "Jsem běžec":</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                  <li>Uběhl jsem první 5 km</li>
                  <li>Běhal jsem 30 dní v řadě</li>
                  <li>Dokončil jsem svůj první závod</li>
                  <li>Běhal jsem i v dešti (překonal jsem nepohodu)</li>
                </ul>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="font-medium">Příklady milníků pro "Jsem čtenář":</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                  <li>Přečetl jsem první knihu letos</li>
                  <li>Četl jsem 7 dní v řadě</li>
                  <li>Přečetl jsem 10 knih za rok</li>
                  <li>Přečetl jsem obtížnou knihu (překonal jsem výzvu)</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> Oslavujte milníky! Posilují vaši identitu a motivují pokračovat.
            </p>
          </CardContent>
        </Card>

        {/* Common Mistakes */}
        <Card>
          <CardHeader>
            <CardTitle>Časté chyby při budování identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Příliš široká identita</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                "Jsem úspěšný člověk" je moc vágní. "Jsem člověk, který cvičí každý den" je specifické!
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Čekat na "pocit" identity</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Identita se neobjeví magicky. Budujete ji akcemi! "Fake it till you make it" funguje.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Perfekcionismus</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Nemusíte být 100% konzistentní! "Jsem běžec" i když občas vynecháte běh.
                51% hlasů stačí!
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500">❌</span>
                <strong>Nezapisovat si milníky</strong>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Milestones jsou důkazy vaší identity. Bez záznamu je zapomenete a ztratíte motivaci!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How to Use in App */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Jak používat Identity Designer v aplikaci</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ol className="list-decimal list-inside space-y-2">
              <li>Přejděte na stránku "Identita" v menu</li>
              <li>Klikněte na "Vytvořit identitu"</li>
              <li>Vyplňte:
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-muted-foreground">
                  <li><strong>Název:</strong> Kým chcete být? (např. "Jsem sportovec")</li>
                  <li><strong>Popis:</strong> Proč je to pro vás důležité?</li>
                  <li><strong>Ikona a barva:</strong> Vizuální identifikace</li>
                </ul>
              </li>
              <li>Propojte návyky s touto identitou</li>
              <li>Přidávejte milestones při dosažení významných úspěchů</li>
              <li>Sledujte progress - kolik "hlasů" jste dali své identitě tento týden/měsíc</li>
            </ol>
            <p className="mt-4 text-muted-foreground">
              💡 <strong>Tip:</strong> Začněte s 1-2 identitami. Až se stanou silné, přidejte další!
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
              <strong>Clear, J. (2018).</strong> Atomic Habits: An Easy & Proven Way to Build Good
              Habits & Break Bad Ones.
            </p>
            <p className="text-muted-foreground mb-4">
              James Clear popularizoval koncept identity-based habits. Jeho výzkum ukázal, že lidé
              orientovaní na identitu ("Jsem zdravý člověk") mají výrazně vyšší dlouhodobou úspěšnost
              než lidé orientovaní na výsledky ("Chci zhubnout 10 kg").
            </p>
            <hr className="my-4" />
            <p>
              <strong>Rise, J., Sheeran, P., & Hukkelberg, S. (2010).</strong> The role of
              self-identity in the theory of planned behavior. <em>British Journal of Social Psychology.</em>
            </p>
            <p className="text-muted-foreground">
              Studie ukázala, že self-identity je jeden z nejsilnějších prediktorů chování -
              silnější než postoje, subjektivní normy nebo vnímání kontroly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
