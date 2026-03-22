import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Zap, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getLocale } from "next-intl/server"

export const metadata: Metadata = {
  title: "IF-THEN Implementation Intentions | Help",
  description: "How to use Implementation Intentions for 65% higher success rate",
}

const t = {
  en: {
    back: "Back to help",
    title: "IF-THEN Implementation Intentions",
    subtitle: "Increase your habit success by 65% with specific \"If-Then\" plans",
    alertTitle: "Scientifically proven",
    alertDesc: "Research by Peter Gollwitzer (1999) showed that people with implementation intentions have 65% higher success (effect size d=0.65) in fulfilling their goals than people without a specific plan.",
    whatIsIt: "What are Implementation Intentions?",
    whatIsItDesc: "Implementation intentions are specific plans that connect a situation (trigger) with an action. Instead of vague \"I'll exercise\" you create an exact plan:",
    format: "Format: \"When [situation], then [action] in [place]\"",
    formatExample: "Example: \"When I wake up at 7:00, I'll drink a glass of water in the kitchen\"",
    howItWorks: "How does it work?",
    howItWorksDesc: "When you create an IF-THEN plan, your brain creates an automatic connection between the situation and the action:",
    how1: "Reduces need for willpower:",
    how1Desc: " You don't have to decide \"Should I do it now?\" - the brain does it automatically.",
    how2: "Creates a mental trigger:",
    how2Desc: " When the situation occurs, the brain immediately recalls the action.",
    how3: "Eliminates excuses:",
    how3Desc: " \"I didn't have time\" stops working because you have precisely defined WHEN.",
    examplesTitle: "Examples of Good IF-THEN Plans",
    exExercise: "Exercise",
    exExerciseDesc: "When I get home from work at 5:00, I'll do 10 push-ups in the living room",
    exHealthy: "Healthy Eating",
    exHealthyDesc: "When I have lunch, I'll eat one fruit as dessert in the kitchen",
    exMeditation: "Meditation",
    exMeditationDesc: "When I get out of bed at 7:00, I'll meditate for 2 minutes in the bedroom",
    exReading: "Reading",
    exReadingDesc: "When I get into bed at night, I'll read 10 pages of a book in the bedroom",
    mistakes: "Common Mistakes (and how to avoid them)",
    mistake1: "Too vague trigger",
    mistake1Desc: "\"When I have time...\" -> Exactly WHEN? Specify a time or situation!",
    mistake2: "Undefined action",
    mistake2Desc: "\"...then I'll eat healthy\" -> WHAT specifically? \"I'll eat an apple\" is better!",
    mistake3: "Missing context",
    mistake3Desc: "You don't specify WHERE -> Adding a place strengthens the mental connection!",
    howInApp: "How to create an IF-THEN plan in the app",
    app1: "Click \"Add Habit\" in the dashboard",
    app2: "Find the \"IF-THEN Implementation Intention\" section (with (i) icon for more info)",
    app3: "Fill in three fields:",
    app3a: "When:",
    app3aDesc: " Specific time or situation",
    app3b: "What I'll do:",
    app3bDesc: " Exact action",
    app3c: "Where:",
    app3cDesc: " Place (optional but recommended)",
    app4: "Or use ready-made templates by clicking \"Templates\"",
    researchTitle: "Research & Citations",
    ref1: "Gollwitzer, P. M. (1999).",
    ref1Desc: " Implementation intentions: Strong effects of simple plans. ",
    ref1Journal: "American Psychologist, 54",
    ref1Note: "Meta-analysis of 94 studies with more than 8000 participants showed a consistent effect size d=0.65 (medium-large effect).",
  },
  cs: {
    back: "Zpet na napovedu",
    title: "IF-THEN Implementacni zamery",
    subtitle: "Zvyste uspesnost svych navyku o 65% pomoci specifickych \"Kdyz-Pak\" planu",
    alertTitle: "Vedecky prokazano",
    alertDesc: "Vyzkum Petera Gollwitzera (1999) ukazal, ze lide s implementation intentions maji o 65% vyssi uspesnost (effect size d=0.65) v plneni svych cilu nez lide bez specifickeho planu.",
    whatIsIt: "Co jsou Implementation Intentions?",
    whatIsItDesc: "Implementation intentions jsou konkretni plany, ktere propojuji situaci (trigger) s akci. Misto vagniho \"Budu cvicit\" vytvorite presny plan:",
    format: "Format: \"Kdyz [situace], pak [akce] v [miste]\"",
    formatExample: "Priklad: \"Kdyz se vzbudim v 7:00, vypiju sklenici vody v kuchyni\"",
    howItWorks: "Jak to funguje?",
    howItWorksDesc: "Kdyz vytvorite IF-THEN plan, vas mozek si vytvori automaticke spojeni mezi situaci a akci:",
    how1: "Snizuje potrebu willpower:",
    how1Desc: " Nemusite se rozhodovat \"Mam to ted udelat?\" - mozek to udela automaticky.",
    how2: "Vytvari mentalni trigger:",
    how2Desc: " Kdyz nastane situace, mozek si okamzite vybavi akci.",
    how3: "Eliminuje vymluvy:",
    how3Desc: " \"Nemel jsem cas\" prestava fungovat, protoze mate presne definovane KDY.",
    examplesTitle: "Priklady dobrych IF-THEN planu",
    exExercise: "Cviceni",
    exExerciseDesc: "Kdyz se vratim z prace v 17:00, udelam 10 kliku v obyvaku",
    exHealthy: "Zdrava strava",
    exHealthyDesc: "Kdyz si dam obed, pak snim jedno ovoce jako dezert v kuchyni",
    exMeditation: "Meditace",
    exMeditationDesc: "Kdyz vstanu z postele v 7:00, medituju 2 minuty v loznici",
    exReading: "Cteni",
    exReadingDesc: "Kdyz si lehnu do postele vecer, prectu 10 stran knihy v loznici",
    mistakes: "Caste chyby (a jak se jim vyhnout)",
    mistake1: "Prilis vagni trigger",
    mistake1Desc: "\"Kdyz budu mit cas...\" → Presne KDY? Specifikujte cas nebo situaci!",
    mistake2: "Neurcita akce",
    mistake2Desc: "\"...pak budu zdrave jist\" → CO konkretne? \"Snim jablko\" je lepsi!",
    mistake3: "Chybejici kontext",
    mistake3Desc: "Neurcite KDE → Pridani mista posili mentalni spojeni!",
    howInApp: "Jak vytvorit IF-THEN plan v aplikaci",
    app1: "Kliknete na \"Pridat navyk\" v dashboardu",
    app2: "Najdete sekci \"IF-THEN Implementacni zamer\" (s (i) ikonou pro vice info)",
    app3: "Vyplnte tri pole:",
    app3a: "Kdy:",
    app3aDesc: " Konkretni cas nebo situace",
    app3b: "Co udelam:",
    app3bDesc: " Presna akce",
    app3c: "Kde:",
    app3cDesc: " Misto (volitelne, ale doporucene)",
    app4: "Nebo pouzijte pripravene sablony kliknutim na \"Sablony\"",
    researchTitle: "Vyzkum a citace",
    ref1: "Gollwitzer, P. M. (1999).",
    ref1Desc: " Implementation intentions: Strong effects of simple plans. ",
    ref1Journal: "American Psychologist, 54",
    ref1Note: "Meta-analyza 94 studii s vice nez 8000 ucastniky ukazala konzistentni effect size d=0.65 (medium-large effect).",
  },
}

