import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, TrendingUp, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getLocale } from "next-intl/server"

export const metadata: Metadata = {
  title: "Habit Strength Score | Help",
  description: "How the habit strength algorithm works - better than a simple streak counter",
}

const t = {
  en: {
    back: "Back to help",
    title: "Habit Strength Score",
    subtitle: "Smart algorithm for rating habit strength - forgives occasional misses",
    alertTitle: "Inspired by research",
    alertDesc: "Based on the algorithm from Loop Habit Tracker and research by Phillippa Lally (2010) on habit formation. One missed day won't destroy your progress!",
    whatIsIt: "What is Habit Strength Score?",
    whatIsItDesc: "Habit Strength is a smart algorithm that rates the strength of your habit on a scale of 0-100. Unlike a simple streak counter that resets after one miss:",
    feat1: "Weighs recent completions more",
    feat1Desc: "Last week matters more than events a month ago",
    feat2: "Forgives occasional misses",
    feat2Desc: "One missed day doesn't drastically reduce the score",
    feat3: "Realistic picture of progress",
    feat3Desc: "Shows actual habit automation, not just perfectionism",
    howItWorks: "How does it work?",
    howItWorksDesc: "The algorithm analyzes the last 30 days and uses exponential decay with a 30-day half-life:",
    step1: "Time weighting:",
    step1Desc: " Yesterday's completion has more weight than completion 3 weeks ago. Uses an exponential function.",
    step2: "Score calculation:",
    step2Desc: " All weighted completions are summed and divided by total possible weight -> score 0-100.",
    step3: "Categorization:",
    step3Desc: " The score is translated into a human-readable level (Very Weak -> Extremely Strong).",
    levels: "Habit Strength Levels",
    veryWeak: "Very Weak (0-19)",
    veryWeakDesc: "Just starting. You need a lot of conscious effort. Don't lose motivation!",
    weak: "Weak (20-39)",
    weakDesc: "Still need a lot of willpower. Stick to your IF-THEN plan!",
    moderate: "Moderate (40-59)",
    moderateDesc: "Starting to get easier. The habit is becoming part of your routine.",
    strong: "Strong (60-79)",
    strongDesc: "Great work! The habit is fairly automatic.",
    veryStrong: "Very Strong (80-94)",
    veryStrongDesc: "Excellent! The habit is deeply rooted in neural pathways.",
    extremelyStrong: "Extremely Strong (95-100)",
    extremelyStrongDesc: "Perfect! The habit is automatic and almost effortless. Congratulations!",
    examples: "Calculation Examples",
    ex1Title: "Scenario 1: Consistent habit (90% success)",
    ex1Desc: "Last 30 days: 27/30 completed, including the last 7 days",
    ex1Score: "Score: ~88 (Very Strong) - Great consistency, habit is strong!",
    ex2Title: "Scenario 2: One missed day (86% success)",
    ex2Desc: "28 days completed, yesterday missed, 14-day streak before that",
    ex2Score: "Score: ~72 (Strong) - One day barely affected anything!",
    ex3Title: "Scenario 3: Recent drop (50% success)",
    ex3Desc: "Good streak 2 weeks ago, but last 7 days only 2/7",
    ex3Score: "Score: ~42 (Moderate) - Recent drop has greater impact",
    tips: "Tips for Improving Habit Strength",
    tip1: "Focus on consistency:",
    tip1Desc: " Better to do 6/7 days every week than perfect 14 days then 7 days nothing.",
    tip2: "Don't judge yourself for missing:",
    tip2Desc: " The algorithm is forgiving - get back on track the very next day!",
    tip3: "Watch the trend:",
    tip3Desc: " What matters is the score growing long-term, not short-term fluctuations.",
    tip4: "Use IF-THEN plans:",
    tip4Desc: " Implementation intentions help maintain consistency even on tough days.",
    whereInApp: "Where to find Habit Strength in the app",
    app1: "On the habit card:",
    app1Desc: " Colored badge with strength level (e.g. \"Strong 78\")",
    app2: "Dashboard:",
    app2Desc: " Overall strength overview of all habits",
    app3: "Habit detail:",
    app3Desc: " Graph of habit strength over time",
    appTip: "Tip: Instead of tracking \"streak\", track Habit Strength - it's more accurate and motivating!",
    researchTitle: "Research & Citations",
    ref1: "Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010).",
    ref1Desc: " How are habits formed: Modelling habit formation in the real world. ",
    ref1Journal: "European Journal of Social Psychology, 40",
    ref1Note: "The study showed that habit automation is a gradual process (average 66 days, range 18-254), not an \"all or nothing\" event. The Habit Strength algorithm reflects this reality.",
    ref2: "Loop Habit Tracker",
    ref2Desc: " - Open-source algorithm for calculating habit strength with exponential decay.",
  },
  cs: {
    back: "Zpet na napovedu",
    title: "Habit Strength Score",
    subtitle: "Chytry algoritmus hodnoceni sily navyku - odpousti prilezitostna selhani",
    alertTitle: "Inspirovano vyzkumem",
    alertDesc: "Na zaklade algoritmu z aplikace Loop Habit Tracker a vyzkumu Phillippa Lally (2010) o formovani navyku. Jeden vynechany den neznici vas pokrok!",
    whatIsIt: "Co je Habit Strength Score?",
    whatIsItDesc: "Habit Strength je chytry algoritmus, ktery hodnoti silu vaseho navyku na stupnici 0-100. Na rozdil od obycejneho pocitadla serie (streak), ktere se vynuluje po prvnim vynechani:",
    feat1: "Vazi nedavne splneni vice",
    feat1Desc: "Posledni tyden ma vetsi vahu nez udalosti pred mesicem",
    feat2: "Odpousti prilezitostna selhani",
    feat2Desc: "Jeden vynechany den nesnizuje skore drasticky",
    feat3: "Realisticky obraz pokroku",
    feat3Desc: "Ukazuje skutecnou automatizaci navyku, ne jen perfekcionismus",
    howItWorks: "Jak to funguje?",
    howItWorksDesc: "Algoritmus analyzuje poslednich 30 dni a pouzije exponencialni rozpad (exponential decay) s 30dennim polocasem rozpadu:",
    step1: "Vahovani podle casu:",
    step1Desc: " Vcerejsi splneni ma vetsi vahu nez splneni pred 3 tydny. Pouziva se exponencialni funkce.",
    step2: "Vypocet skore:",
    step2Desc: " Sectou se vsechna vazena splneni a vydeli celkovou moznou vahou → skore 0-100.",
    step3: "Kategorizace:",
    step3Desc: " Skore se prelozi do lidsky citelne urovne (Very Weak → Extremely Strong).",
    levels: "Urovne sily navyku",
    veryWeak: "Very Weak (0-19)",
    veryWeakDesc: "Prave zaciante. Potrebujete velke vedome usili. Neztracejte motivaci!",
    weak: "Weak (20-39)",
    weakDesc: "Jeste potrebujete hodne willpower. Drzte se sveho IF-THEN planu!",
    moderate: "Moderate (40-59)",
    moderateDesc: "Zacina to byt snazsi. Navyk se stava soucasti rutiny.",
    strong: "Strong (60-79)",
    strongDesc: "Skvela prace! Navyk uz je pomerne automaticky.",
    veryStrong: "Very Strong (80-94)",
    veryStrongDesc: "Vyborne! Navyk je silne zakoreneny v neuronalnich cestach.",
    extremelyStrong: "Extremely Strong (95-100)",
    extremelyStrongDesc: "Perfektni! Navyk je automaticky a temer bez usili. Gratuluji!",
    examples: "Priklady vypoctu",
    ex1Title: "Scenar 1: Konzistentni navyk (90% uspesnost)",
    ex1Desc: "Poslednich 30 dni: 27/30 splneno, vcetne poslednich 7 dni",
    ex1Score: "Skore: ~88 (Very Strong) - Skvela konzistence, navyk je silny!",
    ex2Title: "Scenar 2: Jeden vynechany den (86% uspesnost)",
    ex2Desc: "28 dni splneno, vcera vynechano, predtim 14 dni v serii",
    ex2Score: "Skore: ~72 (Strong) - Jeden den temer nic neubral!",
    ex3Title: "Scenar 3: Nedavny pokles (50% uspesnost)",
    ex3Desc: "Pred 2 tydny dobra serie, ale poslednich 7 dni jen 2/7",
    ex3Score: "Skore: ~42 (Moderate) - Nedavny pokles ma vetsi dopad",
    tips: "Tipy pro zlepseni Habit Strength",
    tip1: "Zamerte se na konzistenci:",
    tip1Desc: " Lepsi je 6/7 dni kazdy tyden nez perfektnich 14 dni a pak 7 dni nic.",
    tip2: "Neodsuzujte se za vynechani:",
    tip2Desc: " Algoritmus je odpoustejici - vratte se zpet hned nasledujici den!",
    tip3: "Sledujte trend:",
    tip3Desc: " Dulezite je, aby skore dlouhodobe rostlo, ne kratkodobe vykyvy.",
    tip4: "Pouzijte IF-THEN plany:",
    tip4Desc: " Implementacni zamery pomahaji udrzet konzistenci i v narocnych dnech.",
    whereInApp: "Kde najit Habit Strength v aplikaci",
    app1: "Na karte navyku:",
    app1Desc: " Barevny badge s urovni sily (napr. \"Strong 78\")",
    app2: "Dashboard:",
    app2Desc: " Celkovy prehled sily vsech navyku",
    app3: "Detail navyku:",
    app3Desc: " Graf vyvoje sily navyku v case",
    appTip: "Tip: Misto sledovani \"streak\" sledujte Habit Strength - je presnejsi a motivujici!",
    researchTitle: "Vyzkum a citace",
    ref1: "Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010).",
    ref1Desc: " How are habits formed: Modelling habit formation in the real world. ",
    ref1Journal: "European Journal of Social Psychology, 40",
    ref1Note: "Studie ukazala, ze automatizace navyku je postupny proces (prumer 66 dni, rozsah 18-254), nikoliv \"vse nebo nic\" jev. Algoritmus Habit Strength odrazi tuto realitu.",
    ref2: "Loop Habit Tracker",
    ref2Desc: " - Open-source algoritmus pro vypocet sily navyku s exponencialnim rozpadem.",
  },
}

