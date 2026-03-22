import Link from "next/link"
import { Zap, Brain, Award, TrendingUp, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const t = {
  en: {
    title: "6 Key Features You Should Know",
    learnMore: "Learn more \u2192",
    features: [
      { icon: Zap, color: "yellow", title: "1. IF-THEN Implementation Intentions", what: "What it is:", whatDesc: " Specific plans in \"When [situation], then [action] in [place]\" format", why: "Why it works:", whyDesc: " Gollwitzer's research showed 65% higher success! The brain creates automatic connections between situation and action.", href: "/help/implementation-intentions" },
      { icon: TrendingUp, color: "green", title: "2. Habit Strength Score", what: "What it is:", whatDesc: " Smart habit strength rating algorithm (0-100), not just streak", why: "Why it works:", whyDesc: " Weighs recent completions more and forgives occasional misses. One missed day doesn't destroy progress!", href: "/help/habit-strength" },
      { icon: Brain, color: "purple", title: "3. 66-Day Neuroplasticity Timeline", what: "What it is:", whatDesc: " Tracking 4 phases of habit creation in the brain (days 1-21, 22-42, 43-66, 67+)", why: "Why it works:", whyDesc: " You'll understand WHY it's hard at the beginning and WHY it gets better. Lally research: average 66 days to automation.", href: "/help/neuroplasticity" },
      { icon: Award, color: "blue", title: "4. WOOP Method", what: "What it is:", whatDesc: " 4-step strategy (Wish, Outcome, Obstacle, Plan) for overcoming obstacles", why: "Why it works:", whyDesc: " Oettingen research: 2x higher success than positive thinking alone! Mental contrast prepares for real obstacles.", href: "/help/woop" },
      { icon: AlertTriangle, color: "orange", title: "5. Extinction Burst Detection", what: "What it is:", whatDesc: " Automatic detection of sudden drops after a strong streak", why: "Why it works:", whyDesc: " 24-36% of people experience extinction burst. The app alerts you: \"THIS IS NORMAL!\" and helps you overcome it.", href: "/help/extinction-burst" },
      { icon: Users, color: "pink", title: "6. Identity-Based Habits", what: "What it is:", whatDesc: " Connecting habits with WHO YOU ARE, not just what you DO", why: "Why it works:", whyDesc: " James Clear: \"The highest form of intrinsic motivation.\" \"I'm a runner\" -> runners just run!", href: "/help/identity" },
    ],
  },
  cs: {
    title: "6 klicovych funkci, ktere byste meli znat",
    learnMore: "Zjistit vice \u2192",
    features: [
      { icon: Zap, color: "yellow", title: "1. IF-THEN Implementacni zamery", what: "Co to je:", whatDesc: " Specificke plany ve formatu \"Kdyz [situace], pak [akce] v [miste]\"", why: "Proc to funguje:", whyDesc: " Vyzkum Gollwitzera ukazal 65% vyssi uspesnost! Mozek si vytvori automaticke spojeni mezi situaci a akci.", href: "/help/implementation-intentions" },
      { icon: TrendingUp, color: "green", title: "2. Habit Strength Score", what: "Co to je:", whatDesc: " Chytry algoritmus hodnoceni sily navyku (0-100), ne jen streak", why: "Proc to funguje:", whyDesc: " Vazi nedavne splneni vice a odpousti prilezitostna selhani. Jeden vynechany den nenici pokrok!", href: "/help/habit-strength" },
      { icon: Brain, color: "purple", title: "3. 66denni Neuroplasticka Timeline", what: "Co to je:", whatDesc: " Sledovani 4 fazi vytvareni navyku v mozku (dny 1-21, 22-42, 43-66, 67+)", why: "Proc to funguje:", whyDesc: " Pochopite, PROC je to tezke na zacatku a PROC se to zlepsuje. Vyzkum Lally: prumer 66 dni k automatizaci.", href: "/help/neuroplasticity" },
      { icon: Award, color: "blue", title: "4. WOOP Metoda", what: "Co to je:", whatDesc: " 4krokova strategie (Wish, Outcome, Obstacle, Plan) pro prekonani prezazek", why: "Proc to funguje:", whyDesc: " Vyzkum Oettingen: 2x vyssi uspesnost nez samotne pozitivni mysleni! Mentalni kontrast pripravuje na realne prekazky.", href: "/help/woop" },
      { icon: AlertTriangle, color: "orange", title: "5. Extinction Burst Detection", what: "Co to je:", whatDesc: " Automaticka detekce nahleho poklesu po silne serii", why: "Proc to funguje:", whyDesc: " 24-36% lidi zaziva extinction burst. Aplikace vas upozorni: \"TOTO JE NORMALNI!\" a pomuze prekonat.", href: "/help/extinction-burst" },
      { icon: Users, color: "pink", title: "6. Identity-Based Habits", what: "Co to je:", whatDesc: " Propojeni navyku s tim, kym JSTE, ne jen co DELATE", why: "Proc to funguje:", whyDesc: " James Clear: \"Nejvyssi forma intrinsicke motivace.\" \"Jsem bezec\" → bezci proste behaji!", href: "/help/identity" },
    ],
  },
}

export function CoreFeatures({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {c.features.map((f, i) => {
          const Icon = f.icon
          return (
            <div key={i} className={`border-l-4 border-${f.color}-500 pl-4 py-3 bg-${f.color}-500/5 rounded-r-lg`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-5 w-5 text-${f.color}-500`} />
                <h3 className="font-bold">{f.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2"><strong>{f.what}</strong>{f.whatDesc}</p>
              <p className="text-sm text-muted-foreground mb-2"><strong>{f.why}</strong>{f.whyDesc}</p>
              <Link href={f.href}><Button variant="link" size="sm" className={`p-0 h-auto text-${f.color}-600 dark:text-${f.color}-400`}>{c.learnMore}</Button></Link>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