export default async function ImplementationIntentionsHelpPage() {
  const locale = await getLocale()
  const l = (locale === "cs" ? "cs" : "en") as "en" | "cs"
  const c = t[l]

  const examples = [
    { border: "border-green-500", title: c.exExercise, desc: c.exExerciseDesc },
    { border: "border-blue-500", title: c.exHealthy, desc: c.exHealthyDesc },
    { border: "border-purple-500", title: c.exMeditation, desc: c.exMeditationDesc },
    { border: "border-orange-500", title: c.exReading, desc: c.exReadingDesc },
  ]

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <Link href="/help"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />{c.back}</Button></Link>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center"><Zap className="h-6 w-6 text-yellow-500" /></div>
            <h1 className="text-3xl font-bold tracking-tight">{c.title}</h1>
          </div>
          <p className="text-muted-foreground text-lg">{c.subtitle}</p>
        </div>

        <Alert><Zap className="h-4 w-4" /><AlertTitle>{c.alertTitle}</AlertTitle><AlertDescription>{c.alertDesc}</AlertDescription></Alert>

        <Card>
          <CardHeader><CardTitle>{c.whatIsIt}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p>{c.whatIsItDesc}</p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-semibold">{c.format}</p>
              <p className="text-sm text-muted-foreground">{c.formatExample}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.howItWorks}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p>{c.howItWorksDesc}</p>
            {[c.how1, c.how2, c.how3].map((title, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div><strong>{title}</strong>{[c.how1Desc, c.how2Desc, c.how3Desc][i]}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.examplesTitle}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              {examples.map((ex, i) => (
                <div key={i} className={`border-l-4 ${ex.border} pl-4 py-2`}>
                  <p className="font-medium">{ex.title}</p>
                  <p className="text-sm text-muted-foreground">{ex.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.mistakes}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[c.mistake1, c.mistake2, c.mistake3].map((title, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-1"><span className="text-red-500">{"\u274C"}</span><strong>{title}</strong></div>
                <p className="text-sm text-muted-foreground ml-6">{[c.mistake1Desc, c.mistake2Desc, c.mistake3Desc][i]}</p>
              </div>
            ))}
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
                </ul>
              </li>
              <li>{c.app4}</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.researchTitle}</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>{c.ref1}</strong>{c.ref1Desc}<em>{c.ref1Journal}</em>(7), 493-503.</p>
            <p className="text-muted-foreground">{c.ref1Note}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
