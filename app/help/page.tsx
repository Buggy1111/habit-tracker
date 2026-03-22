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
import { useLocale } from "next-intl"

const helpTopics = {
  en: [
    {
      icon: Zap,
      title: "IF-THEN Implementation Intentions",
      description: "How to use 'If-Then' plans for 65% higher success rate",
      href: "/help/implementation-intentions",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: TrendingUp,
      title: "Habit Strength Score",
      description: "How habit strength is calculated (it's not just a streak!)",
      href: "/help/habit-strength",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Brain,
      title: "66-Day Neuroplasticity",
      description: "Why it takes 66 days to build a habit and what happens in your brain",
      href: "/help/neuroplasticity",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Award,
      title: "WOOP Method",
      description: "Overcome obstacles and double your success rate",
      href: "/help/woop",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: AlertTriangle,
      title: "Extinction Burst",
      description: "What to do when your streak suddenly collapses",
      href: "/help/extinction-burst",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Users,
      title: "Identity-Based Habits",
      description: "Change who you are, not just what you do",
      href: "/help/identity",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: Target,
      title: "Habit Stacking",
      description: "Chain habits together for greater success",
      href: "/help/habit-stacking",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      icon: Lightbulb,
      title: "Getting Started",
      description: "First steps with the app and how to create your first habit",
      href: "/help/getting-started",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ],
  cs: [
    {
      icon: Zap,
      title: "IF-THEN Implementacni zamery",
      description: "Jak pouzivat 'Kdyz-Pak' plany pro 65% vyssi uspesnost",
      href: "/help/implementation-intentions",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: TrendingUp,
      title: "Habit Strength Score",
      description: "Jak se pocita sila navyku (neni to jen streak!)",
      href: "/help/habit-strength",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Brain,
      title: "66denni neuroplasticita",
      description: "Proc trva 66 dni vybudovat navyk a co se deje v mozku",
      href: "/help/neuroplasticity",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Award,
      title: "WOOP metoda",
      description: "Prekonejte prekazky a zdvojnasobte svou uspesnost",
      href: "/help/woop",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: AlertTriangle,
      title: "Extinction Burst",
      description: "Co delat, kdyz se vam najednou zhruti streak",
      href: "/help/extinction-burst",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Users,
      title: "Identity-Based navyky",
      description: "Zmente, kym jste, ne jen co delate",
      href: "/help/identity",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: Target,
      title: "Habit Stacking",
      description: "Spojte navyky do retezcu pro vetsi uspesnost",
      href: "/help/habit-stacking",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      icon: Lightbulb,
      title: "Zaciname",
      description: "Prvni kroky s aplikaci a jak vytvorit prvni navyk",
      href: "/help/getting-started",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ],
}

const faqItems = {
  en: [
    {
      question: "Why 66 days, not 21?",
      answer:
        "The 21-day myth comes from a misinterpretation of 1960s research. Actual research by Lally et al. (2010) found that it takes an average of 66 days (range: 18-254 days) for a habit to become automatic. It depends on habit complexity.",
    },
    {
      question: "What is an extinction burst?",
      answer:
        "An extinction burst is a temporary drop in performance after a strong series of successes. It occurs in 24-36% of people around weeks 3-4. THIS IS NORMAL! It's a sign that your brain is testing whether the new habit is truly needed. Push through and you'll be stronger.",
    },
    {
      question: "How does the Habit Strength Score work?",
      answer:
        "Unlike a simple streak counter, we use exponential weights. Recent days carry more weight than older ones. This means occasional misses won't destroy your progress. The algorithm is inspired by Loop Habit Tracker (open-source, scientific).",
    },
    {
      question: "How are you different from Habitica?",
      answer:
        "Habitica uses gamification (extrinsic motivation: points, levels, rewards). We use science (intrinsic motivation: identity, IF-THEN plans, neuroplasticity tracking). Research shows intrinsic motivation leads to longer-term success.",
    },
    {
      question: "Do I need to fill in all fields when creating a habit?",
      answer:
        "No! You minimally need a name and action. But we strongly recommend filling in the IF-THEN plan (trigger, action, context) - it increases success by 65%!",
    },
    {
      question: "How many habits should I track at once?",
      answer:
        "Start with 1-3 habits. Research shows people focusing on 1 habit have 80% success rate. Those starting with 3+? Only 35%. Once they become automatic (66+ days), you can add more.",
    },
    {
      question: "What if I miss a day?",
      answer:
        "That's okay! Habit Strength Score is forgiving - one day won't destroy you. What matters is getting back on track as soon as possible. Rule: Never miss twice in a row.",
    },
    {
      question: "Where do you get the research?",
      answer:
        "Every feature has published research: Gollwitzer (1999) for IF-THEN, Lally et al. (2010) for 66 days, Oettingen for WOOP, Clear for identity-based habits. Complete citations are on individual help pages.",
    },
  ],
  cs: [
    {
      question: "Proc 66 dni, ne 21?",
      answer:
        "21denni mytus pochazi z mylne interpretace vyzkumu z 60. let. Skutecny vyzkum Lally et al. (2010) zjistil, ze trva prumerne 66 dni (rozsah: 18-254 dni), nez se navyk stane automatickym. Zalezi na slozitosti navyku.",
    },
    {
      question: "Co je to extinction burst?",
      answer:
        "Extinction burst je docasny pokles vykonu po silne serii uspechu. Vyskytuje se u 24-36% lidi kolem 3.-4. tydne. TO JE NORMALNI! Je to znameni, ze vas mozek testuje, jestli novy navyk opravdu potrebujete. Prekonejte to a budete silnejsi.",
    },
    {
      question: "Jak funguje Habit Strength Score?",
      answer:
        "Na rozdil od jednoducheho streak pocitadla pouzivame exponencialni vahy. Nedavne dny maji vyssi vahu nez stare. To znamena, ze obcasne vynechani vas neznici. Algoritmus je inspirovany Loop Habit Tracker (open-source, vedecky).",
    },
    {
      question: "Jaky je rozdil mezi vami a Habitica?",
      answer:
        "Habitica pouziva gamifikaci (extrinsic motivace: body, levely, odmeny). My pouzivame vedu (intrinsic motivace: identity, IF-THEN plany, neuroplasticity tracking). Vyzkum ukazuje, ze intrinsic motivace vede k dlouhodobejsimu uspechu.",
    },
    {
      question: "Musim vyplnit vsechna pole pri vytvareni navyku?",
      answer:
        "Ne! Minimalne potrebujete nazev a akci. Ale silne doporucujeme vyplnit IF-THEN plan (trigger, action, context) - zvysuje uspesnost o 65%!",
    },
    {
      question: "Kolik navyku bych mel sledovat najednou?",
      answer:
        "Zacnete s 1-3 navyky. Vyzkum ukazuje, ze lide se zamerenim na 1 navyk maji 80% uspesnost. Ti co zacnou s 3+ navyky? Pouze 35%. Jakmile se stanou automatickymi (66+ dni), muzete pridat dalsi.",
    },
    {
      question: "Co kdyz vynecham den?",
      answer:
        "To je v poradku! Habit Strength Score je odpoustejici - jeden den vas neznici. Dulezite je vratit se zpet na spravnou cestu co nejdrive. Pravidlo: Nikdy nevynechejte dvakrat za sebou.",
    },
    {
      question: "Odkud mate ty vyzkumy?",
      answer:
        "Kazda funkce ma publikovany research: Gollwitzer (1999) pro IF-THEN, Lally et al. (2010) pro 66 dni, Oettingen pro WOOP, Clear pro identity-based habits. Kompletni citace najdete v jednotlivych help strankach.",
    },
  ],
}

const content = {
  en: {
    title: "Help & Documentation",
    subtitle: "Learn to use science-backed features for successful habit building",
    searchPlaceholder: "Search help... (e.g. '66 days', 'extinction burst', 'IF-THEN')",
    whyScienceBased: "Why science-based?",
    whyScienceDesc: "Every feature in this app is based on research in behavioral psychology and neuroscience.",
    notMotivational: "We're not another \"motivational\" app.",
    weUseProvenMethods: "We use methods that are scientifically proven:",
    noResults: "No topics match your search.",
    quickTips: "Quick Tips",
    tip1Title: "Start with an IF-THEN plan:",
    tip1: "Instead of \"I'll exercise\" try \"When I get home from work, I'll do 10 push-ups in the living room\". Success increases by 65%!",
    tip2Title: "Plan for 66 days:",
    tip2: "Neuroplasticity takes an average of 66 days. Don't worry if it doesn't click right away - that's normal!",
    tip3Title: "Extinction Burst is OK:",
    tip3: "If your performance drops around week 3, don't give up! 24-36% of people experience this - it's a sign of progress.",
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqDesc: "Answers to the most common questions about science-based features",
    sourcesTitle: "Scientific Sources",
    sourcesDesc: "Complete list of research the app is built on",
    transparencyNote: "Transparency is our priority.",
    transparencyDesc: "All features are based on published research. If you have questions about citations, contact us.",
  },
  cs: {
    title: "Napoveda a dokumentace",
    subtitle: "Naucte se pouzivat vedecky podlozene funkce pro uspesne budovani navyku",
    searchPlaceholder: "Hledej v napovede... (napr. '66 dni', 'extinction burst', 'IF-THEN')",
    whyScienceBased: "Proc science-based?",
    whyScienceDesc: "Kazda funkce v teto aplikaci je zalozena na vyzkumu v oblasti behavioralni psychologie a neurovedy.",
    notMotivational: "Nejsme dalsi \"motivacni\" app.",
    weUseProvenMethods: "Pouzivame metody, ktere jsou vedecky prokazane:",
    noResults: "Zadne temata neodpovidaji vasemu vyhledavani.",
    quickTips: "Rychle tipy",
    tip1Title: "Zacnete s IF-THEN planem:",
    tip1: "Misto \"Budu cvicit\" zkuste \"Kdyz se vratim z prace, udelam 10 kliku v obyvaku\". Uspesnost vzroste o 65%!",
    tip2Title: "Pocitejte s 66 dny:",
    tip2: "Neuroplasticita trva v prumeru 66 dni. Nebojte se, ze to nejde hned - je to normalni!",
    tip3Title: "Extinction Burst je OK:",
    tip3: "Pokud se vam kolem 3. tydne zhorsi vykon, nevzdavejte se! 24-36% lidi toto zaziva - je to znak pokroku.",
    faqTitle: "Casto kladene otazky (FAQ)",
    faqDesc: "Odpovedi na nejcastejsi dotazy ohledne vedeckych funkci",
    sourcesTitle: "Vedecke zdroje",
    sourcesDesc: "Kompletni seznam vyzkumu, na kterych je aplikace postavena",
    transparencyNote: "Transparentnost je nase priorita.",
    transparencyDesc: "Vsechny funkce jsou zalozene na publikovanem vyzkumu. Pokud mate dotazy ohledne citaci, kontaktujte nas.",
  },
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const locale = useLocale()
  const l = (locale === "cs" ? "cs" : "en") as "en" | "cs"
  const c = content[l]
  const topics = helpTopics[l]
  const faq = faqItems[l]

  const filteredTopics = topics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFAQ = faq.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{c.title}</h1>
          <p className="text-muted-foreground text-lg">
            {c.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={c.searchPlaceholder}
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
              {c.whyScienceBased}
            </CardTitle>
            <CardDescription>
              {c.whyScienceDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>{c.notMotivational}</strong> {c.weUseProvenMethods}
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Implementation Intentions (Gollwitzer, 1999): effect size d=0.65</li>
              <li>{l === "cs" ? "66denni neuroplasticita" : "66-day neuroplasticity"} (Lally et al., 2010)</li>
              <li>WOOP {l === "cs" ? "metoda" : "method"} (Oettingen): 2x {l === "cs" ? "vyssi uspesnost" : "higher success rate"}</li>
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
              {c.noResults}
            </CardContent>
          </Card>
        )}

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle>{c.quickTips}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-primary">&#x1F4A1;</span>
              <div>
                <strong>{c.tip1Title}</strong> {c.tip1}
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">&#x1F9E0;</span>
              <div>
                <strong>{c.tip2Title}</strong> {c.tip2}
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">&#x26A0;&#xFE0F;</span>
              <div>
                <strong>{c.tip3Title}</strong> {c.tip3}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        {filteredFAQ.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{c.faqTitle}</CardTitle>
              <CardDescription>
                {c.faqDesc}
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
            <CardTitle>{c.sourcesTitle}</CardTitle>
            <CardDescription>
              {c.sourcesDesc}
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
                <strong>{c.transparencyNote}</strong> {c.transparencyDesc}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
