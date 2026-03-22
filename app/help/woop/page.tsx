import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Award, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getLocale } from "next-intl/server"

export const metadata: Metadata = {
  title: "WOOP Method | Help",
  description: "Double your goal success rate with the WOOP method",
}

const t = {
  en: {
    back: "Back to help",
    title: "WOOP Method",
    subtitle: "Wish, Outcome, Obstacle, Plan - a 4-step strategy that doubles your success rate",
    alertTitle: "Scientifically proven",
    alertDesc: "Research by Gabriele Oettingen showed that people using WOOP are 2x more successful in achieving their goals than people using only positive visualization.",
    whatIsIt: "What is WOOP?",
    whatIsItDesc: "WOOP is a scientifically backed mental contrast technique developed by psychologist Gabriele Oettingen. Unlike pure positive thinking, WOOP prepares you for real obstacles:",
    wishTitle: "Wish",
    wishDesc: "What do you want to achieve? Your goal or habit.",
    outcomeTitle: "Outcome",
    outcomeDesc: "How will you feel when you achieve it? Success visualization.",
    obstacleTitle: "Obstacle",
    obstacleDesc: "What might prevent you? Realistic obstacles.",
    planTitle: "Plan",
    planDesc: "What will you do when you encounter the obstacle? IF-THEN plan.",
    howItWorks: "How does it work?",
    howItWorksDesc: "WOOP combines positive visualization (Wish + Outcome) with realistic preparation (Obstacle + Plan). This combination is much more effective than positive thinking alone:",
    how1: "Mental contrast:",
    how1Desc: " Imagining success PLUS obstacles creates stronger motivation in the brain than just imagining success.",
    how2: "Proactive problem solving:",
    how2Desc: " Instead of being surprised by obstacles, you're prepared with a specific plan.",
    how3: "IF-THEN implementation:",
    how3Desc: " A plan in the format \"When I encounter X, I'll do Y\" automates your response to obstacles.",
    how4: "Realistic motivation:",
    how4Desc: " You don't ignore problems, avoiding disappointment from unrealistic expectations.",
    exampleTitle: "Example: How to Create a WOOP Plan",
    exampleDesc: "Let's say you want to build a regular reading habit:",
    exWishTitle: "Wish",
    exWishQ: "Question:",
    exWishQDesc: " What do you want to achieve?",
    exWishEx: "Example:",
    exWishExDesc: " \"I want to read every evening before bed and expand my knowledge.\"",
    exOutcomeTitle: "Outcome",
    exOutcomeQ: "Question:",
    exOutcomeQDesc: " How will you feel when you achieve it?",
    exOutcomeEx: "Example:",
    exOutcomeExDesc: " \"I'll feel calm, intellectually stimulated, and proud that I'm constantly learning. I'll be less stressed and sleep better.\"",
    exObstacleTitle: "Obstacle",
    exObstacleQ: "Question:",
    exObstacleQDesc: " What might prevent you? Be realistic!",
    exObstacleEx: "Example:",
    exObstacleExDesc: " \"In the evening I'm often tired and instead of reading I reach for my phone and scroll social media or watch YouTube.\"",
    exPlanTitle: "Plan",
    exPlanQ: "Question:",
    exPlanQDesc: " What will you do when you encounter this obstacle?",
    exPlanEx: "Example:",
    exPlanExDesc: " \"When I lie in bed and want to reach for my phone, instead I'll place the phone face-down on the nightstand and pick up the book I have ready beside the bed. I'll read at least 5 pages.\"",
    exPlanTip: "Tip:",
    exPlanTipDesc: " This is an IF-THEN plan! \"When [obstacle], then [alternative action]\"",
    moreExamples: "More WOOP Plan Examples",
    exMorning: "Morning Exercise",
    exMorningDetail: "W: Exercise every morning for 10 minutes\nO: I'll be energetic and healthy\nO: It'll be cold in the morning and I won't want to get out of bed\nP: When the alarm goes off, I'll immediately get up and put on workout clothes I have ready on the chair",
    exHealthy: "Healthy Eating",
    exHealthyDetail: "W: Eat more vegetables\nO: I'll feel healthier and lighter\nO: At work they have sweets and unhealthy snacks\nP: When I'm hungry at work, I'll eat a carrot or apple I prepared in the morning in a container",
    exMeditation: "Meditation",
    exMeditationDetail: "W: Meditate 5 minutes daily\nO: I'll be calmer and less stressed\nO: I'll forget or have \"more important\" things\nP: When I make my morning coffee, before drinking it I'll sit on a cushion and meditate until the coffee cools slightly",
    whyBetter: "Why does WOOP work better than positive thinking alone?",
    onlyPositive: "Only positive visualization",
    onlyPositiveDesc: "You imagine only success -> Brain thinks you've already reached the goal -> Lower motivation -> Obstacles surprise you -> You give up",
    woopContrast: "WOOP (Mental contrast)",
    woopContrastDesc: "You imagine success AND obstacles -> Brain perceives the gap between present and goal -> Higher motivation -> Prepared for obstacles -> You continue",
    howInApp: "How to create a WOOP plan in the app",
    app1: "Open the habit detail by clicking the habit card",
    app2: "Click the \"Create WOOP Plan\" button",
    app3: "The wizard will guide you through all 4 steps:",
    app3a: "Step 1:",
    app3aDesc: " Write your wish (Wish)",
    app3b: "Step 2:",
    app3bDesc: " Describe the expected outcome (Outcome)",
    app3c: "Step 3:",
    app3cDesc: " Identify the main obstacle (Obstacle)",
    app3d: "Step 4:",
    app3dDesc: " Create an IF-THEN plan (Plan)",
    app4: "The WOOP plan will be saved and displayed with your habit",
    app5: "You can edit it anytime or create a new one",
    appTip: "Tip:",
    appTipDesc: " Create a WOOP plan for habits where you struggle with consistency!",
    researchTitle: "Research & Citations",
    ref1: "Oettingen, G. (2014).",
    ref1Desc: " Rethinking Positive Thinking: Inside the New Science of Motivation. ",
    ref1Journal: "Current Directions in Psychological Science.",
    ref1Note: "Studies showed that participants using the WOOP method had 2x higher success rate in achieving goals (physical activity, healthy eating, exam preparation) than the control group using only positive visualization.",
    ref2: "Oettingen, G., & Gollwitzer, P. M. (2010).",
    ref2Desc: " Strategies of setting and implementing goals: Mental contrasting and implementation intentions.",
    ref2Note: "The combination of mental contrast (WOOP) and implementation intentions (IF-THEN) creates the strongest effect - effect size up to d=0.94!",
  },
  cs: {
    back: "Zpet na napovedu",
    title: "WOOP Metoda",
    subtitle: "Wish, Outcome, Obstacle, Plan - 4krokova strategie, ktera zdvojnasobuje uspesnost",
    alertTitle: "Vedecky prokazano",
    alertDesc: "Vyzkum Gabriele Oettingen ukazal, ze lide pouzivajici WOOP jsou 2x uspesnejsi v dosahovani svych cilu nez lide pouzivajici pouze pozitivni vizualizaci.",
    whatIsIt: "Co je WOOP?",
    whatIsItDesc: "WOOP je vedecky podlozena technika mentalniho kontrastu vyvinuta psycholozkou Gabriele Oettingen. Na rozdil od ciste pozitivniho mysleni, WOOP vas pripravuje na realne prekazky:",
    wishTitle: "Wish (Prani)",
    wishDesc: "Co chcete dosahnout? Vas cil nebo navyk.",
    outcomeTitle: "Outcome (Vysledek)",
    outcomeDesc: "Jak se budete citit, kdyz to dosahnete? Vizualizace uspechu.",
    obstacleTitle: "Obstacle (Prekazka)",
    obstacleDesc: "Co vam muze zabranit? Realisticke prekazky.",
    planTitle: "Plan (Plan)",
    planDesc: "Co udelate, kdyz narazite na prekazku? IF-THEN plan.",
    howItWorks: "Jak to funguje?",
    howItWorksDesc: "WOOP kombinuje pozitivni vizualizaci (Wish + Outcome) s realistickou pripravou (Obstacle + Plan). Tato kombinace je mnohem ucinnejsi nez samotne pozitivni mysleni:",
    how1: "Mentalni kontrast:",
    how1Desc: " Predstaveni uspechu PLUS prezazek vytvari v mozku silnejsi motivaci nez jen predstavovani uspechu.",
    how2: "Proaktivni reseni problemu:",
    how2Desc: " Misto prekvapeni prekazkami jste na ne pripraveni s konkretnim planem.",
    how3: "IF-THEN implementace:",
    how3Desc: " Plan ve formatu \"Kdyz narazim na X, pak udelam Y\" automatizuje reakci na prekazky.",
    how4: "Realisticka motivace:",
    how4Desc: " Neignorujete problemy, cimz se vyhybate zklamani z nerealnich ocekavani.",
    exampleTitle: "Priklad: Jak vytvorit WOOP plan",
    exampleDesc: "Predstavme si, ze chcete vybudovat navyk pravidelneho cteni:",
    exWishTitle: "Wish (Prani)",
    exWishQ: "Otazka:",
    exWishQDesc: " Co chcete dosahnout?",
    exWishEx: "Priklad:",
    exWishExDesc: " \"Chci cist kazdy vecer pred spanim a rozsirit sve vedomosti.\"",
    exOutcomeTitle: "Outcome (Vysledek)",
    exOutcomeQ: "Otazka:",
    exOutcomeQDesc: " Jak se budete citit, kdyz to dosahnete?",
    exOutcomeEx: "Priklad:",
    exOutcomeExDesc: " \"Budu se citit klidne, intelektualne stimulovane a hrde na to, ze se neustale vzdelavam. Budu mene stresovany a lepe usnu.\"",
    exObstacleTitle: "Obstacle (Prekazka)",
    exObstacleQ: "Otazka:",
    exObstacleQDesc: " Co vam muze zabranit? Budte realiste!",
    exObstacleEx: "Priklad:",
    exObstacleExDesc: " \"Vecer jsem casto unaveny a misto cteni saham po telefonu a scrolluji socialni site nebo sleduji YouTube.\"",
    exPlanTitle: "Plan (Plan)",
    exPlanQ: "Otazka:",
    exPlanQDesc: " Co udelate, kdyz narazite na tuto prekazku?",
    exPlanEx: "Priklad:",
    exPlanExDesc: " \"Kdyz si vecer lehnu do postele a chci sahnout po telefonu, misto toho polozim telefon na nocni stolek obrazovkou dolu a vezmu knihu, kterou mam pripravenou vedle postele. Prectu alespon 5 stran.\"",
    exPlanTip: "Tip:",
    exPlanTipDesc: " Toto je IF-THEN plan! \"Kdyz [prekazka], pak [alternativni akce]\"",
    moreExamples: "Dalsi priklady WOOP planu",
    exMorning: "Ranni cviceni",
    exMorningDetail: "W: Cvicit kazde rano 10 minut\nO: Budu energicky a zdravy\nO: Rano bude zima a nechce se mi z postele\nP: Kdyz zazvoni budik, okamzite vstanu a obleknu si sportovni obleceni, ktere mam pripravene na zidli",
    exHealthy: "Zdrave stravovani",
    exHealthyDetail: "W: Jist vic zeleniny\nO: Budu se citit zdraveji a lehceji\nO: V praci maji sladkosti a nezdrave svaciny\nP: Kdyz budu mit hlad v praci, snim mrkev nebo jablko, ktere si pripravim rano do krabicky",
    exMeditation: "Meditace",
    exMeditationDetail: "W: Meditovat 5 minut denne\nO: Budu klidnejsi a mene stresovany\nO: Zapomenu nebo budu mit \"dulezitejsi\" veci\nP: Kdyz si uvarim ranni kavu, nez si ji dam, sednu si na polstar a medituju, dokud se kava trochu neochladi",
    whyBetter: "Proc WOOP funguje lepe nez samotne pozitivni mysleni?",
    onlyPositive: "Pouze pozitivni vizualizace",
    onlyPositiveDesc: "Predstavujete si jen uspech → Mozek si mysli, ze uz jste dosahli cile → Nizsi motivace → Prekazky vas prekvapi → Vzdate to",
    woopContrast: "WOOP (Mentalni kontrast)",
    woopContrastDesc: "Predstavujete si uspech I prekazky → Mozek vnima rozdil mezi soucasnosti a cilem → Vyssi motivace → Pripraveni na prekazky → Pokracujete dal",
    howInApp: "Jak vytvorit WOOP plan v aplikaci",
    app1: "Otevrte detail navyku kliknutim na kartu navyku",
    app2: "Kliknete na tlacitko \"Vytvorit WOOP plan\"",
    app3: "Pruvodce (wizard) vas provede vsemi 4 kroky:",
    app3a: "Krok 1:",
    app3aDesc: " Napiste sve prani (Wish)",
    app3b: "Krok 2:",
    app3bDesc: " Popiste ocekavany vysledek (Outcome)",
    app3c: "Krok 3:",
    app3cDesc: " Identifikujte hlavni prekazku (Obstacle)",
    app3d: "Krok 4:",
    app3dDesc: " Vytvorte IF-THEN plan (Plan)",
    app4: "WOOP plan se ulozi a zobrazi se u vaseho navyku",
    app5: "Muzete jej kdykoli upravit nebo vytvorit novy",
    appTip: "Tip:",
    appTipDesc: " Vytvorte WOOP plan pro navyky, kde mate potize s konzistenci!",
    researchTitle: "Vyzkum a citace",
    ref1: "Oettingen, G. (2014).",
    ref1Desc: " Rethinking Positive Thinking: Inside the New Science of Motivation. ",
    ref1Journal: "Current Directions in Psychological Science.",
    ref1Note: "Studie ukazaly, ze ucastnici pouzivajici WOOP metodu meli 2x vyssi uspesnost v dosahovani cilu (fyzicka aktivita, zdrave stravovani, priprava na zkousky) nez kontrolni skupina pouzivajici pouze pozitivni vizualizaci.",
    ref2: "Oettingen, G., & Gollwitzer, P. M. (2010).",
    ref2Desc: " Strategies of setting and implementing goals: Mental contrasting and implementation intentions.",
    ref2Note: "Kombinace mentalniho kontrastu (WOOP) a implementation intentions (IF-THEN) vytvari nejsilnejsi efekt - effect size az d=0.94!",
  },
}

