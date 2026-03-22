import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Brain, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getLocale } from "next-intl/server"

export const metadata: Metadata = {
  title: "66-Day Neuroplasticity Timeline | Help",
  description: "How your brain creates new habits - scientifically backed 4 phases",
}

const t = {
  en: {
    back: "Back to help",
    title: "66-Day Neuroplasticity Timeline",
    subtitle: "Understand how your brain creates new neural pathways and habits",
    alertTitle: "Scientifically proven",
    alertDesc: "Research by Phillippa Lally et al. (2010) showed that creating an automatic habit takes an average of 66 days (range: 18-254 days). This is a biological process, not a lack of willpower!",
    whatIsIt: "What is neuroplasticity?",
    whatIsItDesc: "Neuroplasticity is the brain's ability to create new neural connections and reprogram itself. When you repeat certain behavior:",
    neuro1: "New neural pathways are created",
    neuro1Desc: "Neurons that fire together, wire together (Hebb's law)",
    neuro2: "Synapses strengthen",
    neuro2Desc: "Through repetition, connections become stronger and faster",
    neuro3: "Behavior becomes automated",
    neuro3Desc: "After ~66 days, the habit moves from the conscious part of the brain (prefrontal cortex) to the subconscious (basal ganglia)",
    howItWorks: "How does it work? 4 phases of neuroplasticity",
    howItWorksDesc: "Creating a habit is not a linear process, but occurs in 4 phases. Each phase has its characteristics and challenges:",
    phase1Title: "Phase 1: Building Neural Pathways (Days 1-21)",
    phase1What: "What's happening:",
    phase1WhatDesc: " Your brain is creating entirely new neural connections. Like blazing a trail through a jungle - it's hard and exhausting.",
    phase1Chars: "Characteristics:",
    phase1C1: "Requires the most conscious effort",
    phase1C2: "Easy to forget",
    phase1C3: "You feel resistance (\"I don't want to\")",
    phase1C4: "High willpower consumption",
    phase1Tip: "Tip:",
    phase1TipDesc: " Use IF-THEN plans! They help overcome the biggest barrier.",
    phase2Title: "Phase 2: Strengthening Connections (Days 22-42)",
    phase2What: "What's happening:",
    phase2WhatDesc: " Synapses (connections between neurons) are hardening. The jungle path is becoming clearer and more worn.",
    phase2C1: "Starting to get easier",
    phase2C2: "Still requires effort, but less",
    phase2C3: "Occasional failures are normal",
    phase2C4: "Building momentum",
    phase2Tip: "Tip:",
    phase2TipDesc: " Congratulate yourself! You've overcome the hardest part.",
    phase3Title: "Phase 3: Approaching Automation (Days 43-66)",
    phase3What: "What's happening:",
    phase3WhatDesc: " The habit is moving from the prefrontal cortex (conscious thinking) to the basal ganglia (automatic behavior). The path is now solid.",
    phase3C1: "Significantly more natural feeling",
    phase3C2: "Minimal conscious effort",
    phase3C3: "Forgetting is rare",
    phase3C4: "Almost automatic behavior",
    phase3Tip: "Tip:",
    phase3TipDesc: " Just a few more weeks of consistency - you're within reach!",
    phase4Title: "Phase 4: Habit Integrated (Day 67+)",
    phase4What: "What's happening:",
    phase4WhatDesc: " The habit is fully automated and integrated into your identity. The path is a wide highway - you walk it without thinking.",
    phase4C1: "Minimal effort needed",
    phase4C2: "Completely automatic and natural",
    phase4C3: "Part of your routine and identity",
    phase4C4: "Hardened neural pathways",
    phase4Congrats: "Congratulations!",
    phase4CongratsDesc: " You've successfully reprogrammed your brain!",
    milestones: "Important milestones on the journey",
    day7: "Day 7 - First Week!",
    day7Desc: "You've overcome the initial excitement. First neural connections are forming.",
    day21: "Day 21 - End of Phase 1!",
    day21Desc: "Main neural pathways are created. From now on it will be easier!",
    day30: "Day 30 - Month of Consistency",
    day30Desc: "The habit is becoming part of your routine. Synapses are stronger.",
    day43: "Day 43 - Transition to Phase 3",
    day43Desc: "Automation begins! Moving from conscious to subconscious.",
    day66: "Day 66 - Average Automation!",
    day66Desc: "For most people, the habit is now automatic. Success!",
    day100: "Day 100 - Full Integration",
    day100Desc: "The habit is inseparably linked with your identity. Deeply rooted!",
    myths: "Common Myths and Mistakes",
    myth1: "Myth: \"It takes 21 days to create a habit\"",
    myth1Desc: "This myth arose from misinterpreting research. The average is 66 days, but it can be 18-254 days depending on habit complexity!",
    myth2: "Mistake: Giving up in Phase 1",
    myth2Desc: "Days 1-21 are THE HARDEST. If you give up here, it's a normal biological reaction, not a lack of willpower. Try again with an IF-THEN plan!",
    myth3: "Myth: \"One missed day ruins everything\"",
    myth3Desc: "Neural pathways don't get destroyed by one miss. What matters is getting back the next day!",
    howToUse: "How to use the Neuroplasticity Timeline in the app",
    use1: "On the habit card:",
    use1Desc: " You'll see the current phase and days until the next phase",
    use2: "Neuroplasticity Timeline component:",
    use2Desc: " Visualization of all 4 phases with your current progress",
    use3: "Milestones:",
    use3Desc: " You'll get notifications when reaching key milestones (7, 21, 30, 43, 66, 100 days)",
    use4: "Motivational messages:",
    use4Desc: " Each phase has specific encouragement and advice based on the current biological phase",
    useTip: "Tip:",
    useTipDesc: " Track phases, not just \"streak\"! You'll understand why it's hard and have patience.",
    researchTitle: "Research & Citations",
    lallyRef: "Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010).",
    lallyDesc: " How are habits formed: Modelling habit formation in the real world. ",
    lallyJournal: "European Journal of Social Psychology, 40",
    lallyNote: "The study followed 96 people for 12 weeks. Average time to habit automation was 66 days (median), but the range was wide: 18-254 days. More complex habits (e.g. exercise) took longer than simple ones (drinking water).",
    hebbRef: "Hebb, D. O. (1949).",
    hebbTitle: " The Organization of Behavior.",
    hebbNote: "\"Neurons that fire together, wire together\" - the foundation of neuroplasticity.",
  },
  cs: {
    back: "Zpet na napovedu",
    title: "66denni Neuroplasticka Timeline",
    subtitle: "Pochopte, jak vas mozek vytvari nove neuronalni cesty a navyky",
    alertTitle: "Vedecky prokazano",
    alertDesc: "Vyzkum Phillippa Lally et al. (2010) ukazal, ze vytvoreni automatickeho navyku trva v prumeru 66 dni (rozsah: 18-254 dni). Toto je biologicky proces, ne nedostatek vule!",
    whatIsIt: "Co je neuroplasticita?",
    whatIsItDesc: "Neuroplasticita je schopnost mozku vytvaret nove neuronalni spojeni a preprogramovat se. Kdyz opakujete urcite chovani:",
    neuro1: "Vytvareji se nove neuronalni cesty",
    neuro1Desc: "Neurony, ktere se spolecne aktivuji, se propojuji (Hebb's law)",
    neuro2: "Synapse se posiluji",
    neuro2Desc: "Opakovanim se spojeni stavaji silnejsimi a rychlejsimi",
    neuro3: "Chovani se automatizuje",
    neuro3Desc: "Po ~66 dnech se navyk presune z vedome casti mozku (prefrontalni kura) do podvedome (bazalni ganglia)",
    howItWorks: "Jak to funguje? 4 faze neuroplasticity",
    howItWorksDesc: "Vytvareni navyku neni linearni proces, ale probiha ve 4 fazich. Kazda faze ma sve charakteristiky a vyzvy:",
    phase1Title: "Faze 1: Budovani neuronalnich cest (Dny 1-21)",
    phase1What: "Co se deje:",
    phase1WhatDesc: " Vas mozek vytvari uplne nova neuronalni spojeni. Jako kdyz razite cestu dzungli - je to tezke a vycerpavajici.",
    phase1Chars: "Charakteristika:",
    phase1C1: "Vyzaduje nejvice vedomého usili",
    phase1C2: "Snadne zapomenout",
    phase1C3: "Citite odpor (\"Nechce se mi\")",
    phase1C4: "Vysoka spotreba willpower",
    phase1Tip: "Tip:",
    phase1TipDesc: " Pouzijte IF-THEN plany! Pomohou prekonat nejvetsi barieru.",
    phase2Title: "Faze 2: Posilovani spojeni (Dny 22-42)",
    phase2What: "Co se deje:",
    phase2WhatDesc: " Synapse (spojeni mezi neurony) se zpevnuji. Cesta dzungli se stava zretelnejsi a proslpapanejsi.",
    phase2C1: "Zacina byt snazsi",
    phase2C2: "Stale vyzaduje usili, ale mene",
    phase2C3: "Prilezitostna selhani jsou normalni",
    phase2C4: "Budujete momentum",
    phase2Tip: "Tip:",
    phase2TipDesc: " Gratulujte si! Prekonali jste nejtezssi cast.",
    phase3Title: "Faze 3: Blizici se automatizace (Dny 43-66)",
    phase3What: "Co se deje:",
    phase3WhatDesc: " Navyk se presouvá z prefrontalni kury (vedome mysleni) do bazalnich ganglii (automaticke chovani). Cesta je uz pevna.",
    phase3C1: "Vyrazne prirozenejsi pocit",
    phase3C2: "Minimalni vedome usili",
    phase3C3: "Zapominani je vzacne",
    phase3C4: "Temer automaticke chovani",
    phase3Tip: "Tip:",
    phase3TipDesc: " Jeste par tydnu konzistence - jste na dosah!",
    phase4Title: "Faze 4: Navyk integrovany (Den 67+)",
    phase4What: "Co se deje:",
    phase4WhatDesc: " Navyk je plne automatizovany a integrovany do vasi identity. Cesta je siroka dalnice - projdete ji bez premysleni.",
    phase4C1: "Minimalni usili potrebne",
    phase4C2: "Zcela automaticke a prirozene",
    phase4C3: "Soucast vasi rutiny a identity",
    phase4C4: "Zpevnene neuronalni cesty",
    phase4Congrats: "Gratuluji!",
    phase4CongratsDesc: " Uspesne jste preprogramovali svuj mozek!",
    milestones: "Dulezite milniky na ceste",
    day7: "Den 7 - Prvni tyden!",
    day7Desc: "Prekonali jste pocatecni nadseni. Prvni neuronalni spojeni se tvori.",
    day21: "Den 21 - Konec Faze 1!",
    day21Desc: "Hlavni neuronalni cesty jsou vytvoreny. Od ted bude snazsi!",
    day30: "Den 30 - Mesic konzistence",
    day30Desc: "Navyk zacina byt soucasti vasi rutiny. Synapse jsou silnejsi.",
    day43: "Den 43 - Prechod do Faze 3",
    day43Desc: "Automatizace zacina! Presun z vedome casti do podvedome.",
    day66: "Den 66 - Prumerna automatizace!",
    day66Desc: "Pro vetsinu lidi je navyk nyni automaticky. Uspech!",
    day100: "Den 100 - Plna integrace",
    day100Desc: "Navyk je nerozlucne spojen s vasi identitou. Pevne zakoreneny!",
    myths: "Caste myty a chyby",
    myth1: "Mytus: \"Vytvoreni navyku trva 21 dni\"",
    myth1Desc: "Tento mytus vznikl spatnou interpretaci vyzkumu. Prumer je 66 dni, ale muze to byt 18-254 dni podle slozitosti navyku!",
    myth2: "Chyba: Vzdat to ve Fazi 1",
    myth2Desc: "Dny 1-21 jsou NEJTEZSSI. Pokud to vzdate zde, je to normalni biologicka reakce, ne nedostatek vule. Zkuste znovu s IF-THEN planem!",
    myth3: "Mytus: \"Jeden vynechany den vse znici\"",
    myth3Desc: "Neuronalni cesty se neznici jednim vynechanim. Dulezite je vratit se zpet nasledujici den!",
    howToUse: "Jak pouzivat Neuroplastickou Timeline v aplikaci",
    use1: "Na karte navyku:",
    use1Desc: " Uvidite aktualni fazi a pocet dni do dalsi faze",
    use2: "Neuroplasticity Timeline component:",
    use2Desc: " Vizualizace vsech 4 fazi s vasim aktualnim pokrokem",
    use3: "Milniky:",
    use3Desc: " Dostanete notifikaci pri dosazeni klicovych milniku (7, 21, 30, 43, 66, 100 dni)",
    use4: "Motivacni zpravy:",
    use4Desc: " Kazda faze ma specificke povzbuzeni a rady podle aktualni biologicke faze",
    useTip: "Tip:",
    useTipDesc: " Sledujte faze, ne jen \"streak\"! Pochopite, proc je to tezke a budete mit trpelivost.",
    researchTitle: "Vyzkum a citace",
    lallyRef: "Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010).",
    lallyDesc: " How are habits formed: Modelling habit formation in the real world. ",
    lallyJournal: "European Journal of Social Psychology, 40",
    lallyNote: "Studie sledovala 96 lidi po dobu 12 tydnu. Prumerny cas k automatizaci navyku byl 66 dni (median), ale rozsah byl siroky: 18-254 dni. Slozitejsi navyky (napr. cviceni) trvaly dele nez jednoduche (piti vody).",
    hebbRef: "Hebb, D. O. (1949).",
    hebbTitle: " The Organization of Behavior.",
    hebbNote: "\"Neurony, ktere se spolecne aktivuji, se propojuji\" (Neurons that fire together, wire together) - zaklad neuroplasticity.",
  },
}

