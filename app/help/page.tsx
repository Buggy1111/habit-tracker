"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Brain,
  Zap,
  TrendingUp,
  Award,
  Lightbulb,
  Users,
  Target,
  AlertTriangle,
  Search,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

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

const faqItems = [
  {
    question: "Proč 66 dní, ne 21?",
    answer:
      "21denní mýtus pochází z mylné interpretace výzkumu z 60. let. Skutečný výzkum Lally et al. (2010) zjistil, že trvá průměrně 66 dní (rozsah: 18-254 dní), než se návyk stane automatickým. Záleží na složitosti návyku.",
  },
  {
    question: "Co je to extinction burst?",
    answer:
      "Extinction burst je dočasný pokles výkonu po silné sérii úspěchů. Vyskytuje se u 24-36% lidí kolem 3.-4. týdne. TO JE NORMÁLNÍ! Je to znamení, že váš mozek testuje, jestli nový návyk opravdu potřebujete. Překonejte to a budete silnější.",
  },
  {
    question: "Jak funguje Habit Strength Score?",
    answer:
      "Na rozdíl od jednoduchého streak počítadla používáme exponenciální váhy. Nedávné dny mají vyšší váhu než staré. To znamená, že občasné vynechání vás nezničí. Algoritmus je inspirovaný Loop Habit Tracker (open-source, vědecký).",
  },
  {
    question: "Jaký je rozdíl mezi vámi a Habitica?",
    answer:
      "Habitica používá gamifikaci (extrinsic motivace: body, levely, odměny). My používáme vědu (intrinsic motivace: identity, IF-THEN plány, neuroplasticity tracking). Výzkum ukazuje, že intrinsic motivace vede k dlouhodobějšímu úspěchu.",
  },
  {
    question: "Musím vyplnit všechna pole při vytváření návyku?",
    answer:
      "Ne! Minimálně potřebujete název a akci. Ale silně doporučujeme vyplnit IF-THEN plán (trigger, action, context) - zvyšuje úspěšnost o 65%!",
  },
  {
    question: "Kolik návyků bych měl sledovat najednou?",
    answer:
      "Začněte s 1-3 návyky. Výzkum ukazuje, že lidé se zaměřením na 1 návyk mají 80% úspěšnost. Ti co začnou s 3+ návyky? Pouze 35%. Jakmile se stanou automatickými (66+ dní), můžete přidat další.",
  },
  {
    question: "Co když vynechám den?",
    answer:
      "To je v pořádku! Habit Strength Score je odpouštějící - jeden den vás nezničí. Důležité je vrátit se zpět na správnou cestu co nejdříve. Pravidlo: Nikdy nevynechejte dvakrát za sebou.",
  },
  {
    question: "Odkud máte ty výzkumy?",
    answer:
      "Každá funkce má publikovaný research: Gollwitzer (1999) pro IF-THEN, Lally et al. (2010) pro 66 dní, Oettingen pro WOOP, Clear pro identity-based habits. Kompletní citace najdete v jednotlivých help stránkách.",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTopics = helpTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

        {/* Search Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Hledej v nápovědě... (např. '66 dní', 'extinction burst', 'IF-THEN')"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

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
        {filteredTopics.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTopics.map((topic) => {
              const Icon = topic.icon
              return (
                <Link key={topic.href} href={topic.href}>
                  <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg ${topic.bgColor} flex items-center justify-center mb-2`}
                      >
                        <Icon className={`h-6 w-6 ${topic.color}`} />
                      </div>
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                      <CardDescription className="text-sm">{topic.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Žádné témata neodpovídají vašemu vyhledávání.
            </CardContent>
          </Card>
        )}

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

        {/* FAQ Section */}
        {filteredFAQ.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Často kladené otázky (FAQ)</CardTitle>
              <CardDescription>
                Odpovědi na nejčastější dotazy ohledně vědeckých funkcí
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQ.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}

        {/* Research Sources */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Vědecké zdroje</CardTitle>
            <CardDescription>
              Kompletní seznam výzkumů, na kterých je aplikace postavena
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-muted">
                <p className="font-semibold mb-1">Implementation Intentions</p>
                <p className="text-xs text-muted-foreground">
                  Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple
                  plans. American Psychologist, 54(7), 493-503.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="font-semibold mb-1">66-Day Habit Formation</p>
                <p className="text-xs text-muted-foreground">
                  Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). How are
                  habits formed: Modelling habit formation in the real world. European Journal of
                  Social Psychology, 40, 998-1009.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="font-semibold mb-1">WOOP Method</p>
                <p className="text-xs text-muted-foreground">
                  Oettingen, G. (2014). Rethinking Positive Thinking: Inside the New Science of
                  Motivation. Current Directions in Psychological Science.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="font-semibold mb-1">Identity-Based Habits</p>
                <p className="text-xs text-muted-foreground">
                  Clear, J. (2018). Atomic Habits: An Easy & Proven Way to Build Good Habits & Break
                  Bad Ones. Avery.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="font-semibold mb-1">Extinction Burst</p>
                <p className="text-xs text-muted-foreground">
                  Research in behavioral psychology and habit formation literature. Common
                  phenomenon in learning theory.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="font-semibold mb-1">Cognitive Behavioral Therapy</p>
                <p className="text-xs text-muted-foreground">
                  Beck, A. T. (1979). Cognitive Therapy and the Emotional Disorders. Penguin Books.
                </p>
              </div>
            </div>
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Transparentnost je naše priorita.</strong> Všechny funkce jsou založené na
                publikovaném výzkumu. Pokud máte dotazy ohledně citací, kontaktujte nás.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