export default async function WoopHelpPage() {
  const locale = await getLocale()
  const l = (locale === "cs" ? "cs" : "en") as "en" | "cs"
  const c = t[l]

  const woopSteps = [
    { letter: "W", color: "bg-blue-500", title: c.wishTitle, desc: c.wishDesc },
    { letter: "O", color: "bg-green-500", title: c.outcomeTitle, desc: c.outcomeDesc },
    { letter: "O", color: "bg-orange-500", title: c.obstacleTitle, desc: c.obstacleDesc },
    { letter: "P", color: "bg-purple-500", title: c.planTitle, desc: c.planDesc },
  ]

  const exSteps = [
    { letter: "W", color: "bg-blue-500", border: "border-blue-500", bg: "bg-blue-500/5", title: c.exWishTitle, q: c.exWishQ, qd: c.exWishQDesc, ex: c.exWishEx, exd: c.exWishExDesc },
    { letter: "O", color: "bg-green-500", border: "border-green-500", bg: "bg-green-500/5", title: c.exOutcomeTitle, q: c.exOutcomeQ, qd: c.exOutcomeQDesc, ex: c.exOutcomeEx, exd: c.exOutcomeExDesc },
    { letter: "O", color: "bg-orange-500", border: "border-orange-500", bg: "bg-orange-500/5", title: c.exObstacleTitle, q: c.exObstacleQ, qd: c.exObstacleQDesc, ex: c.exObstacleEx, exd: c.exObstacleExDesc },
  ]

  const moreExColors = ["border-green-500", "border-blue-500", "border-purple-500"]
  const moreExTitles = [c.exMorning, c.exHealthy, c.exMeditation]
  const moreExDetails = [c.exMorningDetail, c.exHealthyDetail, c.exMeditationDetail]

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <Link href="/help"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />{c.back}</Button></Link>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center"><Award className="h-6 w-6 text-blue-500" /></div>
            <h1 className="text-3xl font-bold tracking-tight">{c.title}</h1>
          </div>
          <p className="text-muted-foreground text-lg">{c.subtitle}</p>
        </div>

        <Alert><Award className="h-4 w-4" /><AlertTitle>{c.alertTitle}</AlertTitle><AlertDescription>{c.alertDesc}</AlertDescription></Alert>

        <Card>
          <CardHeader><CardTitle>{c.whatIsIt}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p><strong>WOOP</strong> {c.whatIsItDesc}</p>
            <div className="bg-muted p-4 rounded-lg space-y-3">
              {woopSteps.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>{s.letter}</div>
                  <div><p className="font-semibold">{s.title}</p><p className="text-sm text-muted-foreground">{s.desc}</p></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.howItWorks}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p>{c.howItWorksDesc}</p>
            {[c.how1, c.how2, c.how3, c.how4].map((title, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div><strong>{title}</strong>{[c.how1Desc, c.how2Desc, c.how3Desc, c.how4Desc][i]}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.exampleTitle}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-4">{c.exampleDesc}</p>
            <div className="space-y-4">
              {exSteps.map((s, i) => (
                <div key={i} className={`border-l-4 ${s.border} pl-4 py-3 ${s.bg} rounded-r-lg`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-full ${s.color} flex items-center justify-center text-white text-xs font-bold`}>{s.letter}</div>
                    <h3 className="font-bold">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2"><strong>{s.q}</strong>{s.qd}</p>
                  <p className="text-sm"><strong>{s.ex}</strong>{s.exd}</p>
                </div>
              ))}
              <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-500/5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">P</div>
                  <h3 className="font-bold">{c.exPlanTitle}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2"><strong>{c.exPlanQ}</strong>{c.exPlanQDesc}</p>
                <p className="text-sm mb-2"><strong>{c.exPlanEx}</strong>{c.exPlanExDesc}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2"><strong>{c.exPlanTip}</strong> {c.exPlanTipDesc}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.moreExamples}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {moreExTitles.map((title, i) => (
              <div key={i} className={`border-l-4 ${moreExColors[i]} pl-4 py-2`}>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{moreExDetails[i]}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.whyBetter}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <p className="font-medium mb-2 flex items-center gap-2"><span>{"\u274C"}</span> {c.onlyPositive}</p>
              <p className="text-sm text-muted-foreground">{c.onlyPositiveDesc}</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium mb-2 flex items-center gap-2"><span>{"\u2705"}</span> {c.woopContrast}</p>
              <p className="text-sm text-muted-foreground">{c.woopContrastDesc}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader><CardTitle>{c.howInApp}</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ol className="list-decimal list-inside space-y-2">
              <li>{c.app1}</li>
              <li>{c.app2}</li>
              <li>{c.app3}
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-muted-foreground">
                  <li><strong>{c.app3a}</strong>{c.app3aDesc}</li>
                  <li><strong>{c.app3b}</strong>{c.app3bDesc}</li>
                  <li><strong>{c.app3c}</strong>{c.app3cDesc}</li>
                  <li><strong>{c.app3d}</strong>{c.app3dDesc}</li>
                </ul>
              </li>
              <li>{c.app4}</li>
              <li>{c.app5}</li>
            </ol>
            <p className="mt-4 text-muted-foreground"><strong>{c.appTip}</strong> {c.appTipDesc}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.researchTitle}</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>{c.ref1}</strong>{c.ref1Desc}<em>{c.ref1Journal}</em></p>
            <p className="text-muted-foreground mb-4">{c.ref1Note}</p>
            <hr className="my-4" />
            <p><strong>{c.ref2}</strong>{c.ref2Desc}</p>
            <p className="text-muted-foreground">{c.ref2Note}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