export default async function NeuroplasticityHelpPage() {
  const locale = await getLocale()
  const l = (locale === "cs" ? "cs" : "en") as "en" | "cs"
  const c = t[l]

  const phases = [
    { border: "border-red-500", bg: "bg-red-500/5", emoji: "\u{1F331}", title: c.phase1Title, what: c.phase1What, whatDesc: c.phase1WhatDesc, chars: c.phase1Chars, items: [c.phase1C1, c.phase1C2, c.phase1C3, c.phase1C4], tipLabel: c.phase1Tip, tip: c.phase1TipDesc, tipColor: "text-purple-600 dark:text-purple-400" },
    { border: "border-orange-500", bg: "bg-orange-500/5", emoji: "\u{1F33F}", title: c.phase2Title, what: c.phase2What, whatDesc: c.phase2WhatDesc, chars: c.phase1Chars, items: [c.phase2C1, c.phase2C2, c.phase2C3, c.phase2C4], tipLabel: c.phase2Tip, tip: c.phase2TipDesc, tipColor: "text-purple-600 dark:text-purple-400" },
    { border: "border-yellow-500", bg: "bg-yellow-500/5", emoji: "\u{1F333}", title: c.phase3Title, what: c.phase3What, whatDesc: c.phase3WhatDesc, chars: c.phase1Chars, items: [c.phase3C1, c.phase3C2, c.phase3C3, c.phase3C4], tipLabel: c.phase3Tip, tip: c.phase3TipDesc, tipColor: "text-purple-600 dark:text-purple-400" },
    { border: "border-green-500", bg: "bg-green-500/5", emoji: "\u{1F332}", title: c.phase4Title, what: c.phase4What, whatDesc: c.phase4WhatDesc, chars: c.phase1Chars, items: [c.phase4C1, c.phase4C2, c.phase4C3, c.phase4C4], tipLabel: c.phase4Congrats, tip: c.phase4CongratsDesc, tipColor: "text-green-600 dark:text-green-400" },
  ]

  const milestoneData = [
    { emoji: "7\uFE0F\u20E3", title: c.day7, desc: c.day7Desc },
    { emoji: "2\uFE0F\u20E31\uFE0F\u20E3", title: c.day21, desc: c.day21Desc },
    { emoji: "3\uFE0F\u20E30\uFE0F\u20E3", title: c.day30, desc: c.day30Desc },
    { emoji: "4\uFE0F\u20E33\uFE0F\u20E3", title: c.day43, desc: c.day43Desc },
    { emoji: "6\uFE0F\u20E36\uFE0F\u20E3", title: c.day66, desc: c.day66Desc },
    { emoji: "\u{1F4AF}", title: c.day100, desc: c.day100Desc },
  ]

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <Link href="/help"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />{c.back}</Button></Link>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center"><Brain className="h-6 w-6 text-purple-500" /></div>
            <h1 className="text-3xl font-bold tracking-tight">{c.title}</h1>
          </div>
          <p className="text-muted-foreground text-lg">{c.subtitle}</p>
        </div>

        <Alert><Brain className="h-4 w-4" /><AlertTitle>{c.alertTitle}</AlertTitle><AlertDescription>{c.alertDesc}</AlertDescription></Alert>

        <Card>
          <CardHeader><CardTitle>{c.whatIsIt}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p><strong>{l === "cs" ? "Neuroplasticita" : "Neuroplasticity"}</strong> {c.whatIsItDesc}</p>
            <div className="bg-muted p-4 rounded-lg space-y-3">
              {[{ t: c.neuro1, d: c.neuro1Desc }, { t: c.neuro2, d: c.neuro2Desc }, { t: c.neuro3, d: c.neuro3Desc }].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <div><p className="font-semibold">{item.t}</p><p className="text-sm text-muted-foreground">{item.d}</p></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.howItWorks}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="mb-4">{c.howItWorksDesc}</p>
            {phases.map((phase, i) => (
              <div key={i} className={`border-l-4 ${phase.border} pl-4 py-3 ${phase.bg} rounded-r-lg`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{phase.emoji}</span>
                  <h3 className="font-bold text-lg">{phase.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2"><strong>{phase.what}</strong>{phase.whatDesc}</p>
                <div className="space-y-1 text-sm">
                  <p><strong>{phase.chars}</strong></p>
                  <ul className="list-disc list-inside ml-2 text-muted-foreground space-y-1">
                    {phase.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                  <p className={`mt-2 ${phase.tipColor}`}><strong>{phase.tipLabel}</strong>{phase.tip}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.milestones}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3">
              {milestoneData.map((m, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <span className="text-2xl">{m.emoji}</span>
                  <div><p className="font-medium">{m.title}</p><p className="text-sm text-muted-foreground">{m.desc}</p></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.myths}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[{ t: c.myth1, d: c.myth1Desc }, { t: c.myth2, d: c.myth2Desc }, { t: c.myth3, d: c.myth3Desc }].map((m, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-1"><span className="text-red-500">{"\u274C"}</span><strong>{m.t}</strong></div>
                <p className="text-sm text-muted-foreground ml-6">{m.d}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader><CardTitle>{c.howToUse}</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>{c.use1}</strong>{c.use1Desc}</li>
              <li><strong>{c.use2}</strong>{c.use2Desc}</li>
              <li><strong>{c.use3}</strong>{c.use3Desc}</li>
              <li><strong>{c.use4}</strong>{c.use4Desc}</li>
            </ol>
            <p className="mt-4 text-muted-foreground"><strong>{c.useTip}</strong> {c.useTipDesc}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.researchTitle}</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>{c.lallyRef}</strong>{c.lallyDesc}<em>{c.lallyJournal}</em>(6), 998-1009.</p>
            <p className="text-muted-foreground mb-4">{c.lallyNote}</p>
            <hr className="my-4" />
            <p><strong>{c.hebbRef}</strong>{c.hebbTitle}</p>
            <p className="text-muted-foreground">{c.hebbNote}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
