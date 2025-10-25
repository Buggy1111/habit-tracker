import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, TrendingUp, Award, Lightbulb, Users, Target, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Nápověda | Science-Based Habit Tracker",
  description: "Kompletní průvodce vědecky podloženými funkcemi pro budování návyků",
}

const helpTopics = [
  {
    icon: Zap,
    title: "IF-THEN Implementační záměry",
    description: "Jak používat 'Když-Pak' plány pro 65% vyšší úspěšnost",
    href: "/help/implementation-intentions",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: TrendingUp,
    title: "Habit Strength Score",
    description: "Jak se počítá síla návyku (není to jen streak!)",
    href: "/help/habit-strength",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Brain,
    title: "66-denní neuroplasticita",
    description: "Proč trvá 66 dní vybudovat návyk a co se děje v mozku",
    href: "/help/neuroplasticity",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Award,
    title: "WOOP metoda",
    description: "Překonejte překážky a zdvojnásobte svou úspěšnost",
    href: "/help/woop",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: AlertTriangle,
    title: "Extinction Burst",
    description: "Co dělat, když se vám najednou zhroutí streak",
    href: "/help/extinction-burst",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Users,
    title: "Identity-Based návyky",
    description: "Změňte, kým jste, ne jen co děláte",
    href: "/help/identity",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Target,
    title: "Habit Stacking",
    description: "Spojte návyky do řetězců pro větší úspěšnost",
    href: "/help/habit-stacking",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: Lightbulb,
    title: "Začínáme",
    description: "První kroky s aplikací a jak vytvořit první návyk",
    href: "/help/getting-started",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
]

export default function HelpPage() {
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Nápověda a dokumentace</h1>
          <p className="text-muted-foreground text-lg">
            Naučte se používat vědecky podložené funkce pro úspěšné budování návyků
          </p>
        </div>

        {/* Why Science-Based Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Proč science-based?
            </CardTitle>
            <CardDescription>
              Každá funkce v této aplikaci je založená na výzkumu v oblasti behaviorální psychologie
              a neurovědy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Nejsme další "motivační" app.</strong> Používáme metody, které jsou vědecky
              prokázané:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Implementation Intentions (Gollwitzer, 1999): effect size d=0.65</li>
              <li>66-denní neuroplasticita (Lally et al., 2010)</li>
              <li>WOOP metoda (Oettingen): 2x vyšší úspěšnost</li>
              <li>Identity-based approach (James Clear - Atomic Habits)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Topics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {helpTopics.map((topic) => {
            const Icon = topic.icon
            return (
              <Link key={topic.href} href={topic.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${topic.bgColor} flex items-center justify-center mb-2`}>
                      <Icon className={`h-6 w-6 ${topic.color}`} />
                    </div>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Rychlé tipy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-primary">💡</span>
              <div>
                <strong>Začněte s IF-THEN plánem:</strong> Místo "Budu cvičit" zkuste "Když se
                vrátím z práce, udělám 10 kliků v obýváku". Úspěšnost vzroste o 65%!
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">🧠</span>
              <div>
                <strong>Počítejte s 66 dny:</strong> Neuroplasticita trvá v průměru 66 dní. Nebojte
                se, že to nejde hned - je to normální!
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">⚠️</span>
              <div>
                <strong>Extinction Burst je OK:</strong> Pokud se vám kolem 3. týdne zhorší výkon,
                nevzdávejte se! 24-36% lidí toto zažívá - je to znak pokroku.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