export default async function HabitStrengthHelpPage() {
  const locale = await getLocale()
  const l = (locale === "cs" ? "cs" : "en") as "en" | "cs"
  const c = t[l]

  const levelData = [
    { border: "border-gray-400", title: c.veryWeak, desc: c.veryWeakDesc },
    { border: "border-orange-500", title: c.weak, desc: c.weakDesc },
    { border: "border-yellow-500", title: c.moderate, desc: c.moderateDesc },
    { border: "border-lime-500", title: c.strong, desc: c.strongDesc },
    { border: "border-green-500", title: c.veryStrong, desc: c.veryStrongDesc },
    { border: "border-emerald-600", title: c.extremelyStrong, desc: c.extremelyStrongDesc },
  ]

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <Link href="/help"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />{c.back}</Button></Link>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center"><TrendingUp className="h-6 w-6 text-green-500" /></div>
            <h1 className="text-3xl font-bold tracking-tight">{c.title}</h1>
          </div>
          <p className="text-muted-foreground text-lg">{c.subtitle}</p>
        </div>

        <Alert><TrendingUp className="h-4 w-4" /><AlertTitle>{c.alertTitle}</AlertTitle><AlertDescription>{c.alertDesc}</AlertDescription></Alert>

        <Card>
          <CardHeader><CardTitle>{c.whatIsIt}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p>{c.whatIsItDesc}</p>
            <div className="bg-muted p-4 rounded-lg space-y-3">
              {[{ t: c.feat1, d: c.feat1Desc }, { t: c.feat2, d: c.feat2Desc }, { t: c.feat3, d: c.feat3Desc }].map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div><p className="font-semibold">{f.t}</p><p className="text-sm text-muted-foreground">{f.d}</p></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.howItWorks}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p>{c.howItWorksDesc}</p>
            {[{ n: "1", t: c.step1, d: c.step1Desc }, { n: "2", t: c.step2, d: c.step2Desc }, { n: "3", t: c.step3, d: c.step3Desc }].map((s, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="text-sm font-semibold">{s.n}</span></div>
                <div><strong>{s.t}</strong>{s.d}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.levels}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {levelData.map((lv, i) => (
                <div key={i} className={`border-l-4 ${lv.border} pl-4 py-2`}>
                  <p className="font-medium">{lv.title}</p>
                  <p className="text-sm text-muted-foreground">{lv.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.examples}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { bg: "bg-green-500/10", border: "border-green-500/20", t: c.ex1Title, d: c.ex1Desc, s: c.ex1Score },
              { bg: "bg-yellow-500/10", border: "border-yellow-500/20", t: c.ex2Title, d: c.ex2Desc, s: c.ex2Score },
              { bg: "bg-orange-500/10", border: "border-orange-500/20", t: c.ex3Title, d: c.ex3Desc, s: c.ex3Score },
            ].map((ex, i) => (
              <div key={i} className={`${ex.bg} p-4 rounded-lg border ${ex.border}`}>
                <p className="font-medium mb-2">{ex.t}</p>
                <p className="text-sm text-muted-foreground mb-2">{ex.d}</p>
                <p className="text-sm"><strong>{ex.s}</strong></p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.tips}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[c.tip1, c.tip2, c.tip3, c.tip4].map((title, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div><strong>{title}</strong>{[c.tip1Desc, c.tip2Desc, c.tip3Desc, c.tip4Desc][i]}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader><CardTitle>{c.whereInApp}</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>{c.app1}</strong>{c.app1Desc}</li>
              <li><strong>{c.app2}</strong>{c.app2Desc}</li>
              <li><strong>{c.app3}</strong>{c.app3Desc}</li>
            </ul>
            <p className="mt-4 text-muted-foreground">{c.appTip}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.researchTitle}</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>{c.ref1}</strong>{c.ref1Desc}<em>{c.ref1Journal}</em>(6), 998-1009.</p>
            <p className="text-muted-foreground">{c.ref1Note}</p>
            <hr className="my-4" />
            <p><strong>{c.ref2}</strong>{c.ref2Desc}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
